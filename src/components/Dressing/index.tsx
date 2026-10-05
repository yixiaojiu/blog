import { useMemo, useState } from 'react'
import { ImageLightbox } from '../ImagePreview'
import styles from './styles.module.css'

export default function Dressing({
  months,
}: {
  months: {
    month: string
    photos: { src: string; alt: string }[][]
  }[]
}) {
  const [index, setIndex] = useState(-1)
  const slides = useMemo(
    () => months.flatMap(({ photos }) => photos.flat()),
    [months]
  )

  return (
    <>
      <ol className={styles.list} aria-label="穿搭时间线">
        {months.map(({ month, photos }) => (
          <li key={month} className={styles.entry}>
            <div className={styles.timeline}>
              <time dateTime={month} className={styles.date}>
                <span className={styles.year}>{month.slice(0, 4)} 年</span>
                <span className={styles.month}>
                  {Number(month.slice(5))} 月
                </span>
              </time>
            </div>
            <div className={styles.photos}>
              {photos.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                  {row.map(({ src, alt }) => (
                    <button
                      key={src}
                      type="button"
                      className={styles.photoFrame}
                      aria-label={`放大图片：${alt}`}
                      onClick={() =>
                        setIndex(slides.findIndex((photo) => photo.src === src))
                      }
                    >
                      <img
                        src={src}
                        alt={alt}
                        className={styles.photo}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <ImageLightbox
        index={index}
        onClose={() => setIndex(-1)}
        slides={slides}
      />
    </>
  )
}
