import React, { ChangeEvent, FC } from 'react';
import styles from './studentsLog.module.scss';
import { SelectInput } from 'components/common/SelectInput/SelectInput';
import { programLanguage } from 'constants/other';
import { Input } from 'components/common/Input/Input/Input';
import { Button } from 'components/common/Button/Button';

type AddStudentModalPropsT = {
  closeModal: () => void;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  studentEmail: string;
};
export const AddStudentModal: FC<AddStudentModalPropsT> = ({
  closeModal,
  onChangeEmail,
  studentEmail,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div onClick={closeModal} className={styles.container_closed}>
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
        <div className={styles.addStudent}>
          <div className={styles.addStudent_header}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1663 5.66634C14.8276 5.66634 10.4997 9.99425 10.4997 15.333C10.4997 20.6718 14.8276 24.9997 20.1663 24.9997C25.5051 24.9997 29.833 20.6718 29.833 15.333C29.833 9.99425 25.5051 5.66634 20.1663 5.66634ZM5.66634 15.333C5.66634 7.32488 12.1582 0.833008 20.1663 0.833008C28.1745 0.833008 34.6663 7.32488 34.6663 15.333C34.6663 23.3411 28.1745 29.833 20.1663 29.833C12.1582 29.833 5.66634 23.3411 5.66634 15.333ZM41.9163 22.583C43.251 22.583 44.333 23.665 44.333 24.9997V27.4163H46.7497C48.0844 27.4163 49.1663 28.4983 49.1663 29.833C49.1663 31.1677 48.0844 32.2497 46.7497 32.2497H44.333V34.6663C44.333 36.001 43.251 37.083 41.9163 37.083C40.5816 37.083 39.4997 36.001 39.4997 34.6663V32.2497H37.083C35.7483 32.2497 34.6663 31.1677 34.6663 29.833C34.6663 28.4983 35.7483 27.4163 37.083 27.4163H39.4997V24.9997C39.4997 23.665 40.5816 22.583 41.9163 22.583ZM11.708 39.4997C8.66432 39.4997 5.66634 42.4324 5.66634 46.7497C5.66634 48.0844 4.58436 49.1663 3.24967 49.1663C1.91499 49.1663 0.833008 48.0844 0.833008 46.7497C0.833008 40.3894 5.40889 34.6663 11.708 34.6663H28.6247C34.9238 34.6663 39.4997 40.3894 39.4997 46.7497C39.4997 48.0844 38.4177 49.1663 37.083 49.1663C35.7483 49.1663 34.6663 48.0844 34.6663 46.7497C34.6663 42.4324 31.6684 39.4997 28.6247 39.4997H11.708Z"
                fill="#BA75FF"
              />
            </svg>
            <span className={styles.addStudent_header_title}>Добавление учеников</span>
          </div>
          <div className={styles.addStudent_select}>
            <SelectInput optionsList={programLanguage} />
            <SelectInput
              optionsList={['Выберите группу', 'Группа 1-1', ' Группа 1-2', ' Группа 1-3']}
            />
          </div>
          <div className={styles.addStudent_student}>
            <span className={styles.addStudent_student_title}>Ученик 1</span>
            <Input
              value={studentEmail}
              name={'email'}
              type={'text'}
              onChange={(e) => onChangeEmail(e)}
              placeholder={'Email ученика'}
            />
            <div className={styles.addStudent_student_btn}>
              <span>+Добавить имя</span> <span>+Добавить комментарий</span>
            </div>
          </div>
          <div className={styles.addStudent_btnBlock}>
            <Button style={{ width: '474px' }} variant={'secondary'} text={'Добавить ещё одного'} />
            <Button style={{ width: '474px' }} variant={'primary'} text={'Отправить приглашение'} />
          </div>
        </div>
      </div>
    </div>
  );
};
