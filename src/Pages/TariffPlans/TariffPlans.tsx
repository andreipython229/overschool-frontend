import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlans.module.scss'

import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'
import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { FC, useEffect, useState } from 'react'

export const TariffPlans: FC = () => {
  const { data, isFetching, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>()

  useEffect(() => {
    if (data) {
      setTariffPlanTable(data)
    }
  }, [isSuccess])

  if (isFetching) {
    return <SimpleLoader />
  }

  return (
    <section className={styles.TariffPlansPage}>
      <div className={styles.TariffPlansPage_plansBlock}>
        <p style={{ fontWeight: '500', fontSize: '16px' }}>Смена тарифного плана</p>
        <h1>Тарифные планы</h1>
        <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
          {tariffPlanTable?.map((plan, index: number) => (
            <div className={styles.TariffPlansPage_plansBlock_cardGroup_card} key={index}>
              <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                <h3>{plan.name}</h3>
                <hr />
                <ul style={{ marginBottom: '1em' }}>
                  <li>
                    Количество курсов:
                    <span>{plan.number_of_courses || '∞'}</span>
                  </li>
                  <li>
                    Количество сотрудников:
                    <span>{plan.number_of_staff || '∞'}</span>
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
                    Цена:
                    <span>{plan.price !== '0.00' ? `${plan.price} рублей` : 'бесплатно'}</span>
                  </li>
                </ul>
                <Button text={'Купить'} variant={'create'} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ margin: 'auto', fontSize: '30px', fontWeight: '800', textAlign: 'center', color: 'grey' }}>Часто задаваемые вопросы</p>
      <div className={styles.questions}>
        <div className={styles.questions_element}>
          <div className={styles.questions_element_mark}>
            <p>?</p>
          </div>
          <div className={styles.questions_element_text}>
            Можно ли повысить действующий тариф?
            <p className={styles.questions_element_text_description}>
              Да, можно. Для этого даже не обязательно ждать окончания оплаченного периода: просто подключите нужный тариф и оставшиеся дни подписки
              автоматически пересчитаются по новой стоимости тарифа. При понижении тарифа оставшиеся дни подписки не конвертируются.
            </p>
          </div>
        </div>
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
            Бесплатный тариф “Старт” действительно бессрочный?
            <p className={styles.questions_element_text_description}>
              Верно, данный тариф доступен для использования без ограничений по времени. Его не нужно продлевать или активировать заново.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.TariffPlansPage_banner}>
        <div className={styles.TariffPlansPage_banner_createProject}>
          <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
          <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
          <Button text={'Создать проект'} variant={'create'} />
        </div>
        <div className={styles.TariffPlansPage_banner_images}>
          <img src={firstStep} alt="Создать проект" className={styles.TariffPlansPage_banner_images_firstStep} />
          <img src={secondStep} alt="Создать проект" className={styles.TariffPlansPage_banner_images_secondStep} />
        </div>
      </div>
    </section>
  )
}
