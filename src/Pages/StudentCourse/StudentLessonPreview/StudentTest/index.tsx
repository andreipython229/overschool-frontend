import { FC } from 'react'

import { StudentCourseNavArr } from '../StudentCourseNavArr'
import { StudentLessonSidebar } from '../StudentLessonSidebar'

export const StudentTest: FC = () => {
  return (
    <div>
      <StudentCourseNavArr />
      <div>Test</div>
    </div>
  )
}
