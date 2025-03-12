import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import {
  BlogPostFrontMatter,
  PropBlogPostMetadata,
} from '@docusaurus/plugin-content-blog'
import BlogPostItemHeader from '@theme/BlogPostItem/Header'
import BlogPostItemContent from '@theme/BlogPostItem/Content'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'
import { useConfigCustomFields } from '@site/src/lib/hooks/something'
import type { Props } from '@theme/BlogPostItem'

interface FrontMatter extends BlogPostFrontMatter {
  img?: string
}

const Image = ({ frontMatter }: { frontMatter: FrontMatter }) => {
  const { defaultBlogImage } = useConfigCustomFields()

  return (
    <div className="aspect-3/2 w-2/5 m-2 rounded-lg overflow-hidden relative">
      <img
        src={frontMatter.img ?? defaultBlogImage}
        className="object-cover h-full w-full"
      />
      <div className="absolute w-full h-full bg-gray-700/20 z-1 top-0 left-0" />
    </div>
  )
}

const Information = ({ metadata }: { metadata: PropBlogPostMetadata }) => (
  <div className="flex-1 px-6 flex flex-col items-center justify-center gap-3">
    <Link to={metadata.permalink} className={styles.singleLineText}>
      {metadata.title}
    </Link>
    <div className="flex gap-3 text-xs">
      <div>创建时间</div>
    </div>
    <p className={clsx(styles.multipleText, 'text-xs')}>
      {metadata.description}
    </p>
  </div>
)

interface BlogPostItemProps extends Props {
  isOdd: boolean
}

export default function BlogPostItem({
  children,
  isOdd,
}: BlogPostItemProps): ReactNode {
  const { isBlogPostPage, frontMatter, metadata } = useBlogPost()

  return (
    <>
      {isBlogPostPage ? (
        <article>
          <BlogPostItemHeader />
          <BlogPostItemContent>{children}</BlogPostItemContent>
        </article>
      ) : (
        <div className="my-4 border border-gray-100 flex rounded-2xl">
          {isOdd ? (
            <>
              <Image frontMatter={frontMatter} />
              <Information metadata={metadata} />
            </>
          ) : (
            <>
              <Information metadata={metadata} />
              <Image frontMatter={frontMatter} />
            </>
          )}
        </div>
      )}
    </>
  )
}
