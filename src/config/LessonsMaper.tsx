import { ReactNode } from 'react'

import { IconSvg } from '../components/common/IconSvg/IconSvg'
import {
  homeworkIcon,
  lessonIcon,
  testIcon,
} from '../Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config'

export const lessonSvgMapper: { [key: string]: ReactNode } = {
  homework: <IconSvg width={22} height={22} viewBoxSize='0 0 10 16' path={homeworkIcon} />,
  lesson: <IconSvg width={22} height={22} viewBoxSize='0 0 22 20' path={lessonIcon} />,
  test: <IconSvg width={22} height={20} viewBoxSize='0 0 12 14'  path={testIcon} />,
}
