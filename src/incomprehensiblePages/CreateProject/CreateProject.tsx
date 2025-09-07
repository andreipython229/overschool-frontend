import styles from './CreateProject.module.scss'
import createProject from '../../assets/img/mainPage/createProject.jpg'

export const CreateProject = () => {
  return (
    <div className={styles.create}>
      <div className={styles.create__background}>03</div>
      <div>
        <p className={styles.create__title}>Легко управляйте обучением и слудите всеми за результатами</p>
        <p className={styles.create__subtitle}>
          Назначайте обучение, управляйте доступами, следите за результатами и активностью учеников в удобном для Вас интерфейсе
        </p>
      </div>
      <div className={styles.create__border}>
        <img className={styles.create__img} src={createProject} />
      </div>
    </div>
  )
}
