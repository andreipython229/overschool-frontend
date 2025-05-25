import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import styles from './styles/headerBlock.module.scss'
import {Button} from "components/common/Button/Button";

import { HeaderBlockT } from "../types/blocksControllerT"
import {useAppDispatch, useAppSelector} from "store/hooks";
import {addFile, changeBlocks} from "store/redux/landing/constructorSlice";
import {TextareaAutosize} from "@mui/material";

export const HeaderBlock:FC<HeaderBlockT> = ({openModal}) => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  const [titleValue, setTitleValue] = useState<string>(landing.header.name);
  const [descriptionValue, setDescriptionValue] = useState<string>(landing.header.description);
  const [courseImage, setCourseImage] = useState<string>(landing.header.photoBackground)
  const [imgError, setImgError] = useState<string>('')

  // перерендерим шапку, в случае подброса устаревших значений из кэша
  useEffect(()=> {
    if (titleValue !== landing.header.name) setTitleValue(landing.header.name)
    if (descriptionValue !== landing.header.description) setDescriptionValue(landing.header.description)
    if (courseImage !== landing.header.photoBackground) setCourseImage(landing.header.photoBackground)
  }, [landing,])

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

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)

    dispatch(changeBlocks({
      ...landing,
      header: {
        ...landing.header,
        name: event.target.value
      }
    }));
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value)

    dispatch(changeBlocks({
      ...landing,
      header: {
        ...landing.header,
        description: event.target.value
      }
    }));
  };

  return (
    <div className={styles.previous}>
      <div className={styles.background_image_course}>
        <img src={courseImage}
             alt={landing.header.name}
             style={{objectFit: 'cover', width: '100%', height: '100%'}}
             onClick={handleImageChange}/>
        {imgError && <p className={styles.background_image_course_error}>{imgError}</p>}
      </div>
      <div className={styles.previous_bcgrShadow}
           onClick={handleImageChange}>
      </div>
      <div className={styles.previous_onlineCourses}>
        <input
          type="text"
          maxLength={256}
          value={titleValue}
          onChange={handleChangeTitle}
          placeholder="Название курса"
        />
      </div>
      <div className={styles.previous_title_name}>
        <TextareaAutosize
          value={descriptionValue}
          onChange={handleChangeDescription}
          placeholder="Добавьте описание, если необходимо..."
          maxRows={5}
          maxLength={150}
        />
      </div>
      <div className={styles.previous_buttonAccept}>
        <Button variant="newPrimary" onClick={openModal} text="Оставить заявку"/>
      </div>
    </div>
  );
};