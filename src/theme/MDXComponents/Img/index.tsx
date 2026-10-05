/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react'
import clsx from 'clsx'
import ImagePreview from '@site/src/components/ImagePreview'
import type { Props } from '@theme/MDXComponents/Img'

import styles from './styles.module.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MDXImg({ width, height, ...rest }: Props): ReactNode {
  return (
    <ImagePreview
      {...rest}
      src={rest.src}
      alt={rest.alt}
      className={clsx(styles.img, rest.className)}
    />
  )
}
