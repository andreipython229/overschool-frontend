import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../common/Button/Button'
import { useLazyLogoutQuery } from '../../../api/userLoginService'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { auth, logoutState } from '../../../store/redux/users/slice'

import styles from '../previou.module.scss'
import { Path } from '../../../enum/pathE'
import { selectUserProfile } from 'selectors'
import { clearUserProfile } from 'store/redux/users/profileSlice'

export const StudentPrevious: FC = () => {
  const dispatch = useAppDispatch()
  const { userProfile: profileData } = useAppSelector(selectUserProfile)

  const [logout] = useLazyLogoutQuery()

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(logoutState())
        dispatch(clearUserProfile())
      })
  }

  return (
    <div className={styles.previous}>
      <div className={styles.previous_infoBlock}>
        <img className={styles.previous_infoBlock_avatar} src={profileData?.avatar} alt="" />
        <div className={styles.previous_infoBlock_title}>
          <p className={styles.previous_infoBlock_title_about}>
            {!profileData?.last_name && !profileData?.first_name ? 'Без Имени' : `${profileData?.last_name} ${profileData?.first_name}`}
          </p>
        </div>
      </div>
      <Link to={Path.Rating}>
        <div className={styles.previous_btn_rate}>
          <Button
            variant="primary"
            style={{
              width: '148px',
              fontSize: '12px',
              fontWeight: '500',
            }}
            text={'Рейтинг учеников'}
          />
        </div>
      </Link>
      <div className={styles.previous_btn}>
        <Button
          variant="delete"
          onClick={handleLogout}
          style={{
            width: '148px',
            fontSize: '12px',
            fontWeight: '500',
          }}
          text={'Выйти из профиля'}
        />
      </div>
    </div>
  )
}
