import React, { ChangeEvent, FC } from 'react'
import styles from '../studentsLog.module.scss'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { StudentLogs } from 'enum/pathE'
import { Link } from 'react-router-dom'

type CreateGroupModalPropsT = {
  closeModal: () => void
  addNameGroup: (e: ChangeEvent<HTMLInputElement>) => void
  nameGroup: string
}

export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({
  closeModal,
  addNameGroup,
  nameGroup,
}) => {
  return (
    <div className={styles.wrapper}>
      <div style={{ width: '485px' }} className={styles.container}>
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
        <div className={styles.addGroup}>
          <div className={styles.container_header}>
            <svg
              width="60"
              height="49"
              viewBox="0 0 60 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M51.7223 19.0557C53.2258 19.0557 54.4446 20.2744 54.4446 21.7779V24.5001H57.1668C58.6702 24.5001 59.889 25.7189 59.889 27.2223C59.889 28.7258 58.6702 29.9446 57.1668 29.9446H54.4446V32.6668C54.4446 34.1702 53.2258 35.389 51.7223 35.389C50.2189 35.389 49.0001 34.1702 49.0001 32.6668V29.9446H46.2779C44.7744 29.9446 43.5557 28.7258 43.5557 27.2223C43.5557 25.7189 44.7744 24.5001 46.2779 24.5001H49.0001V21.7779C49.0001 20.2744 50.2189 19.0557 51.7223 19.0557Z"
                fill="#BA75FF"
              />
              <path
                d="M20.4163 8.16634C15.906 8.16634 12.2497 11.8227 12.2497 16.333C12.2497 20.8433 15.906 24.4997 20.4163 24.4997C24.9267 24.4997 28.583 20.8433 28.583 16.333C28.583 11.8227 24.9267 8.16634 20.4163 8.16634ZM8.16634 16.333C8.16634 9.56752 13.6509 4.08301 20.4163 4.08301C27.1818 4.08301 32.6663 9.56752 32.6663 16.333C32.6663 23.0985 27.1818 28.583 20.4163 28.583C13.6509 28.583 8.16634 23.0985 8.16634 16.333ZM34.3577 7.67095C35.155 6.87363 36.4478 6.87363 37.2451 7.67095C42.029 12.4549 42.029 20.2111 37.2451 24.9951C36.4478 25.7924 35.155 25.7924 34.3577 24.9951C33.5604 24.1977 33.5604 22.905 34.3577 22.1077C37.547 18.9184 37.547 13.7476 34.3577 10.5583C33.5604 9.76098 33.5604 8.46827 34.3577 7.67095ZM35.7898 34.2128C36.0633 33.1189 37.1718 32.4538 38.2657 32.7273C40.9769 33.4051 42.693 35.1387 43.68 37.1127C44.635 39.0228 44.9163 41.1538 44.9163 42.8747C44.9163 44.0022 44.0023 44.9163 42.8747 44.9163C41.7471 44.9163 40.833 44.0022 40.833 42.8747C40.833 41.533 40.6039 40.0912 40.0277 38.9388C39.4835 37.8503 38.6475 37.0318 37.2753 36.6887C36.1814 36.4152 35.5163 35.3067 35.7898 34.2128ZM13.2705 36.7497C10.6991 36.7497 8.16634 39.2273 8.16634 42.8747C8.16634 44.0022 7.25226 44.9163 6.12467 44.9163C4.99709 44.9163 4.08301 44.0022 4.08301 42.8747C4.08301 37.5014 7.94884 32.6663 13.2705 32.6663H27.5622C32.8838 32.6663 36.7497 37.5014 36.7497 42.8747C36.7497 44.0023 35.8356 44.9163 34.708 44.9163C33.5804 44.9163 32.6663 44.0023 32.6663 42.8747C32.6663 39.2273 30.1336 36.7497 27.5622 36.7497H13.2705Z"
                fill="#BA75FF"
              />
            </svg>
            <span className={styles.container_header_title}>Создание группы</span>
          </div>
          <div className={styles.addGroup_input}>
            <span>Введите название группы:</span>
            <Input name={'group'} type={'text'} value={nameGroup} onChange={e => addNameGroup(e)} />
          </div>
          <div className={styles.addGroup_btn}>
            <Link to={StudentLogs.GroupSettings}>
              <Button
                disabled={nameGroup.length === 1}
                variant={'primary'}
                onClick={closeModal}
                text={'Создать группу'}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
