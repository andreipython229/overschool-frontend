import React, { memo, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './checkbox_ball.module.scss'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export const CheckboxBall = memo(() => {
  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => setIsOn(!isOn)

  return (
    <div className={styles.switch} data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  )
})
