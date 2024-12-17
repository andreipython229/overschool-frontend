import { FC } from 'react'
import styles from '../../bonuses.module.scss'

interface IPrize {
  image: string
  header: string
  description: string
}

export const Prize: FC<IPrize> = ({ image, header, description }) => {
  return (
    <div className={styles.prizeWinnerWrapper}>
      <img src={image} alt="prize-icon" />
      <div className={styles.prizeWinnerWrapper_text}>
        <h3>{header}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
