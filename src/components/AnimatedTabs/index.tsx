import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import styles from './animatedTabs.module.scss'

interface ITab {
  label: string
}

interface IAnimatedTabs {
  tabs: ITab[]
}

export const AnimatedTabs: FC<IAnimatedTabs> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div className={styles.wrapper}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`${activeTab === index ? styles.activeTab : ''} ${styles.tab}`}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {activeTab === index && (
            <motion.span
              layoutId="bubble"
              className={styles.spanEl}
              style={{ borderRadius: 9999 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <p>{tab.label}</p>
        </button>
      ))}
    </div>
  )
}
