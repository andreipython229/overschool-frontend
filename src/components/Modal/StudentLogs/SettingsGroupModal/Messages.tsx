import { FC } from 'react'

import { Checkbox } from 'components/common/Checkbox/Checkbox'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'

export const Messages: FC = () => {
  return (
    <div style={{ marginTop: '40px' }} className={styles.groupSetting_checkboxBlock}>
      <div className={styles.groupSetting_checkboxBlock_checkbox}>
        <Checkbox id={'channelInMessage'} name={'channelInMessage'} checked={false} onChange={() => console.log('yes')} />
        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
          <span>Канал в сообщениях</span>
          <span>Отдельный чат, в который может писать только администрация школы</span>
        </div>
      </div>
      <div className={styles.groupSetting_checkboxBlock_checkbox}>
        <Checkbox id={'chatInMessages'} name={'chatInMessages'} checked={false} onChange={() => console.log('yes')} />
        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
          <span>Групповой чат в сообщениях</span>
          <span>Ученик сможет приступить к следующему занятию только после прохождения предыдущего</span>
        </div>
      </div>
      <div className={styles.groupSetting_checkboxBlock_checkbox}>
        <Checkbox id={'stopChat'} name={'stopChat'} checked={false} onChange={() => console.log('yes')} />
        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
          <span>Запретить ученикам писать в личные сообщения</span>
          <span>
            Ученики не смогут писать сотрудникам, назначенным на данный курс. Важно: если в настройках у сотрудника стоит пункт “Писать могут все
            ученики”, то этот запрет не будет распространяться на него
          </span>
        </div>
      </div>
    </div>
  )
}
