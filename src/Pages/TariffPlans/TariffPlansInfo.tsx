import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlansInfo.module.scss'

import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'
import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { FC, useEffect, useState } from 'react'
import { useBoolean } from 'customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'
import { motion } from 'framer-motion'
import {generatePath, useNavigate} from "react-router-dom";
import {Path} from "../../enum/pathE";
import {logo} from "../../assets/img/common";
import {Typography} from "@mui/material";


export const TariffPlansInfo: FC = () => {
  const { data, isFetching, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>()
  const [isModalOpen, { off: open, on: close }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT>()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const table = [...data]

      setTariffPlanTable(table.sort((obj1, obj2) => Number(obj1.price) - Number(obj2.price)))
    }
  }, [isSuccess, data])

  const handleLoginPage = () => {
      navigate(generatePath(Path.LoginPage))
  }

  const handleRegistrationUser = () => {
      navigate(generatePath(Path.CreateSchool))
  }

  const handleRegistrationSchool = () => {
    const paramsString = localStorage.getItem('utmParams');
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString);
      const queryParams = Object.keys(parsedParams)
        .map(key => `${key}=${parsedParams[key]}`)
        .join('&');
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`;
      navigate(pathWithParams);
    } else {
      navigate(Path.CreateSchool);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y:1000,
      }}
      animate={{
        opacity:1,
        y:0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
        ease:'easeInOut',
        duration: 1.3,
      }}
      className={styles.container}>
      <div style={{display: "block", }}>
        <div className={styles.bg}>
          <div className={styles.bg_wrap1}></div>
        </div>
        <div className={styles.bg}>
            <div className={styles.bg_wrap2}></div>
        </div>
        <div className={styles.bg}>
            <div className={styles.bg_wrap3}></div>
        </div>
        <div className={styles.bg}>
            <div className={styles.bg_wrap4}></div>
        </div>
      <section className={styles.TariffPlansPage} style={{height: "100%"}}>
        <div className={styles.TariffPlansPage_plansBlock}>
            <Typography gutterBottom variant="h5" sx={{ width: '100%', textAlign: 'center' }} color={'#ba75ff'} component="div">
              <p className={styles.TariffPlansPage_header} style={{fontSize: "1.5rem"}}>
                Тарифные планы{' '}
                <a
                  href={Path.InitialPage}
                  className={styles.headerButton}
                  style={{
                    textDecoration: 'none',
                    color: '#ba75ff',
                    fontWeight: 'bold',
                    padding: '0.5rem',
                    border: '2px solid #ba75ff',
                    borderRadius: '7px',
                  }}
                >
                  <img src={logo} alt="Logotype ITOVERONE" />
                  <p>Overschool.by</p>
                </a>
              </p>
            </Typography>
          <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
            {tariffPlanTable?.map((plan, index: number) => (
              <div className={styles.TariffPlansPage_plansBlock_cardGroup_card} key={index}>
                <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                  <h3>{plan.name}</h3>
                  <hr />
                  <ul style={{marginBottom: '0.7em'}}>
                    <li>
                      Количество курсов:
                      <span>{plan.number_of_courses || '∞'}</span>
                    </li>
                    <li>
                      Количество сотрудников:
                      <span>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'}</span>
                    </li>
                    <li>
                      Студентов в месяц:
                      <span>{plan.students_per_month || '∞'}</span>
                    </li>
                    <li>
                      Всего студентов:
                      <span>{plan.total_students || '∞'}</span>
                    </li>
                    <li>
                      Цена в BYN:
                      <span>{plan.price !== '0.00' ? `${plan.price} рублей/мес.` : 'бесплатно'}</span>
                    </li>
                  <li>
                    Цена в RUB:
                    <span>{plan.price_rf_rub !== 0 ? `${plan.price_rf_rub} рублей/мес.` : 'бесплатно'}</span>
                  </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && selected && (
          <Portal closeModal={close}>
            <TariffDetailModal tariff={selected} setShowModal={close} />
          </Portal>
        )}
        <div className={styles.btnCreate}>
          <Button  onClick={handleRegistrationSchool} variant={'primary'} text={'Создать платформу'} />
        </div>
        <p style={{ margin: 'auto', fontSize: '30px', fontWeight: '800', textAlign: 'center', color: 'grey' }}>Часто задаваемые вопросы</p>
        <div className={styles.questions}>
          <div className={styles.questions_element}>
            <div className={styles.questions_element_mark}>
              <p>?</p>
            </div>
            <div className={styles.questions_element_text}>
              Как оплатить подписку со счета организации?
              <p className={styles.questions_element_text_description}>
                Для этого пришлите нам на почту support@overschool.by реквизиты для выставления счета, а также укажите желаемый тариф и период
                подключения. Мы сформируем и пришлем Вам счет для оплаты. Как только деньги поступят на счет, мы активируем Ваш тариф.
              </p>
            </div>
          </div>
          <div className={styles.questions_element}>
            <div className={styles.questions_element_mark}>
              <p>?</p>
            </div>
            <div className={styles.questions_element_text}>
              Что произойдет, когда оплаченный период закончится?
              <p className={styles.questions_element_text_description}>
                Вам и сотрудникам онлайн-школы будет ограничен доступ к использованию функционала. Для Ваших учеников доступ будет закрыт только через
                24 часа после окончания подписки - мы сделали это на случай, если Вы забудете вовремя продлить тариф. Все загруженные на платформу
                материалы сохранятся в полном порядке. При продлении подписки все доступы моментально откроются.
              </p>
            </div>
          </div>
          <div className={styles.questions_element}>
            <div className={styles.questions_element_mark}>
              <p>?</p>
            </div>
            <div className={styles.questions_element_text}>
              Бесплатный тариф “Intern” действительно бессрочный?
              <p className={styles.questions_element_text_description}>
                Верно, данный тариф доступен для использования без ограничений по времени. Его не нужно продлевать или активировать заново.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.TariffPlansPage_banner}>
          <div className={styles.TariffPlansPage_banner_createProject}>
            <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
            <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
              <div className={styles.main_btn}>
                <Button onClick={handleLoginPage} text={'Войти'} style={{ width: '160px', fontSize: "16px" }} variant={'primary'} />
                <Button onClick={handleRegistrationUser} variant={'primary'} text={'Создать проект'} style={{ width: '160px', fontSize: "16px", marginLeft: "5px"}}/>
              </div>
          </div>
          <div className={styles.TariffPlansPage_banner_images}>
            <img src={firstStep} alt="Создать проект" className={styles.TariffPlansPage_banner_images_firstStep} />
            <img src={secondStep} alt="Создать проект" className={styles.TariffPlansPage_banner_images_secondStep} />
          </div>
        </div>
      </section>
      </div>
    </motion.div>
  )
}