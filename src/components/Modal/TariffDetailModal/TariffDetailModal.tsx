import { TariffPlanT } from 'api/tariffPlanService'
import React, { FC, useState } from 'react'
import styles from './tariffDetailModal.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { closeHwModalPath } from '../ModalCheckHomeWork/config/svgIconsPsth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'components/common/Button/Button'
import { useSendSubscriptionFormMutation } from 'api/subscriptionServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { getNounDeclension } from 'utils/getNounDeclension'


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
  const [secondPhase, setSecondPhase] = useState<boolean>(false)
  const [thirdPhase, setThirdPhase] = useState<boolean>(false)
  const [paymentLink, setPaymentLink] = useState<string>()
  const [paymentPrice, setPaymentPrice] = useState<number>()
  const schoolName = window.location.href.split('/')[4]

  const handleChangePhase = () => {
    if (secondPhase) {
      setSecondPhase(false)
      setThirdPhase(true)
    }
  }

  const initialValues: ISubscribe = {
    tariff: tariff.name,
    pays_count: selectedMonth,
    promo_code: '',
  }

  const handleChangePeriod = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await setSelectedMonth(Number(e.target.value))
  }

  const handleSubmit = async (values: ISubscribe) => {
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
            promo_code: '',
          }

    await sendForm({data: subForm, schoolName})
      .unwrap()
      .then(async data => {
        console.log(data)
        await setPaymentPrice(data.plan.amount / 100)
        await setPaymentLink(data.redirect_url)
        await setSecondPhase(true)
      })
      .catch(err => {
        if (err.status === 404 || err.status === 400) {
          setPromoError(true)
        }
        if (err.status === 405) {
          console.log('')
        }
      })
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
          {!thirdPhase ? (
            <>
              {!secondPhase ? (
                <div className={styles.wrapper_tariffCard_header_title}>
                  {'Подписка на тарифный план "'}
                  <span>{`${tariff.name}"`}</span>
                </div>
              ) : (
                <div className={styles.secondPhaseWrapper}>
                  <div className={styles.wrapper_tariffCard_header_title}>{'Подтверждение заказа'}</div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.wrapper_tariffCard_header_title} style={{textAlign: 'center', padding: '2em', display: 'flex', justifyContent: 'center'}}>
              {'Заказ обрабатывается. Как только транзакция будет обработана и одобрена, новый тарифный план отобразится возле вашего профиля.'}
            </div>
          )}
        </div>
        {!thirdPhase && (
          <>
            {!secondPhase && (
              <>
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
                      Цена (без учета промокода):
                      <span>{`${Number(tariff.price)} рублей/месяц`}</span>
                    </li>
                  </ul>
                  <hr />
                </div>
                <div className={styles.wrapper_tariffCard_body}>
                  <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
                    <Form className={styles.wrapper_tariffCard_form}>
                      <div className={styles.paymentField}>
                        <label htmlFor="pays_count">Количество месяцев:</label>
                        <select
                          className={styles.paymentField_inputField}
                          id="pays_count"
                          name="pays_count"
                          onChange={handleChangePeriod}
                          value={selectedMonth}
                        >
                          <option value={1}>1 месяц</option>
                          <option value={3}>3 месяца</option>
                          <option value={6}>6 месяцев</option>
                          <option value={12}>12 месяцев</option>
                        </select>
                        <Button
                          disabled={isLoading}
                          className={styles.btn}
                          type="submit"
                          text={isLoading ? <SimpleLoader loaderColor="white" style={{ height: '1.5em', width: '1.5em' }} /> : 'Подтвердить'}
                        />
                      </div>
                      <div className={styles.paymentField}>
                        <label htmlFor="promo_code">Есть промокод?</label>
                        <Field
                          className={styles.paymentField_inputField}
                          type="text"
                          id="promo_code"
                          name="promo_code"
                          placeholder={'Введите его здесь'}
                        />
                        <ErrorMessage className={styles.error} name="promo_code" component="div" />
                      </div>
                    </Form>
                  </Formik>
                </div>
              </>
            )}
            {secondPhase && (
              <div className={styles.secondPhaseWrapper}>
                <div className={styles.wrapper_tariffCard_info_cardGroup_card_text}>
                  <hr />
                  <ul style={{ marginBottom: '1em' }}>
                    <li>
                      Тарифный план:
                      <span>{tariff.name}</span>
                    </li>
                    <li>
                      Период подписки:
                      <span>
                        {selectedMonth} {getNounDeclension(selectedMonth, ['месяц', 'месяца', 'месяцев'])}
                      </span>
                    </li>
                    <li>
                      Сумма к оплате (с учетом скидок):
                      <span>{`${paymentPrice || Number(tariff.price)} рублей/месяц`}</span>
                    </li>
                  </ul>
                  <hr />
                  <div className={styles.btnBlock}>
                    <a onClick={() => setSecondPhase(false)} className={styles.backwardBtn}>
                      Изменить
                    </a>
                    <a href={paymentLink} target="_blank" rel="noreferrer" onClick={handleChangePhase} className={styles.acceptBtn}>
                      Перейти к оплате
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div className={styles.wrapper_tariffCard_btnBlock}></div>
      </div>
    </div>
  )
}
