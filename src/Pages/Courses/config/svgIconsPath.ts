import { publishedMarkerSvgIcon, classesSettingSvgIcon, createGroupLittleSvgIcon } from '../../../constants/iconSvgConstants'
import { studentInfoScatterIcon, studentIcon, settingsIcon, studentScatterIcon } from '../constants/svgIcons'
import { pathT } from '../../../types/commonComponentsTypes'

export const publishedIconPath = [{ d: publishedMarkerSvgIcon.published, fill: '#E0DCED' }]

export const noPublishedGreyIconPath = [{ d: publishedMarkerSvgIcon.noPublished, fill: '#6C7889' }]

export const noPublishedIconPath = [{ d: publishedMarkerSvgIcon.noPublished, fill: '#E0DCED' }]

export const settingsIconPath = [{ d: classesSettingSvgIcon.setting, fill: '#6B7280' }]

export const deleteIconPath = [{ d: classesSettingSvgIcon.deleteIcon, fill: '#EF4444' }]

export const paperClipIconPath = [{ d: classesSettingSvgIcon.paperClip, fill: '#6B7280' }]

export const studentInfoScatterIconPath = [{ d: studentInfoScatterIcon, fill: 'url(#paint0_linear_283_4112)' }]

export const studentScatterIconPath = [{ d: studentScatterIcon, fill: 'url(#paint0_linear_283_4115)' }]

export const settingsBtnIconPath = [{ d: settingsIcon, fill: '#BA75FF' }]

export const studentIconPath: pathT[] = [
  { d: studentIcon.d1, fill: '#BA75FF', fillRule: 'evenodd', clipRule: 'evenodd' },
  { d: studentIcon.d2, fill: '#BA75FF', fillRule: 'evenodd', clipRule: 'evenodd' },
]

export const createGroupIconPath = [
  { d: createGroupLittleSvgIcon.humanSvg, fill: '#BA75FF' },
  { d: createGroupLittleSvgIcon.plusSvg, fill: '#BA75FF' },
]

export const showAllGroups: pathT[] = [
  { d: 'M1.25 1.15625L7.5 7.40625L13.75 1.15625', stroke: '#9CA3AF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]
