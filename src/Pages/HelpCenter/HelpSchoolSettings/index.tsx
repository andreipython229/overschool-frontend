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

export const HelpSchoolSettings = () => {
  const { role } = useAppSelector(selectUser)
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
            <p>Как создать курс в онлайн-платформе Course Hub</p>
            <div></div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Шаги по созданию курса</h3>
            </div>
            <p className={styles.section_text}>{`В личном кабинете вашей школы выберите опцию "Создать курс".`}</p>
            <p className={styles.section_text}>{`После  ввода названия курса он станет доступен для редактирования. Теперь вы  можете создать структуру курса, добавляя тематические модули и наполняя их занятиями. Следующим этапом станет добавление пользователей.`}</p>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_.png")}
              alt="Окно входа"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (1).png")}
              alt="Кнопка входа"
            />
          </div>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>2</div>
              <h3 className={styles.section_title_text}>Как создать занятие</h3>
            </div>
            <p className={styles.section_text}>{`После создания модулей, добавьте в них занятия. Занятия могут быть трех типов: обычные, домашние задания и тесты.`}</p>
            <p className={styles.section_text}>{`При создании занятия можно использовать текст, видео, изображения и код, а также прикреплять необходимые файлы.`}</p>
            <p className={styles.section_text}>{`Для создания занятия-теста укажите название теста и требуемый процент  правильных ответов. Затем укажите вопросы и варианты ответов на них, которые могут быть представлены как текстом, так и картинками`}</p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>3</div>
              <h3 className={styles.section_title_text}>Как добавить пользователей</h3>
            </div>
            <p className={styles.section_text}>{`Для добавления пользователей создайте требуемое количество групп, выберете  нужную вам группу и нажмите добавить пользователей. Заполните форму  данными пользователей и отправьте приглашение.`}</p>
            <p className={styles.section_text}>{`Также для групп есть возможность добавления менторов. Для этого необходимо  выбрать менторов, доступных в вашей школе. Добавить менторов в школу  можно в настройках, в разделе "Сотрудники"`}</p>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (2).png")}
              alt="Окно входа"
            />
          </div>
        </div>

      </div>

      <div className={`${mainHelpStyles.ctaBlock} ${styles.ctaBlock}`}>
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