import { Path } from '../../../enum/pathE'
import { GlobalPrevious } from '../GlobalPrevious/index'
import { CoursePrevious } from '../CoursePrevious/index'
import { StudentPrevious } from '../StudentPrevious/index'

const pathToSearch = Object.entries(Path).map(([key, value]) => {
  return { [key]: value.split('*')[0] }
})

const objOfPathes = Object.assign({}, ...pathToSearch.map(key => ({ ...key })))

export const previousToShow = [
  { path: 'create-course', Component: CoursePrevious },
  { path: objOfPathes.Settings, Component: GlobalPrevious },
  { path: objOfPathes.HomeWork, Component: GlobalPrevious },
  { path: objOfPathes.Courses, Component: GlobalPrevious },
  { path: objOfPathes.CourseStats, Component: GlobalPrevious },
  { path: objOfPathes.Profile, Component: StudentPrevious },
]
