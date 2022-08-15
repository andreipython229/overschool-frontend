import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks'
import { nameCourseSelector } from '../../../../../../selectors'
import { IconSvg } from '../../../../../../components/common/IconSvg/IconSvg'
import { publishedMarkerSvgIcon } from '../../../../../../constants/iconSvgConstants'

import styles from './../setting_course.module.scss'
import { useCreateCoursesMutation } from '../../../../../../api/getAllCoursesService'

type CardImageDownloadsT = {
  toggleCheckbox: boolean
}

export const CardImageUpload: FC<CardImageDownloadsT> = ({ toggleCheckbox }) => {
  const dispatch = useAppDispatch()
  const { name } = useAppSelector(nameCourseSelector)
  const [createCourses, { data }] = useCreateCoursesMutation()
  const handleUploadFile = (event: any): void => {
    if (event.target.files) {
      const files = event.target?.files
      const formdata = new FormData()
      formdata.append('photo', files[0])

      createCourses(formdata)
      // dispatch(uploadImgCourse('photo_url'))
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
      <p className={styles.text_name}>{name}</p>
    </div>
  )
}
