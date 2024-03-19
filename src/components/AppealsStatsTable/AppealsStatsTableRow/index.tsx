import { FC, memo } from 'react'

import { Portal } from '../../Modal/Portal'
import { ModalCheckHomeWork } from '../../Modal/ModalCheckHomeWork/ModalCheckHomeWork'
import { iconsByStatus } from '../config/iconsByStatus'
import { convertDate } from '../../../constants'
import { useBoolean } from 'customHooks/useBoolean'

import styles from '../appealsStatsTable.module.scss'
import { appealStatT } from 'types/schoolsT'
import { ModalCheckAppeal } from 'components/Modal/ModalCheckAppeal/ModalCheckAppeal'

type appealsStatsTableRowT = {
  appealData: appealStatT
}

export const AppealsStatsTableRow: FC<appealsStatsTableRowT> = memo(({ appealData }) => {
  const [isModalOpen, { off: open, on: close }] = useBoolean()

  const { email, name, id, message, phone, is_read, course, updated_at, created_at } = appealData

  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(created_at))

  return (
    <>
      <tr onClick={open} role="row">
        <td style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.table_body_avatar_div}>{name.charAt(0).toUpperCase()}</div>
          <span style={{ marginLeft: '15px', color: '#424345' }}>{name}</span>
        </td>
        <td style={{ margin: '0 0 0 27px' }}>{email}</td>
        <td style={{ margin: '0 0 0 27px' }}>{phone}</td>
        <td style={{ margin: '0 0 0 27px' }}>{course}</td>
        <td style={{ margin: '0 0 0 27px' }}>
          {mmddyyyy} в {hoursAndMinutes}
        </td>
        <td style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
          {iconsByStatus['Ждет обработки'].icon}
          <span style={{ margin: '0 0 0 5px', color: iconsByStatus['Ждет обработки'].textColor }}>{'Ждет обработки'}</span>
        </td>
      </tr>
      {isModalOpen && (
        <Portal closeModal={close}>
          <ModalCheckAppeal id={id} closeModal={close} />
        </Portal>
      )}
    </>
  )
})
