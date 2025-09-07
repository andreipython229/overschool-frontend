import { generatePath, useNavigate } from 'react-router-dom'
import banner from '../images/banner.png'
import styles from '../TariffPlans.module.scss'
import { Path } from '../../../enum/pathE'
import { FC } from 'react'

export const BannerDesktop: FC = () => {
  const navigate = useNavigate()

  const handleRegistrationUser = () => {
    navigate(generatePath(Path.CreateSchool))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.TariffPlansPage_plansBlock_banner}>
        <div className={styles.TariffPlansPage_plansBlock_banner_createProject}>
          <h1>Создайте свой проект на Course Hub прямо сейчас!</h1>
          <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
          <button onClick={handleRegistrationUser}>Попробовать бесплатно</button>
        </div>
        <div className={styles.TariffPlansPage_plansBlock_banner_images}>
          <img src={banner} alt="Создать проект" />
        </div>
      </div>
    </div>
  )
}
