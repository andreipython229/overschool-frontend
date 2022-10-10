import { FC, memo } from 'react'

import { useBoolean } from '../../customHooks/useBoolean'
import { CheckboxBall } from '../../components/common/CheckboxBall'

import styles from './profile.module.scss'

type notificationItemT = {
  id: number
  info: string
  desc: string
}

export const NotificationItem: FC<notificationItemT> = memo(({ id, info, desc }) => {
  const [isToggle, { onToggle }] = useBoolean()

  return (
    <div key={id} className={styles.notification_toggleWrapper_toggleBlock}>
      <div className={styles.notification_toggleWrapper_toggleBlock_text}>
        <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>{info}</span>
        <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>{desc}</p>
      </div>
      <div className={styles.notification_toggleWrapper_toggleBlock_checkboxWrapper}>
        <CheckboxBall isChecked={isToggle} toggleChecked={onToggle} />
      </div>
    </div>
  )
})
