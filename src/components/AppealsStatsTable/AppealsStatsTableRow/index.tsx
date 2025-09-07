import { FC, memo } from 'react'
import { Portal } from '../../Modal/Portal'
import { iconsByStatus } from '../config/iconsByStatus'
import { convertDate } from '../../../constants'
import { useBoolean } from 'customHooks/useBoolean'
import styles from '../appealsStatsTable.module.scss'
import { appealStatT } from 'types/schoolsT'
import { ModalCheckAppeal } from 'components/Modal/ModalCheckAppeal/ModalCheckAppeal'
import user_avatar from '../../../assets/img/common/user_avatar_appeal.svg'

type appealsStatsTableRowT = {
  appealData: appealStatT
  refetchTable: () => void
}

export const AppealsStatsTableRow: FC<appealsStatsTableRowT> = memo(({ appealData, refetchTable }) => {
  const [isModalOpen, { off: open, on: close }] = useBoolean()

  const { email, name, id, message, phone, is_read, course, updated_at, created_at, course_name } = appealData

  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(created_at))

  const readStatus = appealData.is_read ? 'Обработана' : 'Ждет обработки'
  const { circleColor, textColor } = iconsByStatus[readStatus]
  const backgroundColor = appealData.is_read ? '#357EEB' : undefined

  return (
    <>
      <tr onClick={open} role="row">
        <td style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ borderRadius: '14px', width: '64px', height: '64px' }} src={user_avatar} alt="avatar" />
          <span>{name}</span>
        </td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{course_name}</td>
        <td>
          <span style={{ color: '#357EEB' }}>
            {mmddyyyy} в {hoursAndMinutes}
          </span>
          {/* {mmddyyyy} в {hoursAndMinutes} */}
        </td>
        <td>
          <div style={{ backgroundColor }} className={styles.table_body_status}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: circleColor,
              }}
            ></div>
            <span style={{ marginLeft: '5px', color: textColor }}>{readStatus}</span>
          </div>
        </td>
      </tr>
      {isModalOpen && (
        <Portal closeModal={close}>
          <ModalCheckAppeal
            isOpen={isModalOpen}
            onClose={close}
            appeal={{ id, description: '' }}
            onApprove={() => {
              refetchTable()
              close()
            }}
            onReject={() => {
              refetchTable()
              close()
            }}
          />
        </Portal>
      )}
    </>
  )
})
