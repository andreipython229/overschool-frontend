import { FC, useEffect, useState } from 'react'

import { BasicSettings } from './BasicSettings'
import { CardImageUpload } from './CardImageUpload'
import { useBoolean } from 'customHooks/useBoolean'
import { useParams } from 'react-router-dom'
import { useFetchCourseQuery } from 'api/coursesServices'
import styles from './setting_course.module.scss'

export const SettingCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const school = window.location.href.split('/')[4]
  const { data: course, refetch } = useFetchCourseQuery({ id: courseId as string, schoolName: school })
  const booleanValue = course?.public === "О"
  const [isPublished, setIsPublished] = useState<boolean>(booleanValue)
  const [isCatalog, { onToggle: toggleCatalog }] = useBoolean(course?.is_catalog)
  const [isDirect, { onToggle: toggleDirect }] = useBoolean(course?.is_direct)

  const handlePublished = () => {
    isPublished && isCatalog && toggleCatalog()
    isPublished && isDirect && toggleDirect()
    setIsPublished(!isPublished)
  }

  return (
    <div className={styles.container}>
      {course && <CardImageUpload toggleCheckbox={isPublished} courseFind={course} />}
      <div className={styles.container_right}>
        {course && <BasicSettings refetch={refetch} courseFind={course} toggleCheckbox={isPublished} toggleCheckboxPublished={handlePublished} isCatalog={isCatalog} toggleCatalog={toggleCatalog} isDirect={isDirect} toggleDirect={toggleDirect}/>}
      </div>
    </div>
  )
}
