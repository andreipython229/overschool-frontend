import { FC, memo } from 'react'
import { motion } from 'framer-motion'

import styles from './checkbox_ball.module.scss'

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

type CheckboxBallT = {
  toggleChecked: () => void
  isChecked: boolean
}

export const CheckboxBall: FC<CheckboxBallT> = memo(({ isChecked, toggleChecked }) => {
  const toggleSwitch = () => {
    toggleChecked && toggleChecked()
  }

  return (
    <div className={styles.switch} data-ison={isChecked} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  )
})
