import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { tableFilterByNamePath, tableFilterByEmailUpPath, tableFilterByEmailDownPath } from '../../../config/commonSvgIconsPath'

type homeworksStatsTableHeaderT = {
  handleChangeProp: () => void;
  handleSortByDate: () => void;
  handleSortByStatus: () => void;
}

export const HomeworksStatsTableHeader: FC<homeworksStatsTableHeaderT> = ({ handleChangeProp, handleSortByDate, handleSortByStatus }) => {
  return (
    <tr>
      <th>
        <span style={{ margin: '0 7px 0 2px' }}>Имя</span>
        {/* <IconSvg width={10} height={10} viewBoxSize={'0 0 10 10'} path={tableFilterByNamePath} /> */}
      </th>
      <th style={{ height: '56px', display: 'flex', alignItems: 'center' }}>
        <span style={{ margin: '0 7px 0 0' }}>Email</span>
        {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={handleChangeProp}>
          <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} path={tableFilterByEmailUpPath} />
          <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} path={tableFilterByEmailDownPath} />
        </div> */}
      </th>
      <th>
        <span>Номер телефона</span>
      </th>
      <th>
        <span>Курс</span>
      </th>
      <th onClick={handleSortByDate}>
        <span style={{ margin: '0 0 0 0' }}>Дата</span>
      </th>
      <th style={{ height: '55px', display: 'flex', alignItems: 'center' }}>
        <span style={{ margin: '0 3px 0 0' }}>Статус</span>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={handleSortByStatus}>
          <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} path={tableFilterByEmailUpPath} />
          <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} path={tableFilterByEmailDownPath} />
        </div>
      </th>
    </tr>
  )
}
