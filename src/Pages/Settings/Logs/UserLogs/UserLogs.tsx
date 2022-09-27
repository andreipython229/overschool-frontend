import { FC, memo } from 'react'
import { UserLogsPropsT } from '../../../pageTypes'
import styles from './userLogs.module.scss'

export const UserLogs: FC<UserLogsPropsT> = memo(({ contacts, whatDoing, time }) => {
  return (
    <div className={styles.logs_user}>
      <div>{contacts}</div>
      <div>{whatDoing}</div>
      <div>{time}</div>
    </div>
  )
})
