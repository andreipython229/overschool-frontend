import React, { useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { MobileLoginModal } from 'components/Modal'

import styles from './mobileInitPage.module.scss'
import {generatePath, useNavigate} from "react-router-dom";
import {Path} from "../../enum/pathE";

export const MobileInitPage = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const navigate = useNavigate()

  const showLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleTariffPage = () => {
    navigate(generatePath(Path.TariffPlansInfo))
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
          <Button
              onClick={handleTariffPage}
              variant={'logIn'}
              text={'Тарифы'}
              style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                color: 'white',
                fontSize: "16px"
              }}
          />
        </div>
      </div>
    </div>
  )
}
