import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import clsx from 'clsx'

interface TypewriterProps {
  text: string
  // 打字的速度J
  speed?: number
  // 一次动画介绍后停顿的时间
  pause?: number
  className?: string
}

const Typewriter = ({
  text,
  speed = 100,
  pause = 3000,
  className,
}: TypewriterProps) => {
  const [currentText, setCurrentText] = useState('')
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let intervalId
    if (!isPaused) {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setCurrentText(text.substring(0, index + 1))
          setIndex(index + 1)
        } else {
          setIsPaused(true)
        }
      }, speed)
    } else {
      intervalId = setInterval(() => {
        setIsPaused(false)
        setCurrentText('')
        setIndex(0)
      }, pause)
    }
    return () => clearInterval(intervalId)
  }, [index, text, speed, pause, isPaused])

  return <div className={clsx(styles.typewriter, className)}>{currentText}</div>
}

export default Typewriter
