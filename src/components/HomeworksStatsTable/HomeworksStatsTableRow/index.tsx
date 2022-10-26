import { FC } from 'react'

import { Portal } from '../../Modal/Portal/index'
import { ModalCheckHomeWork } from '../../Modal/ModalCheckHomeWork/ModalCheckHomeWork'
import { tableBallsStarPath } from '../../../config/commonSvgIconsPath'
import { iocnsByStatus } from '../config/iocnsByStatus'
import { avatarClassname } from '../config/avatarClassname'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { homeworkStatT } from 'types/homeworkT'
import { convertDate } from '../../../constants'
import { useBoolean } from 'customHooks/useBoolean'

import styles from '../homeworksStatsTable.module.scss'

type homeworksStatsTableRowT = {
  homeworkData: homeworkStatT
  index: number
}

export const HomeworksStatsTableRow: FC<homeworksStatsTableRowT> = ({ homeworkData, index }) => {
  const [isModalOpen, { off: open, on: close }] = useBoolean()

  const { email, mark, status, avatar, homework_name, last_update, user_homework, course_name, user_name, user_lastname } = homeworkData

  const {mmddyyyy, hoursAndMinutes} = convertDate(new Date(last_update))

  return (
    <>
      <tr onClick={open} role="row">
        <td style={{ display: 'flex', alignItems: 'center' }}>
          {avatar ? (
            <img style={{ borderRadius: '50%', width: '32px', height: '32px' }} src={avatar} alt="avatar" />
          ) : (
            <div className={`${styles.table_body_avatar_div} ${styles[avatarClassname[index]]}`}>БИ</div>
          )}
          <span style={{ marginLeft: '15px', color: '#424345' }}>Без имени</span>
        </td>
        <td style={{ margin: '0 0 0 27px' }}>{email}</td>
        <td style={{ margin: '0 0 0 27px' }}>{homework_name}</td>
        <td style={{ margin: '0 0 0 27px' }}>{course_name}</td>
        <td style={{ margin: '0 0 0 27px' }}>
          {mmddyyyy} в {hoursAndMinutes}
        </td>
        <td style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
          {iocnsByStatus[status].icon}
          <span style={{ margin: '0 0 0 5px', color: iocnsByStatus[status].textColor }}>{status}</span>
        </td>
        <td style={{ margin: '0 0 0 27px' }}>
          <IconSvg width={16} height={15} viewBoxSize={'0 0 16 15'} path={tableBallsStarPath} />
          <span style={{ margin: '0 0 0 7px' }}>{mark || 0}</span>
        </td>
      </tr>
      {isModalOpen && (
        <Portal closeModal={close}>
          <ModalCheckHomeWork homeworkData={homeworkData} />
        </Portal>
      )}
    </>
  )
}
