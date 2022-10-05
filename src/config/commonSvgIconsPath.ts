import {
  classesSettingSvgIcon,
  cross,
  searchSvgIcon,
  tableFilterArrByNameIcon,
  tableFilterByEmailUpIcon,
  tableFilterByEmailDownIcon,
  tableBallsStarIcon,
} from '../constants/iconSvgConstants'
import { pathT } from '../components/common/commonComponentsTypes'

export const arrUpPath = [{ d: classesSettingSvgIcon.arrowUp, fill: '#2E4454' }]

export const arrDownPath = [{ d: classesSettingSvgIcon.arrowDown, fill: '#2E4454' }]

export const arrUpdatePath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]

export const deletePath = [{ d: classesSettingSvgIcon.deleteIcon, fill: '#EF4444' }]

export const crossIconPath: pathT[] = [{ d: cross, stroke: '#E0DCED', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const searchIconPath: pathT[] = [{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const tableFilterByNamePath = [{ d: tableFilterArrByNameIcon, fill: '#BA75FF' }]

export const tableFilterByEmailUpPath = [{ d: tableFilterByEmailUpIcon, fill: '#D1D5DB' }]

export const tableFilterByEmailDownPath = [{ d: tableFilterByEmailDownIcon, fill: '#D1D5DB' }]

export const tableBallsStarPath: pathT[] = [
  { d: tableBallsStarIcon, fill: '#FFDFB0', stroke: '#FFC671', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
]
