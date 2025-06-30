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
{planFeatures[plan.name].features.map((feature, index) => (
  <li key={index} className={styles.featureItem}>
    <img src={feature.icon} alt="Иконка" style={{ marginRight: '8px', width: '20px', height: '20px' }} /> {feature.text}
  </li>
))}

{planFeatures[plan.name].disabled?.map((disabledFeature, index) => (
  <li key={`disabled-${index}`} className={`${styles.featureItem} ${styles.listItemDisabled}`}>
    <img src={disabledFeature.icon} alt="Иконка" style={{ marginRight: '8px', width: '20px', height: '20px' }} /> {disabledFeature.text}
  </li>
))}

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

  // Используем только годовые тарифы (id 3, 4, 5)
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
    Тарифные планы для обучения Course hub
  </Typography>

  <div className={styles.savingsBlock}>
    <span className={styles.monthly}>Ежемесячно</span>
    <div className={styles.yearlyBlock}>
      <button
        onClick={() => navigate(Path.TariffPlansInfoYear)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        Годовая
      </button>
    </div>
  </div>
</section>
t
                <span className={styles.discountBadge}>Экономия 20%</span>
              </button>
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
                Бесплатный тариф &ldquo;Start&rdquo;
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
             
              <li><img src="/images/Component 1.png" alt="icon" />1 курс</li>
              <li><img src="/images/profile-2user.png" alt="icon" />До 10 учеников</li>
              <li><img src="/images/Component 2.png" alt="icon" />Конструктор лендингов</li>
              <li><img src="/images/sms-notification.png" alt="icon" />Прием платежей и</li>
              <li>онлайн касса</li>
            </ul>

           </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              text="Начать бесплатно"
              variant="secondary"
              onClick={() => console.log('Start')}
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
                Премиальный тариф &ldquo;Personal&rdquo;
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
      style={{ flex: '0 0 30%', marginBottom: '12px', display: 'flex', alignItems: 'center' }}
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
          Бесплатный тариф “Start”
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

      {/* Правая колонка — список */}
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
        <li>1 курс</li>
        <li>До 10 учеников</li>
        <li>Конструктор лендингов</li>
        <li>Прием платежей и</li>
        <li>онлайн касса</li>
      </ul>
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        text="Начать бесплатно"
        variant="secondary"
        onClick={() => console.log('Start')}
        style={{
          width: '301px',
          height: '54px',
          padding: '15px 40px',
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
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
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'SF Pro Display, sans-serif',
    }}
  >
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

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-start',
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

      {/* Правая колонка — список с иконками */}
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
        <li>
          <img src="/images/cloudWhite.png" alt="icon" />
          <span style={{ color: 'white' }}>Создание ГБ</span>
        </li>
        <li>
          <img src="/images/layerWhite.png" alt="icon" />
          <span style={{ color: 'white' }}>Создание курсов</span>
        </li>
        <li>
          <img src="/images/studentWhite.png" alt="icon" />
          <span style={{ color: 'white' }}>До 30 учеников</span>
        </li>
        <li>
          <img src="/images/Component 133White.png" alt="icon" />
          <span style={{ color: 'white' }}>До 3 сотрудников</span>
        </li>
      </ul>
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        text="Получить консультацию"
        variant="secondary"
        onClick={() => console.log('Start')}
        style={{
          width: '301px',
          height: '54px',
          padding: '15px 40px',
          backgroundColor: '#FFFFFF',
          color: '#3B82F6',
          border: 'none',
          borderRadius: '8px',
        }}
      />
    </div>
  </div>
</div>

{/* Нижний блок с призывом к действию */}
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: '40px auto',
    backgroundColor: '#0D28BB',
    fontFamily: 'SF Pro Display, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.4,
    boxSizing: 'border-box',
    color: '#ffffff',
  }}
>
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
      Создавайте свой проект на Course
      <br />
      Hub прямо сейчас.
    </p>
    <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.6' }}>
      Попробуйте весь функционал в процессе использования
      <br />
      и убедитесь, насколько он удобен.
    </p>
    <button
      onClick={() => (window.location.href = 'https://platform.coursehb.ru/create-school/')}
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
    {/* Пустой блок под изображение, если нужно */}
    <img />
    <p style={{ fontSize: '18px', fontWeight: 400 }}></p>
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
      src="/images/333.png"
      alt="333"
      style={{
        width: '478px',
        height: '330px',
        marginBottom: '16px',
        border: '20px solid #324195',
        borderRadius: '25px',
      }}
    />
    <p style={{ fontSize: '70px', fontWeight: 400 }}></p>
  </div>
</div>


            text=    "Получить консультацию"
            variant="secondary"
            onClick={() => console.log('Start')}
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
    maxWidth: '1219.5px',
    height: '350px',
    borderRadius: '32px',
    padding: '16px',
    gap: '16px',
    border: '1px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
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
    <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.6' }}>
      <span style={{ fontSize: '24px', fontWeight: 600 }}>
        Создавайте свой проект на Course Hub прямо сейчас.
      </span>
      <br />
      Попробуйте весь функционал в процессе использования
      <br />
      и убедитесь, насколько он удобен.
    </p>
    <a
      href="https://platform.coursehb.ru/create-school/"
      style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 600,
        backgroundColor: '#0D28BB',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      Попробовать бесплатно
    </a>
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
      src="src/assets/img/common/cta-image.png"
      alt="Slice 3213"
      style={{ width: '478px', height: '330px', marginBottom: '16px' }}
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
}

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

