import React, { FC, useEffect, useState } from 'react'
import { DateTime } from 'luxon'

import { crossIconPath, averageMarkIconPath, progressIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { StudentInfoAccardion } from './StudentInfoAccardion'
import { result } from 'types/courseStatT'
import mainStyles from '../../Modal.module.scss'
import styles from './studentInfoModal.module.scss'
import { useFetchStudentProgressQuery } from '../../../../api/userProgressService'
import { useLazyFetchStudentLessonsQuery, useResetStudentLessonsAccessMutation } from '../../../../api/lessonAccessService'
import { useLazyFetchStudentsGroupByCourseQuery, useUpdateGroupMutation } from 'api/studentsGroupService'
import { useDeleteStudentFromGroupMutation } from '../../../../api/studentsGroupService'
import { MenuItem, Select } from '@mui/material'
import DatePicker from 'react-datepicker'
import { groupSections, sectionLessons } from '../../../../types/lessonAccessT'
import { useAppSelector } from 'store/hooks'
import { headerUserRoleName } from '../../../../config/headerUserRoleName'
import { schoolSelector, selectUser } from '../../../../selectors'
import { studentsGroupsT } from 'types/studentsGroup'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { Modal } from 'components/common/Modal/Modal'

type studentInfoModalT = {
  student: result | null
  closeModal: () => void
  isStudentDeleted: () => void
}

interface ICoursesProgress {
  course_id: number
  course_name: string
  all_baselessons: number
  completed_count: number
  completed_percent: number
  lessons: {
    completed_percent: number
    all_lessons: number
    completed_lessons: number
  }
  homeworks: {
    completed_percent: number
    all_lessons: number
    completed_lessons: number
  }
  tests: {
    completed_percent: number
    all_lessons: number
    completed_lessons: number
  }
}

type studentProgressT = {
  student: string
  school_id: number
  school_name: string
  courses: ICoursesProgress[]
}

type Group = {
  id: number
  course_id: number
  name: string
}

type TargetGroup = {
  id: number
  name: string
} | null

export const StudentInfoModal: FC<studentInfoModalT> = ({ student, closeModal, isStudentDeleted }) => {
  const lastActivity = student?.last_login ? student.last_login : null
  const { schoolName, schoolId } = useAppSelector(schoolSelector)
  const courseId = student?.course_id
  const [studentProgress, setStudentProgress] = useState<studentProgressT>()
  const { data } = useFetchStudentProgressQuery({ user_id: String(student?.student_id), schoolName })
  const [fetchStudentLessons, { data: allStudentLessons, isFetching }] = useLazyFetchStudentLessonsQuery()
  const [fetchStudentsGroups, { data: groups }] = useLazyFetchStudentsGroupByCourseQuery()
  const [studentLessons, setStudentLessons] = useState<sectionLessons[]>()
  const [resetAccess, { isSuccess }] = useResetStudentLessonsAccessMutation()
  const [completedPercent, setCompletedPercent] = useState<number>()
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openMoveStudent, setMoveStudent] = useState<boolean>(false)
  const [deleteStudent] = useDeleteStudentFromGroupMutation()
  const [removeDate, setRemoveDate] = useState<Date>(new Date())
  const [datePickerClass, setDatePickerClass] = useState<any>()
  const TEN_MINUTES = 10 * 60 * 1000
  const currentTime = new Date()
  let activityMessage
  const { role } = useAppSelector(selectUser)
  const [targetGroup, setTargetGroup] = useState<TargetGroup>(null)
  const [updateGroup] = useUpdateGroupMutation()

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleOpenMoveStudent = () => {
    setMoveStudent(true)
  }

  const handleCloseMoveStudent = () => {
    setMoveStudent(false)
  }

  useEffect(() => {
    setStudentProgress(data)
  }, [data])

  useEffect(() => {
    if (studentProgress) {
      const percentsArray = studentProgress?.courses.map(course => {
        return course.completed_percent
      })

      const sum = percentsArray.reduce((acc, curr) => {
        return acc + curr
      }, 0)

      setCompletedPercent(+(sum / percentsArray.length).toFixed(2))
    }
  }, [studentProgress])

  useEffect(() => {
    courseId && fetchStudentsGroups({ schoolName, id: courseId })
  }, [courseId])

  useEffect(() => {
    schoolId && student && fetchStudentLessons({ id: schoolId, student_id: student?.student_id })
  }, [student])

  useEffect(() => {
    if (allStudentLessons) {
      const lessonsPerGroup: groupSections | undefined = allStudentLessons.student_data.find(
        (item: groupSections) => item.group_id === student?.group_id,
      )
      lessonsPerGroup && setStudentLessons(lessonsPerGroup.sections)
    }
  }, [allStudentLessons])

  const onChange = (date: Date): void => {
    setRemoveDate(date)
  }

  if (lastActivity) {
    const timeDifference = currentTime.getTime() - new Date(lastActivity).getTime()

    if (timeDifference < TEN_MINUTES) {
      activityMessage = 'Онлайн'
    } else {
      const lastLoginDateTime = DateTime.fromISO(lastActivity, { zone: 'utc' })
      const formattedDate = lastLoginDateTime.toFormat('dd.MM.yyyy')
      activityMessage = `Был(а) онлайн ${formattedDate}`
    }
  } else {
    activityMessage = 'Был(а) онлайн давно'
  }

  const resetAccessSetting = async () => {
    const data = {
      student_id: student?.student_id,
      group_id: student?.group_id,
    }
    await resetAccess({ data: data, schoolName })
      .unwrap()
      .then(async () => {
        schoolId && student && fetchStudentLessons({ id: schoolId, student_id: student?.student_id })
      })
      .catch(error => {
        console.log(error.data)
      })
  }

  const handleDeleteStudent = async () => {
    const formData = new FormData()
    formData.append('user_ids', String(student?.student_id))
    formData.append('role', 'Student')
    formData.append('student_groups', String(student?.group_id))
    const year = removeDate.getFullYear()
    const month = ('0' + (removeDate.getMonth() + 1)).slice(-2)
    const day = ('0' + removeDate.getDate()).slice(-2)
    let hours: string = (removeDate.getHours() - 3).toString()
    hours = ('0' + hours).slice(-2)
    const minutes = ('0' + removeDate.getMinutes()).slice(-2)
    const seconds = ('0' + removeDate.getSeconds()).slice(-2)
    formData.append('date', `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)

    await deleteStudent({ data: formData, schoolName: schoolName })
      .unwrap()
      .then(async data => {
        await setOpenAlert(false)
        await closeModal()
      })
      .catch(async error => {
        await setOpenAlert(false)
        console.log(error.data)
        await closeModal()
      })
    await isStudentDeleted()
  }

  const handleMoveStudent = async () => {
    if (student?.student_id && targetGroup) {
      try {
        await updateGroup({
          user_ids: [student.student_id],
          new_group_id: targetGroup.id,
          schoolName,
          id: student.group_id,
        }).unwrap()
        handleCloseMoveStudent()
        closeModal()
        isStudentDeleted()
      } catch (error) {
        console.error('Ошибка при перемещении студента:', error)
      }
    }
  }

  const availableGroups = groups?.results
    ? groups.results.filter((group: studentsGroupsT) => group.course_id === student?.course_id && group.group_id !== student?.group_id)
    : []

  return (
    <div className={mainStyles.main} role="dialog" aria-modal="true">
      {isFetching && <LoaderLayout />}
      <div className={styles.content_decoration_shadow}></div>
      <div className={styles.close_btn} onClick={closeModal}>
        <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </div>
      <div className={styles.content}>
        <div className={styles.student_block}>
          {student?.avatar ? (
            <img width={'50'} height={'50'} className={styles.student_block_avatar} src={student?.avatar} alt="avatar" />
          ) : (
            <div className={styles.student_block_avatar}>{`${student?.first_name.charAt(0) || 'Б'} ${student?.last_name.charAt(0) || 'И'}`}</div>
          )}
          <h3 className={styles.student_block_name}>
            {student?.last_name && student?.first_name
              ? `${student?.last_name}  ${student?.first_name}`
              : student?.last_name || student?.first_name || 'Нет имени'}
          </h3>
          <p className={styles.student_block_email}>{student?.email}</p>
          <p className={styles.student_block_activity}>{activityMessage}</p>
        </div>
        {/* <div className={styles.student_actions}>
          <Button text="Написать в чат" />
          <Button text="Действия" />
        </div> */}
        <div className={styles.student_progress}>
          <div>
            <span className={styles.student_progress_title}>Общий прогресс</span>
            <div className={styles.student_progress_info}>
              {/* заглушка */}
              {/* <div
                style={{
                  width: '17px',
                  height: '17px',
                  backgroundColor: '#BA75FF',
                  borderRadius: '50%',
                }}
              ></div> */}
              <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={progressIconPath} />
              <span>{completedPercent}%</span>
            </div>
          </div>
          <div>
            <span className={styles.student_progress_title}>Средний балл</span>
            <div className={styles.student_progress_info}>
              <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={averageMarkIconPath} />
              <span>{student?.average_mark?.toFixed(0) ?? 0}</span>
            </div>
          </div>
          <div>
            <span className={styles.student_progress_title}>Суммарный балл</span>
            <div className={styles.student_progress_info}>
              <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={averageMarkIconPath} />
              <span>{student?.mark_sum ?? 0}</span>
            </div>
          </div>
        </div>
        <div className={styles.accardions}>
          <StudentInfoAccardion
            student={student}
            progress={studentProgress}
            studentLessons={studentLessons}
            setStudentLessons={setStudentLessons}
            resetAccessSetting={resetAccessSetting}
          />
        </div>
        {student?.group_name && headerUserRoleName[role] === 'Администратор' && (
          <div className={styles.button_container}>
            <Button 
              className={styles.student_button} 
              text={`Переместить ученика в другую группу`} 
              onClick={handleOpenMoveStudent} 
            />
            
            <Modal
              isOpen={openMoveStudent}
              onClose={handleCloseMoveStudent}
              title="Переместить студента"
              variant="gradient"
              width="500px"
            >
              <div className={styles.modalContent}>
                <p>Выберите группу, в которую хотите переместить студента:</p>
                <Select
                  value={targetGroup ? targetGroup.id.toString() : ''}
                  onChange={e => {
                    const selectedGroupId = parseInt(e.target.value, 10)
                    const selectedGroup = availableGroups.find(group => group.group_id === selectedGroupId)
                    if (selectedGroup && selectedGroup.group_id !== undefined) {
                      setTargetGroup({ id: selectedGroup.group_id, name: selectedGroup.name })
                    }
                  }}
                  fullWidth
                >
                  <MenuItem value="Выберите группу для переноса" disabled>
                    Выберите группу для переноса
                  </MenuItem>
                  {availableGroups.map(group => (
                    <MenuItem key={group.group_id} value={group.group_id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
                <div className={styles.modalActions}>
                  <Button onClick={handleCloseMoveStudent} color="primary" text="Отмена" />
                  <Button onClick={handleMoveStudent} color="primary" text="Переместить" />
                </div>
              </div>
            </Modal>

            <Button 
              className={styles.delete_button} 
              text={`Удалить ученика из группы "${student?.group_name}"`} 
              onClick={handleOpenAlert} 
            />

            <Modal
              isOpen={openAlert}
              onClose={handleCloseAlert}
              title={`Удалить студента из группы "${student.group_name}"?`}
              variant="warning"
              width="500px"
            >
              <div className={styles.modalContent}>
                <p>
                  Это действие безвозвратно удалит студента {`"${student.first_name || 'Без'} ${student.last_name || 'Имени'}"`} из группы{' '}
                  {`"${student.group_name}"`}. Если уверены, что хотите продолжить, можете выбрать дату удаления
                </p>
                <div className={styles.modalActions}>
                  <Button onClick={handleCloseAlert} color="primary" text="Отмена" />
                  <Button onClick={handleDeleteStudent} color="primary" text="Удалить" />
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  )
}
