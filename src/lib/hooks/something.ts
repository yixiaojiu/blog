import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { CustomFields } from '../types/config'

export const useConfigCustomFields = () => {
  const { siteConfig } = useDocusaurusContext()
  return siteConfig.customFields as CustomFields
}
