import { FC, memo, useEffect } from 'react'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { convertDate } from 'utils/convertDate'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { closeHwModalPath } from './config/svgIconsPsth'

import styles from './modalCheckAppeal.module.scss'
import { useFetchCurrentAppealMutation } from 'api/catalogServices'

type modalAppealT = {
  id: number
  closeModal: () => void
  refetch: () => void
}

export const ModalCheckAppeal: FC<modalAppealT> = memo(({ id, closeModal, refetch }) => {
  const schoolName = window.location.href.split('/')[4]

  const [fetchData, { data: appeal, isLoading }] = useFetchCurrentAppealMutation()

  useEffect(() => {
    if (!appeal && !isLoading && id) {
      fetchData({ schoolName, id })
    }
  }, [appeal, fetchData, id])

  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(appeal?.created_at || ''))

  if (!appeal || isLoading) {
    return (
      <div className={styles.modal_content} role="dialog" aria-modal="true">
        <button className={styles.modal_content_close} onClick={closeModal}>
          <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
        </button>
        <SimpleLoader style={{ margin: '50px', height: '50px' }} />
      </div>
    )
  }

  return (
    <div className={styles.modal_content} role="dialog" aria-modal="true">
      {isLoading && (
        <div className={styles.loader_wrapper}>
          <SimpleLoader style={{ margin: '50px', height: '50px' }} />
        </div>
      )}
      <button
        className={styles.modal_content_close}
        onClick={() => {
          closeModal()
          refetch()
        }}
      >
        <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
      </button>
      <div className={styles.header_info}>
        <p className={styles.task_status}>
          Заявка на поступление, идентификационный №{appeal.id} от {mmddyyyy} в {hoursAndMinutes}
        </p>
      </div>
      <div
        style={{
          borderRadius: '1rem',
          backgroundColor: '#f1f0f5',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          fontSize: '18px',
        }}
      >
        <span>
          <strong>ФИО:</strong> {appeal.name}
        </span>
        <span>
          <strong>Электронная почта:</strong> {appeal.email}
        </span>
        <span>
          <strong>№ телефона:</strong> {appeal.phone}
        </span>
        <span>
          <strong>Курс:</strong> {appeal.course_name}
        </span>
        <span style={{ display: 'flex', flex: '1', gap: '0.5rem' }}>
          <strong>Статус:</strong>{' '}
          <p style={appeal.is_read ? { color: 'green', fontWeight: 'bold' } : { fontWeight: 'bold' }}>
            {appeal.is_read ? 'Обработана' : 'В обработке'}
          </p>
        </span>
      </div>
    </div>
  )
})
