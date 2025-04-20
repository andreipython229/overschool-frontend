import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { tableFilterByNamePath, tableFilterByEmailUpPath, tableFilterByEmailDownPath } from '../../../config/commonSvgIconsPath'

type homeworksStatsTableHeaderT = {
  hadleChangeProp?: (key: string) => void
}

export const HomeworksStatsTableHeader: FC<homeworksStatsTableHeaderT> = ({ hadleChangeProp }) => {
  return (
    <tr>
      <th>
        <span style={{ margin: '0 7px 0 2px' }}>Имя</span>
        {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }}>
          <IconSvg width={10} height={7} viewBoxSize={'0 0 10 7'} path={tableFilterByEmailUpPath} />
          <IconSvg width={10} height={7} viewBoxSize={'0 0 10 7'} path={tableFilterByEmailDownPath} />
        </div> */}
      </th>
      <th style={{ height: '56px', display: 'flex', alignItems: 'center' }}>
        <span style={{ margin: '0 7px 0 0' }}>Email</span>
        {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }}>
          <IconSvg width={10} height={7} viewBoxSize={'0 0 10 7'} path={tableFilterByEmailUpPath} />
          <IconSvg width={10} height={7} viewBoxSize={'0 0 10 7'} path={tableFilterByEmailDownPath} />
        </div> */}
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
