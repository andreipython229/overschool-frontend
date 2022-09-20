import styles from './Аvailable.module.scss'

export const Аvailable = () => {
  return (
    <div className={styles.available}>
    <div className={styles.available__image}></div>
    <div className={styles.available__background}>02</div>
    <div>
      <p className={styles.available__title}>Сделайте обучение удобным и доступным в любой момент</p>
      <p className={styles.available__subtitle}>Ваши ученики смогут обучаться с любых устройств и через бесплатное мобильное приложение</p>
      <div className={styles.available__btns}>
        <button className={styles.available__google}>Доступно в Google Play</button>
        <button className={styles.available__apple}>Доступно в App Store</button>
      </div>
    </div>
  </div>
  )
}