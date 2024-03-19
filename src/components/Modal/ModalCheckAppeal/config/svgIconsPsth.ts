import {
  arrowIcon,
  humanSvgIcon,
  taskSvgIcon,
  waitSvgIcon,
  lastAnswerSvgIcon,
  classesSettingSvgIcon,
  starSvgIcon,
  sendSvgIcon,
  doneFilledSvgIcon,
  doneNotFilledSvgIcon,
} from '../../../../constants/iconSvgConstants'
import { pathT } from '../../../../types/commonComponentsTypes'

export const taskIconPath = [{ d: taskSvgIcon, fill: 'currentColor' }]

export const waitIconPath = [{ d: waitSvgIcon, fill: '#717985' }]

export const lastAnswIconPath = [{ d: lastAnswerSvgIcon, fill: '#BA75FF' }]

export const humanIconPath = [{ d: humanSvgIcon, fill: '#BA75FF' }]

export const paperClipIconPath = [{ d: classesSettingSvgIcon.paperClip, fill: '#6B7280' }]

export const starIconPath: pathT[] = [
  { d: starSvgIcon, fill: '#E5E7EB', stroke: '#E0DCED', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const doneNotFilledIconPath = [{ d: doneNotFilledSvgIcon, fill: '#17B198' }]

export const doneFilledIconPath = [{ d: doneFilledSvgIcon, fill: '#4BC3AF' }]

export const sendIconPath: pathT[] = [{ d: sendSvgIcon, stroke: 'white', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const arrIconPath = [{ d: arrowIcon, fill: 'currentColor' }]

export const closeHwModalPath: pathT[] = [
  {
    d: 'M1.86523 15.1356L15.1361 1.86475M15.1361 15.1356L1.86523 1.86475',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
]
