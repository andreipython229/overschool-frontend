import React from 'react'
import styles from './SalaryViewBlockCard.module.scss'
import { useAppSelector } from 'store/hooks'
import { SalaryCardViewPropT } from '../../types/LandingT'

export const SalaryViewBlockCard: React.FC<SalaryCardViewPropT> = ({ position, isFirst }) => {
  const landing = useAppSelector(state => state.landing.blocks)

  return (
    <div className={`${styles.wrapper} ${isFirst ? styles.firstWrapper : ''}`}>
      <div className={styles.wrapper_imageBox}>
        <img src={landing.income.chips[position].photo} alt={landing.income.chips[position].photo} width={100} height={150} />
      </div>
      <div>
        <div className={styles.wrapper_title}>
          <div className={styles.wrapper_title_text}>{landing.income.chips[position].title}</div>
        </div>
        <div className={styles.wrapper_description}>
          <div className={styles.wrapper_description_text}>{landing.income.chips[position].description}</div>
        </div>
      </div>
    </div>
  )
}
