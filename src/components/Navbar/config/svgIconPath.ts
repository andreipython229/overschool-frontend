import { pathT } from '../../../types/commonComponentsTypes'
import { coursesNavIcon, coursesStatsIcon, homeworkIcon, settingsNavIcon, chatIcon } from '../constants/svgIcon'

export const navMenuPath: pathT[] = [
  { d: 'M2 2H28M2 9H18.5455M2 16H28M2 23H18.5455', stroke: '#E0DCED', strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const chatIconPath: pathT[] = [
  { d: chatIcon.d1, stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: chatIcon.d2, stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: chatIcon.d3, stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: chatIcon.d4, stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const appealsIconPath: pathT[] = [
  {
    d: 'M19 10c1.13 0 2.16-.39 3-1.02V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10.1c-.06.32-.1.66-.1 1 0 1.48.65 2.79 1.67 3.71L12 11 5.3 6.81c-.57-.35-1.3.05-1.3.72 0 .29.15.56.4.72l7.07 4.42c.32.2.74.2 1.06 0l4.77-2.98c.54.19 1.1.31 1.7.31m-3-5c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
]

export const coursesNavPath: pathT[] = [
  { d: coursesNavIcon, stroke: 'currentColor', fill: '`#e0dce`d', strokeWidth: '3.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const coursesStatsNavPath: pathT[] = [
  { d: coursesStatsIcon, fill: 'currentColor', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const homeworkNavPath: pathT[] = [
  { d: homeworkIcon.d1, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d2, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d3, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d4, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d5, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: homeworkIcon.d6, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
]

export const settingsNavPath: pathT[] = [
  { d: settingsNavIcon.d1, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: settingsNavIcon.d2, fill: 'currentColor', strokeWidth: '.1', fillRule: 'evenodd', clipRule: 'evenodd' },
]
