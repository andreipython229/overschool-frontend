import { logOutSvgIcon } from '../../../constants/iconSvgConstants'
import { pathT } from '../../../types/commonComponentsTypes'

export const logOutIconPath: pathT[] = [
  { d: logOutSvgIcon.dor, fill: '#357EEB' },
  { d: logOutSvgIcon.arrow, fill: '#357EEB', fillRule: 'evenodd', clipRule: 'evenodd' },
]