import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setModules, clearModules, modulesSlice, modulesReduce } from '../../store/redux/modules/modules'

import { sectionsT } from '../../types/sectionT'
import { useFetchModulesQuery, useFetchStudentModulesQuery, useLazyFetchModulesQuery } from '../../api/modulesServices'
import { StudentAccardion } from 'components/StudentAccardion/StudentAccardion'
import { StudentCourseHeader } from './StudentCourseHeader'
import { Portal } from '../../components/Modal/Portal'
import { LimitModal } from '../../components/Modal/LimitModal/LimitModal'
import { useBoolean } from '../../customHooks'
import { SearchInput } from 'components/common/SearchInput'
import { GlobalPrevious } from 'components/Previous/GlobalPrevious'
import { StudentProgressBlock } from 'components/StudentProgressBlock'
import { CourseNavigationHeader } from 'components/CourseNavigationHeader'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

export const StudentCourse: FC = () => {
  const dispatch = useDispatch()
  const schoolName = window.location.href.split('/')[4]
  const { course_id: courseId } = useParams()
  const [query, setQuery] = useState<string>('')
  // const [fetchModules, {data, error, isError}] = useLazyFetchModulesQuery()
  const {
    data,
    error,
    isError,
    refetch: fetchModules,
  } = useFetchStudentModulesQuery({ id: courseId as string, schoolName: schoolName, query: query })
  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')
  const [course, setCourse] = useState<any>()

  useEffect(() => {
    if (data) {
      setCourse(data)
    }
    if (data?.sections.length !== undefined) {
      localStorage.setItem('sections_count', data?.sections.length.toString())
      dispatch(setModules(data))
    }
    if (error && 'data' in error) {
      setMessage(JSON.parse(JSON.stringify(error.data)).error)
      onToggle()
      setCourse(null)
    }
  }, [data, error, dispatch])

  if (!course) {
    return <LoaderLayout />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      {/* <StudentCourseHeader teacher_id={course?.teacher_id as number} /> */}
      <CourseNavigationHeader course={course} />
      <GlobalPrevious />
      <StudentProgressBlock />
      <SearchInput value={query} setValue={setQuery} />
      {course ? <StudentAccardion modules={course as sectionsT} /> : <></>}
      {isOpenLimitModal ? (
        <Portal closeModal={onToggle}>
          <LimitModal message={message} setShowLimitModal={onToggle} />
        </Portal>
      ) : null}
    </div>
  )
}
