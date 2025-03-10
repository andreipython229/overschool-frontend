import { Path, SettingsPath, Student } from '../../../enum/pathE'
import { GlobalPrevious } from '../GlobalPrevious'
import { GroupPrevious } from '../GroupPrevious'
import {ProfilePrevious} from "../ProfilePrevious";

const pathToSearch = Object.entries(Path).map(([key, value]) => {
  return { [key]: value.split(':')[0] }
})

const objOfPathes = Object.assign({}, ...pathToSearch.map(key => ({ ...key })))

export const previousToShow = [
  { path: Path.Courses + Student.Course, Component: GlobalPrevious },
  { path: objOfPathes.CreateCourse, Component: GlobalPrevious },
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
  { path: SettingsPath.Banner, Component: GlobalPrevious },
  { path: Path.Appeals, Component: GlobalPrevious },
  { path: objOfPathes.HomeWork, Component: GlobalPrevious },
  { path: objOfPathes.CourseStats, Component: GlobalPrevious },
  { path: objOfPathes.Profile, Component: ProfilePrevious },
  { path: objOfPathes.Group, Component: GroupPrevious },
  { path: objOfPathes.Meetings, Component: GlobalPrevious },
  { path: objOfPathes.Rating, Component: GlobalPrevious },
]
