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
    { path: Path.Courses, icon: navlinkIcon[Path.Courses] },
    { path: Path.CourseStats, icon: navlinkIcon[Path.CourseStats] },
    { path: Path.HomeWork, icon: navlinkIcon[Path.HomeWork] },
    { path: Path.Settings, icon: navlinkIcon[Path.Settings] },
  ],
  [RoleE.Student]: [{ path: Path.Courses, icon: navlinkIcon[Path.Courses] }],
  [RoleE.SuperAdmin]: [{ path: Path.Settings, icon: navlinkIcon[Path.Settings] }],
  [RoleE.Teacher]: [
    { path: Path.CourseStats, icon: navlinkIcon[Path.CourseStats] },
    { path: Path.HomeWork, icon: navlinkIcon[Path.HomeWork] },
  ],
}
