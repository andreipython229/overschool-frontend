import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { authSelector } from 'selectors'
import { InitPageHeaderPT } from '../CoursesStats/coursesStatsTypes'
import { logo } from '../../assets/img/common/index'

import styles from './initial.module.scss'
import { role } from 'store/redux/users/slice'

export const InitPageHeader: FC<InitPageHeaderPT> = memo(({ setLoginShow, setRegistrationShow }) => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(authSelector)

  const handleLoginUser = () => {
    setLoginShow(true)
    dispatch(showModal(true))
  }

  const handleLoginStudent = () => {
    setLoginShow(true)
    dispatch(role(5))
    dispatch(showModal(true))
  }

  return (
    <div>
      <div className={styles.init_header}>
        <img src={logo} alt="Logotype ITOVERONE" />
        <div className={styles.btn_block}>
          {isLogin ? (
            <Link className={styles.btn_block_logIn} to={`${Path.Courses}`}>
              Аккаунт
            </Link>
          ) : (
            <>
              <Button variant={'logIn'} onClick={handleLoginUser} text={'Войти'} />
              <Button variant={'logIn'} onClick={handleLoginStudent} text={'Войти от имени студента'} />
              <Button disabled onClick={() => setRegistrationShow(true)} variant={'primary'} text={'Зарегистрироваться'} />
            </>
          )}
        </div>
      </div>
    </div>
  )
})
