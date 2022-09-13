import { checkSelectSvgIcon, checkSelectChildrenSvgIcon } from '../constants/svgIcons'
import { pathT } from '../../../common/commonComponentsTypes'

export const checkSelectIconPath = [{ d: checkSelectSvgIcon, fill: '#A8ABAD' }]

export const checkSelectChildIconPath: pathT[] = 
[
  { d: checkSelectChildrenSvgIcon, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', stroke: '#9884AC' },
]
