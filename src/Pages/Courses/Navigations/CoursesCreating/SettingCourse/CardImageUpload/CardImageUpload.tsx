import React, { FC } from 'react'
import { useAppDispatch } from '../../../../../../store/hooks'
import { IconSvg } from '../../../../../../components/common/IconSvg/IconSvg'
import { publishedMarkerSvgIcon } from '../../../../../../constants/iconSvgConstants'
import { useUpdateCoursesMutation } from '../../../../../../api/coursesServices'
import { CoursesT } from '../../../../../../store/redux/courses/slice'

import styles from './../setting_course.module.scss'

type CardImageDownloadsT = {
  toggleCheckbox: boolean
  courseFind: CoursesT | undefined
}

export const CardImageUpload: FC<CardImageDownloadsT> = ({ toggleCheckbox, courseFind }) => {
  const [update, { data }] = useUpdateCoursesMutation()

  const handleUploadFile = (event: any): void => {
    if (event.target.files) {
      const files = event.target?.files
      const formdata = new FormData()
      formdata.append('course_id', `${courseFind?.course_id}` || '')
      formdata.append('created_at', `${courseFind?.created_at}` || '')
      formdata.append('updated_at', `${courseFind?.updated_at}` || '')
      formdata.append('published', `${courseFind?.published}`)
      formdata.append('order', `${courseFind?.order}` || '')
      formdata.append('name', courseFind?.name || '')
      formdata.append('format', courseFind?.format || '')
      formdata.append('duration_days', `${courseFind?.duration_days}` || '')
      formdata.append('price', courseFind?.price || '')
      formdata.append('description', courseFind?.description || '')
      formdata.append('author_id', `${courseFind?.author_id}` || '')
      formdata.append('photo_url', files[0])
      formdata.append('photo', files[0])
      const id = courseFind?.course_id
      update({ formdata, id })
    }
  }

  return (
    <div className={`${styles.card_image_downloads} `}>
      <label className={styles.block_download_image}>
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
