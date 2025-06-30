import React, { FC, useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchCoursesQuery } from '../../../api/coursesServices'
import MenuItem from '@mui/material/MenuItem'
import { CoursesDataT } from '../../../types/CoursesT'
import { useLazyFetchStudentsGroupQuery } from '../../../api/studentsGroupService'
import { useFetchSchoolHeaderQuery } from '../../../api/schoolHeaderService'
import { useCreateMeetingMutation, useUpdateMeetingMutation, useFetchAllMeetingsQuery, useDeleteMeetingMutation } from '../../../api/meetingsService'
import { useCreateMeetingsRemindersMutation } from 'api/tgNotificationsServices'
import Timer from '../../Timer/Timer'
import { TgMeetingReminders } from 'types/tgNotifications'
import { Button } from 'components/common/Button/Button'
import styles from './addMeeting.module.scss'
import { SchoolMeeting } from '../../../types/schoolMeetingsT'
import { RootState } from '../../../store/redux/store'
import { setTotalMeetingCount } from '../../../store/redux/meetings/meetingSlice'
import { Input } from 'components/common/Input/Input/Input'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { closeHwModalPath } from 'config/commonSvgIconsPath'
import { Modal } from 'components/common/Modal/Modal'

interface AddMeetingProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (meetingData: any) => void
  setShowAddMeetingForm: React.Dispatch<React.SetStateAction<boolean>>
  showAddMeetingForm: boolean
  existingMeeting?: SchoolMeeting
}

export const AddMeeting: FC<AddMeetingProps> = ({ isOpen, onClose, onAdd, setShowAddMeetingForm, showAddMeetingForm, existingMeeting }) => {
  const schoolName = window.location.href.split('/')[4]
  const { role } = useAppSelector(selectUser)
  const [showReminderOptions, setShowReminderOptions] = useState(false)
  const [fetchGroups, { data: studentsGroups, isSuccess: groupsSuccess }] = useLazyFetchStudentsGroupQuery()
  const { data: Courses, isSuccess: coursesSuccess } = useFetchCoursesQuery({ schoolName, page: 1 })
  const [selectedCourse, setSelectedCourse] = useState<CoursesDataT | null>(null)
  const [allGroups, setAllGroups] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [createMeeting, { isLoading, error }] = useCreateMeetingMutation()
  const [updateMeeting] = useUpdateMeetingMutation()
  const [createMeetingsReminder] = useCreateMeetingsRemindersMutation()
  const [isEditMode, setIsEditMode] = useState(false)

  const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount)

  const [newMeetingData, setNewMeetingData] = useState<SchoolMeeting>({
    id: 0,
    students_groups: [],
    link: '',
    start_date: new Date(),
    title: '',
    description: '',
  })

  const [newMeetingReminder, setNewMeetingReminder] = useState<TgMeetingReminders>({
    daily: false,
    in_three_hours: false,
    ten_minute: false,
    sent: false,
    meeting: newMeetingData.id,
  })

  useEffect(() => {
    if (role === RoleE.Admin) {
      fetchGroups(schoolName)
    }
    if (newMeetingData.id) {
      setIsEditMode(true)
    } else {
      setIsEditMode(false)
      setNewMeetingData({
        ...newMeetingData,
        students_groups: [],
      })
    }
  }, [newMeetingData.id])

  const handleCourseChange = (courseId: number) => {
    setAllGroups(false)
    setSelectedCourse(Courses?.results.find(course => course.course_id === courseId) || null)
  }

  const handleGroupChange = (groupId: number) => {
    setNewMeetingData(prevData => ({
      ...prevData,
      students_groups: [...prevData.students_groups, groupId],
    }))
    setShowReminderOptions(true) // Показываем опции напоминаний после выбора группы
  }

  const handleReminderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setNewMeetingReminder(prevReminder => ({
      ...prevReminder,
      [name]: checked,
    }))
  }

  const handleAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isAll = event.target.checked
    setAllGroups(isAll)
    const groupsByCourse = studentsGroups?.results.filter(group => group.course_id === selectedCourse?.course_id)
    const groupsIds = groupsByCourse?.map(group => group.group_id)
    if (isAll) {
      groupsByCourse?.map(group => {
        setNewMeetingData(
          (prevData: SchoolMeeting) =>
          ({
            ...prevData,
            students_groups: [...prevData.students_groups, group.group_id],
          } as SchoolMeeting),
        )
      })
      setShowReminderOptions(true)
    } else {
      setNewMeetingData((prevData: SchoolMeeting) => ({
        ...prevData,
        students_groups: prevData.students_groups.filter(id => {
          return !new Set(groupsIds).has(id)
        }),
      }))
    }
  }

  const createNewMeeting = () => {
    createMeeting({
      data: newMeetingData,
      schoolName,
    })
      .unwrap()
      .then(meetingResponse => {
        if (meetingResponse.id) {
          // Здесь вы устанавливаете meeting_id в newMeetingReminder
          const updatedMeetingReminder = { ...newMeetingReminder, meeting: meetingResponse.id }

          createMeetingsReminder({
            data: updatedMeetingReminder,
          })
            .unwrap()
            .then(() => {
              dispatch(setTotalMeetingCount(totalMeetingCount + 1))
              onClose()
            })
            .catch(error => {
              console.error('Error creating meeting reminder', error)
            })
        }
      })
  }

  const editExistsMeeting = () => {
    if (newMeetingData.id) {
      updateMeeting({
        id: newMeetingData.id,
        data: newMeetingData,
        schoolName,
      })
        .unwrap()
        .then(() => {
          dispatch(setTotalMeetingCount(totalMeetingCount + 1))
          onClose()
        })
        .catch(error => {
          console.error('Error updating meeting', error)
        })
    }
  }

  const handleAddMeeting = () => {
    if (isEditMode) {
      editExistsMeeting()
    } else {
      createNewMeeting()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить встречу"
      variant="gradient"
      width="600px"
    >
      <form onSubmit={handleAddMeeting} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Название встречи</label>
          <input
            type="text"
            id="title"
            value={newMeetingData.title}
            onChange={(e) => setNewMeetingData({ ...newMeetingData, title: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            id="date"
            value={newMeetingData.start_date ? new Date(newMeetingData.start_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}
            onChange={(e) =>
              setNewMeetingData({
                ...newMeetingData,
                start_date: new Date(e.target.value),
              })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Время</label>
          <input
            type="time"
            id="time"
            value={newMeetingData.start_date ? new Date(newMeetingData.start_date).toISOString().slice(11, 16) : new Date().toISOString().slice(11, 16)}
            onChange={(e) =>
              setNewMeetingData({
                ...newMeetingData,
                start_date: new Date(e.target.value),
              })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={newMeetingData.description}
            onChange={(e) => setNewMeetingData({ ...newMeetingData, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="link">Ссылка на видеоконференцию</label>
          <input
            type="text"
            id="link"
            value={newMeetingData.link}
            onChange={(e) => setNewMeetingData({ ...newMeetingData, link: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="course">Курс</label>
          <select
            id="course"
            value={selectedCourse?.course_id || '-1'}
            onChange={(e) => {
              const courseId = parseInt(e.target.value)
              handleCourseChange(courseId)
            }}
          >
            <option value="-1" disabled>Выберите курс</option>
            {Courses?.results.map(course => (
              <option key={course.course_id} value={course.course_id}>{course.name}</option>
            ))}
          </select>
        </div>

        {studentsGroups && selectedCourse && (
          <div className={styles.formGroup}>
            <label htmlFor="allGroups">Выберите группы</label>
            <input
              type="checkbox"
              id="allGroups"
              checked={allGroups}
              onChange={(e) => {
                handleAllGroups(e)
              }}
            />
            <span>Все группы курса</span>
          </div>
        )}

        {studentsGroups &&
          selectedCourse &&
          studentsGroups.results
            .filter(group => group.course_id === selectedCourse.course_id)
            .map(group => {
              if (group.course_id === selectedCourse.course_id) {
                return (
                  <div key={group.group_id} className={styles.formGroup}>
                    <input
                      type="checkbox"
                      id={`group-${group.group_id}`}
                      checked={new Set(newMeetingData.students_groups).has(Number(group.group_id))}
                      onChange={(e) => {
                        const isChecked = e.target.checked
                        if (isChecked) {
                          setNewMeetingData(
                            (prevData: SchoolMeeting) =>
                            ({
                              ...prevData,
                              students_groups: [...prevData.students_groups, group.group_id],
                            } as SchoolMeeting),
                          )
                          setShowReminderOptions(true)
                        } else {
                          setAllGroups(false)
                          setNewMeetingData((prevData: SchoolMeeting) => ({
                            ...prevData,
                            students_groups: prevData.students_groups.filter(id => id !== group.group_id),
                          }))
                        }
                      }}
                    />
                    <span>{group.name} (Количество участников: {group.students.length})</span>
                  </div>
                )
              }
              return null
            })}

        {showReminderOptions && (
          <div className={styles.formGroup}>
            <label htmlFor="reminders">Установить телеграм напоминание за:</label>
            <input
              type="checkbox"
              id="daily"
              checked={newMeetingReminder.daily}
              onChange={handleReminderChange}
            />
            <span>За день</span>
            <input
              type="checkbox"
              id="in_three_hours"
              checked={newMeetingReminder.in_three_hours}
              onChange={handleReminderChange}
            />
            <span>За три часа</span>
            <input
              type="checkbox"
              id="ten_minute"
              checked={newMeetingReminder.ten_minute}
              onChange={handleReminderChange}
            />
            <span>За десять минут</span>
          </div>
        )}

        <div className={styles.actions}>
          <Button onClick={onClose} color="primary" text="Отмена" />
          <Button type="submit" color="primary" text="Добавить" />
        </div>
      </form>
    </Modal>
  )
}
