import styles from '../TariffPlans.module.scss'
import { FC } from 'react'
import addMobile from '../images/addMobile.png'

export const MobileBenefit: FC = () => {
  return (
    <div style={{ marginTop: '20px' }} className={styles.benefit}>
      <div className={styles.benefit_wrap}>
        <table className={styles.benefit_wrap_table}>
          <tbody>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td className={styles.benefit_wrap_table_doubleRow}>
                Мессенджер с чатами
                <p>и каналами</p>
              </td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td className={styles.benefit_wrap_table_doubleRow}>
                Искусственный интеллект
                <p>CurseHub Ai</p>
              </td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td className={styles.benefit_wrap_table_doubleRow}>
                Отдельный сайт для каждого
                <p>курса</p>
              </td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Автоматический зачёт</td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Домашние задания</td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Рассылка по всем ученикам</td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Выдача сертификатов</td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td className={styles.benefit_wrap_table_doubleRow}>
                Умные комментарии
                <p>к урокам</p>
              </td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Мобильное приложение</td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td className={styles.benefit_wrap_table_doubleRow}>
                Публикация в каталоге
                <p>CourseHub</p>
              </td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Аналитика обучения</td>
            </tr>
            <tr>
              <td className={styles.addLine}>
                <img src={addMobile} alt="add" />
              </td>
              <td>Мобильное приложение</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
