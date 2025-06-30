import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { authSelector, schoolSelector, selectUser } from '../../selectors'
import { useCreateMeetingMutation, useFetchAllMeetingsQuery, useDeleteMeetingMutation } from '../../api/meetingsService'
import { Path } from 'enum/pathE'
import styles from './meetings.module.scss'
import { Button } from 'components/common/Button/Button'
import { setTotalMeetingCount } from '../../store/redux/meetings/meetingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/redux/store'
import { AddMeeting } from './modal/AddMeeting'
import { MeetingCard } from './card/MeetingCard'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddIconPath, ArrowLeftIconPath, ArrowRightIconPath } from '../../assets/Icons/svgIconPath'

export const SchoolMeetings: FC = () => {
  const isLogin = useAppSelector(authSelector)
  const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount)
  const { schoolName, schoolId } = useAppSelector(schoolSelector)
  const { role: userRole } = useAppSelector(selectUser)
  const { data: meetingsData, isSuccess: meetingsSuccess } = useFetchAllMeetingsQuery({ schoolName: schoolName })
  const [showAddMeetingForm, setShowAddMeetingForm] = useState(false)
  const navigate = useNavigate()

  const [deleteMeeting, { isLoading: isDeleting, error: deleteError }] = useDeleteMeetingMutation()

  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)

  useEffect(() => {
    if (meetingsSuccess && meetingsData) {
      dispatch(setTotalMeetingCount(meetingsData.length))
    }
  }, [meetingsData, meetingsSuccess, dispatch])

  const handleDeleteMeeting = (meetingId: number) => {
    deleteMeeting({ id: meetingId, schoolName })
    dispatch(setTotalMeetingCount(totalMeetingCount - 1))
  }

  const handleAddMeetingFormOpen = () => {
    setShowAddMeetingForm(true)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = meetingsData?.slice(indexOfFirstItem, indexOfLastItem) || []
  function handleNavigateWebinars() {
    navigate(`/school/${schoolName}/webinars/`)
  }

  const handleGoToMain = () => {
    navigate(`/school/${schoolName}/courses-stats/`);
  };

  const renderMeetingLinks = () => {
    if (meetingsSuccess) {
      return (
        <>
          <div className={styles.meetingList}>
            {currentItems.map(meeting => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button className={styles.pagination_arrow_left} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={12} width={9} />
              {/* {"<"} */}
            </button>

            {Array.from({ length: Math.ceil((meetingsData?.length || 0) / itemsPerPage) }, (_, i) => {
              const pageNumber = i + 1
              if (
                pageNumber === 1 || // Первая страница
                pageNumber === Math.ceil((meetingsData?.length || 0) / itemsPerPage) ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? styles.active : ''}>
                    {pageNumber}
                  </button>
                )
              }
              // Добавляем многоточие для скрытых страниц
              if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                return <span key={pageNumber}>...</span>
              }
              return null
            })}

            {/* Кнопка "Вперед" */}
            <button
              className={styles.pagination_arrow_right}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil((meetingsData?.length || 0) / itemsPerPage)}
            >
              <IconSvg path={ArrowRightIconPath} viewBoxSize="0 0 9 14" height={12} width={9} />
              {/* {">"} */}
            </button>
          </div>
        </>
      )
    }
    return (
      <div className={styles.meetings_empty_text_wrapper}>
        <div className={styles.meetings_empty_text}>Ничего не запланировано</div>
      </div>
    )
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.wrapper_actions_header}>
        <Button
          variant="newSecondary"
          text="Автовебинары"
          onClick={handleNavigateWebinars}
        />
      </div>
      <div className={styles.meeting_header_text}>Видеоконференции</div>
      <div className={styles.wrapper_goBack}>
        <button onClick={handleGoToMain}>
          На главную
        </button>
      </div>
      {isLogin && (
        <>
          <div className={styles.generate_meeting_btn_wrapper}>
            <IconSvg path={AddIconPath} viewBoxSize="0 0 24 24" height={24} width={24} />
            <Button
              variant={'newPrimary'}
              className={styles.generateMeetingButton}
              onClick={handleAddMeetingFormOpen}
              text="Добавить видеоконференцию"
            />
          </div>
          <AddMeeting
            isOpen={showAddMeetingForm}
            onClose={() => setShowAddMeetingForm(false)}
            onAdd={(meetingData) => {
              // Здесь будет логика добавления встречи
              setShowAddMeetingForm(false);
            }}
            setShowAddMeetingForm={setShowAddMeetingForm}
            showAddMeetingForm={showAddMeetingForm}
          />
          {renderMeetingLinks()}
        </>
      )}
    </div>
  )
}

export default SchoolMeetings
