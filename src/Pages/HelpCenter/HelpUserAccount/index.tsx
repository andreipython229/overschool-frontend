import { Button } from '@/components/common/Button/Button'
import { Path } from '@/enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'

import styles from '../HelpPagesCommon.module.scss'
import mainHelpStyles from '../HelpPage.module.scss'
import { Footer } from '@/components/Footer/index'
import { InitPageHeader } from '@/Pages/Initial/newInitialPageHeader'
import { IconSvg } from '@/components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '@/assets/Icons/svgIconPath'
import userAccount from "@/assets/img/help/Изображение для 'помощь_ (9).png"
import userAccount2 from "@/assets/img/help/Изображение для 'помощь_ (10).png"
import ctaImage from '@/assets/img/common/cta-image.png'

export const HelpUserAccount = () => {
  const navigate = useNavigate()

  const handleHelpPage = () => {
    navigate(generatePath(Path.HelpPage))
  }

  const handleRegistrationUser = () => {
    navigate(generatePath(Path.CreateSchool))
  }
  return (
    <div className={`${mainHelpStyles.helpPage} ${styles.helpPage}`}>
      <div className={mainHelpStyles.bg}>
        <div className={mainHelpStyles.bg_wrap1}></div>
        <div className={mainHelpStyles.bg_wrap2}></div>
        <div className={mainHelpStyles.bg_wrap3}></div>
        <div className={mainHelpStyles.bg_wrap4}></div>
      </div>

      <InitPageHeader />

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.help_title_container}>
            <div onClick={handleHelpPage} className={styles.back_btn}>
              <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={24} width={18} />
            </div>
            <p>Как настроить аккаунт</p>
            <div></div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Переходим на страничку акканута</h3>
            </div>
            <p
              className={styles.section_text}
            >{`Кликните в правом верхнем углу по иконке пользователя. В появившемся контекстном меню выберите пункт "Открыть профиль"`}</p>
          </div>
          <div className={styles.img_part_t2}>
            <img src={userAccount} alt="Окно входа" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part_t2}>
            <img src={userAccount2} alt="Кнопка входа" />
          </div>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>2</div>
              <h3 className={styles.section_title_text}>Заполнение профиля</h3>
            </div>
            <p className={styles.section_text}>{`В загрузившемся окне появится форма для заполнения.`}</p>
            <p
              className={styles.section_text}
            >{`Для изменения автара щёлкните по изображению пользователя в графе "Аватар" и выберите фото с вашего устройства. После заполнения всех полей нажмите кнопку "Сохранить", которая расположена в самом низу`}</p>
          </div>
        </div>
      </div>

      <div className={mainHelpStyles.ctaBlock}>
        <div className={mainHelpStyles.ctaTextRow}>
          <div className={mainHelpStyles.ctaText}>
            <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
            <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
            <Button text="Попробовать бесплатно" variant="newLeaveRequest" onClick={handleRegistrationUser} />
            <div className={mainHelpStyles.ctaImage}>
              <img src={ctaImage} alt="CTA-изображение" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
