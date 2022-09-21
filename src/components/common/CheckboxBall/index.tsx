import { FC, memo } from 'react'
import { motion } from 'framer-motion'

import styles from './checkbox_ball.module.scss'

const config = {
  type: 'config',
  stiffness: 300,
  damping: 50,
}
type CheckboxBallT = {
  toggleChecked?: () => void
  isChecked?: boolean
}

export const CheckboxBall: FC<CheckboxBallT> = memo(({ isChecked, toggleChecked }) => {
  const toggleSwitch = () => {
    toggleChecked && toggleChecked()
  }

  return (
    <div className={styles.switch} data-ison={isChecked} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={config} />
    </div>
  )
})
