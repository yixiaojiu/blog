import Link, { Props } from '@docusaurus/Link'
import clsx from 'clsx'
import styles from './styles.module.css'

export default function ResetLink({ className, ...props }: Props) {
  return <Link className={clsx(styles.link, className)} {...props} />
}
