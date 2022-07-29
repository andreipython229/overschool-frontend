import React, { FC } from 'react';
import styles from '../Modal.module.scss';
import { Input } from 'components/common/Input/Input/Input';
import { Button } from 'components/common/Button/Button';

type AddModuleModalPropsT = {
  toggleModal: () => void;
};
export const AddModuleModal: FC<AddModuleModalPropsT> = ({ toggleModal }) => {
  return (
    <div className={styles.wrapper}>
      <div style={{ width: '440px', padding: '36px 0' }} className={styles.classesContainer}>
        <div onClick={toggleModal} className={styles.classesContainer_closed}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.3125 12.6875L12.6875 1.3125M12.6875 12.6875L1.3125 1.3125"
              stroke="#E0DCED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.module_title}>Создание модуля</div>
        <div className={styles.module_input}>
          <span className={styles.module_input_label}>Введите название модуля:</span>
          <Input
            style={{ marginTop: '8px', marginBottom: '16px' }}
            name={'module'}
            value={''}
            type={'text'}
          />
        </div>
        <Button text={'Создать модуль'} variant={'primary'} />
      </div>
    </div>
  );
};
