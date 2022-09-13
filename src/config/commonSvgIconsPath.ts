import { classesSettingSvgIcon, cross, searchSvgIcon } from '../constants/iconSvgConstants'
import { pathT } from '../components/common/IconSvg/IconSvg'

export const arrUpPath = [{ d: classesSettingSvgIcon.arrowUp, fill: '#2E4454' }]

export const arrDownPath = [{ d: classesSettingSvgIcon.arrowDown, fill: '#2E4454' }]

export const arrUpdatePath = [{ d: classesSettingSvgIcon.arrowUpdate, fill: '#BA75FF' }]

export const deletePath = [{ d: classesSettingSvgIcon.deleteIcon, fill: '#EF4444' }]

export const crossIconPath: pathT[] = [{ d: cross, stroke: '#E0DCED', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const searchIconPath: pathT[] = [{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]
