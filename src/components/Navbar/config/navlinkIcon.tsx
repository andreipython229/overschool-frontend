import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Path } from 'enum/pathE'
import { coursesNavPath, coursesStatsNavPath, homeworkNavPath, settingsNavPath, chatIconPath, meetingsNavPath } from './svgIconPath'
// import VideocamIcon from '@mui/icons-material/Videocam';

export const navlinkIcon: { [key: string]: ReactNode } = {
  [Path.Chat]: <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={chatIconPath} />,
  // [Path.Meetings]: <VideocamIcon style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.1em' }}/>,
  [Path.Meetings]: <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={meetingsNavPath} />,
  [Path.Courses]: <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={coursesNavPath} />,
  [Path.CourseStats]: <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={coursesStatsNavPath} />,
  [Path.HomeWork]: <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={homeworkNavPath} />,
  [Path.Settings]: <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={settingsNavPath} />,
}
