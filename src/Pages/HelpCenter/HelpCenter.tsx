import { useState } from 'react'

import { Button } from '../../components/common/Button/Button'
import { Input } from '../../components/common/Input/Input/Input'

import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'
import { headerUserRoleName } from '../../config/headerUserRoleName'
import { useAppSelector } from '../../store/hooks'
import {selectUser} from '../../selectors'

import styles from './HelpCenter.module.scss'


export const HelpCenter = () => {
  const {role} = useAppSelector(selectUser)
  return (
    <section className={styles.HelpCenterPage}>
      <div className={styles.HelpCenterPage_pageHeader}>
        <p>Более 100 инструкций и ответы на часто задаваемые вопросы</p>
        <h1>Справочный центр</h1>
        <div className={styles.HelpCenterPage_pageHeader_inputGroup}>
          <Input
            className={styles.HelpCenterPage_pageHeader_inputGroup_input}
            name=""
            type="search"
            value={''}
            onChange={() => console.log('заглушка')}
            placeholder="Введите запрос, который Вас интересует"
          ></Input>
          <Button text={'Поиск'} variant={'create'} />
        </div>
      </div>
      <div className={styles.HelpCenterPage_quickStart}>
        <h1>Начало работы</h1>

        {(headerUserRoleName[role] === 'Администратор' || headerUserRoleName[role] === 'Ментор') && (
          <div className={styles.HelpCenterPage_quickStart_cardGroup}>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Гид по началу работ</h3>
                <p>Не знаете с чего начать? Начните с нашего гида по началу работы на OVERSCHOOL</p>
              </div>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Как создать курс</h3>
                <p>Пошаговая инструкция по созданию и настройке курсов на платформе</p>
              </div>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Как провести вебинар</h3>
                <p>Детальная инструкция по проведению и настройке вебинаров на OVERSCHOOL</p>
              </div>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Как добавить пользователя платформы</h3>
                <p>Инструкция по всем способам: ручным и автоматическим</p>
              </div>
            </div>
          </div>
        )}

        {headerUserRoleName[role] === 'Ученик' && (
          <div className={styles.HelpCenterPage_quickStart_cardGroup}>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Гид по кабинету</h3>
                <p>
                  Не знаешь, как пользоваться личным кабинетом?
                  <br /> Кликай на блок и получай гайд
                </p>
              </div>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Не можешь войти?</h3>
                <p>Пошаговая инструкция по входу в личный профиль и его полной настройке</p>
              </div>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Не приходит письмо</h3>
                <p>Кликай сюда и ты узнаешь, что делать, если не приходит письмо на твою почту</p>
              </div>
            </div>
            <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
              <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                <h3>Как поменять номер</h3>
                <p>Ты узнаешь что делать, если необходимо привязать другой номер телефона</p>
              </div>
            </div>
          </div>
        )}

      </div>
      <div className={styles.HelpCenterPage_FAQ}>
        <h1>Часто задаваемые вопросы</h1>
        <h2>Бесплатный тариф действительно бессрочный?</h2>
        <p>Да, тариф Старт позволяет создать 1 курс и добавлять по 10 пользователей каждый месяц. Он действует бессрочно.</p>
        <h2>Можно ли будет поменять тариф?</h2>
        <p>
          Да, можно. Для этого даже не обязательно ждать окончания оплаченного периода: просто подключите нужный тариф и оставшиеся дни подписки
          автоматически пересчитаются по стоимости нового тарифа.
        </p>
        <h2>Могут ли Самозанятые принимать платежи на платформе?</h2>
        <p>
          Да, мы работаем с самозанятыми. Для самозанятых вывод средств с баланса доступен 1 раз в месяц. После получения средств на счет необходимо
          отправить нам чек в чате.
        </p>
        <h2>Можно ли оплатить подписку со счета организации?</h2>
        <p>
          Для этого пришлите нам в онлайн-чат или на почту hello@overone.by реквизиты для выставления счета, а также укажите желаемый тариф и период
          подключения. Мы сформируем и пришлем Вам счет для оплаты. Как только деньги поступят на счет, мы активируем Ваш тариф.
        </p>
      </div>
      <div className={styles.HelpCenterPage_banner}>
        <div className={styles.HelpCenterPage_banner_createProject}>
          <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
          <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
          <Button text={'Создать проект'} variant={'create'} />
        </div>
        <div className={styles.HelpCenterPage_banner_images}>
          <img src={firstStep} alt="Создать проект" className={styles.HelpCenterPage_banner_images_firstStep} />
          <img src={secondStep} alt="Создать проект" className={styles.HelpCenterPage_banner_images_secondStep} />
        </div>
      </div>
    </section>
  )
}
