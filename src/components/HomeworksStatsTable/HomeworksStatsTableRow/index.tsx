import { FC, memo } from 'react'

import { Portal } from '../../Modal/Portal'
import { ModalCheckHomeWork } from '../../Modal/ModalCheckHomeWork/ModalCheckHomeWork'
import { tableBallsPth } from '../../../config/commonSvgIconsPath'
import { iocnsByStatus } from '../config/iocnsByStatus'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { homeworkStatT } from 'types/homeworkT'
import { convertDate } from '../../../constants'
import { useBoolean } from 'customHooks/useBoolean'

import styles from '../homeworksStatsTable.module.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'

type homeworksStatsTableRowT = {
  homeworkData: homeworkStatT
}

export const HomeworksStatsTableRow: FC<homeworksStatsTableRowT> = memo(({ homeworkData }) => {
  // const [isModalOpen, { off: open, on: close }] = useBoolean()
  const navigate = useNavigate()

  const open = () => {
    navigate(
      generatePath(Path.CheckHomeWork, {
        lesson_id: String(homeworkData.homework),
        studentHomeworkId: String(homeworkData.user_homework_id),
        courseId: String(homeworkData.course_id),
      }),
    )
  }

  const { user_email, mark, status, user_avatar, homework_name, last_reply, course_name, user_first_name, user_last_name, user_homework_id } =
    homeworkData

  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(last_reply))

  return (
    <>
      <tr onClick={open} role="row">
        <td>
          {user_avatar ? (
            <img style={{ borderRadius: '14px', width: '64px', height: '64px' }} src={user_avatar} alt="avatar" />
          ) : (
            <div className={styles.table_body_avatar_div}>
              {`${user_last_name.charAt(0).toUpperCase() || 'Б'}${user_first_name.charAt(0).toUpperCase() || 'И'}`}
            </div>
          )}
          <span>{`${user_last_name || 'Без'} ${user_first_name || 'Имени'}`}</span>
        </td>
        <td>{user_email}</td>
        <td>{homework_name}</td>
        <td>{course_name}</td>
        <td>
          {mmddyyyy} в {hoursAndMinutes}
        </td>
        <td>
          <div style={status === 'Принято' ? { backgroundColor: '#357EEB' } : {}} className={styles.table_body_status}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: iocnsByStatus[status].circleColor }}></div>
            <span style={{ color: iocnsByStatus[status].textColor }}>{status}</span>
          </div>
        </td>
        <td>
          <div className={styles.table_body_mark}>
            <span>{mark || 0}</span>
            <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={tableBallsPth} />
          </div>
        </td>
      </tr>
      {/* {isModalOpen && (
        <Portal closeModal={close}>
          <ModalCheckHomeWork homeworkData={homeworkData} closeModal={close} />
        </Portal>
      )} */}
    </>
  )
})
