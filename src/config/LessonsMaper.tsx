import { ReactNode } from 'react'

import { IconSvg } from '../components/common/IconSvg/IconSvg'
import {
  homeworkHeaderIcon,
  lessonIcon,
  testIconPath,
} from '../Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config'

export const lessonSvgMapper: { [key: string]: ReactNode } = {
  homework: <IconSvg width={20} height={20} viewBoxSize="0 0 24 24" path={homeworkHeaderIcon('#357EEB')} />,
  lesson: <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={lessonIcon} />,
  test: <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={testIconPath} />,
}
