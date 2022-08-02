import React, { useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { LoginModal } from 'components/Modal'
import { loginUser } from 'store/redux/users/slice'
import { useAppDispatch } from 'store/redux/store'

import styles from './mobileInitPage.module.scss'

export const MobileInitPage = () => {
  const dispatch = useAppDispatch()
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const showLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const logIn = (value: string | number) => {
    dispatch(loginUser({ value }))
  }
  return (
    <div className={styles.container}>
      {openLoginModal && <LoginModal setShowModal={showLoginModal} logIn={logIn} />}
      <div className={styles.container_blur} />
      <div className={styles.initPage}>
        <h1>Маркетплейс образовательных курсов</h1>
        <div className={styles.initPage_footer}>
          <div className={styles.initPage_footer_text}>
            <p>
              Освой самую
              <span className={styles.initPage_footer_text_rose}> перспективную профессию</span> в
              IT за несколько месяцев
            </p>
          </div>

          <Button
            style={{ width: '272px' }}
            variant={'primary'}
            text={'Вперед'}
            onClick={showLoginModal}
          />
        </div>
      </div>
    </div>
  )
}
