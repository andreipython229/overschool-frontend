import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { generatePath, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

import { InitPageHeader } from '../Initial/newInitialPageHeader'
import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlansInfo.module.scss'

import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'

import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { useBoolean } from 'customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'
import { Path } from '../../enum/pathE'

const tariffIcons: Record<string, string> = {
  Junior: '/images/start.png',
  Middle: '/images/middle.png',
  Senior: '/images/senior.png',
}

// Отдельный компонент карточки тарифа
type TariffCardProps = {
  plan: TariffPlanT
  onSelect: (plan: TariffPlanT) => void
  onOpenModal: () => void
}

const TariffCard: FC<TariffCardProps> = ({ plan, onSelect, onOpenModal }) => (
  <div
    className={styles.TariffPlansPage_plansBlock_cardGroup_card}
    onClick={() => {
      onSelect(plan)
      onOpenModal()
    }}
  >
    <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
      {tariffIcons[plan.name] && (
        <>
          <img
            src={tariffIcons[plan.name]}
            alt={`${plan.name} Icon`}
            className={styles.tariffIcon}
          />
          {/* Годовая цена сразу под картинкой */}
          <div className={styles.yearPrice}>
            {plan.name === 'Junior' && '468 BYN/год'}
            {plan.name === 'Middle' && '948 BYN/год'}
            {plan.name === 'Senior' && '1788 BYN/год'}
          </div>
          {/* Кнопка Подключить под годовой ценой */}
          <Button
            text="Подключить"
            variant="primary"
            onClick={(e) => {
              e.stopPropagation() // чтобы не срабатывал onClick родителя дважды
              onSelect(plan)
              onOpenModal()
            }}
            style={{ marginTop: '1em', width: '100%' }}
          />
        </>
      )}

      <h3>{plan.name}</h3>
      <hr />
      <ul>
        <li>
          Количество курсов: <span>{plan.number_of_courses ?? '∞'}</span>
        </li>
        <li>
          Количество сотрудников: <span>{plan.number_of_staff ?? '∞'}</span>
        </li>
        <li>
          Студентов в месяц: <span>{plan.students_per_month ?? '∞'}</span>
        </li>
        <li>
          Всего студентов: <span>{plan.total_students ?? '∞'}</span>
        </li>
        <li>
          Цена в BYN:{' '}
          <span>{plan.price !== '0.00' ? `${plan.price} руб./мес.` : 'Бесплатно'}</span>
        </li>
        <li>
          Цена в RUB:{' '}
          <span>{plan.price_rf_rub !== 0 ? `${plan.price_rf_rub} руб./мес.` : 'Бесплатно'}</span>
        </li>
      </ul>
    </div>
  </div>
)

export const TariffPlansInfo: FC = () => {
  const { data, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>([])
  const [isModalOpen, { on: openModal, off: closeModal }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data && isSuccess) {
      const sortedTable = [...data].sort((a, b) => Number(a.price) - Number(b.price))
      setTariffPlanTable(sortedTable)
    }
  }, [data, isSuccess])

  const handleLoginPage = () => navigate(generatePath(Path.LoginPage))
  const handleRegistrationUser = () => navigate(generatePath(Path.CreateSchool))

  const handleRegistrationSchool = () => {
    const paramsString = localStorage.getItem('utmParams')
    const queryParams = paramsString
      ? `?${new URLSearchParams(JSON.parse(paramsString)).toString()}`
      : ''
    navigate(`${Path.CreateSchool}${queryParams}`)
  }

  return (
    <>
      <InitPageHeader />

      <div className={styles.courseHubTitle}>Тарифные планы для обучения Course Hub</div>

      <motion.div
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, ease: 'easeInOut', duration: 1.3 }}
        className={styles.container}
      >
        <div>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={styles.bg}>
              <div className={styles[`bg_wrap${num}`]}></div>
            </div>
          ))}

          <section className={styles.TariffPlansPage}>
            <div className={styles.TariffPlansPage_plansBlock}>
              <Typography gutterBottom variant="h5" sx={{ width: '100%', textAlign: 'center' }}>
                <p className={styles.TariffPlansPage_header} style={{ fontSize: '1.5rem' }}>
                  Тарифные планы для обучения Course Hub
                </p>
              </Typography>

              <div className={styles.savingsBlock}>
                <span>Ежемесячно</span>
                <span>Годовая</span>
                <span>Экономия 20%</span>
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
            </div>

            {isModalOpen && selected && (
              <Portal closeModal={closeModal}>
                <TariffDetailModal tariff={selected} setShowModal={closeModal} />
              </Portal>
            )}

            <div className={styles.btnCreate}>
              <Button onClick={handleRegistrationSchool} variant="primary" text="Создать платформу" />
            </div>

            <div className={styles.TariffPlansPage_banner}>
              <div className={styles.TariffPlansPage_banner_createProject}>
                <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
                <p>Попробуйте весь функционал в процессе использования и узнайте, насколько он удобен</p>
                <div className={styles.main_btn}>
                  <Button onClick={handleLoginPage} text="Войти" variant="primary" />
                  <Button
                    onClick={handleRegistrationUser}
                    text="Создать проект"
                    variant="primary"
                    style={{ marginLeft: '10px' }}
                  />
                </div>
              </div>
              <div className={styles.TariffPlansPage_banner_images}>
                <img src={firstStep} alt="Создать проект" />
                <img src={secondStep} alt="Создать проект" />
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </>
  )
}



