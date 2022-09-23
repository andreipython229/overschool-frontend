import { Path } from '../../../enum/pathE'
import { GlobalPrevious } from '../GlobalPrevious'
import { CoursePrevious } from '../CoursePrevious'
import { StudentPrevious } from '../StudentPrevious'
import { StudentCourseHeader } from '../../../Pages/StudentCourse/StudentCourseHeader/index'

const pathToSearch = Object.entries(Path).map(([key, value]) => {
  return { [key]: value.split('*')[0] }
})

const objOfPathes = Object.assign({}, ...pathToSearch.map(key => ({ ...key })))

export const previousToShow = [
  { path: 'create-course/', Component: CoursePrevious },
  { path: objOfPathes.Settings, Component: GlobalPrevious },
  { path: Path.Courses, Component: GlobalPrevious },
  { path: 'student-course/', Component: StudentCourseHeader },
  { path: objOfPathes.HomeWork, Component: GlobalPrevious },
  { path: objOfPathes.CourseStats, Component: GlobalPrevious },
  { path: objOfPathes.Profile, Component: StudentPrevious },
]
