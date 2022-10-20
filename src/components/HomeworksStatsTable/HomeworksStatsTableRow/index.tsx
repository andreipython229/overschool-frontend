import { FC } from 'react'

import { Portal } from '../../Modal/Portal/index'
import { ModalCheckHomeWork } from '../../Modal/ModalCheckHomeWork/ModalCheckHomeWork'
import {
  tableBallsStarPath,
  acceptedHwPath,
  autoCheckHwPath,
  underRevisionHwPath,
  rejectedHwPath,
  waitingdHwPath,
} from '../../../config/commonSvgIconsPath'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { homeworkStatT } from 'types/homeworkT'
import { convertDate } from '../../../constants'
import { useBoolean } from 'customHooks/useBoolean'

type homeworksStatsTableRowT = {
  homeworkData: homeworkStatT
}

export const HomeworksStatsTableRow: FC<homeworksStatsTableRowT> = ({ homeworkData }) => {
  const [isModalOpen, { off: open, on: close }] = useBoolean()

  const { email, mark, status, avatar, homework_name, last_update, user_homework } = homeworkData

  const [mmddyyyy, hoursAndMinutes] = convertDate(new Date(last_update))

  return (
    <>
      <tr onClick={open}>
        <td style={{ display: 'flex', alignItems: 'center'}}>
          {avatar ? (
            <img style={{ borderRadius: '50%', width: '32px', height: '32px' }} src={avatar} alt="avatar" />
          ) : (
            <div
              style={{
                background: '#F9DCDC',
                width: '33px',
                height: '33px',
                borderRadius: '50%',
                color: '#D96B7D',
                padding: '8px 5px'
              }}
            >
              БИ
            </div>
          )}
          <span style={{ marginLeft: '15px', color:'#424345' }}>Без имени</span>
        </td>
        <td style = {{margin:'0 0 0 27px'}}>{email}</td>
        <td style = {{margin:'0 0 0 27px'}}>{homework_name}</td>
        <td style = {{margin:'0 0 0 27px'}}>Курс</td>
        <td style = {{margin:'0 0 0 27px'}}>
          {mmddyyyy} в {hoursAndMinutes}
        </td>
        <td style={{ display: 'flex', alignItems: 'center', margin: 0}}>
          <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={acceptedHwPath} />
          <span style = {{margin: '0 0 0 5px'}}>{status}</span>
        </td>
        <td style = {{margin:'0 0 0 27px'}}>
          <IconSvg width={16} height={15} viewBoxSize={'0 0 16 15'} path={tableBallsStarPath} />
          <span style = {{margin: '0 0 0 7px'}}>{mark || 0}</span>
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
