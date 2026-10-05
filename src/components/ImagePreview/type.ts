import type { ComponentProps } from 'react'

export interface PreviewImage {
  src: string
  alt: string
}

export type ImagePreviewProps = ComponentProps<'img'> & PreviewImage
