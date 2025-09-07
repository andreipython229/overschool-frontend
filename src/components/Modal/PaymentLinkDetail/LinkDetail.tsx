import React, { useState, useEffect } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth'
import { useUpdatePaymentLinkMutation } from 'api/schoolService'
import { useLazyFetchInvoiceDetailsQuery, useLazyFetchInvoiceDetailsTestQuery } from 'api/paymentModules'
import { SchoolPaymentLink } from '../../../types/paymentT'

import styles from './linkDetail.module.scss'

interface LinkDetailProps {
  isOpen: boolean
  onClose: () => void
  paymentLink: SchoolPaymentLink
}

const LinkDetail: React.FC<LinkDetailProps> = ({ isOpen, onClose, paymentLink }) => {
  const [selectedPaymentLink, setSelectedPaymentLink] = useState<SchoolPaymentLink | null>(null)
  const [updatePaymentLink, paymentLinkData] = useUpdatePaymentLinkMutation()
  const [fetchLinkDetails, invoiceDetailsData] = useLazyFetchInvoiceDetailsQuery()
  const [fetchTestLinkDetails, invoiceTestDetailsData] = useLazyFetchInvoiceDetailsTestQuery()

  useEffect(() => {
    if (paymentLink && paymentLink.status === null) {
      fetchInvoiceDetails(paymentLink.invoice_no, paymentLink.api_key)
    } else {
      setSelectedPaymentLink(paymentLink)
    }
  }, [paymentLink])

  const fetchInvoiceDetails = async (invoiceNo: number, apiKey: string) => {
    try {
      await fetchLinkDetails({ invoiceNo, apiKey })
      // await fetchTestLinkDetails();

      if (invoiceDetailsData.data) {
        const { Status, FirstName, Surname, Patronymic } = invoiceDetailsData.data

        const updateResponse = await updatePaymentLink({
          id: 1,
          payment_link: paymentLink.payment_link,
          status: Status,
          first_name: FirstName,
          last_name: Surname,
          patronymic: Patronymic,
        })

        if ('data' in updateResponse) {
          setSelectedPaymentLink(updateResponse.data)
        }
      }

      // if (invoiceTestDetailsData.data) {
      //   const { Status, FirstName, Surname, Patronymic } = invoiceTestDetailsData.data;

      //   const updateResponse = await updatePaymentLink({
      //     id: 1,
      //     payment_link: paymentLink.payment_link,
      //     status: Status,
      //     first_name: FirstName,
      //     last_name: Surname,
      //     patronymic: Patronymic
      //   })

      //   if ('data' in updateResponse) {
      //     setSelectedPaymentLink(updateResponse.data);
      //   }
      // }
    } catch (error) {
      console.error('Ошибка при получении деталей счета:', error)
    }
  }

  const handleCloseButtonClick = () => {
    onClose()
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case '1':
        return 'Ожидает оплату'
      case '2':
        return 'Просрочен'
      case '3':
        return 'Оплачен'
      case '4':
        return 'Оплачен частично'
      case '5':
        return 'Отменен'
      case '6':
        return 'Оплачен с помощью банковской карты'
      case '7':
        return 'Платеж возращен'
      default:
        return 'Неизвестный статус'
    }
  }

  return (
    <div className={styles['modal-wrapper']} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles['modal-content']}>
        <button className={styles.closeButton} onClick={handleCloseButtonClick}>
          <IconSvg width={15} height={15} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
        </button>
        <h3>Данные об оплате</h3>

        {paymentLinkData.isLoading ? (
          <p style={{ textAlign: 'center' }}>...Loading...</p>
        ) : selectedPaymentLink ? (
          <div>
            <p>Номер счета: {selectedPaymentLink.invoice_no}</p>
            <p>Статус операции: {getStatusText(selectedPaymentLink.status)}</p>
            {selectedPaymentLink.first_name ? <p>Имя плательщика: {selectedPaymentLink.first_name}</p> : <p>Имя плательщика: Не указано</p>}
            {selectedPaymentLink.last_name ? <p>Фамилия плательщика: {selectedPaymentLink.last_name}</p> : <p>Фамилия плательщика: Не указано</p>}
            {selectedPaymentLink.patronymic ? <p>Отчество плательщика: {selectedPaymentLink.patronymic}</p> : <p>Отчество плательщика: Не указано</p>}
            <p>
              Сумма операции: {selectedPaymentLink.amount}{' '}
              {selectedPaymentLink.currency === '933' ? 'BYN' : selectedPaymentLink.currency === '643' ? 'RUB' : 'USD'}
            </p>
            <p>Ссылка на оплату: {selectedPaymentLink.payment_link}</p>
            <p>Дата создания ссылки: {new Date(selectedPaymentLink.created).toLocaleString()}</p>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Данных об оплате не найдено</p>
        )}
      </div>
    </div>
  )
}

export default LinkDetail
