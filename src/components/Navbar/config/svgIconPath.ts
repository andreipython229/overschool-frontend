import { pathT } from '../../../types/commonComponentsTypes'
import { coursesNavIcon, coursesStatsIcon, homeworkIcon, settingsNavIcon } from '../constants/svgIcon'

export const navMenuPath: pathT[] = [
  { d: 'M2 2H28M2 9H18.5455M2 16H28M2 23H18.5455', stroke: '#E0DCED', strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const coursesNavPath: pathT[] = [
  { d: coursesNavIcon, stroke: '#E0DCED', fill: '#E0DCED', strokeWidth: '3.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const coursesStatsNavPath: pathT[] = [
  { d: coursesStatsIcon, fill: '#E0DCED', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const homeworkNavPath: pathT[] = [
  { d: homeworkIcon.d1, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d2, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d3, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d4, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d5, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d6, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
]

export const settingsNavPath: pathT[] = [
  { d: settingsNavIcon.d1, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: settingsNavIcon.d2, fill: '#E0DCED', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
]
