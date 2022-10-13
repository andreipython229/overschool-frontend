import {
  classesSettingSvgIcon,
  cross,
  searchSvgIcon,
  tableFilterArrByNameIcon,
  tableFilterByEmailUpIcon,
  tableFilterByEmailDownIcon,
  tableBallsStarIcon,
  iconSvgHomeWorkPage,
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

export const burgerdHwPath = [{ d: iconSvgHomeWorkPage.hamburgerIcon, fill: '#6B7484' }]

export const acceptedHwPath = [{ d: iconSvgHomeWorkPage.acceptedIcon, fill: '#17B198' }]

export const autoCheckHwPath = [{ d: iconSvgHomeWorkPage.autoCheckIcon, fill: '#6B7484' }]

export const underRevisionHwPath = [{ d: iconSvgHomeWorkPage.underRevision, fill: '#FFCA71' }]

export const rejectedHwPath = [{ d: iconSvgHomeWorkPage.rejected, fill: '#FF2C2C' }]

export const waitingdHwPath = [{ d: iconSvgHomeWorkPage.waitingForVerification, fill: '#717985' }]
