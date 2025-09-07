import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import styles from './worldSwitcher.module.scss'

const WordSwitcher = () => {
  const words = ['онлайн-обучения', 'новых возможностей']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length)
    }, 3000) // смена слова каждые 3 секунды

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={styles.text_container}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.7, ease: 'easeInOut' } }}
          transition={{ duration: 0.84, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const App = () => {
  return (
    <span className={styles.container}>
      <span>для</span>
      <span className={styles.container_worlds}>
        <WordSwitcher />
      </span>
    </span>
  )
}

export default App
