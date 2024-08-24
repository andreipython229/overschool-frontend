import { FC, useEffect, useState } from 'react'
import styles from './newSchoolProgress.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { useBoolean } from 'customHooks'
import { motion } from 'framer-motion'
import { LinearProgressWithLabel } from './config/linearProgress'
import { useAppSelector } from 'store/hooks'
import { schoolProgressSelector } from 'selectors'
import { Button } from 'components/common/Button/Button'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'

export const NewSchoolProgress: FC = () => {
//  const [show, { onToggle }] = useBoolean(true)
  const [show, setShow] = useState(false)
  const { data: schoolProgressState } = useAppSelector(schoolProgressSelector)
  const [currentTask, setCurrentTask] = useState<string>('')
   const [allTasks, setAllTasks] = useState(false)

  useEffect(() => {
    const lastShownDate = localStorage.getItem('popupDate')
    const today = new Date().toDateString()

    if (lastShownDate !== today) {
      setShow(true)
      localStorage.setItem('popupDate', today)
    }
  }, [])

  const handleClose = () => {
    setShow(false)
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
    return null
  }

  return (
    show && (
      <motion.div
        initial={{
          y: -400,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 6,
          duration: 1,
        }}
        exit={{
          y: -400,
          opacity: 0,
        }}
        className={styles.wrapper}
      >
        <div className={styles.wrapper_top}>
          <div style={{ cursor: 'pointer' }} onClick={handleClose}>
            <IconSvg width={14} styles={{ color: '#adadad' }} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
          </div>
        </div>
        <div className={styles.wrapper_gift}>Выполняйте задания и получайте дополнительные дни подписки БЕСПЛАТНО!</div>
        <div className={styles.wrapper_title}>Текущая задача: {currentTask}</div>
        <p style={{ fontSize: '10px', fontWeight: 500 }}>Общий прогресс</p>
        <LinearProgressWithLabel value={schoolProgressState.completion_percentage} />
        <div className={styles.wrapper_top} style={{ marginTop: '1rem' }}>
          <Button
             onClick={() => setAllTasks(!allTasks)}
            style={{ fontSize: '10px', padding: '5px 10px' }}
            text={allTasks ? 'Скрыть задачи' : 'Показать все задания'}
          />
        </div>
        {allTasks && (
          <motion.div style={{ marginTop: '1rem', width: '100%' }}>
            {schoolProgressState.tasks.map((task, index) => (
              <div className={styles.wrapper_task} key={index}>
                <p>{`${index + 1}. ${task.task}`}</p>
                <span>{task.completed ? <DoneIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    )
  )
}
