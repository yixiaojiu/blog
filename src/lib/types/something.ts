import { BlogPostFrontMatter } from '@docusaurus/plugin-content-blog'

export interface ExtendBlogFrontMatter {
  img?: string
}

export type AllBlogFrontMatter = ExtendBlogFrontMatter & BlogPostFrontMatter
