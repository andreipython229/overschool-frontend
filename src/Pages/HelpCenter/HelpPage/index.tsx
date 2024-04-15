import {FC, memo, useState } from 'react'
import { Button } from '../../../components/common/Button/Button'
import { Input } from '../../../components/common/Input/Input/Input'
import { CardActionArea } from '@mui/material'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import frame from '../../../assets/img/createProject/frame.png'
import { headerUserRoleName } from '../../../config/headerUserRoleName'
import { useAppSelector } from '../../../store/hooks'
import {selectUser} from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import {logo} from "../../../assets/img/common";

import styles from './HelpPage.module.scss'

export const HelpPage: FC = memo(() => {
  const {role} = useAppSelector(selectUser)
  const navigate = useNavigate()

  const handleLoginPage = () => {
      navigate(generatePath(Path.LoginPage))
  }

  const handleRegistrationUser = () => {
      navigate(generatePath(Path.CreateSchool))
  }

  return (
    <>
    <section className={styles.HelpCenterPage}>
        <div className={styles.init_header}>
           <a
              href={Path.InitialPage}
              className={styles.init_header_logo}
              style={{
                 textDecoration: 'none',
                 color: '#ba75ff',
                 fontWeight: 'bold',
                 padding: '0.5rem',
                 borderRadius: '10px',
              }}
            >
               <img src={logo} alt="Logotype ITOVERONE" />
               <p> IT OVERONE</p>
            </a>
            <div className={styles.header_block}>
               <Button onClick={handleLoginPage} variant={'logIn'} style={{ fontSize: '20px', fontWeight: '700' }} text={'Войти'} />
               <Button onClick={handleRegistrationUser} variant={'logIn'} style={{ fontSize: '20px', fontWeight: '700' }} text={'Создать платформу'} />
            </div>
        </div>
        <img src={frame} alt="asdfhghhgh" style={{ width: "100%", height: "auto" }} />
        <div className={styles.HelpCenterPage_quickStart}>
          <h1>Начало работы</h1>
          <div className={styles.HelpCenterPage_quickStart_cardGroup}>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage+'school'))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                   <h3>Гид по началу работ</h3>
                   <p>Не знаете с чего начать? Начните с нашего гида по началу работы на OVERSCHOOL</p>
                </div>
              </CardActionArea>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage + 'courses'))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                   <h3>Как создать курс</h3>
                   <p>Пошаговая инструкция по созданию и настройке курсов на платформе</p>
                </div>
              </CardActionArea>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage + 'overai'))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                   <h3>OVERAI</h3>
                   <p>Искусственный интеллект на платформе, используемый для улучшения качества и доступности образования</p>
                </div>
              </CardActionArea>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage + 'school-settings'))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                   <h3>Настройки платформы </h3>
                   <p>Инструкция по настройкам платформы, управление сотрудниками, оплата курсов </p>
                </div>
              </CardActionArea>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage + 'user-account'))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                    <h3>Как настроить аккаунт </h3>
                   <p>Пошаговая инструкция по настройке аккаунт пользователя</p>
                </div>
              </CardActionArea>
            </div>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage + Path.HelpChat))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                    <h3>Как создать чат </h3>
                   <p>Инструкция по созданию чатов с учениками школы</p>
                </div>
              </CardActionArea>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <CardActionArea style={{ width: "100%", height: "100%" }} onClick={() => navigate(generatePath(Path.HelpPage + 'check-hw'))}>
                <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                    <h3>Проверка домашних заданий </h3>
                   <p>Инструкция по проверке домашних заданий на платформе</p>
                </div>
              </CardActionArea>
            </div>
          </div>

      </div>
      <div className={styles.HelpCenterPage_FAQ}>
        <h1>Часто задаваемые вопросы</h1>
        <h2>Как оплатить подписку со счета организации?</h2>
        <p>
          Для этого пришлите нам на почту support@overschool.by реквизиты для выставления счета, а также укажите желаемый тариф и период
          подключения. Мы сформируем и пришлем Вам счет для оплаты. Как только деньги поступят на счет, мы активируем Ваш тариф.
        </p>
        <h2>Что произойдет, когда оплаченный период закончится?</h2>
        <p>
          Вам и сотрудникам онлайн-школы будет ограничен доступ к использованию функционала. Для Ваших учеников доступ будет закрыт только через
          24 часа после окончания подписки - мы сделали это на случай, если Вы забудете вовремя продлить тариф. Все загруженные на платформу
          материалы сохранятся в полном порядке. При продлении подписки все доступы моментально откроются.
        </p>
        <h2>Можно ли будет поменять тариф?</h2>
        <p>
          Да, можно. Для этого даже не обязательно ждать окончания оплаченного периода: просто подключите нужный тариф и оставшиеся дни подписки
          автоматически пересчитаются по стоимости нового тарифа.
        </p>
        <h2>Бесплатный тариф “Intern” действительно бессрочный?</h2>
        <p>Верно, данный тариф доступен для использования без ограничений по времени.
        Его не нужно продлевать или активировать заново.</p>
      </div>
      <div className={styles.HelpCenterPage_banner}>
        <div className={styles.HelpCenterPage_banner_createProject}>
          <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
          <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
          <Button onClick={handleRegistrationUser} variant={'primary'} text={'Создать проект'} style={{ width: '160px', fontSize: "16px", marginLeft: "5px"}}/>
        </div>
        <div className={styles.HelpCenterPage_banner_images}>
          <img src={firstStep} alt="Создать проект" className={styles.HelpCenterPage_banner_images_firstStep} />
          <img src={secondStep} alt="Создать проект" className={styles.HelpCenterPage_banner_images_secondStep} />
        </div>
      </div>
    </section>
    </>
  )
})
