import fs from 'fs/promises'
import type { ImageMetadata } from './process_images'

const BASE_URL = 'https://mawyjwkc75ngfvaa.public.blob.vercel-storage.com/'

/**
 * 将 metadata.json 转换为 ts 文件
 * @param jsonPath 绝对路径
 * @param tsPath 绝对路径
 */
async function insertData(jsonPath: string, tsPath: string): Promise<void> {
  const raw = await fs.readFile(jsonPath, 'utf-8')
  const input = JSON.parse(raw)

  const mapped = (input as ImageMetadata[])
    .filter((item) => Boolean(item && item.compressedName))
    .map((item) => {
      const output: Record<string, string> = {
        realImageUrl: BASE_URL + item.compressedName,
      }
      if (item.date) output.shootDate = item.date
      if (item.city) output.location = item.city
      return output
    })

  const headers = `/**
 * 动画图片来源 https://anitabi.cn
 */
`

  const content = `${headers}export default ${JSON.stringify(mapped, null, 2)}\n`
  await fs.writeFile(tsPath, content, 'utf-8')
}

insertData(
  '/Users/yixiaojiu/Code/everything/blog/scripts/xunli/images/玉子市场/metadata.json',
  '/Users/yixiaojiu/Code/everything/blog/src/components/Pilgrimage/data/tamakoMarket.ts'
)
