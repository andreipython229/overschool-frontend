import { useState, FC, useEffect, useRef } from 'react'
import { convertDate } from 'utils/convertDate'
import { UserHomework, UserHomeworkCheck } from 'types/homeworkT'
import { UserHomeworkHistory } from 'components/UserHomeworkHistory'

import styles from './modal_check_home_work.module.scss'

type studentModalHomeworkT = {
  closeModal: () => void
  hwStatus: boolean
  userHomework: UserHomework
}

type fileT = {
  name: string
  size: number
  file: string
}

export const StudentModalCheckHomeWork: FC<studentModalHomeworkT> = ({ userHomework }) => {
  const [hwChecks, setHwChecks] = useState<UserHomeworkCheck[]>()
  const [todayIndex, setTodayIndex] = useState<number>(-1)
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (userHomework) {
      setHwChecks([...userHomework.user_homework_checks].reverse())
    }
  }, [userHomework])

  useEffect(() => {
    if (hwChecks && hwChecks.length) {
      const index = hwChecks.findIndex(homework => convertDate(new Date(homework.updated_at || '')).mmddyyyy === convertDate(new Date()).mmddyyyy)
      setTodayIndex(index)
    }
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [hwChecks])

  return (
    <div className={styles.modal_content}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {hwChecks?.map((homework, index) => (
          <UserHomeworkHistory key={homework.user_homework_check_id} homework={homework} today={index === todayIndex} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  )
}
