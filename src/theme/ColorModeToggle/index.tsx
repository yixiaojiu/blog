import React from 'react'
import clsx from 'clsx'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { translate } from '@docusaurus/Translate'
import IconLightMode from '@theme/Icon/LightMode'
import IconDarkMode from '@theme/Icon/DarkMode'
import styles from './styles.module.css'
function ColorModeToggle({ className, buttonClassName, value, onChange }) {
  const isBrowser = useIsBrowser()
  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    }
  )
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!document.startViewTransition) {
      onChange(value === 'dark' ? 'light' : 'dark')
      return
    }
    const isLight = value === 'light'
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      onChange(value === 'dark' ? 'light' : 'dark')
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isLight ? clipPath.reverse() : clipPath,
        },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: isLight
            ? '::view-transition-old(color-mode)'
            : '::view-transition-new(color-mode)',
        }
      )
    })
  }
  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName
        )}
        type="button"
        onClick={handleClick}
        disabled={!isBrowser}
        title={title}
        aria-label={title}
        aria-live="polite"
      >
        <IconLightMode
          className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
        />
        <IconDarkMode
          className={clsx(styles.toggleIcon, styles.darkToggleIcon)}
        />
      </button>
    </div>
  )
}
export default React.memo(ColorModeToggle)
