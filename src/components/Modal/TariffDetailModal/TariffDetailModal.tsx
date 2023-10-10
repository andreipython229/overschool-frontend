import { TariffPlanT } from 'api/tariffPlanService'
import { FC, useState } from 'react'
import styles from './tariffDetailModal.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { closeHwModalPath } from '../ModalCheckHomeWork/config/svgIconsPsth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'components/common/Button/Button'
import VISA from './assets/SVG/payments-visa.svg'
import MASTERCARD from './assets/SVG/payments-mastercard.svg'
import { validateEmail } from 'utils/validateEmail'
import { CardNumberInput } from 'components/common/Input/MaskedInputs/CardNumberInput'
import { ExpirationDateInput } from 'components/common/Input/MaskedInputs/ExpirationDateInput'
import { CVVInput } from 'components/common/Input/MaskedInputs/CVVInput'

interface ITariffDetailModal {
  tariff: TariffPlanT
  setShowModal: (close: boolean) => void
}

interface IFormValues {
  name: string
  email: string
  cardNumber: string
  expirationDate: string
  cvv: string
}

export const TariffDetailModal: FC<ITariffDetailModal> = ({ tariff, setShowModal }) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  const initialValues: IFormValues = {
    name: '',
    email: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  }

  const handleSubmit = (values: IFormValues) => {
    // ДОДЕЛАТЬ!!!!!!
    
    console.log(values)
  }

  const validateForm = (values: IFormValues) => {
    const errors: Partial<IFormValues> = {}

    if (!validateEmail(values.email)) {
      errors.email = 'Проверьте правильность ввода'
    }

    if (!values.name) {
      errors.name = 'Поле должно быть заполнено'
    }
    if (!values.email) {
      errors.email = 'Поле должно быть заполнено'
    }
    if (!values.cardNumber) {
      errors.cardNumber = 'Поле должно быть заполнено'
    }
    if (!values.expirationDate) {
      errors.expirationDate = 'Поле должно быть заполнено'
    }
    if (!values.cvv) {
      errors.cvv = 'Поле должно быть заполнено'
    }
    if (values.cvv.length && values.cvv.length !== 3) {
      errors.cvv = 'Проверьте правильность ввода'
    }

    if (Object.keys(errors).length === 0 ) {
      setDisabled(false)
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
            {'Оплата тарифного плана "'}
            <span>{`${tariff.name}"`}</span>
          </div>
        </div>
        <div className={styles.wrapper_tariffCard_info}></div>
        <div className={styles.wrapper_tariffCard_body}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
            <Form className={styles.wrapper_tariffCard_form}>
              <div>
                <div className={styles.paymentField}>
                  <label htmlFor="cardNumber">Номер карты:</label>
                  <Field maxLength={19} className={styles.paymentField_inputField} type="text" id="cardNumber" name="cardNumber" component={CardNumberInput} />
                  <ErrorMessage className={styles.error} name="cardNumber" component="div" />
                </div>

                <div className={styles.paymentField}>
                  <label htmlFor="name">Имя и Фамилия (как на карте):</label>
                  <Field className={styles.paymentField_inputField} type="text" id="name" name="name" />
                  <ErrorMessage className={styles.error} name="name" component="div" />
                </div>

                <div className={styles.paymentField}>
                  <label htmlFor="email">Email:</label>
                  <Field className={styles.paymentField_inputField} type="email" id="email" name="email" />
                  <ErrorMessage className={styles.error} name="email" component="div" />
                </div>

                <Button disabled={disabled} className={styles.btn} type="submit" text={'Оплатить'} />
              </div>

              <div>
                <div className={styles.paymentField}>
                  <label htmlFor="expirationDate">Срок действия:</label>
                  <Field maxLength={5} className={styles.paymentField_inputField} type="text" id="expirationDate" name="expirationDate" component={ExpirationDateInput} />
                  <ErrorMessage className={styles.error} name="expirationDate" component="div" />
                </div>

                <div className={styles.paymentField}>
                  <label htmlFor="cvv">CVV:</label>
                  <Field maxLength={3} className={styles.paymentField_inputField} type="text" id="cvv" name="cvv" 
                  component={CVVInput}/>
                  <ErrorMessage className={styles.error} name="cvv" component="div" />
                </div>
              </div>

              <div className={styles.paymentsMethods}>
                <img src={VISA} />
                <img src={MASTERCARD} />
              </div>
            </Form>
          </Formik>
        </div>
        <div className={styles.wrapper_tariffCard_btnBlock}></div>
      </div>
    </div>
  )
}
