import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import Logotype from '../../../assets/img/logotype.svg'
import { Button } from 'components/common/Button/Button'
import { useAppSelector } from '../../../store/hooks'
import { Path } from 'enum/pathE'

import styles from '../initialPage.module.scss'

type InitPageHeaderPT = {
  setLoginShow: (show: boolean) => void
  setRegistrationShow: (show: boolean) => void
}
export const InitPageHeader: FC<InitPageHeaderPT> = memo(
  ({ setLoginShow, setRegistrationShow }) => {
    const isLogin = useAppSelector<boolean>((state: any) => state.user?.auth)
    return (
      <div>
        <div className={styles.init_header}>
          <img src={Logotype} alt="Logotype ITOVERONE" />
          <div className={styles.btn_block}>
            {isLogin ? (
              <Link className={styles.btn_block_logIn} to={`${Path.Courses}`}>
                Аккаунт
              </Link>
            ) : (
              <>
                <Button variant={'logIn'} onClick={() => setLoginShow(true)} text={'Войти'} />
                <Button
                  onClick={() => setRegistrationShow(true)}
                  variant={'primary'}
                  text={'Зарегистрироваться'}
                />
              </>
            )}
          </div>
        </div>
      </div>
    )
  },
)
