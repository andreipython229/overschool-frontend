import { createGroupSvgIcon, addStudentSvgIcon } from '../../../../constants/iconSvgConstants'
import { settingsGroupIcon, accessToClassIcon } from '../constants/svgIcons'
import { pathT } from '../../../../types/commonComponentsTypes'

export const createGroupIconPath = [
  { d: createGroupSvgIcon.humanSvg, fill: '#BA75FF' },
  { d: createGroupSvgIcon.plusSvg, fill: '#BA75FF' },
]

export const addStudentIconPath = [
  { d: addStudentSvgIcon.d1, fill: '#357EEB' },
  { d: addStudentSvgIcon.d2, fill: '#357EEB' },
  { d: addStudentSvgIcon.d3, fill: '#357EEB' },
  { d: addStudentSvgIcon.d4, fill: '#357EEB' },
]

export const settingsGroupIconPath = [{ d: settingsGroupIcon, fill: '#BA75FF' }]

export const accessToClassIconPath: pathT[] = [
  { d: accessToClassIcon, stroke: '#A097A9', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]
