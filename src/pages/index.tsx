import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useThemeConfig } from '@docusaurus/theme-common'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import { useConfigCustomFields } from '@site/src/lib/hooks/something'
import IconComponents from '@site/src/components/IconComponents'
import { ExternalLinkItem } from '@site/src/lib/types/config'
import ArrowRight from '@site/src/svg/arrow-right.svg'
import { usePluginData } from '@docusaurus/useGlobalData'
import Typewriter from '@site/src/components/Typewriter'
import { useMemo } from 'react'

const ExternalLink = ({ linkItem }: { linkItem: ExternalLinkItem }) => {
  const IconComponent = IconComponents[linkItem.type]

  return (
    <a
      style={{ color: 'inherit' }}
      className="px-2 py-1 rounded-2xl bg-outline/80 hover:bg-outline cursor-pointer flex items-center justify-center transition-colors"
      href={linkItem.href}
      target="_blank"
    >
      <IconComponent className="w-4 h-4" />
    </a>
  )
}

function HomeContent() {
  const { biography, externalLinks, nickname, uid } = useConfigCustomFields()
  const { image } = useThemeConfig()

  const pluginData = usePluginData(
    'docusaurus-plugin-content-docs',
    undefined,
    {
      failfast: true,
    }
  ) as any

  const goLink = useMemo(() => {
    const path = pluginData.path
    const mainDocId = pluginData.versions[0].mainDocId
    return `${path}/${mainDocId}`
  }, [pluginData])

  return (
    <div>
      {/* Information Card */}
      <div className="mt-25">
        <div className="mx-auto md:flex gap-60 max-lg:gap-30 items-center w-fit">
          <div className="max-w-54">
            <img
              width={100}
              className="block rounded-full border border-gray-300"
              src={image}
            />
            <h3 className="mb-0 mt-4">{nickname}</h3>
            <p className="text-gray-400 dark:text-gray-300">{uid}</p>

            {/* Notice: The height of this element depends on the length of the content, remember to change */}
            <div className="h-12 max-w-50">
              <Typewriter
                className="mt-2 text-gray-700 dark:text-gray-200"
                speed={300}
                text={biography}
              />
            </div>
            <div className="flex gap-3 mt-2">
              {externalLinks.map((link) => (
                <ExternalLink key={link.type} linkItem={link} />
              ))}
            </div>
            <div className="mt-8 flex gap-2">
              <Link
                style={{
                  color: 'var(--color-surface)',
                  textDecoration: 'none',
                }}
                className="px-4 py-2 text-sm flex gap-1 justify-center items-center bg-primary cursor-pointer rounded-2xl hover:bg-primary/80 transition-colors"
                href={goLink}
              >
                <span>查看笔记</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                style={{
                  textDecoration: 'none',
                }}
                className="px-4 py-2 text-sm flex justify-center items-center cursor-pointer  rounded-2xl text-blue-300 hover:text-blue-400 border-2 hover:border-blue-400 border-blue-300 transition-colors"
                href="/docs/mnote/show-window/maimai"
              >
                查看橱窗
              </Link>
            </div>
          </div>
          <img
            src="/img/yuiju.webp"
            width={150}
            className="block max-md:mt-10 max-md:mx-auto"
          />
        </div>
      </div>
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
