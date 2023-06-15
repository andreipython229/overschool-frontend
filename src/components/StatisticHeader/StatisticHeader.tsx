import { FC, memo } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { Button } from '../common/Button/Button'
import { StatisticHeaderT } from '../../types/componentsTypes'
import { statisticIconPath } from './config/svgIconPath'
import styles from 'Pages/School/StudentsStats/studentsStats.module.scss'
//import { Chart } from '../Chart'
import { XAxis, YAxis, LineChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, Legend } from 'recharts'
export const StatisticHeader: FC<StatisticHeaderT> = memo(({ hideStats, handleHideStats }) => {


  return (
    <div className={styles.statistics_header}>


      {/*<Chart data={data} width={600} height={300} />*/}
      {/*<IconSvg className={styles.statistics_header_icon} width={21} height={21} viewBoxSize="0 0 21 21" path={statisticIconPath} />*/}
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
