import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import { Footer } from 'components/Footer/index'
import { useNavigate } from 'react-router-dom'


import { InitPageHeader } from '../Initial/newInitialPageHeader'
import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlansInfo.module.scss'
import { TariffPlansInfoYear } from './TariffPlansInfoYear'

import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { useBoolean } from '@/customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'
import { Path } from '@/enum/pathE'

type Feature = { icon: string; text: string };
type Disabl = { icon: string; text: string };

const planFeatures: Record<string, { features: Feature[]; disabled: Disabl[] }> = {
  Junior: {
    features: [
      { icon: '/images/cloud.png', text: 'Безлимит ГБ' },
      { icon: '/images/layer.png', text: '3 курса' },
      { icon: '/images/student.png', text: '10 учеников' },
      { icon: '/images/Component 133.png', text: '4 сотрудника' },
    ],
    disabled: [
      { icon: '/images/X.png', text: 'White Label'},
      { icon: '/images/X.png', text: 'Свой домен'},],
  },
  Middle: {
    features: [
      { icon: '/images/cloud.png', text: 'Безлимит ГБ' },
      { icon: '/images/layer.png', text: '10 курсов' },
      { icon: '/images/student.png', text: '50 учеников' },
      { icon: '/images/Component 133.png', text: '11 сотрудников' },
    ],
    disabled: [
      { icon: '/images/X.png', text: 'White Label'},
      { icon: '/images/X.png', text: 'Свой домен'},],
  },
  Senior: {
    features: [
      { icon: '/images/cloudWhite.png', text: 'Безлимит ГБ' },
      { icon: '/images/layerWhite.png', text: '50 курсов' },
      { icon: '/images/studentWhite.png', text: '500 учеников' },
      { icon: '/images/Component 133White.png', text: 'безлимит' },
    ],
    disabled: [
      { icon: '/images/V.png', text: 'White Label'},
      { icon: '/images/V.png', text: 'Свой домен'},],
  },
};



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
          {Number(plan.price).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} BYN/месяц
        </div>

<a
  href="https://platform.coursehb.ru/create-school/"
  target="_blank"
  rel="noreferrer"
  style={{
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: '#0D28BB',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    userSelect: 'none',
  }}
>
  Попробовать бесплатно
</a>

  href="https://t.me/coursehub_admin"
  target="_blank"
  rel="noreferrer"
  style={{
    display: 'inline-block',
    marginTop: '1em',
    width: '100%',
    padding: '12px',
    textAlign: 'center',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontWeight: '600',
    borderRadius: '6px',
    textDecoration: 'none',
  }}
>
  Подключить
</a>


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
{planFeatures[plan.name].features.map((item, index) => {
  const icon = typeof item === 'string' ? featureIcons[item] || '/img/account/statistic.svg' : item.icon;
  const text = typeof item === 'string' ? item : item.text;

  return (
    <li key={index} className={styles.featureItem}>
      <img src={icon} alt="Иконка" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
      {text}
    </li>
  ))}
>> dev-front

{planFeatures[plan.name].disabled?.map((item, index) => {
  const icon = typeof item === 'string' ? featureIcons[item] : item.icon;
  const text = typeof item === 'string' ? item : item.text;
  // ... дальше продолжай этот блок, если он есть


  return (
    <li key={`disabled-${index}`} className={`${styles.featureItem} ${styles.listItemDisabled}`}>
      {icon && <img src={icon} alt="Иконка" style={{ marginRight: '8px', width: '20px', height: '20px' }} />}
      {text}
    </li>
  );
})}

    </li>
  ))}
</ul>

      </div>
    </div>
  )
}

export const TariffPlansInfo: FC = () => {
  const { data, isSuccess } = useFetchTariffPlanTableQuery()
  const [isModalOpen, { on: openModal, off: closeModal }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT | null>(null)
  const navigate = useNavigate();

  // Используем только годовые тарифы (id 5, 4, 3)
  const tariffPlanTable = (data && isSuccess && data.length > 0)
    ? data.filter(plan => [2, 3, 4].includes(Number(plan.id)))
    : [];

  console.log('tariffPlanTable', tariffPlanTable)

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
<div className={styles.TariffPlansPage_plansBlock}></div>

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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    margin: '0 auto',
  }}
>
  Тарифные планы для обучения Course Hub
</Typography>

<div className={styles.savingsBlock}>
  <span className={styles.monthly}>Ежемесячно</span>
  <div className={styles.yearlyBlock}>
    <a
      href="https://platform.coursehb.ru/tariff-plans/"
      target="_blank"
      rel="noreferrer"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        font: 'inherit',
        color: 'inherit',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      Годовая
      <span className={styles.discountBadge}>Экономия 20%</span>
    </a>
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
    margin: '40px auto',
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
    <div
      key={index}
      style={{
        flex: '0 0 30%',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
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

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '24px',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Бесплатный тариф &ldquo;Start&rdquo;
        </h2>
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
      <ul
        style={{
          listStylePosition: 'inside',
          textAlign: 'right',
          paddingLeft: 0,
          margin: 0,
          marginTop: '52px',
          whiteSpace: 'nowrap',
        }}
      >
        <li><img src="/images/Component 1.png" alt="icon" />1 курс</li>
        <li><img src="/images/profile-2user.png" alt="icon" />До 10 учеников</li>
        <li><img src="/images/Component 2.png" alt="icon" />Конструктор лендингов</li>
        <li><img src="/images/sms-notification.png" alt="icon" />Прием платежей и</li>
        <li>онлайн касса</li>
      </ul>
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <a
        href="https://t.me/coursehub_admin"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007BFF',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          width: '301px',
          textAlign: 'center',
          fontWeight: '600',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        Подключить
      </a>
    </div>
  </div>
</div>

{/* Блок Personal */}
<div

          style={{
            fontSize: '24px',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Бесплатный тариф &ldquo;Start&rdquo;
        </h2>
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

      <ul
        style={{
          listStylePosition: 'inside',
          textAlign: 'right',
          paddingLeft: 0,
          margin: 0,
          marginTop: '52px',
          whiteSpace: 'nowrap',
        }}
      >
        <li>
          <img src="/images/Component 1.png" alt="icon" />1 курс
        </li>
        <li>
          <img src="/images/profile-2user.png" alt="icon" />До 10 учеников
        </li>
        <li>
          <img src="/images/Component 2.png" alt="icon" />Конструктор лендингов
        </li>
        <li>
          <img src="/images/sms-notification.png" alt="icon" />Прием платежей и
        </li>
        <li>онлайн касса</li>
      </ul>
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <a
        href="https://t.me/coursehub_admin"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007BFF',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          width: '301px',
          textAlign: 'center',
          fontWeight: '600',
        }}
      >
        Подключить
      </a>
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
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'SF Pro Display, sans-serif',
      marginTop: '24px',
    }}
  >
    <img
      src="/images/prizePersonal.png"
      alt="PrizePersonal"
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        {/* сюда можно добавить контент блока Personal */}
      </div>
    </div>
  </div>
</div>

          style={{
            fontSize: '24px',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
{/* ... предыдущий код блока Start ... */}
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

  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'flex-start',
    }}
  >
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h2
        style={{
          fontSize: '24px',
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Бесплатный тариф &ldquo;Start&rdquo;
      </h2>
      <p style={{ marginTop: '8px', paddingLeft: '12px', textAlign: 'left' }}>
        14 дней бесплатно
      </p>
    </div>

    <ul
      style={{
        listStylePosition: 'inside',
        textAlign: 'right',
        paddingLeft: 0,
        margin: 0,
        marginTop: '52px',
        whiteSpace: 'nowrap',
      }}
    >
      <li><img src="/images/Component 1.png" alt="icon" /> 1 курс</li>
      <li><img src="/images/profile-2user.png" alt="icon" /> До 10 учеников</li>
      <li><img src="/images/Component 2.png" alt="icon" /> Конструктор лендингов</li>
      <li><img src="/images/sms-notification.png" alt="icon" /> Прием платежей и онлайн касса</li>
    </ul>
  </div>

  {/* Здесь блок с белым списком и кнопкой консультации из feature/crossdom3 */}
  <div style={{ marginTop: '24px' }}>
    <ul
      style={{
        listStylePosition: 'inside',
        paddingLeft: 0,
        margin: 0,
        color: '#fff',
      }}
    >
      <li>
        <img src="/images/cloudWhite.png" alt="icon" />
        <span style={{ color: 'white', marginLeft: '8px' }}>Создание ГБ</span>
      </li>
      <li>
        <img src="/images/layerWhite.png" alt="icon" />
        <span style={{ color: 'white', marginLeft: '8px' }}>Создание курсов</span>
      </li>
      <li>
        <img src="/images/studentWhite.png" alt="icon" />
        <span style={{ color: 'white', marginLeft: '8px' }}>До 30 учеников</span>
      </li>
      <li>
        <img src="/images/Component 133White.png" alt="icon" />
        <span style={{ color: 'white', marginLeft: '8px' }}>До 3 сотрудников</span>
      </li>
    </ul>

    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
      <a
        href="https://t.me/coursehub_admin"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          width: '301px',
          height: '54px',
          padding: '15px 40px',
          backgroundColor: '#FFFFFF',
          color: '#3B82F6',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: '24px',
          textDecoration: 'none',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        Получить консультацию
      </a>
    </div>
  </div>
</div>

    <a
      href="https://t.me/coursehub_admin"
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#0D28BB',
        color: '#fff',
        borderRadius: '6px',
        textDecoration: 'none',
        width: '301px',
        textAlign: 'center',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '12px',
      }}
    >
      Получить консультацию
    </a>
  </div>

{/* Блок Personal */}
<div
  style={{
    position: 'relative',
    width: '589.75px',
    height: '373px',
    borderRadius: '24px',
    padding: '24px',
    backgroundColor: '#357EEB', // синий фон
    color: '#FFFFFF', // белый текст
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'SF Pro Display, sans-serif',
    marginTop: '24px',
  }}
>
  <img
    src="/images/prizePersonal.png"
    alt="PrizePersonal"
    style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '225px',
      height: '252px',
      objectFit: 'contain',
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />

  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'flex-start',
      zIndex: 1, // чтобы текст был поверх картинки
    }}
  >
    <div style={{ width: '60%' }}>
      <h2
        style={{
          fontSize: '24px',
          margin: 0,
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        Премиальный тариф &ldquo;Personal&rdquo;
      </h2>
      <p style={{ marginTop: '8px', textAlign: 'left' }}>
        Персонально подберем для вас нужные функции
      </p>

      <ul
        style={{
          listStylePosition: 'inside',
          textAlign: 'left',
          paddingLeft: 0,
          marginTop: '16px',
          color: 'white',
          lineHeight: 1.6,
        }}
      >
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <img src="/images/cloudWhite.png" alt="icon" style={{ marginRight: 8 }} />
          <span>Создание ГБ</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <img src="/images/layerWhite.png" alt="icon" style={{ marginRight: 8 }} />
          <span>Создание курсов</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <img src="/images/studentWhite.png" alt="icon" style={{ marginRight: 8 }} />
          <span>До 30 учеников</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/Component 133White.png" alt="icon" style={{ marginRight: 8 }} />
          <span>До 3 сотрудников</span>
        </li>
      </ul>
    </div>

    <div style={{ width: '40%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <a
        href="https://t.me/coursehub_admin"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          width: '301px',
          height: '54px',
          padding: '15px 40px',
          backgroundColor: '#FFFFFF',
          color: '#3B82F6',
          borderRadius: '8px',
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: '24px',
          textDecoration: 'none',
          cursor: 'pointer',
          border: 'none',
          userSelect: 'none',
        }}
      >
        Получить консультацию
      </a>
    </div>
  </div>
</div>

          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#fff',
            color: '#3B82F6',
            borderRadius: '6px',
            textDecoration: 'none',
            width: '301px',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
<div
  style={{
    width: '100%',
    maxWidth: '1219.5px',
    height: '350px',
    borderRadius: '32px',
    padding: '16px',
    gap: '16px',
    border: '1px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '40px auto',
    backgroundColor: '#357EEB',
    fontFamily: 'SF Pro Display, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.4,
    boxSizing: 'border-box',
    color: '#ffffff',
  }}
>
  {/* Левая колонка: текст + кнопка */}
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
      Создавайте свой проект на Course Hub прямо сейчас.
    </p>
    <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.6', marginTop: '8px' }}>
      Попробуйте весь функционал в процессе использования<br />
      и убедитесь, насколько он удобен.
    </p>
    <a
      href="https://platform.coursehb.ru/create-school/"
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 600,
        backgroundColor: '#0D28BB',
        color: '#fff',
        borderRadius: '6px',
        cursor: 'pointer',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      Попробовать бесплатно
    </a>
  </div>

  {/* Правая колонка: заголовок + картинка */}
  <div
    style={{
      flex: '1 1 0',
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '12px',
    }}
  >
    <p style={{ fontSize: '70px', fontWeight: 400, margin: 0 }}>
      Начните обучение уже сегодня
    </p>
    <img
      src="/images/cta-image.png"
      alt="CTA"
      style={{
        width: '478px',
        height: '330px',
        border: '20px solid #324195',
        borderRadius: '25px',
      }}
    />
  </div>
</div>


          {isModalOpen && selected && (
            <Portal closeModal={closeModal}>
              <TariffDetailModal tariff={selected} setShowModal={closeModal} />
            </Portal>
          )}
        </section>
      </motion.div>
// В конце компонента (например, страницы)
<Footer />
</>
)

// Блок с тарифными планами — можно вынести в отдельный компонент
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
};

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
};

// Верстка блоков с уровнями (Junior, Middle, Senior)
<div className={styles.yearPrice}>
  <div className={`${styles.yearPrice} ${styles.junior}`}>Junior</div>
  <div className={`${styles.yearPrice} ${styles.middle}`}>Middle</div>
  <div className={`${styles.yearPrice} ${styles.senior}`}>Senior</div>
</div>

