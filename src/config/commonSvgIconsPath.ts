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
  arrowLeftIcon,
} from '../constants/iconSvgConstants'
import { pathT } from '../types/commonComponentsTypes'

export const arrUpPath = [{ d: classesSettingSvgIcon.arrowUp, fill: '#2E4454' }]

export const arrDownPath = [{ d: classesSettingSvgIcon.arrowDown, fill: '#2E4454' }]

export const arrUpdatePath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]

export const toggleBtnArr: pathT[] = [
  { d: 'M1.25 1.15625L7.5 7.40625L13.75 1.15625', stroke: '#9CA3AF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const deletePath = [{ d: classesSettingSvgIcon.deleteIcon, fill: 'currentColor' }]

export const crossIconPath = [
    { d: cross.d1, fill: '#808080' },
    { d: cross.d2, fill: '#808080' },
]

export const searchIconPath: pathT[] = [{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const tableFilterByNamePath = [{ d: tableFilterArrByNameIcon, fill: '#BA75FF' }]

export const tableFilterByEmailUpPath = [{ d: tableFilterByEmailUpIcon, fill: '#D1D5DB' }]

export const tableFilterByEmailDownPath = [{ d: tableFilterByEmailDownIcon, fill: '#D1D5DB' }]

export const tableBallsStarPath: pathT[] = [
  { d: tableBallsStarIcon, fill: '#FFDFB0', stroke: '#FFC671', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const tableBallsPth: pathT[] = [
  { d: "M5.79047 13.5715L3 17.5642L6.03049 18.4647L7.91033 21.0061L10.7306 16.9841M18.2115 13.5715L21.0015 17.5637L17.9715 18.4642L16.0912 21.0056L13.2709 16.9836", stroke: '#357EEB', strokeWidth: '1.28', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: "M19.2803 9.99993C19.2803 10.7606 18.6101 11.4008 18.3898 12.0813C18.1699 12.7613 18.3202 13.692 17.8901 14.2822C17.46 14.8724 16.5397 15.0025 15.9997 15.4429C15.4596 15.8833 14.9998 16.7035 14.2999 16.9336C13.5995 17.1636 12.8093 16.7232 12.0494 16.7232C11.2895 16.7232 10.4797 17.1535 9.79949 16.9336C9.11928 16.7131 8.68916 15.8626 8.09919 15.4429C7.50874 15.0227 6.58899 14.8724 6.15887 14.2822C5.72875 13.6915 5.88909 12.7815 5.65915 12.0813C5.42873 11.3806 4.71875 10.7606 4.71875 9.99993C4.71875 9.23923 5.38889 8.59956 5.60874 7.91907C5.8286 7.23857 5.67883 6.30836 6.10895 5.71815C6.53906 5.12794 7.4593 4.99779 8.04927 4.55742C8.63924 4.11704 8.99927 3.2968 9.74909 3.06676C10.4994 2.83625 11.2396 3.27663 11.9995 3.27663C12.7594 3.27663 13.5692 2.84634 14.2499 3.06676C14.9297 3.28671 15.3598 4.13721 15.9997 4.55742C16.6396 4.97762 17.5099 5.12746 17.94 5.71815C18.3701 6.30884 18.2103 7.21888 18.4402 7.91907C18.6702 8.61925 19.2803 9.23971 19.2803 9.99993Z", stroke: '#357EEB', strokeWidth: '1.28', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: "M12 14C13.0609 14 14.0783 13.5786 14.8284 12.8284C15.5786 12.0783 16 11.0609 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6C10.9391 6 9.92172 6.42143 9.17157 7.17157C8.42143 7.92172 8 8.93913 8 10C8 11.0609 8.42143 12.0783 9.17157 12.8284C9.92172 13.5786 10.9391 14 12 14Z", stroke: '#357EEB', strokeLinecap: 'round', strokeLinejoin: 'round' }
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

export const purpleTariffPlanIconPath = [{ d: tariffPlanIcon, fill: '#357EEB' }]

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

export const arrowLeftIconPath: pathT[] = [
  { d: arrowLeftIcon.d1, stroke: '#357EEB', strokeWidth: '1.6', strokeLinejoin: 'round', strokeLinecap: 'round' },
  { d: arrowLeftIcon.d2, stroke: '#357EEB', strokeWidth: '1.6', strokeLinejoin: 'round', strokeLinecap: 'round' },
]
