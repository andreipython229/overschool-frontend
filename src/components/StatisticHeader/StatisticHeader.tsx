import { FC, memo } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { statisticSvgIcon } from '../../constants/iconSvgConstants'
import { Button } from '../common/Button/Button'
import { StatisticHeaderT } from '../componentsTypes'

import styles from 'Pages/School/Navigations/StudentsStats/studentsStats.module.scss'

export const StatisticHeader: FC<StatisticHeaderT> = memo(({ hideStats, handleHideStats }) => {
  return (
    <div className={styles.statistics_header}>
      <IconSvg className={styles.statistics_header_icon} width={21} height={21} d={statisticSvgIcon} fill={'#BA75FF'} viewBoxSize="0 0 21 21" />
      <div className={styles.statistics_header_info_wrapper}>
        <span>Статистика по выбранным ученикам</span>
        <span>Выберите нужных учеников в списке или посмотрите статистику по всем участникам сегмента</span>
      </div>
      <Button
        onClick={handleHideStats}
        variant={'secondary'}
        text={hideStats ? 'Свернуть' : 'Развернуть'}
        className={styles.statistics_header_btn_collapse}
      />
    </div>
  )
})
