import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavCreatingCourse } from '../../../NavAccount/NavCreatingCourse'
import { motion } from 'framer-motion'

export const RedactorCourse: FC = memo(() => {
  return (
    <>
     <motion.div
     initial={{
      x: -3000,
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
      duration: 0.7,
    }}>
      <NavCreatingCourse />
      <Outlet/>
      </motion.div>
    </>
  )
})
