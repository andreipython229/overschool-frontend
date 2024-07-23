import { ReactNode } from 'react'

import { Path } from 'enum/pathE'
import { navlinkIcon } from './navlinkIcon'
import { RoleE } from 'enum/roleE'

type navLinkConfigT = {
  path: string
  icon: ReactNode
}

export const navlinkByRoles: { [key: number]: navLinkConfigT[] } = {
  [RoleE.Admin]: [
    // { path: Path.Courses, icon: navlinkIcon[Path.Courses] },
    { path: Path.Meetings, icon: navlinkIcon[Path.Meetings] },
    { path: Path.CourseStats, icon: navlinkIcon[Path.CourseStats] },
    { path: Path.HomeWork, icon: navlinkIcon[Path.HomeWork] },
    { path: 'doNotPath', icon: navlinkIcon[Path.Chat] },
    { path: Path.Settings, icon: navlinkIcon[Path.Settings] },  
  ],

  [RoleE.Student]: [
    // { path: Path.Courses, icon: navlinkIcon[Path.Courses] },
    { path: Path.Meetings, icon: navlinkIcon[Path.Meetings] },
    { path: 'doNotPath', icon: navlinkIcon[Path.Chat] },
  ],

  [RoleE.SuperAdmin]: [
    { path: Path.Meetings, icon: navlinkIcon[Path.Meetings] },
      { path: 'doNotPath', icon: navlinkIcon[Path.Chat] },
      { path: Path.Settings, icon: navlinkIcon[Path.Settings] },
  ],
  
  [RoleE.Teacher]: [
    // { path: Path.Courses, icon: navlinkIcon[Path.Courses] },
    { path: Path.Meetings, icon: navlinkIcon[Path.Meetings] },
    { path: Path.CourseStats, icon: navlinkIcon[Path.CourseStats] },
    { path: Path.HomeWork, icon: navlinkIcon[Path.HomeWork] },
    { path: 'doNotPath', icon: navlinkIcon[Path.Chat] },
  ],
}
