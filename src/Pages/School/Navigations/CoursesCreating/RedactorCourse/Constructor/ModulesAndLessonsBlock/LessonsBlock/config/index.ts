import { lessonsTypeSvgIcon } from 'constants/iconSvgConstants'
import { pathT } from 'types/commonComponentsTypes'

export const lessonIcon = [{ d: lessonsTypeSvgIcon.lesson, fill: '#BA75FF' }]
export const homeworkIcon: pathT[] = [
  { d: lessonsTypeSvgIcon.homework, stroke: '#BA75FF', strokeWidth: '1.2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]
export const testIcon = [{ d: lessonsTypeSvgIcon.test, fill: '#BA75FF' }]
