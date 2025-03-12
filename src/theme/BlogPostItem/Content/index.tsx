/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import MDXContent from '@theme/MDXContent'
import type { Props } from '@theme/BlogPostItem/Content'

export default function BlogPostItemContent({
  children,
  className,
}: Props): ReactNode {
  return (
    <div className={clsx('markdown', className)}>
      <MDXContent>{children}</MDXContent>
    </div>
  )
}
