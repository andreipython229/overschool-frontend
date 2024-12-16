import { FC } from 'react'
import styles from './winner.module.scss'
import avatar from '../../../../components/StudentProgressBlock/assets/defaultPerson.png'

export const PrizeWinner: FC = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.wrapper_avatar} src={avatar} alt="" />
      <p className={styles.wrapper_text}>n*******v@gmail.com Выйграл 20 % скидки на любой курс</p>
    </div>
  )
}
