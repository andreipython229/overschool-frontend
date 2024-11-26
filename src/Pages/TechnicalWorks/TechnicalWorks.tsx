import { Game } from './Game/Game'
import styles from './TechnicalWorks.module.scss'
import cloud from '../../assets/img/technicalWorks/cloud.png'
import person from '../../assets/img/technicalWorks/person-relax.png'

export const TechnicalWorks = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_person}>
          <img className={styles.wrapper_image} src={person} alt="person"/>
        </div>
        <div className={styles.wrapper_content}>
          <div className={styles.wrapper_content_image}>
            <img className={styles.wrapper_image} src={cloud} alt="cloud"/>
          </div>
          <div className={styles.wrapper_content_text}>
            <p className={styles.wrapper_content_text_sorry}>Извините &#40;</p>
            <p>Страница сейчас недоступна из-за проведения технических работ.</p>
            <p>Скоро вернемся с новыми силами!</p>
          </div>
          <Game />
        </div>
      </div>
    </div>
  )
}
