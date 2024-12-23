import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import styles from './animatedModal.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { closeHwModalPath } from '../ModalCheckHomeWork/config/svgIconsPsth'
import { Backdrop } from '../Backdrop'

interface IAnimatedModal {
  handleClose: () => void
  show: boolean
  children: ReactNode
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

export const AnimatedModal: FC<IAnimatedModal> = ({ handleClose, show, children }) => {
  if (!show) {
    return null
  }

  return (
    <Backdrop onClose={handleClose}>
      <motion.div onClick={e => e.stopPropagation()} className={styles.modal} variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <div className={styles.modal_circle1} />
        <div className={styles.modal_circle2} />
        {children}
        <button onClick={handleClose} className={styles.close}>
          <IconSvg path={closeHwModalPath} viewBoxSize="0 0 17 17" height={17} width={17} />
        </button>
      </motion.div>
    </Backdrop>
  )
}
