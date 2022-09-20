import styles from './Benefits.module.scss'
import second from '../../assets/img/mainPage/second.jpg'

export const Benefits = () => {
  return (
    <>
    <div className={styles.benefits}>
    <div>
      <h3 className={styles.benefits__title}>Легко настроить и пользоваться</h3>
      <p className={styles.benefits__subtitle}>OVERSCHOOL позволит Вам самостоятельно создать первоклассные курсы, запустить обучение и продажи. Без технических навыков и сложных настроек</p>
    </div>
    <div className={styles.benefits__block}>
      <img className={styles.benefits__image} src={second} alt="main page"/>
      <ul className={styles.benefits__list}>
        <li className={styles.benefits__item}>Быстрее запустить обучение/вебинар с нуля</li>
        <li className={styles.benefits__item}>Проще создавать курсы и управлять обучением</li>
        <li className={styles.benefits__item}>Ученикам удобнее пользовать платформу</li>
      </ul>
    </div>
  </div>
    </>
  )
}