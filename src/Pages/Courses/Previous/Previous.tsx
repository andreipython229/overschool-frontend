import React, { FC, memo, useCallback, useState } from 'react'
import styles from './previou.module.scss'
import { Button } from 'components/common/Button/Button'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'

type PreviousPropsT = {
  avatar: string
  description?: string
  name: string
  about?: string
  buttonText?: string
  onClick?: () => void
}

export const Previous: FC<PreviousPropsT> = memo(
  ({ avatar, name, about, description, onClick, buttonText }) => {
    const { pathname } = useLocation()
    const role = useAppSelector((state: any) => state.user.permission)
    const [edit, setEdit] = useState(false)
    const [newDescription, setNewDescription] = useState(description)
    const [newName, setNewName] = useState(name)

    const handleChangePrevious = () => {
      setEdit(!edit)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === 'description') {
        setNewDescription(event.target.value)
      } else {
        setNewName(event.target.value)
      }
    }

    return (
      <div className={styles.previous}>
        {edit && (
          <label className={styles.label_input_background_image}>
            <span>Изменить фон секции</span>
            <input
              className={styles.input_background_image}
              type="file"
              name="backgroundImage"
              value={''}
              onChange={handleChangeDescription}
            />
          </label>
        )}
        <div className={styles.previous_infoBlock}>
          {edit && (
            <input
              className={`${styles.previous_infoBlock_avatar} ${styles.input_change} ${styles.hide_input}`}
              name="avatar"
              type="file"
              value={''}
              onChange={handleChangeDescription}
            />
          )}
          <img
            className={styles.previous_infoBlock_avatar}
            src={avatar || ''}
            alt="Background Cover"
          />

          <div className={styles.previous_infoBlock_title}>
            {edit ? (
              <input
                className={`${styles.previous_infoBlock_title_description} ${styles.input_change}`}
                name="description"
                type="text"
                value={newDescription}
                onChange={handleChangeDescription}
              />
            ) : (
              <p className={styles.previous_infoBlock_title_description}>{newDescription} </p>
            )}
            {edit ? (
              <input
                className={`${styles.previous_infoBlock_title_name} ${styles.input_change}`}
                name="name"
                type="text"
                value={newName}
                onChange={handleChangeDescription}
              />
            ) : (
              <span className={styles.previous_infoBlock_title_name}>{newName}</span>
            )}
            <p className={styles.previous_infoBlock_title_about}>{about}</p>
          </div>
        </div>
        {role === 1 && pathname.includes('course') ? (
          <div className={styles.previous_btn}>
            {pathname.includes('create-course') ? (
              <Button
                variant={'primary'}
                style={{
                  width: '220px',
                  fontSize: '10px',
                  fontWeight: '800',
                }}
                text={'Опубликовать курс'}
                onClick={onClick}
              />
            ) : (
              <Button
                variant="primary"
                style={{
                  width: '220px',
                  fontSize: '10px',
                  fontWeight: '800',
                }}
                text={edit ? 'Завершить настройку  курсов' : 'Настроить страницу курсов'}
                onClick={handleChangePrevious}
              />
            )}
          </div>
        ) : null}
        {buttonText && (
          <div className={styles.previous_btn}>
            <Button
              variant={'primary'}
              style={{ width: '164px', fontSize: '12px', fontWeight: '800' }}
              text={buttonText}
              onClick={onClick}
            />
          </div>
        )}
      </div>
    )
  },
)
