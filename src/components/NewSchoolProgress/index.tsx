import { FC, useEffect, useState } from 'react'
import styles from './newSchoolProgress.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { useBoolean } from 'customHooks'
import { motion } from 'framer-motion'
import { logoHeader } from '../../assets/img/common'
import { useAppSelector } from 'store/hooks'
import { schoolProgressSelector } from 'selectors'
import { Button } from 'components/common/Button/Button'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'

export const NewSchoolProgress: FC = () => {
  const [show, { onToggle }] = useBoolean(false)
  const { data: schoolProgressState } = useAppSelector(schoolProgressSelector)
  const [currentTask, setCurrentTask] = useState<string>('')
  const [allTasks, { onToggle: toggleTasks }] = useBoolean(false)

  useEffect(() => {
    const lastShownDate = localStorage.getItem('popupDate')
    const today = new Date().toDateString()
    if (lastShownDate !== today) {
      onToggle()
      localStorage.setItem('popupDate', today)
    }
  }, [onToggle])

  const handleClose = () => {
    onToggle()
  }

  useEffect(() => {
    if (schoolProgressState) {
      const filteredTasks = schoolProgressState.tasks.filter(task => !task.completed)
      if (filteredTasks.length > 0) {
        setCurrentTask(filteredTasks[0].task)
      }
    }
  }, [schoolProgressState])

  if (!show) {
    return <></>
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#ffffff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#ffffff',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#357eeb',
      ...theme.applyStyles('dark', {
        backgroundColor: '#357eeb',
      }),
    },
  }))

  return (
    show && (
      <motion.div
        initial={{
          y: -500,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          x: '-50%',
        }}
        transition={{
          delay: 6,
          duration: 1,
        }}
        exit={{
          y: -500,
          opacity: 0,
        }}
        className={styles.wrapper}
      >
        <div className={styles.wrapper_logo}>
          <img src={logoHeader} alt="logo" />
        </div>
        <div className={styles.wrapper_top}>
          <div onClick={handleClose} style={{ cursor: 'pointer', marginBottom: '33px' }}>
            <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
          </div>
        </div>
        <div className={styles.wrapper_content}>
          <div className={styles.wrapper_gift}>Выполняйте задания и получайте 7 дополнительных дней подписки БЕСПЛАТНО!</div>
          <div className={styles.wrapper_title}>Текущая задача: {currentTask}</div>
          <div className={styles.wrapper_progress}>
            <div className={styles.wrapper_progress_progressbar}>
              <p className={styles.wrapper_progress_title}>Общий прогресс</p>
              <BorderLinearProgress variant="determinate" value={schoolProgressState.completion_percentage} />
            </div>
            <div className={styles.wrapper_progress_percentage}>{`Выполнено  ${schoolProgressState.completion_percentage}%`}</div>
          </div>
          <div className={styles.wrapper_top} style={{ marginTop: '1rem' }}>
            <div className={styles.wrapper_button_allTasks}>
              <Button onClick={toggleTasks} text={allTasks ? 'Скрыть все задания' : 'Показать все задания'} variant="newSecondary" />
            </div>
          </div>
        </div>
        {allTasks && (
          <motion.div className={styles.wrapper_tasks} transition={{ duration: 0.4, ease: 'easeOut' }}>
            {schoolProgressState.tasks.map((task, index) => (
              <div className={styles.wrapper_task} key={index}>
                <span>{task.completed ? <DoneIcon sx={{ color: '#357EEB' }} /> : <ClearIcon sx={{ color: 'red' }} />}</span>
                <p className={styles.wrapper_task_title}>{task.task}</p>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    )
  )
}
