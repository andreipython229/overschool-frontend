import { FC } from 'react'

import { Button } from '../../common/Button/Button'
import { useFetchProfileDataQuery } from 'api/profileService'
import { useLogoutMutation } from '../../../api/userLoginService'
import { useAppDispatch } from 'store/hooks'
import { auth } from '../../../store/redux/users/slice'
import { useAppSelector } from 'store/hooks/index'
import { userIdSelector } from 'selectors/index'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../previou.module.scss'

export const StudentPrevious: FC = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(userIdSelector)

  const { data } = useFetchProfileDataQuery(userId)
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    dispatch(auth(false))
    logout()
  }

  return (
    <div className={styles.previous}>
      <div className={styles.previous_infoBlock}>
        <img className={styles.previous_infoBlock_avatar} src={window.appConfig.imagePath + data?.avatar_url} alt="" />
        <div className={styles.previous_infoBlock_title}>
          <p className={styles.previous_infoBlock_title_about}>{`${data?.user?.last_name || 'Без'} ${data?.user?.first_name || 'Имени'} `}</p>
        </div>
      </div>
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
