import { FC, memo, useState } from 'react'

import { MobileCourseBlock } from '@/MobilePages/MobileCoursesPage/MobileCourseBlock/MobileCourseBlock'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { Input } from '../../components/common/Input/Input/Input'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { searchIconPath } from '../../config/commonSvgIconsPath'
import { useDebouncedFilter } from '../../customHooks'
import { CoursesDataT } from '../../types/CoursesT'

import styles from './mobileCoursesPage.module.scss'

import { motion } from 'framer-motion'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

export const MobileCoursesPage: FC = memo(() => {
  const { schoolName } = useAppSelector(schoolSelector)
  const [page, setPage] = useState<number>(1)
  const { data: coursesList } = useFetchCoursesQuery({ schoolName, page })

  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(coursesList?.results as CoursesDataT[], 'name')

  return (
    <motion.div
      initial={{
        x: -2000,
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
      }}
      className={styles.container}
    >
      <div className={styles.container_search}>
        <Input name="" type="search" value={term} onChange={handleChangeTerm} placeholder="Поиск по курсам и категориям">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
      </div>

      <span className={styles.container_title}>Мои курсы</span>
      <div className={styles.course}>
        {coursesList &&
          filteredData?.map((course: any) => (
            <MobileCourseBlock
              id={course?.course_id}
              key={course?.course_id}
              name={course?.name}
              img={course?.photo}
              progress={'58'}
              desc={course?.description}
            />
          ))}
      </div>
    </motion.div>
  )
})
