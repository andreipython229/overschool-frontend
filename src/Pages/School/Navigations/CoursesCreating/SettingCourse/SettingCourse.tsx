import { FC, useEffect, useState } from 'react'

import { BasicSettings } from './BasicSettings'
import { CardImageUpload } from './CardImageUpload'
import { useBoolean } from 'customHooks/useBoolean'
import { useParams } from 'react-router-dom'
import { useFetchCourseQuery } from 'api/coursesServices'
import styles from './setting_course.module.scss'
import {RoleE} from "../../../../../enum/roleE";

export const SettingCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const school = window.location.href.split('/')[4]
  const { data: course, refetch } = useFetchCourseQuery({ id: courseId as string, schoolName: school })
  // const booleanValue = course?.public === "О"
  const [isPublished, setIsPublished] = useState<boolean>(false)
  const [isCatalog, setIsCatalog] = useState<boolean>(false)
  const [isDirect, setIsDirect] = useState<boolean>(false)

  useEffect(() => {
    if (course) {
      setIsPublished(course.public === "О")
      setIsCatalog(course.is_catalog)
      setIsDirect(course.is_direct)
    }
  }, [course])

  const handlePublished = () => {
    isPublished && setIsCatalog(false)
    isPublished && setIsDirect(false)
    setIsPublished(!isPublished)
  }

  return (
    <div className={styles.container}>
      {course && <CardImageUpload toggleCheckbox={isPublished} courseFind={course} />}
      <div className={styles.container_right}>
        <div className={styles.header_basic_settings}>
          <p>Основные настройки</p>
        </div>
        {course && <BasicSettings refetch={refetch} courseFind={course} toggleCheckbox={isPublished} toggleCheckboxPublished={handlePublished} isCatalog={isCatalog} toggleCatalog={() =>setIsCatalog(!isCatalog)} isDirect={isDirect} toggleDirect={() =>setIsDirect(!isDirect)}/>}
      </div>
    </div>
  )
}
