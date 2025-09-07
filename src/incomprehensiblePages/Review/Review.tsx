import styles from './Review.module.scss'

export const Review = () => {
  return (
    <div>
      <div className={styles.review__container}>
        <div className={styles.review__info}>
          <h4 className={styles.review__title}>Удобный функционал, который легко освоить</h4>
          <p className={styles.review__text}>
            Платформа в разы превосходит по функциональности, работоспособности и логике построения ранее используемую нами систему. Также
            немаловажную роль играет клиентская поддержка - здесь мы всегда получаем профессиональную консультацию по любым вопросам. Приятно, что
            этот продукт не стоит на месте, а постоянно развивается, подстраиваясь под потребности клиентов.
          </p>
        </div>
        <div className={styles.review__author}>
          <img className={styles.review__photo} src="" alt="" />
          <p className={styles.review__name}>Анна Бобрик</p>
          <p className={styles.review__post}>рукодовитель образовательной программы ПНИиОР</p>
        </div>
      </div>
    </div>
  )
}
