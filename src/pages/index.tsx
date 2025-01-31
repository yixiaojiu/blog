import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useThemeConfig } from '@docusaurus/theme-common'
import Head from '@docusaurus/Head'
import { useConfigCustomFields } from '@site/src/lib/hooks/something'
import IconComponents from '@site/src/components/IconComponents'
import { ExternalLinkItem } from '@site/src/lib/types/config'
import ArrowRight from '@site/src/svg/arrow-right.svg'

const ExternalLink = ({ linkItem }: { linkItem: ExternalLinkItem }) => {
  const IconComponent = IconComponents[linkItem.type]

  return (
    <a
      style={{ color: 'inherit' }}
      className="w-12 h-9 rounded-2xl bg-outline/80 hover:bg-outline cursor-pointer flex items-center justify-center transition-colors"
      href={linkItem.href}
      target="_blank"
    >
      <IconComponent className="w-6 h-6" />
    </a>
  )
}

function HomeContent() {
  const { biography, externalLinks } = useConfigCustomFields()
  const { image } = useThemeConfig()
  return (
    <div className="grow-1 flex flex-col justify-center items-center">
      <div className="max-w-[720px] min-w-[500px] h-[250px] px-34 pt-25 pb-12 bg-surface/70 rounded-3xl border-4 border-surface flex flex-col justify-between items-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 rounded-full bg-surface/70 border-4 border-surface overflow-hidden">
          <img src={image} className="w-full h-full" />
        </div>
        <p style={{ marginBottom: 0 }} className="text-normal">
          {biography}
        </p>
        <div className="flex gap-6 justify-center">
          {externalLinks.map((link) => (
            <ExternalLink key={link.type} linkItem={link} />
          ))}
        </div>
      </div>
      <button className="w-40 h-15 flex gap-1 justify-center items-center bg-primary cursor-pointer mt-8 text-surface rounded-2xl hover:bg-primary/80 transition-colors">
        <span>查看笔记</span>
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <Head>
        <meta name="algolia-site-verification" content="420B8CF3AB03DCD2" />
      </Head>
      <HomeContent />
    </Layout>
  )
}
