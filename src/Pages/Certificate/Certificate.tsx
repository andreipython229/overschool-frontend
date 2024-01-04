import logo from "./img/logo.svg";
import border from "./img/border.svg";
import logoHorizontal from "./img/logoHorizontal.svg";
import stamp from "./img/stamp.png";

import styles from './Certificate.module.scss';

export const Certificate = () => {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <picture className={styles.logo__img}>
            <source srcSet={logo} media="(min-width: 1025px)" />
            <source srcSet={logoHorizontal} media="(max-width: 1024px)" />
            <img src={logo} className={styles.logo__img} alt="logo" />
          </picture>
        </div>
        <div className={styles.certificate}>
          <div className={styles.certificate__header}>certificate</div>
          <div className={styles.certificate__producer}>
            <img className={styles.border} src={border} alt="border" />
            it overone programming school
          </div>
          <div className={styles.certificate__graduate}>mikhail reshatniou</div>
          <div className={styles.certificate__content}>
            Has successrully completed{" "}
            <span className={styles.bold}>python developer</span> course. Key skills: OOP,
            SQLite3 database course, frameworks Flask and Django and Github.
          </div>
          <div className={styles.signs}>
            <div className={styles.signs__date}>19.09.2022</div>
            <div className={styles.signs__content}>
              <div className={styles.sign}>
                <div className={styles.sign__signatory}>
                  Teacher
                  <br />
                  Sinikin Rostislav
                </div>
                <div className={styles.sign__img}></div>
              </div>
              <div className={styles.sign}>
                <div className={styles.sign__signatory}>
                  Director
                  <br />
                  Bolshov Nikita
                </div>
                <div className={styles.sign__img}>
                  <img className={styles.sign__stamp} src={stamp} alt="stamp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
