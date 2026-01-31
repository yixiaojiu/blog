import GithubIcon from '@site/src/svg/github.svg'
import BilibiliIcon from '@site/src/svg/bilibili.svg'
import RedNoteIcon from '@site/src/svg/rednote.svg'
import TwitterXIcon from '@site/src/svg/twitter-x.svg'
import type { ExternalLinkType } from '@site/src/lib/types/config'

const IconComponents: Record<ExternalLinkType, typeof GithubIcon> = {
  github: GithubIcon,
  bilibili: BilibiliIcon,
  rednote: RedNoteIcon,
  twitter: TwitterXIcon,
}

export default IconComponents
