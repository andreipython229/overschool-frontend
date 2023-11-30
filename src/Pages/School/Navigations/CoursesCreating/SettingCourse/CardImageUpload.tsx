import { ChangeEvent, FC, useEffect, useState } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { usePatchCoursesMutation } from 'api/coursesServices'
import { CoursesDataT } from 'types/CoursesT'
import { publishedIconPath, noPublishedIconPath } from '../../../config/svgIconsPath'

import styles from './setting_course.module.scss'
import { SimpleLoader } from '../../../../../components/Loaders/SimpleLoader'

type CardImageDownloadsT = {
  toggleCheckbox: boolean
  courseFind: CoursesDataT
}

export const CardImageUpload: FC<CardImageDownloadsT> = ({ toggleCheckbox, courseFind }) => {
  const [courseImage, setCourseImage] = useState<string>(String(courseFind?.photo))
  const [updateImg, { isSuccess, isLoading }] = usePatchCoursesMutation()

  const handleImageChange = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = event => {
      const files = (event.target as HTMLInputElement).files
      if (courseFind && courseFind.order && courseFind.school && files) {
        const formData = new FormData()
        formData.append('photo', files[0])
        formData.append('order', courseFind.order.toString())
        formData.append('school', courseFind.school.toString())
        updateImg({ formdata: formData, id: courseFind.course_id })
          .unwrap()
          .then(data => {
            if ('photo' in data && data.photo) {
              setCourseImage(String(data.photo))
            }
          })
      }
    }
    fileInput.click()
  }

  return (
    <div className={styles.card_image_downloads}>
      {!isLoading ? (
        <label className={styles.block_download_image}>
          {courseImage ? (
            <img src={courseImage} alt={courseFind.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} onClick={handleImageChange}/>
          ) : (
            <div className={styles.no_image}>
              <span onClick={handleImageChange}>Нет изображения курса :(</span>
            </div>
          )}
        </label>
      ) : (
        <label className={styles.block_download_image}>
          <SimpleLoader style={{ width: '100%', height: '100%' }} />
        </label>
      )}
      {toggleCheckbox ? (
        <p className={styles.text_block}>
          <IconSvg width={18} height={16} path={publishedIconPath} />
          опубликовано
        </p>
      ) : (
        <p className={styles.text_block}>
          <IconSvg width={18} height={16} path={noPublishedIconPath} />
          не опубликовано
        </p>
      )}
      <p className={styles.text_name}>{courseFind?.name}</p>
    </div>
  )
}
