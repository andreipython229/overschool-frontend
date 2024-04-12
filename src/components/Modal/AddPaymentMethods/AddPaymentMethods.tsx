import React, { useState, useEffect, useRef } from 'react';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { Button } from 'components/common/Button/Button'
import { useSetPaymentMethodMutation, useLazyFetchPaymentMethodsQuery, useDeletePaymentMethodMutation } from 'api/schoolService';
import { deleteIconPath } from 'components/Questions/config/svgIconPath';

import styles from './addPaymentMethods.module.scss';

interface AddPaymentMethodsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentMethodData {
  school: number;
  payment_method_name: string;
  account_no: string;
  api_key: string;
  selectedPaymentMethod: string
}

interface ResponsePaymentMethod {
  id: number;
  payment_method: string;
  payment_method_name: string;
  account_no: string;
  api_key: string;
  school: number;
}

const AddPaymentMethods: React.FC<AddPaymentMethodsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [error, setError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [addPaymentMethodTrigger, setAddPaymentMethodTrigger] = useState<boolean>(false);
  const [deletePaymentMethodTrigger, setDeletePaymentMethodTrigger] = useState<boolean>(false);
  const [formData, setFormData] = useState<PaymentMethodData>({
    school: 0,
    selectedPaymentMethod: '',
    payment_method_name: '',
    account_no: '',
    api_key: ''
  });

  const schoolIdString = localStorage.getItem('school_id');
  const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;

  const [mutatePaymentMethod] = useSetPaymentMethodMutation({});
  const [deletePaymentMethod] = useDeletePaymentMethodMutation();
  const [fetchPaymentMethods, paymentMethodsResponse] = useLazyFetchPaymentMethodsQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 15000);
  
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleAddPaymentMethod = async () => {
    if (schoolId) {
      const paymentData = {
        school: schoolId,
        payment_method: selectedPaymentMethod,
        payment_method_name: formData.payment_method_name,
        account_no: formData.account_no,
        api_key: formData.api_key
      };
  
      await mutatePaymentMethod(paymentData);
      fetchPaymentMethods({school_id: schoolId});
      setAddPaymentMethodTrigger(prevState => !prevState);
    }
  };

  const handleDeletePaymentMethod = async (paymentLinkId: string) => {
    await deletePaymentMethod(paymentLinkId);
    fetchPaymentMethods({school_id: schoolId});
    setDeletePaymentMethodTrigger(prevState => !prevState);
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPaymentMethods({ school_id: schoolId });
      if (response.error) {
        setError('Ошибка при получении способов оплаты');
        return;
      }
    };
    fetchData();
  }, [addPaymentMethodTrigger, deletePaymentMethodTrigger]);

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={handleCloseButtonClick}>
            <IconSvg width={15} height={15} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
          </button>
          <h3 style={{textAlign: 'center', marginBottom: '15px'}}>Настройки способов оплаты</h3>
          <div style={{ textAlign: 'center', color: 'red' }}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
          </div>
          {Array.isArray(paymentMethodsResponse.data) && (
              <ul>
                {paymentMethodsResponse.data.map((method: ResponsePaymentMethod, index: number) => (
                  <li key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
                        <strong>Название:</strong> {method.payment_method_name}
                      </div>
                      <div style={{ padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
                        <strong>Способ оплаты:</strong> {method.payment_method}
                      </div>
                      <div style={{ padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
                        <strong>API-ключ:</strong> {method.api_key}
                      </div>
                      <div style={{ padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
                        <strong>Номер лицевого счета:</strong> {method.account_no}
                      </div>
                    </div>
                    <div style={{ marginBlockStart: '20px' }}>
                      <button 
                        style={{ borderRadius: '5px', border: '0.5px solid grey', padding: '5px' }}
                        onClick={() => handleDeletePaymentMethod(method.account_no)}>
                        <IconSvg width={20} height={20} viewBoxSize="0 0 19 19" path={deleteIconPath}/>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

          <p style={{textAlign: 'center', margin: '0', marginBlockStart: '10px', marginBlockEnd: '20px'}}>Выберите способ оплаты и заполните настройки для его добавления</p>
          <div className={styles.menuBar}>
            <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
              <option value="">Выберите способ оплаты</option>
              {/* <option value="Prodamus">Prodamus</option> */}
              <option value="ExpressPay">ExpressPay</option>
            </select>
          </div>
          { (selectedPaymentMethod === 'Prodamus' || selectedPaymentMethod === 'ExpressPay') && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="name">Название:</label>
                <input type="text" id="name" name="payment_method_name" onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="api_key">API-ключ:</label>
                <input type="text" id="api_key" name="api_key" onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="account_no">Номер лицевого счета:</label>
                <input type="text" id="account_no" name="account_no" onChange={handleInputChange} />
              </div>
            </>
          )}
          <Button className={styles.btn} text={'Добавить способ оплаты'} onClick={handleAddPaymentMethod} />
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethods;