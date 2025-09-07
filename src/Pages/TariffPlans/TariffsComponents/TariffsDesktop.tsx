import styles from '../TariffPlans.module.scss'
import { CloudIconPath, PeopleIconPath, ClipboardListIconPath, ConfigurationIconPath, MailNotificationsIconPath } from 'assets/Icons/svgIconPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { coursesStatsNavPath } from 'components/Navbar/config/svgIconPath'
import prizeStart from '../images/prizeStart.png'
import prizePersonal from '../images/prizePersonal-tariff.png'
import { FC } from 'react'

export const TariffsDesktop: FC = () => {
  return (
    <div style={{ marginTop: '30px' }} className={styles.benefit}>
      <div className={styles.tariffs}>
        <span className={styles.tariffs_start}>
          <div className={styles.tariffs_start_title}>Бесплатный тариф &ldquo;Start&rdquo;</div>
          <div className={styles.tariffs_start_days}>14 дней бесплатно</div>
          <div className={styles.tariffs_start_block}>
            <img src={prizeStart} alt="prizeStart" />
            <div>
              <ul>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(51, 47, 54, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={ConfigurationIconPath}
                    />
                  </span>
                  <span>1 курс</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(51, 47, 54, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 50 50"
                      path={coursesStatsNavPath}
                    />
                  </span>
                  <span>До 10 учеников</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(51, 47, 54, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={ClipboardListIconPath}
                    />
                  </span>
                  <span>Конструктор лендингов</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(51, 47, 54, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={MailNotificationsIconPath}
                    />
                  </span>
                  <span>Приём платежей</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', height: '1vw' }}>
                  <span style={{ display: 'flex', verticalAlign: 'top' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(51, 47, 54, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                    />
                  </span>
                  <span>и онлайн касса</span>
                </li>
                <li>
                  <div className={styles.getConsultStart} style={{ display: 'flex', alignItems: 'left' }}>
                    <a href="https://t.me/course_hub_olya/" target="_blank" rel="noreferrer">
                      <button>Получить консультацию</button>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </span>
        <span className={styles.tariffs_personal}>
          <div className={styles.tariffs_personal_title}>Премиальный тариф &ldquo;Personal&rdquo;</div>
          <div className={styles.tariffs_personal_function}>Персонально подберём для вас нужные функции</div>
          <div className={styles.tariffs_personal_block}>
            <img src={prizePersonal} alt="prizePersonal" />
            <div>
              <ul>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(255, 255, 255, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={CloudIconPath}
                    />
                  </span>
                  <span>Настройка ГБ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(255, 255, 255, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={ClipboardListIconPath}
                    />
                  </span>
                  <span>Настройка курсов</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(255, 255, 255, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 50 50"
                      path={coursesStatsNavPath}
                    />
                  </span>
                  <span>Настройка учеников</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.tariffs_icon}
                      styles={{ color: 'rgba(255, 255, 255, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={PeopleIconPath}
                    />
                  </span>
                  <span>Настройка сотрудников</span>
                </li>
                <li>
                  <div className={styles.getConsultPersonal} style={{ display: 'flex' }}>
                    <a href="https://t.me/course_hub_olya/" target="_blank" rel="noreferrer">
                      <button>
                        <div>Получить консультацию</div>
                      </button>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </span>
      </div>
    </div>
  )
}
