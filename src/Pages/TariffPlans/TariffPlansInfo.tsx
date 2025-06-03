import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'

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
          onClick={(e) => {
            e.stopPropagation()
            onSelect(plan)
            onOpenModal()
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
          <li className={styles.featureItem}>
            <img src="/icons/cloud.svg" alt="ГБ" /> Безлимит ГБ
          </li>
          <li className={styles.featureItem}>
            <img src="/icons/courses.svg" alt="Курсы" /> 3 курса
          </li>
          <li className={styles.featureItem}>
            <img src="/icons/students.svg" alt="Ученики" /> 10 учеников
          </li>
          <li className={styles.featureItem}>
            <img src="/icons/staff.svg" alt="Сотрудники" /> 4 сотрудника
          </li>
          <li className={`${styles.featureItem} ${styles.listItemDisabled}`}>White Label</li>
          <li className={`${styles.featureItem} ${styles.listItemDisabled}`}>Свой домен</li>
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
      <div className={styles.courseHubTitle}>Тарифные планы для обучения Course Hub</div>

      <motion.div
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, ease: 'easeInOut', duration: 1.3 }}
        className={styles.container}
      >
        <section className={styles.TariffPlansPage}>
          <div className={styles.TariffPlansPage_plansBlock}>
            <Typography gutterBottom variant="h5" sx={{ textAlign: 'center' }}>
              <p className={styles.TariffPlansPage_header}>Тарифные планы для обучения Course Hub</p>
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
          </div>

          {isModalOpen && selected && (
            <Portal closeModal={closeModal}>
              <TariffDetailModal tariff={selected} setShowModal={closeModal} />
            </Portal>
          )}
        </section>
      </motion.div>
    </>
  )
}
