import { ReactNode } from 'react'

import { IconSvg } from '../components/common/IconSvg/IconSvg'
import {
  homeworkIcon,
  lessonIcon,
  testIcon,
} from '../Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config'

export const lessonSvgMapper: { [key: string]: ReactNode } = {
  homework: <IconSvg width={25} height={27} path={homeworkIcon} />,
  lesson: <IconSvg width={22} height={22} path={lessonIcon} />,
  test: <IconSvg width={25} height={27} path={testIcon} />,
}
