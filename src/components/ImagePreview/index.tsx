import { useState, type ComponentProps } from 'react'
import clsx from 'clsx'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import styles from './styles.module.css'

export function ImageLightbox({
  index,
  slides,
  onClose,
}: {
  index: number
  slides: { src: string; alt: string }[]
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

export default function ImagePreview({
  src,
  alt,
  className,
  ...rest
}: ComponentProps<'img'> & { src: string; alt: string }) {
  const [index, setIndex] = useState(-1)

  return (
    <>
      <img
        decoding="async"
        loading="lazy"
        {...rest}
        src={src}
        alt={alt}
        className={clsx(styles.image, className)}
        role="button"
        tabIndex={0}
        aria-label={`放大图片：${alt}`}
        onClick={() => setIndex(0)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIndex(0)
          }
        }}
      />
      <ImageLightbox
        index={index}
        slides={[{ src, alt }]}
        onClose={() => setIndex(-1)}
      />
    </>
  )
}
