import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../HelpPage.module.scss";
import { Footer } from "../../../components/Footer/index";
import { Button } from "components/common/Button/Button";
import { InitPageHeader } from "../../Initial/newInitialPageHeader";
import { Path } from "../../../enum/pathE";


const sections = [
  {
    title: "Гид по началу работы",
    image: require("../../../assets/img/common/map-pin.png"),
    link: "/help",
  },
  {
    title: "Как привязать домен?",
    image: require("../../../assets/img/common/domen.png"),
    link: "/help/domain",
  },
  {
    title: "Как создать школу?",
    image: require("../../../assets/img/common/default-icon.png"),
    link: "/help/school-settings",
  },
  {
    title: "Как добавить сотрудников?",
    image: require("../../../assets/img/common/3-user.png"),
    link: "/help/add-employee",
  },
  {
    title: "Настройка платформы",
    image: require("../../../assets/img/common/settingsPlatform.png"),
    link: "/help/platform-settings",
  },
  {
    title: "Как настроить аккаунт?",
    image: require("../../../assets/img/common/accaunt.png"),
    link: "/help/user-account",
  },
  {
    title: "Как создать чат?",
    image: require("../../../assets/img/common/chat.png"),
    link: "/help/chat",
  },
  {
    title: "Проверка домашних заданий",
    image: require("../../../assets/img/common/checkHW.png"),
    link: "/help/check-hw",
  },
  {
    title: "Over Ai",
    image: require("../../../assets/img/common/OverAi.png"),
    link: "/help/overai",
  },
  {
    title: "Настройки группы",
    image: require("../../../assets/img/common/groupsettings.png"),
    link: "/help/groups",
  },
];

export const HelpPage: FC = memo(() => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegistrationOpen, setRegistrationOpen] = useState(false);

  const handleRegistrationUser = () => {
    const paramsString = localStorage.getItem("utmParams");
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString);
      const queryParams = Object.keys(parsedParams)
        .map((key) => `${key}=${parsedParams[key]}`)
        .join("&");
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`;
      navigate(pathWithParams);
    } else {
      navigate(Path.CreateSchool);
    }
  };

  return (
    <div className={styles.helpPage}>
      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
        <div className={styles.bg_wrap2}></div>
        <div className={styles.bg_wrap3}></div>
        <div className={styles.bg_wrap4}></div>
      </div>

      <InitPageHeader setLoginShow={setLoginOpen} setRegistrationShow={setRegistrationOpen} />
      <div className={styles.helpBlock}>
        <img src={require("../../../assets/img/common/help-header.png")} alt="Лэптоп с вопросами" />
      </div>
      <div className={styles.sections}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`${styles.section} ${hoveredIndex === index ? styles.section_variant2 : styles.section_default}`}
            onClick={() => navigate(section.link)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              className={`${styles.sectionImage} ${hoveredIndex === index ? styles.imageHover : ""}`}
              src={section.image}
              alt={section.title}
            />
            <p>{section.title}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaBlock}>
        <div className={styles.ctaText}>
          <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
          <p>
            Попробуйте весь функционал в процессе использования и узнайте, как
            удобно работать на нашей платформе.
          </p>
          <Button text="Попробовать бесплатно" variant="newLeaveRequest" onClick={handleRegistrationUser} />
        </div>
        <div className={styles.ctaImage}>
          <img src={require("../../../assets/img/common/cta-image.png")} alt="CTA-изображение" />
        </div>
      </div>
      <div className={styles.faqBlock}>
        <img src={require("../../../assets/img/common/faq.png")} alt="Часто задаваемые вопросы" />
      </div>

      <Footer />
    </div>
  );
});
