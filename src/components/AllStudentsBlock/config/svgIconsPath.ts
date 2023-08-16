import { addStudentSvgIconButton, classesSettingSvgIcon, searchSvgIcon , sendSvgIcon} from '../../../constants/iconSvgConstants'
import { pathT } from '../../../types/commonComponentsTypes'

export const searchIconPath: pathT[] = [{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const addStudentIconPath = [{ d: addStudentSvgIconButton, fill: '#C0B3F9' }]

export const updateArrPath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]

export const sendArrPath = [{ d: sendSvgIcon}]
