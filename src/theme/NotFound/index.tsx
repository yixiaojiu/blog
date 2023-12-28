import React from 'react'
import { translate } from '@docusaurus/Translate'
import { PageMetadata, useWindowSize } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import DesktopContent from './DesktopContent'
import MobileContent from './MobileContent'

export default function Index() {
  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
  })
  const windowSize = useWindowSize()

  return (
    <>
      <PageMetadata title={title} />
      <Layout>
        {windowSize === 'mobile' ? <MobileContent /> : <DesktopContent />}
      </Layout>
    </>
  )
}
