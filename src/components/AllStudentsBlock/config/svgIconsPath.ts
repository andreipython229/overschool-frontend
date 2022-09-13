import { addStudentSvgIconButton, classesSettingSvgIcon, searchSvgIcon } from '../../../constants/iconSvgConstants'
import { pathT } from '../../common/commonComponentsTypes'

export const searchIconPath: pathT[] = 
[{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const addStudentIconPath = [{ d: addStudentSvgIconButton, fill: '#C0B3F9' }]

export const updateArrPath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]
