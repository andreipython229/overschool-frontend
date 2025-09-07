import { pathT } from '../../../types/commonComponentsTypes'
import { aiButtonIcon, arrowUpIcon, messageIcon, ratingChangeIcon, userIcon, aiMobileButtonIcon } from '../constants/svgIcon'
// stroke="#357EEB" stroke-width="1.5" stroke-linejoin="round"/>

export const aiButtonNavIcon: pathT[] = [
  { d: aiButtonIcon.d1, stroke: '#357EEB', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: aiButtonIcon.d2, stroke: '#357EEB', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: aiButtonIcon.d3, stroke: '#357EEB', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const arrowUpNavIcon: pathT[] = [
  { d: arrowUpIcon.d1, stroke: '#858D9D', fill: '#858D9D', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const messageNavIcon: pathT[] = [
  { d: messageIcon.d1, stroke: '#357EEB', fill: '#357EEB', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: messageIcon.d2, stroke: '#357EEB', fill: '#357EEB', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: messageIcon.d3, stroke: '#357EEB', fill: '#357EEB', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: messageIcon.d4, stroke: '#357EEB', fill: '#357EEB', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const ratingChangeNavIcon: pathT[] = [
  { d: ratingChangeIcon.d1, stroke: '#332F36', fill: '#332F36', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const userNavIcon: pathT[] = [
  { d: userIcon.d1, stroke: '#332F36', fill: '#332F36', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: userIcon.d2, stroke: '#332F36', fill: '#332F36', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const aiMobileButtonNavIcon: pathT[] = [
  { d: aiMobileButtonIcon.d, stroke: '#357EEB', fill: '#357EEB', strokeWidth: '.1', strokeLinecap: 'round', strokeLinejoin: 'round' },
]
