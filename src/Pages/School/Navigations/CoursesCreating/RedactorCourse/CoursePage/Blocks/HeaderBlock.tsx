import React, {FC, useState, useEffect} from 'react';
import styles from './styles/headerBlock.module.scss'
import {Button} from "components/common/Button/Button";

import { HeaderBlockT } from "../types/blocksControllerT"
import {useAppDispatch, useAppSelector} from "store/hooks";
import {useSendLandingImagesMutation} from 'api/courseLandingServices'
import {useParams} from "react-router-dom";
import {addFile, changeBlocks} from "store/redux/landing/constructorSlice";

export const HeaderBlock:FC<HeaderBlockT> = ({openModal}) => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  const [courseImage, setCourseImage] = useState<string>(landing.header.photoBackground)
  // const [sendImage, {data: f_landing, isLoading}] = useSendLandingImagesMutation()
  const [imgError, setImgError] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]

  // useEffect(() => {
  //   if(f_landing) {
  //     setCourseImage(String(f_landing.header.photoBackground))
  //     dispatch(changeBlocks(f_landing))
  //   }
  // }, [f_landing, ])

  const handleImageChange = () => {
    setImgError('')
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = event => {
      const files = (event.target as HTMLInputElement).files
      if (files) {
        if (files[0].size <= 7 * 1024 * 1024) {
          const url = URL.createObjectURL(files[0])
          setCourseImage(url)
          // сохраняем файл в redux для последующей отправки в составе формы
          dispatch(addFile({
            key:`photo_background`,
            file: files[0]
          }))

          // формируем новый объект Лендинга
          const lndng = {
            ...landing,
            header: {
              ...landing.header,
              photoBackground: url
            }
          }
          // сохраняем временнную ссылку на файл в redux
          dispatch(changeBlocks(lndng));
        } else {
          setImgError('Размер файла не должен превышать 7 МБ')
        }
      }
    }
    fileInput.click()
  }

  return (
    <div className={styles.previous}>
      <div className={styles.background_image_course}>
        <img src={courseImage} alt={landing.header.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} onClick={handleImageChange}/>
      </div>
      {/*<div className={styles.previous_bcgrShadow}></div>*/}
      <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
      <div className={styles.previous_title_name}>{landing.header.name}</div>
      <div className={styles.previous_buttonAccept}>
        <Button variant="primary" onClick={openModal} text="Оставить заявку"/>
      </div>
    </div>
  );
};