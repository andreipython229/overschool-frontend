import React, { useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { MobileLoginModal } from 'components/Modal'

import styles from './mobileInitPage.module.scss'

export const MobileInitPage = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)

  const showLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }

  return (
    <div className={styles.container}>
      {openLoginModal && <MobileLoginModal setShowModal={showLoginModal} />}
      <div className={styles.container_blur} />
      <div className={styles.initPage}>
        <h1 style={{ textAlign: 'center' }}>Первая белорусская платформа для онлайн школ</h1>
        <div className={styles.initPage_footer}>
          <div className={styles.initPage_footer_text}>
            <p>
              Освой самую
              <span className={styles.initPage_footer_text_rose}> перспективную профессию</span> за несколько месяцев
            </p>
          </div>

          <Button onClick={showLoginModal} variant={'primary'} text={'Вперед'} />
        </div>
      </div>
    </div>
  )
}
