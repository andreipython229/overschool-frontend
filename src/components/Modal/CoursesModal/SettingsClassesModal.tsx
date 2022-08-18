import React, { FC, useState } from 'react'
import { Input } from 'components/common/Input/Input/Input'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { cross } from '../../../constants/iconSvgConstants'
import { IconSvg } from '../../common/IconSvg/IconSvg'

import styles from '../Modal.module.scss'

type SettingsClassesModalPropT = {
  closeModal: () => void
}
const classesType = ['Занятие', 'Задание', 'Тест', 'Вебинар']

export const SettingsClassesModal: FC<SettingsClassesModalPropT> = ({ closeModal }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)
  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div onClick={closeModal} className={styles.classesContainer_closed}>
          <IconSvg
            width={14}
            height={14}
            d={cross}
            stroke={'#E0DCED'}
            strokeWidth={'2'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            viewBoxSize="0 0 14 14"
          />
        </div>
        <div className={styles.settings_header}>
          <svg
            width="57"
            height="57"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.2658 2.86516C24.379 2.41266 24.7856 2.09521 25.252 2.09521H31.7966C32.263 2.09521 32.6696 2.41266 32.7827 2.86516L34.1841 8.471C34.2713 8.8197 34.5368 9.09455 34.8783 9.2068C35.6555 9.46231 36.412 9.7634 37.1447 10.1069C37.4343 10.2427 37.7704 10.2442 38.0566 10.1012L43.6818 7.28856C44.0731 7.09289 44.5457 7.16959 44.8551 7.47897L49.5691 12.193C49.8785 12.5023 49.9552 12.975 49.7595 13.3663L46.9469 18.9915C46.8038 19.2777 46.8053 19.6137 46.9411 19.9034C47.1998 20.455 47.4344 21.0202 47.6436 21.5975C47.7525 21.8981 47.989 22.1366 48.2923 22.2377L54.2578 24.2262C54.6729 24.3645 54.9528 24.753 54.9528 25.1905V31.8571C54.9528 32.2946 54.6729 32.683 54.2578 32.8214L48.2923 34.8099C47.989 34.911 47.7525 35.1495 47.6436 35.45C47.4344 36.0274 47.1998 36.5925 46.9411 37.1442C46.8053 37.4338 46.8038 37.7699 46.9469 38.0561L49.7595 43.6813C49.9552 44.0726 49.8785 44.5453 49.5691 44.8546L44.8551 49.5686C44.5457 49.878 44.0731 49.9547 43.6817 49.759L38.0565 46.9464C37.7704 46.8033 37.4343 46.8048 37.1447 46.9406C36.593 47.1993 36.0279 47.4339 35.4505 47.6431C35.15 47.752 34.9115 47.9885 34.8104 48.2918L32.8219 54.2573C32.6835 54.6724 32.2951 54.9524 31.8576 54.9524H25.191C24.7534 54.9524 24.365 54.6724 24.2267 54.2573L22.2381 48.2918C22.137 47.9885 21.8986 47.752 21.598 47.6431C20.8292 47.3645 20.082 47.0409 19.3596 46.6755C19.0388 46.5131 18.6565 46.5197 18.3481 46.7047L13.3921 49.6783C12.9921 49.9183 12.4801 49.8553 12.1503 49.5255L7.52262 44.8977C7.1928 44.5679 7.12977 44.056 7.36975 43.656L10.3434 38.6999C10.5284 38.3916 10.5349 38.0093 10.3726 37.6885C9.91709 36.788 9.52659 35.8491 9.2073 34.8778C9.09504 34.5363 8.82019 34.2708 8.47149 34.1837L2.86565 32.7822C2.41315 32.6691 2.0957 32.2625 2.0957 31.7961L2.0957 25.2515C2.0957 24.7851 2.41315 24.3785 2.86565 24.2654L8.47148 22.8639C8.82019 22.7767 9.09504 22.5112 9.20729 22.1698C9.52658 21.1985 9.91708 20.2596 10.3726 19.3591C10.5349 19.0383 10.5284 18.656 10.3434 18.3477L7.36973 13.3916C7.12975 12.9916 7.19278 12.4797 7.5226 12.1498L12.1503 7.52213C12.4801 7.19231 12.9921 7.12929 13.392 7.36926L18.3481 10.3429C18.6565 10.5279 19.0387 10.5345 19.3596 10.3721C20.2601 9.9166 21.199 9.5261 22.1702 9.20681C22.5117 9.09456 22.7772 8.8197 22.8644 8.471L24.2658 2.86516Z"
              stroke="#BA75FF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M38.6891 28.5238C38.6891 34.1377 34.1382 38.6886 28.5243 38.6886C22.9104 38.6886 18.3594 34.1377 18.3594 28.5238C18.3594 22.9099 22.9104 18.3589 28.5243 18.3589C34.1382 18.3589 38.6891 22.9099 38.6891 28.5238Z"
              stroke="#BA75FF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.classesContainer_title}>Настройки занятия </span>
        </div>
        <div className={styles.navBtn}>
          <span
            onClick={() => setSettingsActive(0)}
            className={
              settingsActive === 0
                ? styles.navBtn_btn + ' ' + styles.navBtn_active
                : styles.navBtn_btn
            }
          >
            Основные
          </span>
          <span
            onClick={() => setSettingsActive(1)}
            className={
              settingsActive === 1
                ? styles.navBtn_btn + ' ' + styles.navBtn_active
                : styles.navBtn_btn
            }
          >
            Баллы за прохождение
          </span>
        </div>

        {settingsActive === 0 ? (
          <div className={styles.settings_block}>
            <div className={styles.settings_block_input}>
              <span className={styles.settings_block_input_title}>Изменить название</span>
              <Input
                style={{ width: '496px' }}
                name={'name'}
                type={'text'}
                value={''}
                placeholder={'Основы HTML'}
              />
            </div>

            <div className={styles.settings_block_input}>
              <span style={{ paddingBottom: '5px' }} className={styles.settings_block_input_title}>
                Изменить тип
              </span>
              <SelectInput optionsList={classesType} />
            </div>
          </div>
        ) : (
          <div>
            <span className={styles.usually_title}>
              Сколько баллов будет выдано ученику по завершению занятия:
            </span>
            <div className={styles.usually_grade}>
              <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} />
              <span>баллов</span>
            </div>
          </div>
        )}

        <Button style={{ width: '496px' }} variant={'primary'} text={'Сохранить'} />
      </div>
    </div>
  )
}
