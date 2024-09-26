import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { StudentTest } from './StudentTest'
import { StudentHomework } from './StudentHomework'
import { StudentLesson } from './StudentLesson'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { useFetchLessonQuery, useLazyFetchLessonQuery, useLazyFetchModuleLessonsQuery } from '../../../api/modulesServices'
import { StudentLessonSidebar } from './StudentLessonSidebar'
import { sectionT } from 'types/sectionT'

import styles from './lesson.module.scss'
import { SimpleLoader } from '../../../components/Loaders/SimpleLoader'
import { useBoolean } from '../../../customHooks'
import { Portal } from '../../../components/Modal/Portal'
import { LimitModal } from '../../../components/Modal/LimitModal/LimitModal'
import {useLazyFetchStudentTrainingDurationQuery} from "../../../api/lessonAccessService";
import {useAppSelector} from "../../../store/hooks";
import {selectUser} from "../../../selectors";

export const StudentLessonPreview: FC = () => {
  const params = useParams()
  const { course_id: courseId } = useParams()
  const schoolName = window.location.href.split('/')[4]

  const [fetchLessons, { data: lessons, isSuccess, error }] = useLazyFetchModuleLessonsQuery()
  const [fetchLesson, { data: lesson, isFetching: isLoading }] = useLazyFetchLessonQuery()
  const [nextDisabled, setNextDisabled] = useState(false)
  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')
  const [fetchDownload, {data}] = useLazyFetchStudentTrainingDurationQuery()
  const [download, setDownload] = useState<boolean>(false)
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (params && courseId !== undefined) {
      fetchLessons({sectionId: String(params.section_id), schoolName, courseId})
    }
  }, [params, courseId])

  useEffect(() => {
    if (params && courseId !== undefined) {
      fetchLesson({id: Number(params?.lesson_id), type: `${params?.lesson_type}`, schoolName, courseId})
    }
  }, [params, courseId])

  useEffect(() => {
    if (lesson && lessons && lesson?.type !== LESSON_TYPE.TEST) {
      fetchDownload({group_id: Number(lessons?.group_id), student_id: Number(user?.userId), schoolName})
    }
  }, [lessons, lesson])

  useEffect(() => {
    if (data) {
      setDownload(data.download)
    }
  }, [data])

  useEffect(() => {
    if (error && 'data' in error) {
      setMessage(JSON.parse(JSON.stringify(error.data)).error)
      onToggle()
    }
  }, [error])

  const activeLessonIndex = lessons?.lessons.findIndex(lesson => `${lesson.id}` === params?.lesson_id && lesson.type === params?.lesson_type)
  const activeLesson = lessons?.lessons.find(lesson => `${lesson.id}` === params?.lesson_id && lesson.type === params?.lesson_type)
  const sended = activeLesson?.sended
  const completed = activeLesson?.completed

  const renderUI = () => {
    if (isSuccess && lessons) {
      switch (lesson?.type) {
        case LESSON_TYPE.LESSON:
          return <StudentLesson lessons={lessons} lesson={lesson} params={params} activeLessonIndex={activeLessonIndex as number} download={download}/>
        case LESSON_TYPE.HOMEWORK:
          return (
            <StudentHomework
              lessons={lessons}
              lesson={lesson}
              params={params}
              activeLessonIndex={activeLessonIndex as number}
              sended={sended}
              nextDisabled={nextDisabled}
              setNextDisabled={setNextDisabled}
              download={download}
            />
          )
        case LESSON_TYPE.TEST:
          return (
            <StudentTest
              lessons={lessons}
              params={params}
              activeLessonIndex={activeLessonIndex as number}
              sended={sended}
              completed={completed}
              nextDisabled={nextDisabled}
              setNextDisabled={setNextDisabled}
            />
          )
      }
    }
  }

  if (!isLoading && isSuccess) {
    return (
      <div className={styles.lesson_wrapper}>
        {renderUI()}
        <StudentLessonSidebar
          lessonType={`${params?.lesson_type}` as LESSON_TYPE}
          courseId={`${params?.course_id}`}
          sectionId={`${params?.section_id}`}
          activeLessonIndex={activeLessonIndex as number}
          lessons={lessons as sectionT}
          nextDisabled={nextDisabled}
        />
      </div>
    )
  } else {
    return (
      <>
        {isOpenLimitModal ? (
          <Portal closeModal={onToggle}>
            <LimitModal message={message} setShowLimitModal={onToggle} />
          </Portal>
        ) : null}
        <SimpleLoader />
      </>
    )
  }
}
