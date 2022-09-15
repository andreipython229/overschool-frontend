import { Youtube } from './Youtube'

import Logotype from '../../assets/img/logotype.svg'
import message from '../../assets/img/message.svg'

import styles from './WebinarPage.module.scss'

export const WebinarPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.strim}>
        <Youtube />
      </div>
      <div className={styles.chat}>
        <div className={styles.chat__header}>
          <div className={styles.chat__info}>
            <img className={styles.chat__logo} src={Logotype} alt="Logotype IT Overone" />
            <h3 className={styles.chat__title}>Онлайн чат</h3>
          </div>
          <div>
            <p className={styles.chat__members}>Участников: 305</p>
          </div>
        </div>
        <div className={styles.chat__container}></div>
        <div className={styles.form}>
          <div className={styles.form__header}>
            <img className={styles.form__logo} src={message} alt="Logotype IT Overone" />
            <p className={styles.form__title}>Написать сообщение в чат</p>
          </div>
          <form className={styles.form__container}>
            <textarea className={styles.form__textarea} placeholder="Текст сообщения..."></textarea>
            <div>
              <button type="submit" className={styles.form__send}>
                Отправить
              </button>
              <button className={styles.form__out}>Выйти </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
