import {
    addStudentSvgIconButton,
    classesSettingSvgIcon,
    searchSvgIcon,
    sendSvgIcon,
    updateSvgIcon,
    searchIcon, searchFilterIcon, chatGroup
} from '../../../constants/iconSvgConstants'
import { pathT } from '../../../types/commonComponentsTypes'

export const searchIconPath: pathT[] = [{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const addStudentIconPath = [{ d: addStudentSvgIconButton, fill: '#C0B3F9' }]

export const updateArrPath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]

export const sendArrPath = [{ d: sendSvgIcon}]

export const studentsSearchFilterPath: pathT[] = [{ d: searchFilterIcon.d1,
  stroke:"#332F36",
  strokeWidth:"2",
  strokeLinecap: 'round',
 }]

export const studentsSearchPath:pathT[] = [{ d: searchIcon.d1, fill:"url(#paint0_linear_16610_23078)"}, { d: searchIcon.d2, fill:"url(#paint1_linear_16610_23078)"}]
