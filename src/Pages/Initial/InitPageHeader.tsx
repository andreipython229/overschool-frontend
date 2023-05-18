import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { authSelector } from 'selectors'
import { InitPageHeaderPT } from '../../types/pageTypes'
import { logo } from '../../assets/img/common/index'
import { selectUser } from 'selectors/index'
import { RoleE } from 'enum/roleE'

import styles from './initial.module.scss'

export const InitPageHeader: FC<InitPageHeaderPT> = memo(({ setLoginShow, setRegistrationShow }) => {
  const isLogin = useAppSelector(authSelector)
  const { role: userRole } = useAppSelector(selectUser)

  const handleLoginUser = () => {
    setLoginShow(true)
  }

  return (
    <header className={styles.init_header}>
      <img src={logo} alt="Logotype ITOVERONE" />
      <div className={styles.btn_block}>
        {isLogin ? (
          <Link className={styles.btn_block_logIn} to={`${userRole === RoleE.SuperAdmin ? Path.Settings : Path.Courses}`}>
            Аккаунт
          </Link>
        ) : (
          <>
            <Button variant={'logIn'} onClick={handleLoginUser} text={'Войти'} />
            <Button disabled onClick={() => setRegistrationShow(true)} variant={'registrationDisabled'} text={'Зарегистрироваться'} />
          </>
        )}
      </div>
    </header>
  )
})
