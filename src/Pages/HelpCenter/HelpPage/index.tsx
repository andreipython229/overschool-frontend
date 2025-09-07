import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../HelpPage.module.scss'
import { Footer } from '@/components/Footer/index'
import { Button } from '@/components/common/Button/Button'
import { InitPageHeader } from '@/Pages/Initial/newInitialPageHeader'
import { Path } from '@/enum/pathE'
import mapPin from '@/assets/img/common/map-pin.png'
import domen from '@/assets/img/common/domen.png'
import defaultIcon from '@/assets/img/common/default-icon.png'
import userIcon from '@/assets/img/common/3-user.png'
import settingsPlatform from '@/assets/img/common/settingsPlatform.png'
import accaunt from '@/assets/img/common/accaunt.png'
import chat from '@/assets/img/common/chat.png'
import checkHW from '@/assets/img/common/checkHW.png'
import overAi from '@/assets/img/common/OverAi.png'
import groupSettings from '@/assets/img/common/groupsettings.png'
import helpHeader from '@/assets/img/common/help-header1.png'
import ctaImage from '@/assets/img/common/cta-image.png'

const sections = [
  {
    title: 'Гид по началу работы',
    image: mapPin,
    link: '/help/help-gid-start',
  },
  {
    title: 'Домен',
    image: domen,
    link: '/help/help-domen',
  },
  {
    title: 'Добавление сотрудника',
    image: defaultIcon,
    link: '/help/help-add-employee',
  },
  {
    title: 'Ученики',
    image: userIcon,
    link: '/help/help-students',
  },
  {
    title: 'Настройка платформы',
    image: settingsPlatform,
    link: '/help/help-settings-platform',
  },
  {
    title: 'Аккаунт',
    image: accaunt,
    link: '/help/help-account',
  },
  {
    title: 'Чат',
    image: chat,
    link: '/help/help-chat',
  },
  {
    title: 'Проверка домашних заданий',
    image: checkHW,
    link: '/help/help-check-homework',
  },
  {
    title: 'OverAI',
    image: overAi,
    link: '/help/help-overai',
  },
  {
    title: 'Настройка групп',
    image: groupSettings,
    link: '/help/help-group-settings',
  },
]

export const HelpPage: FC = memo(() => {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleRegistrationUser = () => {
    const paramsString = localStorage.getItem('utmParams')
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString)
      const queryParams = Object.keys(parsedParams)
        .map(key => `${key}=${parsedParams[key]}`)
        .join('&')
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`
      navigate(pathWithParams)
    } else {
      navigate(Path.CreateSchool)
    }
  }

  return (
    <div className={styles.helpPage}>
      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
        <div className={styles.bg_wrap2}></div>
        <div className={styles.bg_wrap3}></div>
        <div className={styles.bg_wrap4}></div>
      </div>

      <InitPageHeader />

      <div className={styles.helpBlock}>
        <div className={styles.helpBlockText}>
          <h2>Помощь</h2>
          <p>Есть вопросы? Здесь вы найдете ответы, на интересующие вопросы, а также получите пошаговую инструкцию и поддержку.</p>
        </div>
        <img src={helpHeader} alt="Лэптоп с вопросами" />
      </div>

      <div className={styles.sections}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`${styles.section} ${hoveredIndex === index ? styles.section_variant2 : ''}`}
            onClick={() => navigate(section.link)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img className={`${styles.sectionImage} ${hoveredIndex === index ? styles.imageHover : ''}`} src={section.image} alt={section.title} />
            <p>{section.title}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaBlock}>
        <div className={styles.ctaTextRow}>
          <div className={styles.ctaText}>
            <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
            <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
            <Button text="Попробовать бесплатно" variant="newLeaveRequest" onClick={handleRegistrationUser} />
            <div className={styles.ctaImage}>
              <img src={ctaImage} alt="CTA-изображение" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.faqBlock}>
        <h2>Часто задаваемые вопросы</h2>
        <div className={styles.faqText}>
          <h3>Бесплатный тариф действительно бессрочный?</h3>
          <p>Да, тариф Старт позволяет создать 1 курс и добавлять по 10 учеников каждый месяц. Он действует бессрочно.</p>
        </div>
        <div className={styles.faqText}>
          <h3>Можно ли будет поменять тариф?</h3>
          <p>
            Да, можно. Для этого даже не обязательно ждать окончания оплаченного периода: просто подключите нужный тариф и оставшиеся дни подписки
            автоматически пересчитаются по новой стоимости тарифа. При понижении тарифа оставшиеся дниподписки не конвертируются.
          </p>
        </div>
        <div className={styles.faqText}>
          <h3>Могут ли Самозанятые принимать платежи на платформе?</h3>
          <p>
            Да, мы работаем с самозанятыми. После получения средств на счет необходимо отправить нам чек в чате. Вывод средств происходит в течение 24
            часов после подачи запроса (в рабочие дни).
          </p>
        </div>
        <div className={styles.faqText}>
          <h3>Можно ли оплатить подписку со счета организации?</h3>
          <p>
            Для этого пришлите нам в онлайн-чат или на почту реквизитывыставления счета, а также укажите желаемый тариф и период подключения. Мы
            сформируем и пришлем Вам счет для оплаты. Как только деньги поступят на счет, мы активируем Ваш тариф.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
})
