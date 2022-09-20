import styles from './Create.module.scss';
import create from '../../assets/img/mainPage/third.jpg'

export const Create = () => {
  return (
    <div className={styles.create}>
    <div className={styles.create__background}>01</div>
    <div>
      <p className={styles.create__title}>Создавайте курсы, которые полюбят Ваши клиенты и сотрудники</p>
      <ul className={styles.create__list}>
        <li className={styles.create__item}>Вебинары и конференции</li>
        <li className={styles.create__item}>Теоретические знания</li>
        <li className={styles.create__item}>Онлайн-тестирования</li>
        <li className={styles.create__item}>Домашние задания</li>
      </ul>
    </div>
    <div className={styles.create__border}>
      <img src={create}/>
    </div>
  </div>
  )
}