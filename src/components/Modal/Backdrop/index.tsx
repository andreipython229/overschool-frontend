import { motion } from 'framer-motion'
import { FC, MouseEventHandler } from 'react'
import styles from './backdrop.module.scss'

interface IBackdrop {
  children: React.ReactElement
  onClose: MouseEventHandler<HTMLDivElement>
}

export const Backdrop: FC<IBackdrop> = ({ children, onClose }) => {
  return (
    <motion.div onClick={onClose} className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  )
}
