import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import styles from './checkButton.module.scss'

const spring = {
  type: 'spring' as const,
  stiffness: 700,
  damping: 30,
}

type CheckButtonT = {
  toggleChecked?: () => void
  isChecked: boolean
}

export const CheckButton: FC<CheckButtonT> = memo(({ isChecked, toggleChecked }) => {
  const toggleSwitch = () => {
    toggleChecked && toggleChecked()
  }

  return (
    <div className={styles.switch} data-ison={isChecked} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  )
})
