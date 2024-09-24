import { orange, red } from '@mui/material/colors'
import {
  classesSettingSvgIcon,
  cross,
  searchSvgIcon,
  tableFilterArrByNameIcon,
  tableFilterByEmailUpIcon,
  tableFilterByEmailDownIcon,
  tableBallsStarIcon,
  iconSvgHomeWorkPage,
  chatGroup,
  groupIcon,
  updateSvgIcon,
  emailSvgIcon,
  teacherGroupIcon,
  tariffPlanIcon,
  peopleIcon,
  settingsIcon,
} from '../constants/iconSvgConstants'
import { pathT } from '../types/commonComponentsTypes'

export const arrUpPath = [{ d: classesSettingSvgIcon.arrowUp, fill: '#2E4454' }]

export const arrDownPath = [{ d: classesSettingSvgIcon.arrowDown, fill: '#2E4454' }]

export const arrUpdatePath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]

export const toggleBtnArr: pathT[] = [
  { d: 'M1.25 1.15625L7.5 7.40625L13.75 1.15625', stroke: '#9CA3AF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const deletePath = [{ d: classesSettingSvgIcon.deleteIcon, fill: 'currentColor' }]

export const crossIconPath: pathT[] = [{ d: cross, stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

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

export const chatsGroup = [{ d: chatGroup.d1 }, { d: chatGroup.d2, fill: 'currentColor' }]

export const groupIconPath = [{ d: groupIcon, fill: '#BA75FF' }]

export const updateDataIcon = [
  { d: updateSvgIcon.d1, fill: '#b3b3b3' },
  { d: updateSvgIcon.d2, fill: '#b3b3b3' },
]

export const emailSvgIconPath = [
  { d: emailSvgIcon, fill: '#b3b3b3' },
  { d: emailSvgIcon, fill: '#b3b3b3' },
]

export const groupChatListIconPath = [{ d: teacherGroupIcon, stroke: '#D1D5DB', strokeWidth: '0', fill: '#BA75FF' }]

export const redTariffPlanIconPath = [{ d: tariffPlanIcon, fill: 'red' }]

export const orangeTariffPlanIconPath = [{ d: tariffPlanIcon, fill: 'orange' }]

export const purpleTariffPlanIconPath = [{ d: tariffPlanIcon, fill: '#BA75FF' }]

export const peopleIconPath: pathT[] = [
  { d: peopleIcon.d1, fill: 'url(#paint0_linear_14245_85147)' },
  { d: peopleIcon.d2, fill: 'url(#paint1_linear_14245_85147)' },
  { d: peopleIcon.d3, fill: 'url(#paint2_linear_14245_85147)' },
  { d: peopleIcon.d4, fill: 'url(#paint3_linear_14245_85147)' },
  { d: peopleIcon.d5, fill: 'url(#paint4_linear_14245_85147)' },
  { d: peopleIcon.d6, fill: 'url(#paint5_linear_14245_85147)' },
]

export const settingsIconPath: pathT[] = [
  { d: settingsIcon.d1, fill: 'white' },
  { d: settingsIcon.d2, fill: 'white' },
]
