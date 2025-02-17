import { FC } from 'react'
import styles from '../Modal.module.scss'
import { motion } from 'framer-motion'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { Button } from 'components/common/Button/Button'

export type WarningT = {
  setShowModal: (value: boolean) => void
  task: () => void
  textModal: string
}

export const WarningModal: FC<WarningT> = ({ setShowModal, task, textModal }) => {
  return (
    <motion.div
      className={styles.warning_main}
      initial={{
        scale: 0.1,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
      }}
    >
      <div>
        <span className={styles.classesContainer_closed} onClick={() => setShowModal(false)}>
          <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
        </span>
        <div className={styles.warning_title}>
          {textModal}
        </div>

        <div className={styles.warning_wrapper}>
          <Button onClick={() => setShowModal(false)} variant={'cancel'} text={'Нет'} />
          <Button onClick={task} variant={'newPrimary'} text={'Да'} />
        </div>
      </div>
    </motion.div>
  )
}
