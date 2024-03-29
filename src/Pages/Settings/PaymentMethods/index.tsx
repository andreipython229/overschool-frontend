import { memo, useEffect, useState } from 'react'
import { Button } from 'components/common/Button/Button'
import AddPaymentMethods from "../../../components/Modal/AddPaymentMethods/AddPaymentMethods"
import { useLazyFetchPaymentMethodsQuery, useDeletePaymentMethodMutation } from 'api/schoolService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../Pages/School/config/svgIconsPath'

import styles from './paymentMethods.module.scss'

interface ResponsePaymentMethod {
  id: number;
  payment_method: string;
  payment_method_name: string;
  payment_link: string;
  secret_key: string;
  school: number;
}

export const PaymentMethods = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const schoolIdString = localStorage.getItem('school_id');
  const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;
  const [fetchPaymentMethods, paymentMethodsResponse] = useLazyFetchPaymentMethodsQuery();
  const [deletePaymentMethod] = useDeletePaymentMethodMutation();

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  }

  useEffect(() => {   
    const fetchData = async () => {
      const response = await fetchPaymentMethods({school_id: schoolId});
      if (response.error) {
        console.error('Error fetching payment methods:', response.error);
        return;
      }
    };
    fetchData();
  }, [fetchPaymentMethods, schoolId, isModalOpen, deletePaymentMethod]);

  const handleDeletePaymentMethod = async (paymentLinkId: string) => {
      deletePaymentMethod(paymentLinkId);
      fetchPaymentMethods({school_id: schoolId});
  };

  return (
    <div className={styles.wrapper_actions}>
      <div style={{ color: 'slategrey', fontSize: '20px', marginBlockEnd: '20px' }}>
        Способы оплаты
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Название способа оплаты</th>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Система оплаты</th>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Ссылка для оплаты</th>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Секретный ключ</th>
          <th style={{ padding: '8px', width: '80px' }}></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(paymentMethodsResponse.data) && paymentMethodsResponse.data.map((method: ResponsePaymentMethod, index: number) => (
          <tr key={index}>
            <td style={{ textAlign: 'center', border: '1px solid grey', padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
              {method.payment_method_name}
            </td>
            <td style={{ textAlign: 'center', border: '1px solid grey', padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
              {method.payment_method}
            </td>
            <td style={{ textAlign: 'center', border: '1px solid grey', padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
              {method.payment_link}
            </td>
            <td style={{ textAlign: 'center', border: '1px solid grey', padding: '8px', wordWrap: 'break-word', color: 'slategrey' }}>
              {method.secret_key}
            </td>
            <td style={{ textAlign: 'left', padding: '8px', width: '80px' }}>
            <button 
                style={{ borderRadius: '5px', border: '0.5px solid grey', padding: '5px' }}
                onClick={() => handleDeletePaymentMethod(method.payment_link)}>
                <IconSvg width={20} height={20} viewBoxSize="0 0 19 19" path={deleteIconPath}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      <Button className={styles.btn} text={'Добавить способ оплаты'} onClick={toggleModal} />
      <AddPaymentMethods isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  )
})