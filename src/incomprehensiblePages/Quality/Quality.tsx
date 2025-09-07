import styles from './Quality.module.scss'
import stack from '../../assets/img/mainPage/stack.svg'
import first from '../../assets/img/mainPage/first.jpg'

export const Quality = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.quality__one}>
          <img className={styles.quality__svg} src={stack} alt="stack" />
          <p className={styles.quality__subtitle}>удобная платформа для онлайн-обучения</p>
        </div>
        <div>
          <h2 className={styles.quality__title}>Качество обучения всегда в приоритете</h2>
          <p className={styles.quality__suptitle}>
            Одна из самых удобных платформа для онлайн-курсов и вебинаров, на которой удобно учиться и обучать. Зарегистрируйтесь и получите
            бесплатный тариф!
          </p>
        </div>
        <div className={styles.quality__btns}>
          <a className={`${styles.quality__btn} ${styles.btn__free}`}>Получить бесплатный тариф</a>
          <a className={`${styles.quality__btn} ${styles.btn__write}`}>Записаться на демострацию</a>
        </div>
      </div>
      <img className={styles.quality__image} src={first} alt="main page" />
    </>
  )
}
