import { FC, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { CoursesCard } from './CoursesCard'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { searchIconPath } from 'config/commonSvgIconsPath'
import { schoolSelector, selectUser } from 'selectors'
import { useLazyFetchCoursesPageQuery } from 'api/coursesServices'

import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'
import ContentLoader from 'react-content-loader'

import { motion, AnimatePresence } from 'framer-motion'

export const Materials: FC = () => {
  const { role } = useAppSelector(selectUser)
  const { schoolId, schoolName } = useAppSelector(schoolSelector)
  const [fetchData, { data: courses, isSuccess }] = useLazyFetchCoursesPageQuery()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (schoolName === window.location.href.split('/')[4]) {
      fetchData(schoolName)
    } else {
      fetchData(schoolName)
    }
  }, [schoolId])

  const filteredCourses = courses?.results.filter((course: any) => {
    return course.name.toLowerCase().includes(search.toLowerCase())
  })

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
        <div style={{ position: 'absolute', zIndex: 20, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      </>
    )
  return (
    <>
      <div className={styles.container}>
        <Input
          role="search-input"
          name=""
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Поиск по материалам"
        >
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
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
              {courses && filteredCourses && filteredCourses?.length !== 0 ? (
                filteredCourses?.map((course: any) => <CoursesCard key={course?.course_id} course={course} role={role} />)
              ) : (
                <>
                  <div className={styles.search}>
                    <p color="gray">По результатам поиска ничего не найдено...</p>
                  </div>
                </>
              )}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  )
}
