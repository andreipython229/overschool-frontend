import React, { useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { MobileLoginModal } from 'components/Modal'

import styles from './mobileInitPage.module.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from '../../enum/pathE'
import { ManageSearch, Menu } from '@mui/icons-material'
import { logoHeaderLogin } from 'assets/img/common'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { logoutState } from 'store/redux/users/slice'

export const MobileInitPage = () => {
  // const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const { auth } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const showLoginModal = () => {
    navigate(generatePath(Path.LoginPage))
  }
  const handleTariffPage = () => {
    navigate(generatePath(Path.TariffPlansInfo))
  }

  const handleHelpPage = () => {
    navigate(generatePath(Path.HelpPage))
  }

  return (
    <div className={styles.container}>
      {/* {openLoginModal && <MobileLoginModal setShowModal={showLoginModal} />} */}
      {/* <Button
        style={{ position: 'absolute', top: '2rem', right: '0', color: 'white', display: 'flex', alignItems: 'center', gap: '2px' }}
        onClick={() => navigate(Path.Catalog)}
        variant={'logIn'}
        text={''}
      >
        <p>Каталог справочных материалов</p>
        <ManageSearch />
      </Button> */}
      <div className={styles.container_blur} />
      <div className={styles.initPage}>
        <h1 style={{ textAlign: 'center', fontFamily: 'SFPRORegular' }}>Добро пожаловать на платформу CourseHub!</h1>
        <img src={logoHeaderLogin} className={styles.initPage_logo} alt="logo" />
        <div className={styles.initPage_text}>
          {/* <p>
            Мы рады приветствовать вас на нашей платформе! Здесь вы можете найти множество актуальных справочных материалов из области
            программирования и дизайна! Мы стремимся сделать процесс изучения материалов доступным и легким для всех. Наша платформа предоставляет вам
            возможность ознакомиться с материалами по дизайну и программированию и начать свой успешный путь в IT-индустрии. Не важно, являетесь ли вы
            новичком в программировании или опытным специалистом, наша платформа предоставляет вам все необходимые инструменты и ресурсы для развития
            ваших навыков и создания впечатляющих проектов. Мы приглашаем вас присоединиться к IT OVERONE и, пользуясь функционалом нашей платформы,
            начать свое увлекательное путешествие в мир программирования и дизайна. Давайте вместе создавать будущее в IT-индустрии!
          </p> */}

          <Button onClick={showLoginModal} variant={'newPrimary'} text={auth ? 'К выбору платформы' : 'Авторизация'} />
          {auth && <Button onClick={() => dispatch(logoutState())} variant={'newLogIn'} text={'Выйти из аккаунта'} />}
          {/* <a className={styles.help} href="/help">
            Помощь
          </a> */}
          {/* <Button
            onClick={handleTariffPage}
            variant={'logIn'}
            text={'Тарифы'}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '16px',
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}
