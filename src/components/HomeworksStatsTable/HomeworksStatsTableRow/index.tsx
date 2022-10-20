import { FC } from 'react'

import { Portal } from '../../Modal/Portal/index'
import { ModalCheckHomeWork } from '../../Modal/ModalCheckHomeWork/ModalCheckHomeWork'
import { tableBallsStarPath } from '../../../config/commonSvgIconsPath'
import { iocnsByStatus } from '../config/iocnsByStatus'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { homeworkStatT } from 'types/homeworkT'
import { convertDate } from '../../../constants'
import { useBoolean } from 'customHooks/useBoolean'

type homeworksStatsTableRowT = {
  homeworkData: homeworkStatT
}

export const HomeworksStatsTableRow: FC<homeworksStatsTableRowT> = ({ homeworkData }) => {
  const [isModalOpen, { off: open, on: close }] = useBoolean()

  const { email, mark, status, avatar, homework_name, last_update, user_homework, course_name, user_name, user_lastname } = homeworkData

  const [mmddyyyy, hoursAndMinutes] = convertDate(new Date(last_update))

  return (
    <>
      <tr onClick={open} style={{ textAlign: 'center' }}>
        <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {avatar ? (
            <img style={{ borderRadius: '50%', width: '32px', height: '32px' }} src={avatar} alt="avatar" />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F9DCDC',
                width: '33px',
                height: '33px',
                borderRadius: '50%',
                color: '#D96B7D',
              }}
            >
              БИ
            </div>
          )}
          <span style={{ marginLeft: '15px' }}>Без имени</span>
        </td>
        <td>{email}</td>
        <td>{homework_name}</td>
        <td>{course_name}</td>
        <td>
          {mmddyyyy} в {hoursAndMinutes}
        </td>
        <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {iocnsByStatus[status]}
          <span>{status}</span>
        </td>
        <td>
          <IconSvg width={16} height={15} viewBoxSize={'0 0 16 15'} path={tableBallsStarPath} />
          <span>{mark || 0}</span>
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
