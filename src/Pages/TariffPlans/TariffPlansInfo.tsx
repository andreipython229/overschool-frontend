import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import { Footer } from 'components/Footer/index'

import { InitPageHeader } from '../Initial/newInitialPageHeader'
import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlansInfo.module.scss'

import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { useBoolean } from 'customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'

const tariffIcons: Record<string, string> = {
  Junior: '/images/start.png',
  Middle: '/images/middle.png',
  Senior: '/images/senior.png',
}

type TariffCardProps = {
  plan: TariffPlanT
  onSelect: (plan: TariffPlanT) => void
  onOpenModal: () => void
}




const TariffCard: FC<TariffCardProps> = ({ plan, onSelect, onOpenModal }) => {
  const backgroundClass =
    plan.name === 'Junior'
      ? styles.cardJunior
      : plan.name === 'Middle'
      ? styles.cardMiddle
      : plan.name === 'Senior'
      ? styles.cardSenior
      : ''

  const planClassName = styles[plan.name.toLowerCase()] || ''

  return (
    <div
      className={`${styles.TariffPlansPage_plansBlock_cardGroup_card} ${backgroundClass}`}
      onClick={() => {
        onSelect(plan)
        onOpenModal()
      }}
      style={{ position: 'relative' }}
    >
      <div
        className={styles.topLeftLabel}
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontWeight: 'bold',
          fontSize: '18px',
          color: plan.name === 'Senior' ? 'white' : 'black',
        }}
      >
        <span className={`${styles.planLabel} ${planClassName}`}>{plan.name}</span>
      </div>

      {plan.name === 'Middle' && (
        <div className={styles.hitWrapper}>
          <img src="/images/hit.png" alt="Hit Icon" className={styles.hitIconTopRight} />
        </div>
      )}

      <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
        <img src={tariffIcons[plan.name]} alt={`${plan.name} Icon`} className={styles.tariffIcon} />
        <div className={styles.yearPrice}>
          {plan.name === 'Junior' && '468 BYN/год'}
          {plan.name === 'Middle' && '948 BYN/год'}
          {plan.name === 'Senior' && '1788 BYN/год'}
        </div>

        <Button
  text="Подключить"
  variant="primary"
  onClick={() => {
    window.location.href = 'https://t.me/coursehub_admin'
  }}

          style={{ marginTop: '1em', width: '100%' }}
        />

        <hr className={styles.cardDivider} />

        <ul
  className={plan.name === 'Senior' ? styles.seniorList : ''}
  style={{
    fontFamily: 'SF Pro Display, sans-serif',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: 1,
    textAlign: 'center',
    listStyle: 'none',
    padding: 0,
    color: plan.name === 'Senior' ? 'white' : 'black',
  }}
>
  {planFeatures[plan.name].features.map((text, index) => (
  <li key={index} className={styles.featureItem}>
    <img
      src={featureIcons[text] || '/img/account/statistic.svg'}
      alt="Иконка"
      style={{ marginRight: '8px', width: '20px', height: '20px' }}
    />
    {text}
  </li>
))}


  {planFeatures[plan.name].disabled?.map((text, index) => (
    <li key={`disabled-${index}`} className={`${styles.featureItem} ${styles.listItemDisabled}`}>
      {text}
    </li>
  ))}
</ul>

      </div>
    </div>
  )
}

export const TariffPlansInfo: FC = () => {
  const { data, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>([])
  const [isModalOpen, { on: openModal, off: closeModal }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT | null>(null)

  useEffect(() => {
    if (data && isSuccess) {
      const sortedTable = [...data].sort((a, b) => Number(a.price) - Number(b.price))
      setTariffPlanTable(sortedTable)
    }
  }, [data, isSuccess])

  return (
 <>
 <InitPageHeader />


      <motion.div
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, ease: 'easeInOut', duration: 1.3 }}
        className={styles.container}
      >
        <section className={styles.TariffPlansPage}>
          <div className={styles.TariffPlansPage_plansBlock}>
            </div>
<Typography
  gutterBottom
  variant="h1"
  sx={{
    textAlign: 'center',
    fontFamily: 'SF Pro Text, sans-serif',
    fontSize: '46px',
    fontWeight: 750,
    lineHeight: '100%',
    letterSpacing: '0px',
    color: 'black',
    whiteSpace: 'nowrap',       // 🔹 Не переносить строку
    overflow: 'hidden',         // 🔹 Скрыть лишнее

    width: '100%',              // или maxWidth: '1219.5px' для контроля ширины
    margin: '0 auto',           // 🔹 Центрировать
  }}
>
  Тарифные планы для обучения Course Hub
</Typography>
              <div className={styles.savingsBlock}>
              <span className={styles.monthly}>Ежемесячно</span>
              <div className={styles.yearlyBlock}>
                <span>Годовая</span>
                <span className={styles.discountBadge}>Экономия 20%</span>
              </div>
            </div>

            <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
              {tariffPlanTable.map((plan) => (
                <TariffCard
                  key={plan.id ?? plan.name}
                  plan={plan}
                  onSelect={setSelected}
                  onOpenModal={openModal}
                />
              ))}
            </div>
     <div
  style={{
    width: '1119.5px',
    height: '250px',
    borderRadius: '32px',
    padding: '16px',
    gap: '16px',
    border: '1px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: '40px auto', // Центрируем по горизонтали и добавляем отступ сверху и снизу
    backgroundColor: '#fff',
    fontFamily: 'SF Pro Display, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.4,
  }}
>
  {[
    'Мессенджер с чатами и каналами',
    'Автоматический зачёт',
    'Выдача сертификатов',
    'Публикация в каталоге CourseHub',
    'Искусственный интеллект Course Hub Ai',
    'Домашние задания',
    'Умные комментарии к урокам',
    'Аналитика обучения',
    'Отдельный сайт для каждого курса',
    'Рассылка по всем ученикам',
    'Мобильное приложение',
  ].map((text, index) => (
    <div key={index} style={{ flex: '0 0 30%', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '8px', color: '#4CAF50' }}>+</span>
      {text}
    </div>
  ))}
</div>
<div
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '32px',
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
  }}
>
  {/* Блок Start */}
<div
  style={{
    position: 'relative',
    width: '589.75px',
    height: '373px',
    borderRadius: '24px',
    padding: '24px',
    backgroundColor: '#BBCEEB',
    color: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'SF Pro Display, sans-serif',
  }}
>
  {/* Иконка */}
  <img
    src="/images/prizeStart.png"
    alt="PrizeStart"
    style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '225px',
      height: '252px',
      objectFit: 'contain',
      pointerEvents: 'none',
    }}
  />

  {/* Контент в двух колонках */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'flex-start',
    }}
  >
    {/* Левая колонка */}
   <div style={{ width: '100%', textAlign: 'center' }}>
  <h2
    style={{
      fontSize: '24px',
      margin: 0,
      whiteSpace: 'nowrap',      // Не переносить строку
      overflow: 'hidden',        // Обрезать при переполнении (если нужно)
      textOverflow: 'ellipsis',  // Показать троеточие при обрезке (если нужно)
    }}
  >
    Бесплатный тариф  “Start”
   </h2>
   {/* Подзаголовок ближе к левому краю */}
  <p
    style={{
      marginTop: '8px',
      paddingLeft: '12px',
      textAlign: 'left',
    }}
  >
    14 дней бесплатно
  </p>
</div>
    {/* Правая колонка — список */}
<ul
      style={{
        listStylePosition: 'inside',
        textAlign: 'right',
        paddingLeft: 0,
        margin: 0,
        marginTop: '52px', // ⬅️ добавь эту строку
        whiteSpace: 'nowrap',       // 🔹 Не переносить строку
        //whiteSpace: 'normal'
      }}
    >
    <li>1 курс</li>
             <li>До 10 учеников</li>
<li> Конструктор лендингов </li>
              <li>Прием платежей и</li>
            <li>онлайн касса</li>
    </ul>
 </div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
  text="Начать бесплатно"
  variant="secondary"
  onClick={() => {
    window.location.href = 'https://t.me/coursehub_admin'
  }}
    style={{
     width: '301px',
    height: '54px',
    padding: '15px 40px',

       backgroundColor: '#3B82F6', // синий фон
    color: '#FFFFFF',           // белый текст
    border: 'none',             // если нужен плоский стиль
    borderRadius: '8px',        // (по желанию) скругление углов
    }}
  />
</div>
  </div>
 {/* Блок Personal */}
 <div
  style={{
    position: 'relative',
    width: '589.75px',
    height: '373px',
    borderRadius: '24px',
    padding: '24px',
    backgroundColor: '#357EEB',
   color: '#FFFFFF', // <-- Белый цвет текста
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'SF Pro Display, sans-serif',
  }}
>
  {/* Иконка */}
  <img
    src="/images/prizePersonal.png"
    alt="SprizePersonal"
    style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '225px',
      height: '252px',
      objectFit: 'contain',
      pointerEvents: 'none',
    }}
  />

  {/* Контент в двух колонках */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'flex-start',
    }}
  >
    {/* Левая колонка: Заголовок + Подзаголовок */}
    <div style={{ width: '60%' }}>
      <h2
        style={{
          fontSize: '24px',
          margin: 0,
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        Премиальный тариф “Personal”
      </h2>

      <p
        style={{
          marginTop: '8px',
          textAlign: 'left',
        }}
      >
        Персонально подберем для вас нужные функции
      </p>
    </div>

    {/* Правая колонка — список */}
   <ul
  style={{
    listStylePosition: 'inside',
    textAlign: 'right',
    paddingLeft: 0,
    margin: 0,
    marginTop: '52px',
    color: '#FFFFFF',
  }}
>
  <li style={{ color: '#FFFFFF' }}>Создание ГБ</li>
  <li style={{ color: '#FFFFFF' }}>Создание курсов</li>
  <li style={{ color: '#FFFFFF' }}>До 30 учеников</li>
  <li style={{ color: '#FFFFFF' }}>До 3 сотрудников</li>
</ul>
 </div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    text=    "Получить консультацию"
    variant="secondary"
    onClick={() => {
    window.location.href = 'https://t.me/coursehub_admin'
  }}

    style={{
        width: '301px',
    height: '54px',
    padding: '15px 40px',

    backgroundColor:'#FFFFFF', // синий фон
    color:    '#3B82F6'  ,      // белый текст
    border: 'none',             // если нужен плоский стиль
    borderRadius: '8px',        // (по желанию) скругление углов
    }}
  />
</div>
   </div>
</div>


<div
  style={{
    width: '100%',
    maxWidth: '1219.5px',  // Максимальная ширина, как в твоем примере
    height: '350px',
    borderRadius: '32px',
    padding: '16px',
    gap: '16px',
    border: '1px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
      justifyContent: 'space-between', // текст слева, иконка справа
    margin: '40px auto',   // Центрируем горизонтально, отступ сверху/снизу
    backgroundColor: '#0D28BB',
    fontFamily: 'SF Pro Display, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.4,
    boxSizing: 'border-box',  // чтобы padding не увеличивал ширину
    color: '#ffffff',  // белый цвет текста
  }}
>
  {/* Пример карточки внутри блока */}
  <div
    style={{
      flex: '1 1 0',
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >


   <p style={{ fontSize: '24px', fontWeight: 600, lineHeight: '1.2' }}>
    Создавайте свой проект на Course<br />
    Hub прямо сейчас.
  </p>
  <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.6' }}>
    Попробуйте весь функционал в процессе использования<br />
    и убедитесь, насколько он удобен.
  </p>
 <button
    onClick={() => window.location.href = 'https://platform.coursehb.ru/create-school/'}
  style={{
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }}
>
  Попробовать бесплатно
</button>

</div>


  <div
    style={{
      flex: '1 1 0',
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <img

    />

    <p style={{ fontSize: '18px', fontWeight: 400 }}>

    </p>
  </div>

  <div
    style={{
      flex: '1 1 0',
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <img
   src="/images/banner.png"
    alt="banner"
  style={{
    width: '478px',
    height: '330px',
    marginBottom: '16px',
    border: '20px solid #324195',   // рамка нужного цвета
    borderRadius: '25px'           // закруглённые углы
  }}
/>


    <p style={{ fontSize: '70px', fontWeight: 400 }}>

    </p>
  </div>
</div>


          {isModalOpen && selected && (
            <Portal closeModal={closeModal}>
              <TariffDetailModal tariff={selected} setShowModal={closeModal} />
            </Portal>
          )}
        </section>
      </motion.div>
        <Footer />
    </>
  )
}

<div className={styles.yearPrice}>
  <div className={`${styles.yearPrice} ${styles.junior}`}>Junior</div>
  <div className={`${styles.yearPrice} ${styles.middle}`}>Middle</div>
  <div className={`${styles.yearPrice} ${styles.senior}`}>Senior</div>
</div>


const planFeatures: Record<string, { features: string[]; disabled?: string[] }> = {
  Junior: {
    features: [
      'Безлимит ГБ',
      '1 курс',
      'До 10 учеников',
      '1 сотрудник',
    ],
    disabled: ['White Label', 'Свой домен'],
  },
  Middle: {
    features: [
      'Безлимит ГБ',
      '10 курсов',
      '50 учеников',
      '11 сотрудников',
    ],
    disabled: ['White Label', 'Свой домен'],
  },
  Senior: {
    features: [
       '50 курсов',
      '500 учеников',
      'Безлимит',
    ],
 disabled: ['White Label', 'Свой домен'],
  },
}

const featureIcons: Record<string, string> = {
  'Безлимит ГБ': '/img/account/statistic.svg',
  '1 курс': '/icons/course.svg',
  'До 10 учеников': '/icons/students.svg',
  '1 сотрудник': '/icons/staff.svg',
  '10 курсов': '/icons/courses.svg',
  '50 учеников': '/icons/group.svg',
  '11 сотрудников': '/icons/team.svg',
  '50 курсов': '/icons/large-courses.svg',
  '500 учеников': '/icons/large-group.svg',
  'Безлимит': '/icons/unlimited.svg',
  'White Label': '/icons/white-label.svg',
  'Свой домен': '/icons/domain.svg',
}
