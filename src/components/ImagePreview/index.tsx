import { useMemo, useState } from 'react'
import clsx from 'clsx'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import styles from './styles.module.css'
import type { ImagePreviewProps, PreviewImage } from './type'

export function ImageLightbox({
  index,
  slides,
  onClose,
}: {
  index: number
  slides: PreviewImage[]
  onClose: () => void
}) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides}
      labels={{
        Previous: '上一张',
        Next: '下一张',
        Close: '关闭',
        Lightbox: '图片预览',
        'Photo gallery': '照片浏览',
        '{index} of {total}': '第 {index} 张，共 {total} 张',
      }}
      carousel={{ finite: true, preload: 1 }}
      controller={{ closeOnBackdropClick: true }}
      render={
        slides.length === 1
          ? { buttonPrev: () => null, buttonNext: () => null }
          : undefined
      }
    />
  )
}

export function ImagePreviewGroup({ images }: { images: ImagePreviewProps[] }) {
  const [index, setIndex] = useState(-1)
  const slides = useMemo(
    () => images.map(({ src, alt }) => ({ src, alt })),
    [images]
  )

  return (
    <>
      {images.map(({ src, alt, className, ...rest }, imageIndex) => (
        <img
          key={src}
          decoding="async"
          loading="lazy"
          {...rest}
          src={src}
          alt={alt}
          className={clsx(styles.image, className)}
          role="button"
          tabIndex={0}
          aria-label={`放大图片：${alt}`}
          onClick={() => setIndex(imageIndex)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setIndex(imageIndex)
            }
          }}
        />
      ))}
      <ImageLightbox
        index={index}
        slides={slides}
        onClose={() => setIndex(-1)}
      />
    </>
  )
}

export default function ImagePreview(props: ImagePreviewProps) {
  return <ImagePreviewGroup images={[props]} />
}
