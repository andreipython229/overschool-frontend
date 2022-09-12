import  { ChangeEvent, FC } from 'react'

import { IconSvg } from '../../../../../components/common/IconSvg/IconSvg'
import { publishedMarkerSvgIcon } from '../../../../../constants/iconSvgConstants'
import { usePatchCoursesMutation } from '../../../../../api/coursesServices'
import { CoursesT } from '../../../../../types/CoursesT'

import styles from './setting_course.module.scss'

type CardImageDownloadsT = {
  toggleCheckbox: boolean
  courseFind: CoursesT
}

export const CardImageUpload: FC<CardImageDownloadsT> = ({ toggleCheckbox, courseFind }) => {
  const [updateImg] = usePatchCoursesMutation()

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const files = event.target.files
      const formdata = new FormData()
      formdata.append('photo', files[0])
      if (courseFind) {
        const id = courseFind?.course_id
        updateImg({ formdata, id })
      }
    }
  }

  return (
    <div className={`${styles.card_image_downloads} `}>
      <label className={styles.block_download_image}>
        <img src={courseFind?.photo_url || ''} alt="" />
        <input className={styles.hide_input} type="file" onChange={handleUploadFile} />
      </label>
      {toggleCheckbox ? (
        <p className={styles.text_block}>
          <IconSvg width={18} height={16} fill="#E0DCED" d={publishedMarkerSvgIcon.published} />
          опубликовано
        </p>
      ) : (
        <p className={styles.text_block}>
          <IconSvg width={18} height={16} fill="#E0DCED" d={publishedMarkerSvgIcon.noPublished} />
          не опубликовано
        </p>
      )}
      <p className={styles.text_name}>{courseFind?.name}</p>
    </div>
  )
}
