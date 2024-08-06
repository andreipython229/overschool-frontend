import { Path, SettingsPath, Student } from '../../../enum/pathE'
import { GlobalPrevious } from '../GlobalPrevious'
import { CoursePrevious } from '../CoursePrevious'
import { StudentPrevious } from '../StudentPrevious'
import { StudentCourseHeader } from '../../../Pages/StudentCourse/StudentCourseHeader'
import { GroupPrevious } from '../GroupPrevious'

const pathToSearch = Object.entries(Path).map(([key, value]) => {
  return { [key]: value.split(':')[0] }
})

const objOfPathes = Object.assign({}, ...pathToSearch.map(key => ({ ...key })))

const getCoursePath = () => {
  let id = localStorage.getItem('course_id')
  if (id == '' || !id) id = '1'
  return `school/${localStorage.getItem('school')}/courses/student-course/${id}/`
}

export const previousToShow = [
  { path: objOfPathes.CreateCourse, Component: CoursePrevious },
  { path: objOfPathes.Settings, Component: GlobalPrevious },
  { path: objOfPathes.Courses, Component: GlobalPrevious },
  { path: SettingsPath.Main, Component: GlobalPrevious },
  { path: SettingsPath.Employees, Component: GlobalPrevious },
  { path: SettingsPath.Decoration, Component: GlobalPrevious },
  { path: SettingsPath.Logs, Component: GlobalPrevious },
  { path: SettingsPath.SchoolPassport, Component: GlobalPrevious },
  { path: SettingsPath.PaymentMethods, Component: GlobalPrevious },
  { path: SettingsPath.Bonuses, Component: GlobalPrevious },
  { path: SettingsPath.EmailNewsLetter, Component: GlobalPrevious },
  { path: Path.Appeals, Component: GlobalPrevious },
  { path: objOfPathes.HomeWork, Component: GlobalPrevious },
  { path: objOfPathes.CourseStats, Component: GlobalPrevious },
  { path: objOfPathes.Profile, Component: StudentPrevious },
  { path: objOfPathes.Group, Component: GroupPrevious },
  { path: objOfPathes.Meetings, Component: GlobalPrevious },
  { path: objOfPathes.Rating, Component: GlobalPrevious },
]
