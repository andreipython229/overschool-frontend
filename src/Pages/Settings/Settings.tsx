import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavAccount } from '../School/NavAccount/NavAccount'

import { motion } from 'framer-motion'

export const Settings: FC = memo(() => {
  return (
    <>
    <motion.div
    initial={{
      x: -900,
      opacity: 0,
    }}
    animate={{
      x: 0,
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{
      delay: 0.1,
      ease: 'easeInOut',
      duration: 0.5,
    }}
    layout
    >
      <NavAccount />
      <Outlet />
    </motion.div>
    </>
  )
})
