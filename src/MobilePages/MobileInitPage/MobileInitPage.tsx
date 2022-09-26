import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Student } from '../../enum/pathE'
import { Button } from 'components/common/Button/Button'
import { LoginModal } from 'components/Modal'

import styles from './mobileInitPage.module.scss'

export const MobileInitPage = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const showLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }

  return (
    <div className={styles.container}>
      {openLoginModal && <LoginModal setShowModal={showLoginModal} />}
      <div className={styles.container_blur} />
      <div className={styles.initPage}>
        <h1>Маркетплейс образовательных курсов</h1>
        <div className={styles.initPage_footer}>
          <div className={styles.initPage_footer_text}>
            <p>
              Освой самую
              <span className={styles.initPage_footer_text_rose}> перспективную профессию</span> в IT за несколько месяцев
            </p>
          </div>

          <Button
            onClick={() => {
              navigate(Student.Courses)
              showLoginModal()
            }}
            style={{ width: '272px' }}
            variant={'primary'}
            text={'Вперед'}
          />
        </div>
      </div>
    </div>
  )
}
