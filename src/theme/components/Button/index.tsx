import React, { createElement } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type ButtonProps<T extends 'button' | 'a'> = T extends 'button'
  ? React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > & {
      as?: T
    }
  : React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > & {
      as?: T
    }

export default function Button<T extends 'button' | 'a'>({
  as = 'button',
  children,
  className,
  ...rest
}: ButtonProps<T>) {
  return createElement(
    as,
    {
      className: clsx(styles.btn, className),
      ...rest,
    },
    children
  )
}
