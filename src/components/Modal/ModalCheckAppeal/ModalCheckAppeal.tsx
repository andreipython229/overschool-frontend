import { useState, FC, ChangeEvent, memo, useEffect } from 'react'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { useFetchHomeworkDataQuery } from '../../../api/userHomeworkService'
import { convertDate } from 'utils/convertDate'
import { UserHomework, CurrentUser } from 'types/homeworkT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { taskIconPath, closeHwModalPath } from './config/svgIconsPsth'

import styles from './modalCheckAppeal.module.scss'
import { useFetchCurrentAppealMutation } from 'api/catalogServices'

type modalAppealT = {
  id: number
  closeModal: () => void
}

type fileT = {
  name: string
  size: number
  file: string
}

export const ModalCheckAppeal: FC<modalAppealT> = memo(({ id, closeModal }) => {
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
      <button className={styles.modal_content_close} onClick={closeModal}>
        <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
      </button>
      <div className={styles.header_info}>
        <p className={styles.task_status}>Заявка на поступление от {appeal.email}</p>
      </div>
      <div>Контент в разработке...</div>
    </div>
  )
})
