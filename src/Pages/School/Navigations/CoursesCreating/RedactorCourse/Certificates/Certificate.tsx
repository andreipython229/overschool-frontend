import React from 'react'
import styles from './certificate.module.scss'

const Certificate: React.FC = () => {
  return (
    <div className={styles.mockupBg}>
      {/* Хедер с персонажами */}
      <div className={styles.headerBlock}>
        <img src="/images/certificate/certificate-header.png" alt="Header Characters" className={styles.headerImg} />
      </div>
      {/* Сертификат в рамке */}
      <div className={styles.certificateFrame}>
        <div className={styles.certificateCard}>
          {/* Логотип CourseHub в правом верхнем углу */}
          <img src="/images/certificate/coursehub-logo.png" alt="CourseHub Logo" className={styles.logoImg} />
          <div className={styles.certificateTitleBlock}>
            <span className={styles.certificateTitle}>CERTIFICATE</span>
            <span className={styles.certificateSubtitle}>OF ACHIEVEMENT</span>
          </div>
          <div className={styles.certificateSchoolRibbon}>IT COURSEHUB PROGRAMMING SCHOOL</div>
          <div className={styles.certificateName}>NAME AND SURNAME</div>
          <div className={styles.certificateLine} />
          <div className={styles.certificateDesc}>
            Has successfully complemented <b>UX/UI design</b> course. During the training, studied design theory, went from project idea to
            implementation, learned how to design a landing page, an online, a mobile application.
          </div>
          <div className={styles.certificateFooterRow}>
            <div className={styles.certificateFooterLeft}>
              <div className={styles.certificateDate}>03.10.2024</div>
              <div className={styles.certificateDateLabel}>DATA</div>
            </div>
            <div className={styles.certificateFooterCenter}>
              <img src="/images/certificate/certificate-stamp.png" alt="Stamp" className={styles.stampImg} />
            </div>
            <div className={styles.certificateFooterRight}>
              <div className={styles.signatureBlock}>
                <img src="/images/certificate/signature.png" alt="Teacher Signature" className={styles.signatureImg} />
                <div className={styles.signatureLabel}>TEACHER</div>
              </div>
              <div className={styles.signatureBlock}>
                <img src="/images/certificate/signature.png" alt="Director Signature" className={styles.signatureImg} />
                <div className={styles.signatureLabel}>DIRECTOR</div>
              </div>
            </div>
          </div>
          {/* Девочка */}
          <img src="/images/certificate/character.png" alt="Girl" className={styles.characterImg} />
        </div>
        {/* Канцелярия/кактус */}
        <img src="/images/certificate/pencils.png" alt="Pencils" className={styles.pencilsImg} />
      </div>
    </div>
  )
}

export default Certificate
