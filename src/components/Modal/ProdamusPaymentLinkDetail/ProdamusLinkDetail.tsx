import React from 'react'
import { ProdamusPaymentLinkDetail } from '../../../types/ProdamusPaymenT'
import styles from '../ProdamusPaymentLinkDetail/prodamusLinkGenerating.module.scss'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { closeHwModalPath } from '../ModalCheckHomeWork/config/svgIconsPsth'
import { useUpdateProdamusPaymentLinkMutation } from '../../../api/schoolService'

interface ProdamusLinkDetailProps {
  isOpen: boolean
  onClose: () => void
  paymentLink: ProdamusPaymentLinkDetail
}

export const ProdamusLinkDetail: React.FC<ProdamusLinkDetailProps> = ({ isOpen, onClose, paymentLink }) => {
  const [updateProdamusPaymentLink, ProdamuspaymentLinkData] = useUpdateProdamusPaymentLinkMutation()

  const handleCloseButtonClick = () => {
    onClose()
  }

  return (
    <div className={styles['modal-wrapper']} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles['modal-content']}>
        <button className={styles.closeButton} onClick={handleCloseButtonClick}>
          <IconSvg width={15} height={15} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
        </button>
        <h3>Данные об оплате</h3>
        <div>
          <p>Номер заказа: {paymentLink.order_id}</p>
          {paymentLink.order_id ? <p>Номер телефона плательщика: {paymentLink.customer_phone}</p> : <p>Номер телефона плательщика: Не указано</p>}
          {paymentLink.customer_email ? <p>Email плательщика: {paymentLink.customer_email}</p> : <p>Email плательщика: Не указано</p>}
          {paymentLink.name ? <p>Наименование товара: {paymentLink.name}</p> : <p>Наименование товара: Не указано</p>}
          {paymentLink.price ? <p>Цена товара: {paymentLink.price}</p> : <p>Цена товара: Не указано</p>}
          {paymentLink.currency ? <p>Валюта: {paymentLink.currency}</p> : <p>Валюта: Не указано</p>}
          {paymentLink.quantity ? <p>Количество: {paymentLink.quantity}</p> : <p>Количество: Не указано</p>}
          <p>Ссылка на оплату: {paymentLink.payment_link}</p>
          <p>Дата создания ссылки: {new Date(paymentLink.created).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default ProdamusLinkDetail
