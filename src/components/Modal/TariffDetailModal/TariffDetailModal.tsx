import { TariffPlanT } from 'api/tariffPlanService'
import React, { FC, useState } from 'react'
import styles from './tariffDetailModal.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { closeHwModalPath } from '../ModalCheckHomeWork/config/svgIconsPsth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'components/common/Button/Button'
import { useSendSubscriptionFormMutation } from 'api/subscriptionServices'

interface ITariffDetailModal {
  tariff: TariffPlanT
  setShowModal: (close: boolean) => void
}

export interface ISubscribe {
  tariff: string
  pays_count: number
  promo_code?: string
}

export const TariffDetailModal: FC<ITariffDetailModal> = ({ tariff, setShowModal }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(1)
  const [sendForm, { isSuccess, isLoading }] = useSendSubscriptionFormMutation()
  const [promoError, setPromoError] = useState(false)

  const initialValues: ISubscribe = {
    tariff: tariff.name,
    pays_count: selectedMonth,
    promo_code: '',
  }

  const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value))
  }

  const handleSubmit = (values: ISubscribe) => {
    const subForm: ISubscribe =
      values.promo_code && values.promo_code.length > 0
        ? {
            tariff: tariff.name,
            pays_count: selectedMonth,
            promo_code: values.promo_code,
          }
        : {
            tariff: tariff.name,
            pays_count: selectedMonth,
          }

    sendForm(subForm)
      .unwrap()
      .then()
      .catch(err => {
        if (err.status === 400) {
          setPromoError(true)
        }
      })

    // setShowModal(false)
  }

  const validateForm = () => {
    const errors: Partial<ISubscribe> = {}
    if (promoError) {
      errors.promo_code = 'Нет такого промокода'
    }
    return errors
  }

  return (
    <div className={styles.wrapper} role="dialog" aria-modal="true">
      <div className={styles.wrapper_tariffCard}>
        <div className={styles.wrapper_tariffCard_header}>
          <div className={styles.wrapper_tariffCard_header_btnHeader}>
            <button className={styles.wrapper_tariffCard_header_btnHeader_btnClose} onClick={() => setShowModal(false)}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button>
          </div>
          <div className={styles.wrapper_tariffCard_header_title}>
            {'Подписка на тарифный план "'}
            <span>{`${tariff.name}"`}</span>
          </div>
        </div>
        <div className={styles.wrapper_tariffCard_info_cardGroup_card_text}>
          <hr />
          <ul style={{ marginBottom: '1em' }}>
            <li>
              Количество курсов:
              <span>{tariff.number_of_courses || 'безлимит'}</span>
            </li>
            <li>
              Количество сотрудников:
              <span>{tariff.number_of_staff || 'безлимит'}</span>
            </li>
            <li>
              Студентов в месяц:
              <span>{tariff.students_per_month || 'безлимит'}</span>
            </li>
            <li>
              Всего студентов:
              <span>{tariff.total_students || 'безлимит'}</span>
            </li>
            <li>
              Цена:
              <span>{`${Number(tariff.price) * selectedMonth} рублей${selectedMonth === 1? '/месяц': 
              selectedMonth === 3? '/3 месяца': `/${selectedMonth} месяцев`}`}</span>
            </li>
          </ul>
          <hr />
        </div>
        <div className={styles.wrapper_tariffCard_body}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
            <Form className={styles.wrapper_tariffCard_form}>
              <div className={styles.paymentField}>
                <label htmlFor="pays_count">Количество месяцев:</label>
                <select className={styles.paymentField_inputField} id="pays_count" name="pays_count" onChange={handleChangePeriod}>
                  <option value={1}>1 месяц</option>
                  <option value={3}>3 месяца</option>
                  <option value={6}>6 месяцев</option>
                  <option value={12}>12 месяцев</option>
                </select>
                <Button className={styles.btn} type="submit" text={'Подписаться'} />
              </div>
              <div className={styles.paymentField}>
                <label htmlFor="promo_code">Есть промокод?</label>
                <Field className={styles.paymentField_inputField} type="text" id="promo_code" name="promo_code" placeholder={'Введите его здесь'} />
                <ErrorMessage className={styles.error} name="promo_code" component="div" />
              </div>
            </Form>
          </Formik>
        </div>
        <div className={styles.wrapper_tariffCard_btnBlock}></div>
      </div>
    </div>
  )
}
