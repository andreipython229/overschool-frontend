import { filterSvgIcon, searchSvgIcon, arrowIcon } from '../../../constants/iconSvgConstants'
import { pathT } from '../../common/IconSvg/IconSvg'

export const filterIconPath = [{ d: filterSvgIcon, fill: '#D1D5DB' }]

export const searchIconPath: pathT[] = 
[{ d: searchSvgIcon, stroke: '#D1D5DB', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }]

export const arrIconPath = [{ d: arrowIcon, fill: '#9A9A9A' }]
