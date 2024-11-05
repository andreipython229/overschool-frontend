import { ReactNode } from 'react'

import { IconSvg } from '../components/common/IconSvg/IconSvg'
import {
  homeworkIcon,
  lessonIcon,
  testIcon,
} from '../Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config'

export const lessonSvgMapper: { [key: string]: ReactNode } = {
  homework: <IconSvg width={36} height={36} viewBoxSize='0 0 44 44' path={homeworkIcon} />,
  lesson: <IconSvg width={36} height={36} viewBoxSize='0 0 46 46' path={lessonIcon} />,
  test: <IconSvg width={36} height={36} viewBoxSize='0 0 46 46'  path={testIcon} />,
}
