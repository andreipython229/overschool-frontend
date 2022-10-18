import { Path, SettingsPath, Student } from '../../../enum/pathE'
import { GlobalPrevious } from '../GlobalPrevious'
import { CoursePrevious } from '../CoursePrevious'
import { StudentPrevious } from '../StudentPrevious'
import { StudentCourseHeader } from '../../../Pages/StudentCourse/StudentCourseHeader/index'
import { GroupPrevious } from '../GroupPrevious/index'

const pathToSearch = Object.entries(Path).map(([key, value]) => {
  return { [key]: value.split(':')[0] }
})

const objOfPathes = Object.assign({}, ...pathToSearch.map(key => ({ ...key })))

export const previousToShow = [
  { path: objOfPathes.CreateCourse, Component: CoursePrevious },
  { path: objOfPathes.Settings, Component: GlobalPrevious },
  { path: objOfPathes.Courses, Component: GlobalPrevious },
  { path: SettingsPath.Main, Component: GlobalPrevious },
  { path: SettingsPath.Employees, Component: GlobalPrevious },
  { path: SettingsPath.Decoration, Component: GlobalPrevious },
  { path: SettingsPath.Logs, Component: GlobalPrevious },
  { path: Student.Course.split(':')[0], Component: StudentCourseHeader },
  { path: objOfPathes.HomeWork, Component: GlobalPrevious },
  { path: objOfPathes.CourseStats, Component: GlobalPrevious },
  { path: objOfPathes.Profile, Component: StudentPrevious },
  { path: objOfPathes.Group, Component: GroupPrevious },
]
