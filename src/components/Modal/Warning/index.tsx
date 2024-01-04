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
      className={styles.main}
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
      <div className={styles.container}>
        <span className={styles.main_closed} onClick={() => setShowModal(false)}>
          <IconSvg width={15} height={15} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </span>
        <div className={styles.main_title} style={{ margin: '30px 0 30px 0 ' }}>
          {textModal}
        </div>

        <div className={styles.warning_wrapper}>
          <Button onClick={task} variant={'delete'} text={'Да, удалить'} />
          <Button onClick={() => setShowModal(false)} variant='default' text={'Отмена'}/>
        </div>
      </div>
    </motion.div>
  )
}
