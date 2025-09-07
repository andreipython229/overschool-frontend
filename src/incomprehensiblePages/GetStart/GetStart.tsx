import styles from './GetStart.module.scss'
import getstart from '../../assets/img/mainPage/getstart.jpg'

export const GetStart = () => {
  return (
    <div className={styles.available}>
      <img className={styles.available__image} src={getstart} />
      <div className={styles.available__background}>04</div>
      <div>
        <p className={styles.available__title}>Начните принимать платежи уже прямо сейчас</p>
        <p className={styles.available__subtitle}>Подключите платежную систему и облачную онлайн-кассу в один клик бесплатно!</p>
        <ul className={styles.available__list}>
          <li className={styles.available__item}>Комиссия только за эквайринг — 2,8%</li>
          <li className={styles.available__item}>Бесплатная онлайн-касса для выдачи чеков</li>
          <li className={styles.available__item}>Для самозанятых, ИП и ООО</li>
        </ul>
      </div>
    </div>
  )
}
