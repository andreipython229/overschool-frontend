import { Button } from '../../../components/common/Button/Button'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'

import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { Footer } from "../../../components/Footer/index";
import { InitPageHeader } from "../../Initial/newInitialPageHeader";
import { FC, memo, useState } from "react";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '../../../assets/Icons/svgIconPath'


export const HelpSchoolPage = () => {
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
            <p>Как добавить сотрудников</p>
            <div></div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Управление сотрудниками платформы</h3>
            </div>
            <p className={styles.section_text}>{`Для перехода к настройке персонала кликните вкладку "Сотрудники"`}</p>
            <p className={styles.section_text}>{`Здесь вы сможете добавлять новых сотрудников платформы. При добавлении  нового сотрудника вы указываете его email, на который позже ему придёт сообщение с данными для входа.`}</p>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (3).png")}
              alt="Окно входа"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (4).png")}
              alt="Кнопка входа"
            />
          </div>
          <div className={styles.text_part}>
            <p className={styles.section_text}>{`По ролям на выбор будут предлагаться два варианта: ментор и  администратор. Внешний вид страницы платформы пользователя с ролью  "Администратор" никак не отличается от вашего. Но у пользователя с ролью  "Ментор" будет ряд ограничений, ему не будут доступны настрйоки  платформы, а внешний вид страницы школы будет следующим:`}</p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>2</div>
              <h3 className={styles.section_title_text}>Добавление печатей и подписей</h3>
            </div>
            <p className={styles.section_text}>{`Для того, чтобы ваши пользователи получали сертификаты с вашими, их нужно добавить, перейдя во вкладку `}<strong>&quot;Печати и подписи&quot;</strong></p>
            <p className={styles.section_text}>{`Следует отметить, что к добавлению подлежат только изображения, отвечающие следующим рекомендациям:`}</p>
            <ol>
              <li>
                Формат файла PNG (без заднего фона)
              </li>
              <li>
                Размер файла не более 2 мб
              </li>
              <li>
                Оптимальный размер печати 200px х 200px
              </li>
            </ol>
          </div>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (5).png")}
              alt="Окно входа"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part}>
            <img
              src={require("../../../assets/img/help/Изображение для 'помощь_ (6).png")}
              alt="Кнопка входа"
            />
          </div>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>3</div>
              <h3 className={styles.section_title_text}>Основные настройки платформы</h3>
            </div>
            <p className={styles.section_text}>
              Для того, чтобы получать оплату за курсы, нужно выбрать одну из платёжных систем:  
              <a href="https://prodamus.ru" target="_blank" rel="noopener noreferrer">Prodamus</a>,  
              <a href="https://express-pay.by" target="_blank" rel="noopener noreferrer">ExpressPay</a>.
            </p>
            <p className={styles.section_text}>{`Выберите  подходящую для вас и зарегситрируйтесь на ней. После перейдите во  вкладку "Оплата курсов", там нажать кнопку "Добавить способ оплаты" и  внести все необходимые реквизиты в форму:`}</p>
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
