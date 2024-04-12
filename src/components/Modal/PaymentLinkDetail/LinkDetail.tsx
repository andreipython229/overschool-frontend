import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { Button } from 'components/common/Button/Button'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { useUpdatePaymentLinkMutation } from 'api/schoolService';
import { SchoolPaymentLink } from '../../../types/paymentT';

import styles from './linkDetail.module.scss';

interface LinkDetailProps {
  isOpen: boolean;
  onClose: () => void;
  paymentLink: SchoolPaymentLink;
}

const LinkDetail: React.FC<LinkDetailProps> = ({ isOpen, onClose, paymentLink }) => {

  const [selectedPaymentLink, setSelectedPaymentLink] = useState<SchoolPaymentLink | null>(null);
  const [updatePaymentLink, paymentLinkData] = useUpdatePaymentLinkMutation();

  useEffect(() => {
    if (paymentLink && paymentLink.status === null) {
      fetchInvoiceDetails(paymentLink.invoice_no, paymentLink.api_key);
    } else {
      setSelectedPaymentLink(paymentLink)
    }
  }, [paymentLink]);

  const fetchInvoiceDetails = async (invoiceNo: number, apiKey: string) => {
    try {
      const response = await axios.get(`https://api.express-pay.by/v1/invoices/${invoiceNo}?token=${apiKey}`);
      // const response = await axios.get(`https://sandbox-api.express-pay.by/v1/invoices/${invoiceNo}?token=a75b74cbcfe446509e8ee874f421bd64`);
      const { Status, FirstName, Surname, Patronymic } = response.data;
      
      const updateResponse = await updatePaymentLink({
        id: 1,
        payment_link: paymentLink.payment_link,
        status: Status,
        first_name: FirstName,
        last_name: Surname,
        patronymic: Patronymic
      })

      if ('data' in updateResponse) {
        setSelectedPaymentLink(updateResponse.data);
      }
    } catch (error) {
      console.error('Error fetching invoice details:', error);
    }
  };

    const handleCloseButtonClick = () => {
      onClose();
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case '1':
          return 'Ожидает оплату';
        case '2':
          return 'Просрочен';
        case '3':
          return 'Оплачен';
        case '4':
          return 'Оплачен частично';
        case '5':
          return 'Отменен';
        case '6':
          return 'Оплачен с помощью банковской карты';
        case '7':
          return 'Платеж возращен';
        default:
          return 'Неизвестный статус';
      }
    };

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
                {selectedPaymentLink.first_name ? (
                  <p>Имя плательщика: {selectedPaymentLink.first_name}</p>
                ) : (
                  <p>Имя плательщика: Не указано</p>
                )}
                {selectedPaymentLink.last_name ? (
                  <p>Фамилия плательщика: {selectedPaymentLink.last_name}</p>
                ) : (
                  <p>Фамилия плательщика: Не указано</p>
                )}
                {selectedPaymentLink.patronymic ? (
                  <p>Отчество плательщика: {selectedPaymentLink.patronymic}</p>
                ) : (
                  <p>Отчество плательщика: Не указано</p>
                )}
                <p>Сумма операции: {selectedPaymentLink.amount} {selectedPaymentLink.currency === '933' ? 'BYN' : selectedPaymentLink.currency === '643' ? 'RUB' : 'USD'}</p>
                <p>Ссылка на оплату: {selectedPaymentLink.payment_link}</p>
                <p>Дата создания ссылки: {new Date(selectedPaymentLink.created).toLocaleString()}</p>
              </div>
            ) : null}

        </div>
      </div>
    );
};

export default LinkDetail;
