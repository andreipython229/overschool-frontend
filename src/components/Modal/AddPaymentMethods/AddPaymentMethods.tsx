import React, { useState } from 'react';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { Button } from 'components/common/Button/Button'
import { useSetPaymentMethodMutation } from 'api/schoolService';

import styles from './addPaymentMethods.module.scss';

interface AddPaymentMethodsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentMethodData {
  school: number;
  payment_method_name: string;
  payment_link: string;
  secret_key: string;
  selectedPaymentMethod: string
}

const AddPaymentMethods: React.FC<AddPaymentMethodsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [mutatePaymentMethod] = useSetPaymentMethodMutation({});
  const schoolIdString = localStorage.getItem('school_id');
  const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;
  const [formData, setFormData] = useState<PaymentMethodData>({
    school: 0,
    selectedPaymentMethod: '',
    payment_method_name: '',
    payment_link: '',
    secret_key: ''
  });

  const handleCloseButtonClick = () => {
    onClose();
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddPaymentMethod = () => {
    if (schoolId) {
      const paymentData = {
        school: schoolId,
        payment_method: selectedPaymentMethod,
        payment_method_name: formData.payment_method_name,
        payment_link: formData.payment_link,
        secret_key: formData.secret_key
      };
  
      mutatePaymentMethod(paymentData);
    }
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
          <h3 style={{textAlign: 'center', margin: '0'}}>Добавление способа оплаты</h3>
          <p style={{textAlign: 'center', margin: '0', marginBlockStart: '10px', marginBlockEnd: '20px'}}>Выберите способ оплаты и заполните настройки для его добавления</p>
          <div className={styles.menuBar}>
            <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
              <option value="">Выберите способ оплаты</option>
              <option value="Prodamus">Prodamus</option>
              <option value="ExpressPay">ExpressPay</option>
            </select>
          </div>
          {selectedPaymentMethod === 'Prodamus' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="name">Название:</label>
                <input type="text" id="name" name="payment_method_name" onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="paymentPageLink">Ссылка на платежную страницу:</label>
                <input type="text" id="paymentPageLink" name="payment_link" onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="secretKey">Секретный ключ:</label>
                <input type="text" id="secretKey" name="secret_key" onChange={handleInputChange} />
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