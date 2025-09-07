import { FC, memo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { Student } from '../../../enum/pathE'
import { lessonT } from '../../../types/sectionT'
import { lessonSvgMapper } from 'config/index'
import previewImage from 'components/VideoPlayer/assets/previewImage.png'
import styles from './exerciseItem.module.scss'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { middleStatus, successStatus, failStatus } from '../../../Pages/StudentCourse/config/svgIconPath'

type exerciseItemT = {
  lesson: lessonT
  sectionId: number
  disabled?: boolean
}

export const ExerciseImageItem: FC<exerciseItemT> = memo(({ lesson, sectionId, disabled }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (!disabled) {
      navigate(generatePath(Student.Lesson, { section_id: `${sectionId}`, lesson_type: `${lesson.type}`, lesson_id: `${lesson.id}` }))
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage} ${disabled ? styles.disabled : ''} ${disabled ? styles.inactive : ''}`}
    >
      <div className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_imageDiv}>
        {lesson.video_screenshot ? (
          <img
            className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_imageDiv_image}
            src={'data:image/png;base64,' + lesson.video_screenshot}
            alt=""
          />
        ) : (
          <img className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_imageDiv_image} src={previewImage} alt="" />
        )}
        {/*// : <div className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_imageDiv_image}> </div>}*/}
        <span className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_imageDiv_status}>
          {lesson.viewed && (
            <IconSvg
              width={21}
              height={21}
              viewBoxSize="0 0 30 30"
              path={lesson.type === 'lesson' || lesson.completed ? successStatus : lesson.sended ? middleStatus : failStatus}
            />
          )}
        </span>
      </div>
      <div className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_nameWrapper}>
        <span className={styles.accardionWrapper_component_exerciseWrapperImage_exerciseimage_nameWrapper_title}>{lesson.name}</span>
      </div>
    </div>
  )
})
