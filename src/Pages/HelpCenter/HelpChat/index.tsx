import { generatePath, useNavigate } from "react-router-dom";
import { Path } from "@/enum/pathE";
import { Button } from "@/components/common/Button/Button";

import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { Footer } from "@/components/Footer/index";
import { InitPageHeader } from "@/Pages/Initial/newInitialPageHeader";
import { IconSvg } from '@/components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '@/assets/Icons/svgIconPath'
import chat from "@/assets/img/help/Изображение для 'помощь_ (11).png"
import ctaImage from '@/assets/img/common/cta-image.png'


export const HelpChat = () => {
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
            <p>Как создать чат</p>
            <div></div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Создание чата</h3>
            </div>
            <p className={styles.section_text}>{`В онлайн-школе вы можете общаться с пользователем через групповые и индивидуальные чаты.`}</p>
            <p className={styles.section_text}>{`Для создания группового чата просто создайте группу пользователей, и чат автоматически создастся с участниками этой группы.`}</p>
            <p className={styles.section_text}>{`Для доступа ко всем вашим чатам, вы можете нажать на иконку "Чаты" на навигационной панели слева. Там вы найдете все созданные вами чаты, чтобы легко переключаться между ними и общаться с пользователями`}</p>
          </div>
          <div className={styles.img_part_t2}>
            <img
              src={chat}
              alt="Окно входа"
            />
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
              <img src={ctaImage} alt="CTA-изображение" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}