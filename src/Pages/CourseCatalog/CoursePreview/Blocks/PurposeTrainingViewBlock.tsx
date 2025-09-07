import React from 'react'
import styles from './styles/purposeTrainingViewBlock.module.scss'
import { useAppSelector } from 'store/hooks'
import { PurposeTrainingViewBlockCard } from './components/PurposeTrainingViewBlockCard'
import arrowImage from '../../../../assets/img/common/arrow.png'
import arrowImageMobile from '../../../../assets/img/common/arrowMobile.png'
import { useMediaQuery } from '@mui/material'

export const PurposeTrainingViewBlock = () => {
  const landing = useAppSelector(state => state.landing.blocks)

  const isMobile = useMediaQuery('(max-width: 767px)')

  const getChips = () => {
    return landing.trainingPurpose.chips
  }

  return (
    <div className={styles.wrapper}>
      <h2>Чему Вы научитесь?</h2>
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>{landing.trainingPurpose.description}</div>
      </div>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={index}>
            <div
              className={`
                  ${styles.wrapper_cardContainer_chip}
                  ${card.position % 2 === 0 ? styles.wrapper_cardContainer_chip_leftChip : styles.wrapper_cardContainer_chip_rightChip}
                `}
            >
              <PurposeTrainingViewBlockCard position={card.position} />
            </div>
          </React.Fragment>
        ))}
      </div>
      {landing.trainingPurpose.chips.length === 8 && (
        <div className={styles.wrapper_arrow}>
          <img
            // src={arrowImage}
            src={isMobile ? arrowImageMobile : arrowImage}
            alt="arrowImage"
          />
        </div>
      )}
    </div>
  )
}
