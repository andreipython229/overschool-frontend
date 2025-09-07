import React, { ChangeEvent, useState, useEffect } from 'react'
import { CardPropsT } from '../types/audienceBlockT'
import styles from './purposeOfTrainingBlockCard.module.scss'
import { TextareaAutosize, Avatar } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { changeBlocks, addFile } from 'store/redux/landing/constructorSlice'

export const PurposeOfTrainingBlockCard: React.FC<CardPropsT> = ({ position, onDelete }) => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  const [titleValue, setTitleValue] = useState<string>(landing.trainingPurpose.chips[position].title)
  const [descriptionValue, setDescriptionValue] = useState<string>(landing.trainingPurpose.chips[position].description)

  const [cardImage, setCardImage] = useState<string>(landing.trainingPurpose.chips[position].photo)
  const [imgError, setImgError] = useState<string>('')

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
          setCardImage(url)
          // сохраняем файл в redux для последующей отправки в составе формы
          dispatch(
            addFile({
              key: `photo_trainingPurpose_${position}`,
              file: files[0],
            }),
          )

          // сохраняем временнную ссылку на файл в redux
          const chips = landing.trainingPurpose.chips.map(item => {
            if (item.position === position) {
              return { ...item, photo: url }
            }
            return item
          })

          // формируем новый объект Лендинга
          const lndng = {
            ...landing,
            trainingPurpose: {
              ...landing.trainingPurpose,
              chips: chips,
            },
          }
          dispatch(changeBlocks(lndng))
        } else {
          setImgError('Размер файла не должен превышать 7 МБ')
        }
      }
    }
    fileInput.click()
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitleValue(event.target.value)

    const chips = landing.trainingPurpose.chips.map(item => {
      if (item.position === position) {
        return { ...item, title: event.target.value }
      }
      return item
    })

    const lndng = {
      ...landing,
      trainingPurpose: {
        ...landing.trainingPurpose,
        chips: chips,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value)

    const chips = landing.trainingPurpose.chips.map(item => {
      if (item.position === position) {
        return { ...item, description: event.target.value }
      }
      return item
    })

    const lndng = {
      ...landing,
      trainingPurpose: {
        ...landing.trainingPurpose,
        chips: chips,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_imageBox} onClick={handleImageChange}>
        {/* <Avatar
          alt="Overschool"
          src={cardImage}
          sx={{width: 100, height: 100}}
        /> */}
        <img src={cardImage} alt={cardImage} width={100} height={100} />
        {imgError && <p className={styles.wrapper_imageBox_error}>{imgError}</p>}
      </div>
      {/* <div className={styles.wrapper_title}>
        <TextareaAutosize
          value={titleValue}
          onChange={handleChangeTitle}
          placeholder="Заголовок карточки"
        />
      </div> */}
      <div className={styles.wrapper_description}>
        <TextareaAutosize value={descriptionValue} onChange={handleChangeDescription} placeholder="Добавьте описание, если необходимо..." />
      </div>
      <button onClick={onDelete}>
        <DeleteForever fontSize="medium" />
      </button>
    </div>
  )
}
