import { Button } from '../../../components/common/Button/Button'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import { Footer } from "../../../components/Footer/index";
import { InitPageHeader } from "../../Initial/newInitialPageHeader";
import { FC, memo, useState } from "react";
import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '../../../assets/Icons/svgIconPath'

export const HelpPlatformSettings = () => {
  const { role } = useAppSelector(selectUser)
  const navigate = useNavigate()

  const handleHelpPage = () => {
    navigate(generatePath(Path.HelpPage))
  }

  const handleLoginPage = () => {
    navigate(generatePath(Path.LoginPage))
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

      <InitPageHeader/>

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.help_title_container}>
            <div onClick={handleHelpPage} className={styles.back_btn}>
              <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={24} width={18} />
            </div>
            <p>Настройки платформы</p>
            <div></div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Переходим на страничку настроек платформы</h3>
            </div>
            <p className={styles.section_text}>{`Кликните на панели слева по "Шестерёнке".`}</p>
            <p className={styles.section_text}>{`Для редактирования оформления нажмите кнопку "Настроить страницу курсов". Найти её можно чуть ниже иконки пользователя`}</p>
            <p className={styles.section_text}>{`Здесь вы сможете изменить фон секции, короткое описание, а также название и аватар платформы. После внесения всех изменений нажмите кнопку "Завершить настройку курсов"`}</p>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (7).png")}
              alt="Окно входа"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (8).png")}
              alt="Кнопка входа"
            />
          </div>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>2</div>
              <h3 className={styles.section_title_text}>Основные настройки платформы</h3>
            </div>
            <p className={styles.section_text}>{`Для перехода к основным настройкам кликните вкладку "Основные"`}</p>
            <p className={styles.section_text}>{`Здесь можно поменять название платформы, которое будет отображаться в адресах, относящихся к вашей платформе. Если вы делились с кем либо url ссылками на вашу платформу - то после изменения по старым url адресам она будет не доступна. Частая смена не рекомендуется.`}</p>
            <p className={styles.section_text}>{`Также здесь можно внести ссылку на адрес публичного договора оферты (web-ссылка на ваш договор, по которой можно перейти и ознакомится) и ссылку на связь с руководством платформы (сслыка на вашу страничку или группу в любой социальной сети, где с вами можно связаться по вопросам платформы)`}</p>
          </div>
        </div>

      </div>

      <div className={mainHelpStyles.ctaBlock}>
        <div className={mainHelpStyles.ctaTextRow}>
          <div className={mainHelpStyles.ctaText}>
            <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
            <p>
            Попробуйте весь функционал в процессе использования и познай, насколько он удобен
            </p>
            <Button text="Попробовать бесплатно" variant="newLeaveRequest" onClick={handleRegistrationUser} />
            <div className={mainHelpStyles.ctaImage}>
              <img src={require("../../../assets/img/common/cta-image.png")} alt="CTA-изображение" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>

  )
}