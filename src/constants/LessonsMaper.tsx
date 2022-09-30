import React, { FC } from 'react'
import { IconSvg } from '../components/common/IconSvg/IconSvg'
import {
  homeworkIcon,
  lessonIcon,
  testIcon,
} from '../Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config'

type LessonsMaperT = {
  type: keyof object
}

export const LessonsMaper: FC<LessonsMaperT> = ({ type }) => {
  const objectMaper = {
    homework: <IconSvg width={25} height={27} path={homeworkIcon} />,
    lesson: <IconSvg width={25} height={27} path={lessonIcon} />,
    test: <IconSvg width={25} height={27} path={testIcon} />,
  }
  return type && objectMaper[type]
}
