export type ExternalLinkType = 'github' | 'bilibili' | 'rednote'

export type ExternalLinkItem = {
  type: ExternalLinkType
  href: string
}

export type CustomFields = {
  /**
   * 个性签名
   */
  biography: string
  /**
   * 外部链接
   */
  externalLinks: ExternalLinkItem[]
  /**
   * 默认 blog 图片
   */
  defaultBlogImage: string
}
