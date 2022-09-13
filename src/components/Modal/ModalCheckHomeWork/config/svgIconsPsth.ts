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
import { pathT } from '../../../common/commonComponentsTypes'

export const taskIconPath = [{ d: taskSvgIcon, fill: '#6B7280' }]

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

export const arrIconPath = [{ d: arrowIcon, fill: '#9A9A9A' }]
