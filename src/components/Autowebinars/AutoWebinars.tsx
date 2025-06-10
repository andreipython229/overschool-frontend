import React, { FC, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { authSelector, schoolSelector } from 'selectors'
import { useFetchAllWebinarsQuery } from 'api/autowebinarsService'
import styles from 'components/Meetings/meetings.module.scss'
import { Button } from 'components/common/Button/Button'
import { useDispatch } from 'react-redux'
import { AddWebinar } from 'components/Autowebinars/modal/AddWebinar'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddIconPath } from '../../assets/Icons/svgIconPath'
import { usePagination } from './hooks/usePagination'
import { WebinarListWithPagination } from './components/WebinarListWithPagination'


export const Webinars: FC = () => {
  const isLogin = useAppSelector(authSelector)
  const { schoolName } = useAppSelector(schoolSelector)
  const { data: webinarsData, isSuccess: webinarsSuccess } = useFetchAllWebinarsQuery({ schoolName: schoolName })
  const [showAddWebinarForm, setShowAddWebinarForm] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [itemsPerPage] = useState(3)
  const {
    currentPage,
    totalPages,
    currentItems,
    paginate,
  } = usePagination(webinarsData || [], itemsPerPage)

  const handleAddWebinarFormOpen = useCallback(() => {
    setShowAddWebinarForm(true)
  }, [])

  const handleBackClick = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.wrapper_actions_header}>
        <Button
          variant="newSecondary"
          text="Назад к видеоконференциям"
          onClick={handleBackClick}
        />
      </div>
      <div className={styles.meeting_header_text}>Автовебинары</div>
      {isLogin && (
        <>
          <div className={styles.buttons_container}>
            <div className={styles.generate_meeting_btn_wrapper}>
              <IconSvg path={AddIconPath} viewBoxSize="0 0 24 24" height={24} width={24} />
              <Button
                variant={'newPrimary'}
                className={styles.generateMeetingButton}
                onClick={handleAddWebinarFormOpen}
                text="Добавить автовебинар"
              >
              </Button>
            </div>
          </div>
          <AddWebinar setShowAddWebinarForm={setShowAddWebinarForm} showAddWebinarForm={showAddWebinarForm}></AddWebinar>
          {webinarsSuccess && webinarsData && (
            <WebinarListWithPagination
              currentItems={currentItems}
              totalPages={totalPages}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
          {webinarsSuccess && webinarsData?.length === 0 && (
            <div className={styles.meetings_empty_text_wrapper}>
              <div className={styles.meetings_empty_text}>Ничего не запланировано</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Webinars
