import React, { memo, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './checkbox_ball.module.scss'

const config = {
  type: 'config',
  stiffness: 300,
  damping: 50,
}

export const CheckboxBall = memo(() => {
  const [isOn, setIsOn] = useState<boolean>(false)

  const toggleSwitch = () => setIsOn(!isOn)

  return (
    <div className={styles.switch} data-ison={isOn} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={config} />
    </div>
  )
})
