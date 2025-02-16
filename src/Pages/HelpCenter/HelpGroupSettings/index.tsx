import { generatePath, useNavigate } from "react-router-dom";
import { FC, memo, useState } from "react";
import { Path } from "../../../enum/pathE";
import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { logo } from "../../../assets/img/common";
import { Button } from "../../../components/common/Button/Button";
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { InitPageHeader } from "../../Initial/newInitialPageHeader";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '../../../assets/Icons/svgIconPath'
import { Footer } from "../../../components/Footer/index";


export const HelpGroupSettings = () => {
  const navigate = useNavigate()
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegistrationOpen, setRegistrationOpen] = useState(false);

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

      <InitPageHeader setLoginShow={setLoginOpen} setRegistrationShow={setRegistrationOpen} />

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.help_title_container}>
            <div onClick={handleHelpPage} className={styles.back_btn}>
              <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={24} width={18} />
            </div>
            <p>Настройка группы</p>
            <div></div>
          </div>
        </div>



        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Переход к настройкам группы</h3>
            </div>
            <p className={styles.section_text}>{`Для того, чтобы перейти к настройкам группы, 
            на странице "Пользователи курса" в нужной вам группе кликните по "Шестерёнке". В 
            загрузившемся окне появятся настройки группы.`}</p>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/go_to_groups_settings.png")}
              alt="К настройкам группы"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/groups_settings.png")}
              alt="Настройки группы"
            />
          </div>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>2</div>
              <h3 className={styles.section_title_text}>Настройки группы</h3>
            </div>
            <p className={styles.section_text}>{`Здесь вы можете выбрать настройки для группы: блокировать 
            возможность отправки домашних заданий, строгая последовательность занятий, доступ пользователей
             группы к пользованию OVER AI, возможность получения пользователями сертификата после прохождения
              курса. Также, если вы хотите ограничить срок обучения по времени, можно установить продолжительность обучения в днях.`}</p>
          </div>
        </div>


        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>3</div>
              <h3 className={styles.section_title_text}>Настройка доступа к урокам</h3>
            </div>
            <p className={styles.section_text}>{`Внизу окна есть кнопка "Показать  все уроки"
          , при нажатии отображаются все уроки курса, а также появляется  возможность настройки
           доступа к урокам.`}</p>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/access_groups_settings.png")}
              alt="Доступ к урокам"
            />
          </div>
        </div>
      </div>

      <div className={mainHelpStyles.ctaBlock}>
        <div className={mainHelpStyles.ctaText}>
          <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
          <p>
            Попробуйте весь функционал в процессе использования и узнайте, как
            удобно работать на нашей платформе.
          </p>
          <Button
            text="Попробовать бесплатно"
            variant="newLeaveRequest"
            onClick={handleRegistrationUser}
          />
        </div>
        <div className={mainHelpStyles.ctaImage}>
          <img
            src={require("../../../assets/img/common/cta-image.png")}
            alt="CTA-изображение"
          />
        </div>
      </div>

      <Footer />
    </div>

  )
}