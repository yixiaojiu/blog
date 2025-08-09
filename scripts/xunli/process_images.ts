import fs from 'fs/promises'
import path from 'path'
import exifr from 'exifr'
import sharp from 'sharp'
import { setTimeout as sleep } from 'node:timers/promises'

type Nullable<T> = T | null

type GeoLocation = {
  lat: number
  lng: number
}

export type ImageMetadata = {
  originalName: string
  compressedName: string
  sizeKB: number
  date: Nullable<string>
  location: Nullable<GeoLocation>
  city: Nullable<string>
}

function isJpegFile(fileName: string): boolean {
  const ext = path.extname(fileName).toLowerCase()
  return ext === '.jpg' || ext === '.jpeg'
}

async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  await fs.mkdir(directoryPath, { recursive: true })
}

function formatDateToYYYYMMDDInEast8(date: Date | undefined): Nullable<string> {
  if (!date) return null
  // 将日期转换为东八区并格式化为 YYYY-MM-DD。
  // 注意：EXIF 中的时间可能不包含时区信息，这里统一按东八区处理。
  const east8OffsetMinutes = 8 * 60
  const timestampUtc = date.getTime()
  const adjusted = new Date(timestampUtc + east8OffsetMinutes * 60 * 1000)
  const year = adjusted.getUTCFullYear()
  const month = String(adjusted.getUTCMonth() + 1).padStart(2, '0')
  const day = String(adjusted.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function buildCompressedFileName(
  inputDir: string,
  originalFileName: string
): string {
  const dirName = path.basename(path.resolve(inputDir))
  const base = path.parse(originalFileName).name
  return `${dirName}-${base}-camera.webp`
}

async function readExifMetadata(
  imagePath: string
): Promise<{ date: Nullable<Date>; location: Nullable<GeoLocation> }> {
  const exif = await exifr.parse(imagePath).catch(() => null as any)
  if (!exif) return { date: null, location: null }

  const date: Nullable<Date> =
    (exif as any).DateTimeOriginal || (exif as any).CreateDate || null

  // 兼容经纬度多种返回形式：
  // - exif.latitude / exif.longitude（十进制度）
  // - exif.GPSLatitude / exif.GPSLongitude（度分秒数组）+ 方向 Ref（N/S/E/W）
  const toDecimalDegrees = (value: any, ref?: string): Nullable<number> => {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      const signed = ref === 'S' || ref === 'W' ? -Math.abs(value) : value
      return signed
    }
    if (Array.isArray(value) && value.length >= 3) {
      const [deg, min, sec] = value as [number, number, number]
      if (
        [deg, min, sec].every((n) => typeof n === 'number' && !Number.isNaN(n))
      ) {
        const abs = Math.abs(deg) + min / 60 + sec / 3600
        const signed = ref === 'S' || ref === 'W' ? -abs : abs
        return signed
      }
    }
    if (typeof value === 'string') {
      const num = Number.parseFloat(value)
      if (!Number.isNaN(num)) {
        const signed = ref === 'S' || ref === 'W' ? -Math.abs(num) : num
        return signed
      }
    }
    return null
  }

  const latFromDecimal = (exif as any).latitude as number | undefined
  const lngFromDecimal = (exif as any).longitude as number | undefined

  const lat: Nullable<number> =
    typeof latFromDecimal === 'number' && !Number.isNaN(latFromDecimal)
      ? latFromDecimal
      : toDecimalDegrees(
          (exif as any).GPSLatitude,
          (exif as any).GPSLatitudeRef
        )
  const lng: Nullable<number> =
    typeof lngFromDecimal === 'number' && !Number.isNaN(lngFromDecimal)
      ? lngFromDecimal
      : toDecimalDegrees(
          (exif as any).GPSLongitude,
          (exif as any).GPSLongitudeRef
        )

  const location: Nullable<GeoLocation> =
    lat != null && lng != null ? { lat, lng } : null

  return { date, location }
}

async function compressToWebpSinglePass(
  sourcePath: string,
  destinationPath: string
): Promise<void> {
  // 压缩策略（单次压缩）：
  // - 目标格式：webp
  // - 最长边限制：1500px（保持比例）
  // - 质量：80
  // 如需更严格的体积控制或画质平衡，请在此处调参（例如调整质量或最长边）。
  const image = sharp(sourcePath)
  const metadata = await image.metadata()

  let width = metadata.width ?? undefined
  let height = metadata.height ?? undefined
  const maxSide = 1500
  if (width && height) {
    const currentMax = Math.max(width, height)
    if (currentMax > maxSide) {
      const scale = maxSide / currentMax
      width = Math.floor(width * scale)
      height = Math.floor(height * scale)
    }
  }

  let pipeline = image
  if (width && height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  await pipeline.webp({ quality: 80 }).toFile(destinationPath)
}

const NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/reverse'
const USER_AGENT = 'xunli-process-images/1.0 (contact: yi_xiao_jiu@qq.com)'

async function reverseGeocodeCity(
  lat: number,
  lng: number
): Promise<Nullable<string>> {
  // 轻量节流，避免触发 Nominatim 限流
  const delayMs = 1000 + Math.floor(Math.random() * 500) // 1000-1500ms
  await sleep(delayMs)

  const url = new URL(NOMINATIM_ENDPOINT)
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lng))
  url.searchParams.set('zoom', '10')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('accept-language', 'ja')
  url.searchParams.set('email', 'yi_xiao_jiu@qq.com')

  const doFetch = async () => {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Referer: 'https://note.yixiaojiu.top',
      },
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(
        '[Nominatim] reverse failed:',
        res.status,
        res.statusText,
        text
      )
      return null
    }
    const data = (await res.json()) as any
    const address = data?.address ?? {}
    // 优先 city；回退 city_district、town、village、municipality
    const city: string | undefined =
      address.city ||
      address.city_district ||
      address.town ||
      address.village ||
      address.municipality
    return (city as string | undefined) ?? null
  }

  // 简单重试一次
  try {
    return await doFetch()
  } catch {
    await sleep(500)
    try {
      return await doFetch()
    } catch (err2) {
      console.error('[Nominatim] reverse error after retry:', err2)
      return null
    }
  }
}

async function processImages(inputDir: string): Promise<void> {
  const absoluteInputDir = path.join(__dirname, inputDir)
  const compressDir = path.join(absoluteInputDir, 'compress')
  await ensureDirectoryExists(compressDir)

  const entries = await fs.readdir(absoluteInputDir, { withFileTypes: true })
  const imageFiles = entries
    .filter((ent) => ent.isFile() && isJpegFile(ent.name))
    .map((ent) => ent.name)
    .sort((a, b) => {
      const num = a.match(/\d+/)?.[0]
      const num2 = b.match(/\d+/)?.[0]
      return Number(num ?? 0) - Number(num2 ?? 0)
    })

  const results: ImageMetadata[] = []

  for (const fileName of imageFiles) {
    console.log(`Processing ${fileName}...`)

    const sourcePath = path.join(absoluteInputDir, fileName)
    const compressedName = buildCompressedFileName(absoluteInputDir, fileName)
    const destinationPath = path.join(compressDir, compressedName)

    // 覆盖写入（如已存在同名文件）
    await compressToWebpSinglePass(sourcePath, destinationPath)

    const { date, location } = await readExifMetadata(sourcePath)
    let city: Nullable<string> = null
    if (location) {
      city = await reverseGeocodeCity(location.lat, location.lng)
    }

    const stat = await fs.stat(destinationPath)
    const sizeKB = Math.round((stat.size / 1024) * 10) / 10 // 保留1位小数

    const record: ImageMetadata = {
      originalName: fileName,
      compressedName,
      sizeKB,
      date: formatDateToYYYYMMDDInEast8(date ?? undefined),
      location,
      city,
    }

    results.push(record)
  }

  const metadataPath = path.join(absoluteInputDir, 'metadata.json')
  await fs.writeFile(metadataPath, JSON.stringify(results, null, 2), 'utf-8')
}

processImages('./images/玉子市场')
