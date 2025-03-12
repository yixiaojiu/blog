/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react'
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client'
import BlogPostItem from '@theme/BlogPostItem'
import type { Props } from '@theme/BlogPostItems'

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}: Props): ReactNode {
  return (
    <>
      {items.map(({ content: BlogPostContent }, index) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}
        >
          {/* @ts-expect-error */}
          <BlogPostItemComponent isOdd={index % 2 === 0}>
            <BlogPostContent />
          </BlogPostItemComponent>
        </BlogPostProvider>
      ))}
    </>
  )
}
