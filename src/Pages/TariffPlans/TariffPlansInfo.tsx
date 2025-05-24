import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { generatePath, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

import { InitPageHeader } from '../Initial/newInitialPageHeader'
import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlansInfo.module.scss'

import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'

import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { useBoolean } from 'customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'
import { Path } from '../../enum/pathE'

export const TariffPlansInfo: FC = () => {
  const { data, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>([])
  const [isModalOpen, { on: openModal, off: closeModal }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data && isSuccess) {
      const sortedTable = [...data].sort((a, b) => Number(a.price) - Number(b.price))
      setTariffPlanTable(sortedTable)
    }
  }, [data, isSuccess])

  const handleLoginPage = () => {
    navigate(generatePath(Path.LoginPage))
  }

  const handleRegistrationUser = () => {
    navigate(generatePath(Path.CreateSchool))
  }

  const handleRegistrationSchool = () => {
    const paramsString = localStorage.getItem('utmParams')
    if (paramsString) {
      const parsedParams = JSON.parse(paramsString)
      const queryParams = Object.entries(parsedParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      navigate(`${Path.CreateSchool}?${queryParams}`)
    } else {
      navigate(Path.CreateSchool)
    }
  }

  return (
    <>
      <InitPageHeader />

      <motion.div
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, ease: 'easeInOut', duration: 1.3 }}
        className={styles.container}
      >
        <div style={{ display: 'block' }}>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={styles.bg}>
              <div className={styles[`bg_wrap${num}`]}></div>
            </div>
          ))}

          <section className={styles.TariffPlansPage} style={{ height: '100%' }}>
            <div className={styles.TariffPlansPage_plansBlock}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ width: '100%', textAlign: 'center' }}
                color="#ba75ff"
                component="div"
              >
                <p className={styles.TariffPlansPage_header} style={{ fontSize: '1.5rem' }}>
                  Тарифные планы
                </p>
              </Typography>

              <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
                {tariffPlanTable.map((plan, index) => (
                  <div className={styles.TariffPlansPage_plansBlock_cardGroup_card} key={index}>
                    <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                      <h3>{plan.name}</h3>
                      <hr />
                      <ul style={{ marginBottom: '0.7em' }}>
                        <li>
                          Количество курсов: <span>{plan.number_of_courses ?? '∞'}</span>
                        </li>
                        <li>
                          Количество сотрудников:{' '}
                          <span>
                            {plan.number_of_staff !== null
                              ? plan.number_of_staff !== 0
                                ? plan.number_of_staff
                                : '0'
                              : '∞'}
                          </span>
                        </li>
                        <li>
                          Студентов в месяц: <span>{plan.students_per_month ?? '∞'}</span>
                        </li>
                        <li>
                          Всего студентов: <span>{plan.total_students ?? '∞'}</span>
                        </li>
                        <li>
                          Цена в BYN:{' '}
                          <span>
                            {plan.price !== '0.00' ? `${plan.price} рублей/мес.` : 'бесплатно'}
                          </span>
                        </li>
                        <li>
                          Цена в RUB:{' '}
                          <span>
                            {plan.price_rf_rub !== 0 ? `${plan.price_rf_rub} рублей/мес.` : 'бесплатно'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isModalOpen && selected && (
              <Portal closeModal={closeModal}>
                <TariffDetailModal tariff={selected} setShowModal={closeModal} />
              </Portal>
            )}

            <div className={styles.btnCreate}>
              <Button onClick={handleRegistrationSchool} variant="primary" text="Создать платформу" />
            </div>

            <p
              style={{
                margin: 'auto',
                fontSize: '30px',
                fontWeight: '800',
                textAlign: 'center',
                color: 'grey',
              }}
            >
              Часто задаваемые вопросы
            </p>

            <div className={styles.questions}>
              {[
                {
                  question: 'Как оплатить подписку со счета организации?',
                  answer:
                    'Для этого пришлите нам на почту support@overschool.by реквизиты для выставления счета, а также укажите желаемый тариф и период подключения. Мы сформируем и пришлем Вам счет для оплаты. Как только деньги поступят на счет, мы активируем Ваш тариф.',
                },
                {
                  question: 'Что произойдет, когда оплаченный период закончится?',
                  answer:
                    'Вам и сотрудникам онлайн-школы будет ограничен доступ к использованию функционала. Для Ваших учеников доступ будет закрыт только через 24 часа после окончания подписки — мы сделали это на случай, если Вы забудете вовремя продлить тариф.',
                },
                {
                  question: 'Бесплатный тариф “Intern” действительно бессрочный?',
                  answer:
                    'Верно, данный тариф доступен для использования без ограничений по времени. Его не нужно продлевать или активировать заново.',
                },
              ].map(({ question, answer }, idx) => (
                <div className={styles.questions_element} key={idx}>
                  <div className={styles.questions_element_mark}>
                    <p>?</p>
                  </div>
                  <div className={styles.questions_element_text}>
                    {question}
                    <p className={styles.questions_element_text_description}>{answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.TariffPlansPage_banner}>
              <div className={styles.TariffPlansPage_banner_createProject}>
                <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
                <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
                <div className={styles.main_btn}>
                  <Button
                    onClick={handleLoginPage}
                    text="Войти"
                    style={{ width: '160px', fontSize: '16px' }}
                    variant="primary"
                  />
                  <Button
                    onClick={handleRegistrationUser}
                    variant="primary"
                    text="Создать проект"
                    style={{ width: '160px', fontSize: '16px', marginLeft: '5px' }}
                  />
                </div>
              </div>
              <div className={styles.TariffPlansPage_banner_images}>
                <img
                  src={firstStep}
                  alt="Создать проект"
                  className={styles.TariffPlansPage_banner_images_firstStep}
                />
                <img
                  src={secondStep}
                  alt="Создать проект"
                  className={styles.TariffPlansPage_banner_images_secondStep}
                />
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </>
  )
}
