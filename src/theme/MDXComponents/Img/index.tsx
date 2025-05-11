/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import type { Props } from '@theme/MDXComponents/Img'

import styles from './styles.module.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MDXImg({ width, height, ...rest }: Props): ReactNode {
  return (
    <Zoom>
      <img
        decoding="async"
        loading="lazy"
        {...rest}
        className={clsx(styles.img, rest.className)}
      />
    </Zoom>
  )
}
