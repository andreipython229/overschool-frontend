import { FC } from 'react'

import { crossIconPath, tableBallsStarPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { StudentInfoAccardion } from './StudentInfoAccardion'
import { result } from 'types/courseStatT'

import { convertDate } from 'utils/convertDate'
import mainStyles from '../../Modal.module.scss'
import styles from './studentInfoModal.module.scss'

type studentInfoModalT = {
  student: result | null
  closeModal: () => void
}

export const StudentInfoModal: FC<studentInfoModalT> = ({ student, closeModal }) => {
  const lastActivity = new Date(student?.last_active || '')
  const { mmddyyyy } = convertDate(lastActivity)

  return (
    <div className={mainStyles.main} role="dialog" aria-modal="true">
      <div className={styles.close_btn} onClick={closeModal}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.content}>
        <div className={styles.student_block}>
          <div className={styles.student_block_avatar}>{`${student?.first_name.charAt(0) || 'б'} ${student?.last_name.charAt(0) || 'и'}`}</div>
          <h3 className={styles.student_block_name}>{`${student?.first_name || 'без'} ${student?.last_name || 'имени'}`}</h3>
          <p className={styles.student_block_email}>{student?.email}</p>
          <p className={styles.student_block_activity}>Был(а) онлайн {`${mmddyyyy}`}</p>
        </div>
        {/* <div className={styles.student_actions}>
          <Button text="Написать в чат" />
          <Button text="Действия" />
        </div> */}
        <div className={styles.student_progress}>
          <div>
            <span className={styles.student_progress_title}>Общий прогресс</span>
            <div className={styles.student_progress_info}>
              {/* заглушка */}
              <div style={{ width: '17px', height: '17px', backgroundColor: '#BA75FF', borderRadius: '50%' }}></div>
              <span>50%</span>
            </div>
          </div>
          <div>
            <span className={styles.student_progress_title}>Средний балл</span>
            <div className={styles.student_progress_info}>
              <IconSvg width={19} height={19} viewBoxSize={'0 0 17 17'} path={tableBallsStarPath} />
              <span>{student?.average_mark?.toFixed(0) ?? 0}</span>
            </div>
          </div>
          <div>
            <span className={styles.student_progress_title}>Суммарный балл</span>
            <div className={styles.student_progress_info}>
              <IconSvg width={19} height={19} viewBoxSize={'0 0 17 17'} path={tableBallsStarPath} />
              <span>{student?.mark_sum ?? 0}</span>
            </div>
          </div>
        </div>
        <div className={styles.accardions}>
          <StudentInfoAccardion student={student} />
        </div>
      </div>
    </div>
  )
}
