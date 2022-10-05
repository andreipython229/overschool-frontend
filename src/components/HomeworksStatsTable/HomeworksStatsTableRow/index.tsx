import { FC } from 'react'

import { initialDropDownList } from '../../../constants/dropDownList'
import { tableBallsStarPath } from '../../../config/commonSvgIconsPath'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { homeworkStatT } from 'types/homeworkT'
import { convertDate } from '../../../utils/index'

type homeworksStatsTableRowT = {
  homeworkData: homeworkStatT
  handleOpenModal: () => void
  onSelectUserHomeworkId: (id: number) => void
}

export const HomeworksStatsTableRow: FC<homeworksStatsTableRowT> = ({ homeworkData, handleOpenModal, onSelectUserHomeworkId }) => {
  const { email, mark, status, avatar, homework_name, last_update, user_homework } = homeworkData

  const [mmddyyyy, hoursAndMinutes] = convertDate(new Date(last_update))

  return (
    <tr
      onClick={() => {
        handleOpenModal()
        onSelectUserHomeworkId(user_homework)
      }}
      style={{ textAlign: 'center' }}
    >
      <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        {avatar ? <span style={{ marginLeft: '15px' }}>Без имени</span> : <input type="file" value={avatar} />}
      </td>
      <td>{email}</td>
      <td>{homework_name}</td>
      <td>Курс</td>
      <td>
        {mmddyyyy} в {hoursAndMinutes}
      </td>
      <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconSvg
          width={initialDropDownList[1].icon.width}
          height={initialDropDownList[1].icon.height}
          viewBoxSize={initialDropDownList[1].viewBoxSize}
          path={[{ d: initialDropDownList[1].icon.d, fill: initialDropDownList[1].icon.fill }]}
        />
        <span>{status}</span>
      </td>
      <td>
        <IconSvg width={16} height={15} viewBoxSize={'0 0 16 15'} path={tableBallsStarPath} />
        <span>{mark || 0}</span>
      </td>
    </tr>
  )
}
