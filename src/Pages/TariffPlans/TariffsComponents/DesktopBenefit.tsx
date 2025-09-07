import styles from '../TariffPlans.module.scss'
import { FC } from 'react'
import add from '../images/add.png'

export const DesktopBenefit: FC = () => {
  return (
    <div style={{ marginTop: '40px' }} className={styles.benefit}>
      <div className={styles.benefit_wrap}>
        <table className={styles.benefit_wrap_table}>
          <tbody>
            <tr>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td className={styles.benefit_wrap_table_doubleRow}>
                  Мессенджер с чатами
                  <p>и каналами</p>
                </td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td>Автоматический зачёт</td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td>Выдача сертификатов</td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td className={styles.benefit_wrap_table_doubleRow}>
                  Публикация в каталоге
                  <p>CourseHub</p>
                </td>
              </td>
            </tr>
            <tr>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td className={styles.benefit_wrap_table_doubleRow}>
                  Искусственный интеллект
                  <p>CurseHub Ai</p>
                </td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td>Домашние задания</td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td className={styles.benefit_wrap_table_doubleRow}>
                  Умные комментарии
                  <p>к урокам</p>
                </td>
              </td>
              <td className={styles.analiticRow}>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td>Аналитика обучения</td>
              </td>
            </tr>
            <tr>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td className={styles.benefit_wrap_table_doubleRow}>
                  Отдельный сайт для
                  <p>каждого курса</p>
                </td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td>Рассылка по всем ученикам</td>
              </td>
              <td>
                <td className={styles.addLine}>
                  <img src={add} alt="add" />
                </td>
                <td>Мобильное приложение</td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
