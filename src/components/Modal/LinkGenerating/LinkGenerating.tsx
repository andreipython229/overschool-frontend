import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { Button } from 'components/common/Button/Button'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { useLazyFetchPaymentMethodsQuery, useCreatePaymentLinkMutation } from 'api/schoolService';
import { ResponsePaymentMethod } from '../../../types/paymentT'

import styles from './linkGenerating.module.scss';

interface LinkGeneratingProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinkGenerating: React.FC<LinkGeneratingProps> = ({ isOpen, onClose }) => {
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<ResponsePaymentMethod | null>(null);
  const [fetchPaymentMethods, paymentMethodsResponse] = useLazyFetchPaymentMethodsQuery();
  const [createPaymentLinkMutationFunction] = useCreatePaymentLinkMutation();

  const schoolIdString = localStorage.getItem('school_id');
  const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError('');
      }, 5000);
    }
  
    return () => clearTimeout(timer);
  }, [error]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMethodId = parseInt(e.target.value, 10);
    const methodsArray = paymentMethodsResponse.data ? Object.values(paymentMethodsResponse.data) : [];
    const selectedMethod = methodsArray.find((method: ResponsePaymentMethod) => method.id === selectedMethodId);
    setPaymentMethod(selectedMethod || null);
  };
  
  const handleGenerateLink = async () => {
    if (!price || !currency || !paymentMethod) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // const requestData = {
    //   Token: 'a75b74cbcfe446509e8ee874f421bd64',
    //   AccountNo: 10,
    //   Amount: parseFloat(price),
    //   Surname: "",
    //   FirstName: "",
    //   Patronymic: "",
    //   Currency: currency === 'BYN' ? 933 : currency === 'RUB' ? 643 : 840,
    //   IsNameEditable: 1,
    //   ReturnInvoiceUrl: 1
    // };

    const requestData = {
      Token: paymentMethod.api_key,
      AccountNo: paymentMethod.account_no,
      Amount: parseFloat(price),
      Surname: "",
      FirstName: "",
      Patronymic: "",
      Currency: currency === 'BYN' ? 933 : currency === 'RUB' ? 643 : 840,
      IsNameEditable: 1,
      ReturnInvoiceUrl: 1
    };
  
    try {
      // const url = `https://sandbox-api.express-pay.by/v1/invoices?token=${requestData.Token}`;
      const url = `https://api.express-pay.by/v1/invoices?token=${requestData.Token}`
      const response = await axios.post(url, requestData);
      
      if (response.data?.InvoiceNo && response.data?.InvoiceUrl) {
        const createPaymentLinkResponse = await createPaymentLinkMutationFunction({
          invoice_no: response.data.InvoiceNo,
          school_id: schoolId,
          payment_method: paymentMethod?.id || 0,
          payment_link: response.data?.InvoiceUrl,
          amount: requestData.Amount,
          api_key: paymentMethod.api_key,
          currency: currency === 'BYN' ? '933' : currency === 'RUB' ? '643' : '840'
        });

        if ('data' in createPaymentLinkResponse && 'response' in createPaymentLinkResponse.data && typeof createPaymentLinkResponse.data.response === 'string' && createPaymentLinkResponse.data.response === 'success') {
          onClose();
        } else {
          setError('Не удалось добавить информацию о ссылке для оплаты в базу данных');
        }
      } else {
        setError('Не удалось получить ссылку для оплаты');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
      setError('Ошибка при создании ссылки');
    }
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPaymentMethods({ school_id: schoolId });
      if (response.error) {
        setError('Ошибка при получении способов оплаты');
        return;
      }
    };
    fetchData();
  }, [isOpen]);

  return (
    <div className={styles['modal-wrapper']} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles['modal-content']}>
        <button className={styles.closeButton} onClick={handleCloseButtonClick}>
            <IconSvg width={15} height={15} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
        </button>
        <h2 style={{ marginBlockStart: "15px" }}>Генерация ссылки для оплаты</h2>
        {error && <p>{error}</p>}
        <div className={styles['label-container']}>
            <label htmlFor="price">Cпособ оплаты:</label>
        </div>
        <div className={styles.currencyContainer}>
        <select id="paymentMethod" value={paymentMethod?.id.toString() || ''} onChange={handlePaymentMethodChange}>
          <option value="">Выбор способа оплаты</option>
          {Array.isArray(paymentMethodsResponse.data) && paymentMethodsResponse.data.map((method: ResponsePaymentMethod) => (
            <option key={method.id} value={method.id.toString()}>{method.payment_method}</option>
          ))}
        </select>
        </div>
        <div className={styles['label-container']}>
            <label htmlFor="price">Сумма оплаты:</label>
        </div>
        <div className={styles['input-container']}>
            <input type="text" id="price" value={price} onChange={handlePriceChange} />
        </div>
        <div className={styles['label-container']}>
            <label htmlFor="currency">Валюта:</label>
        </div>
        <div className={styles.currencyContainer}>
            <select id="currency" value={currency} onChange={handleCurrencyChange}>
              <option value="">Выбор валюты</option>
              <option value="BYN">BYN</option>
              <option value="RUB">RUB</option>
              <option value="USD">USD</option>
            </select>
          </div>
        <div>
        <Button className={styles.btn} text={'Сгенерировать'} onClick={handleGenerateLink} />
        </div>
      </div>
    </div>
  );
};

export default LinkGenerating;
