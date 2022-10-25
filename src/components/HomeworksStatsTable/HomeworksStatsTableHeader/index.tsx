import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { tableFilterByNamePath, tableFilterByEmailUpPath, tableFilterByEmailDownPath } from '../../../config/commonSvgIconsPath'

type homeworksStatsTableHeaderT = {
  hadleChangeProp: () => void
}

export const HomeworksStatsTableHeader: FC<homeworksStatsTableHeaderT> = ({ hadleChangeProp }) => {
  return (
    <tr>
      <th>
        <span style={{ margin: '0 7px 0 34px' }}>Имя</span>
        <IconSvg width={10} height={10} viewBoxSize={'0 0 10 10'} path={tableFilterByNamePath} />
      </th>
      <th style={{ height: '55px', display: 'flex', alignItems: 'center' }}>
        <span style={{ margin: '0 3px 0 0' }}>Email</span>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={hadleChangeProp}>
          <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} path={tableFilterByEmailUpPath} />
          <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} path={tableFilterByEmailDownPath} />
        </div>
      </th>
      <th>
        <span>Задание</span>
      </th>
      <th>
        <span>Курс</span>
      </th>
      <th>
        <span>Последний ответ</span>
      </th>
      <th>
        <span>Статус</span>
      </th>
      <th>
        <span>Баллы</span>
      </th>
    </tr>
  )
}
