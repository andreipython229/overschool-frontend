import { FC, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { CoursesCard } from './CoursesCard'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { RoleE } from 'enum/roleE'
import { searchIconPath } from 'config/commonSvgIconsPath'
import { schoolIdSelector, schoolNameSelector, selectUser } from 'selectors'
import { AddCourseModal } from 'components/Modal'
import {useFetchCoursesPageQuery, useLazyFetchCoursesPageQuery, useLazyFetchCoursesQuery} from 'api/coursesServices'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal'
import { useDebouncedFilter } from '../../../../customHooks'

import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import ContentLoader from 'react-content-loader'
import { ToggleButtonDropDown } from '../../../../components/common/ToggleButtonDropDown'

import { motion, AnimatePresence } from 'framer-motion'


export const CoursePage: FC = () => {
  const { role } = useAppSelector(selectUser)
  const schoolName = useAppSelector(schoolNameSelector)
  const schoolId = useAppSelector(schoolIdSelector)
  // const { data: courses, isSuccess, refetch } = useFetchCoursesPageQuery(schoolName)
  const [fetchData, { data: courses, isSuccess}] = useLazyFetchCoursesPageQuery()
  const [isOpenAddCourse, { onToggle }] = useBoolean()
  const [nameCourses, foundCourses, filterData] = useDebouncedFilter(courses?.results as any, 'name' as keyof object)
  // const [isVisible, setVisible] = useState(false)
  // const handleVisible = () => setVisible(!isVisible)

  const dispatchHandlerModal = () => {
    onToggle()
      fetchData(schoolName);
  }

  useEffect(() => {
    
    if (schoolName === window.location.href.split('/')[4]) {
      fetchData(schoolName);
    } else {
        fetchData(schoolName)
    }
  }, [schoolId]);

  if (!isSuccess)
    return (
      <>
        <div>
          <ContentLoader speed={2} width={270} height={550} viewBox="0 0 150 160" backgroundColor="#fff" foregroundColor="#f2f2f2">
            <rect x="0" y="0" rx="3" ry="3" width="130" height="130" />
          </ContentLoader>
        </div>
        <div className={styles.skeleton}>
          <ContentLoader speed={2} width={270} height={550} viewBox="0 0 150 160" backgroundColor="#e0dced" foregroundColor="#ecebeb">
            <rect x="0" y="10" rx="3" ry="3" width="130" height="65" />
          </ContentLoader>
        </div>
        <div className={styles.skeleton}>
          <ContentLoader speed={2} width={270} height={550} viewBox="0 0 150 160" backgroundColor="#cccccc" foregroundColor="#ecebeb">
            <rect x="7" y="95" rx="3" ry="3" width="115" height="8" />
            <rect x="15" y="115" rx="3" ry="3" width="100" height="8" />
            <rect x="15" y="135" rx="3" ry="3" width="100" height="8" />
          </ContentLoader>
        </div>
        <div style={{ position: 'absolute', zIndex: 20, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {/* <SimpleLoader style={{ width: '100px', height: '100px' }} /> */}
        </div>
      </>
    )
  return (
    <>
      <div className={styles.container}>
        <Input role="search-input" name="" type="search" value={nameCourses} onChange={filterData} placeholder="Поиск по курсам">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
        {/* <div className={styles.course_all}>
                <ToggleButtonDropDown isOpen={isVisible} nameOfItems={'курсы'} handleToggleHiddenBlocks={handleVisible} />
            </div> */}
        <AnimatePresence>
          {
            <motion.div
              className={styles.course}
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
            >
              {courses && courses?.results.length ? (
                foundCourses?.map((course: any) => <CoursesCard key={course?.course_id} course={course} role={role} />)
              ) : (
                <></>
              )}
              {role !== RoleE.Student && (
                <button type="button" onClick={dispatchHandlerModal} className={styles.course_card}>
                  <span className={styles.course_addCourse}>
                    <span>Создать курс</span>
                  </span>
                </button>
              )}
            </motion.div>
          }
        </AnimatePresence>
            {isOpenAddCourse ? (
                <Portal closeModal={onToggle}>
                    <AddCourseModal courses={courses?.results} setShowModal={onToggle}/>
                </Portal>
            ) : null}
      </div>
    </>

  )
}
