import { IconSvg } from '../../../../common/IconSvg/IconSvg'
import { CheckSelect } from 'components/common/CheckSelect/CheckSelect'
import { CheckSelectChildren } from 'components/common/CheckSelect/CheckSelectChildren'
import { accessToClassIconPath } from '../../config/svgIconsPath'

import styles from '../../studentsLog.module.scss'

export const AccessToClasses = () => {
  return (
    <div className={styles.groupSetting_access}>
      <div className={styles.groupSetting_access_about}>
        <span>Включено 236 из 236 занятий</span>
        <div className={styles.groupSetting_access_about_setClassesDate}>
          <span>Установить расписание</span>
          <IconSvg width={21} height={21} viewBoxSize={'0 0 21 21'} path={accessToClassIconPath} />
        </div>
      </div>
      <div>
        <CheckSelect text={'Тестирование на уровень владения английским языком'}>
          <CheckSelectChildren text={'Урок 1.Название букв английского алфавит...'} />
        </CheckSelect>
        <CheckSelect text={'Фонетика'} />
      </div>
    </div>
  )
}
