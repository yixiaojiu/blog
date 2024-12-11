import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Head from '@docusaurus/Head'
import styles from './index.module.css'
import logo from '../../static/img/avatar-transparent.png'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <img src={logo} style={{ width: 280 }} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/bagu/html-css/html"
          >
            查看笔记 →
          </Link>
        </div>
      </div>
    </header>
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
      <HomepageHeader />
    </Layout>
  )
}
