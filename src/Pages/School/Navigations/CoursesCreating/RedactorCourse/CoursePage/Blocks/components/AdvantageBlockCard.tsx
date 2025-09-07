import { useAppDispatch, useAppSelector } from 'store/hooks'
import { CardPropsT } from '../types/audienceBlockT'
import styles from './AdvantageBlockCard.module.scss'
import { ChangeEvent, useState } from 'react'
import { changeBlocks, addFile } from 'store/redux/landing/constructorSlice'
import { TextareaAutosize } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'

export const AdvantageBlockCard: React.FC<CardPropsT> = ({ position, onDelete }) => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  const [titleValue, setTitleValue] = useState<string>(landing.advantage.chips[position].title)
  const [descriptionValue, setDescriptionValue] = useState<string>(landing.advantage.chips[position].description)

  const [cardImage, setCardImage] = useState<string>(landing.advantage.chips[position].photo)
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
              key: `photo_advantage_${position}`,
              file: files[0],
            }),
          )

          // сохраняем временнную ссылку на файл в redux
          const chips = landing.advantage.chips.map(item => {
            if (item.position === position) {
              return { ...item, photo: url }
            }
            return item
          })

          // формируем новый объект Лендинга
          const lndng = {
            ...landing,
            advantage: {
              ...landing.advantage,
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

    const chips = landing.advantage.chips.map(item => {
      if (item.position === position) {
        return { ...item, title: event.target.value }
      }
      return item
    })

    const lndng = {
      ...landing,
      advantage: {
        ...landing.advantage,
        chips: chips,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value)

    const chips = landing.advantage.chips.map(item => {
      if (item.position === position) {
        return { ...item, description: event.target.value }
      }
      return item
    })

    const lndng = {
      ...landing,
      advantage: {
        ...landing.advantage,
        chips: chips,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_imageBox} onClick={handleImageChange}>
        <img src={cardImage} alt={cardImage} width={100} height={100} onError={() => setImgError('Ошибка загрузки изображения')} />
        {imgError && <p className={styles.wrapper_imageBox_error}>{imgError}</p>}
      </div>
      <div className={styles.wrapper_text}>
        <div className={styles.wrapper_title}>
          <TextareaAutosize
            value={titleValue}
            onChange={handleChangeTitle}
            placeholder="Заголовок карточки"
            // maxRows={2}
            // maxLength={35}
          />
        </div>
        <div className={styles.wrapper_description}>
          <TextareaAutosize
            value={descriptionValue}
            onChange={handleChangeDescription}
            placeholder="Добавьте описание, если необходимо..."
            // maxRows={6}
            // maxLength={150}
          />
        </div>
      </div>
      <button onClick={onDelete}>
        <DeleteForever fontSize="medium" />
      </button>
    </div>
  )
}
