import React, { FC, memo } from 'react'
import styles from './previou.module.scss'
import { Button } from 'components/common/Button/Button'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/redux/store'

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
    const role = useAppSelector(state => state.user.permission)

    return (
      <div className={styles.previous}>
        <div className={styles.previous_infoBlock}>
          <img
            className={styles.previous_infoBlock_avatar}
            src={avatar || ''}
            alt="Background Cover"
          />
          <div className={styles.previous_infoBlock_title}>
            <p className={styles.previous_infoBlock_title_description}>{description}</p>
            <span className={styles.previous_infoBlock_title_name}>{name}</span>
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
                variant={'primary'}
                style={{
                  width: '220px',
                  fontSize: '10px',
                  fontWeight: '800',
                }}
                text={'Настроить страницу курсов'}
                onClick={onClick}
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
