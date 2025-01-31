export type ExternalLinkType = 'github' | 'bilibili' | 'rednote'

export type ExternalLinkItem = {
  type: ExternalLinkType
  href: string
}

export type CustomFields = {
  biography: string
  externalLinks: ExternalLinkItem[]
}
