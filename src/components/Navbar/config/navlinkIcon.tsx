import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Path } from 'enum/pathE'
import { coursesNavPath, coursesStatsNavPath, homeworkNavPath, settingsNavPath, chatIconPath} from './svgIconPath'
import VideocamIcon from '@mui/icons-material/Videocam';

export const navlinkIcon: { [key: string]: ReactNode } = {
  [Path.Meetings]: <VideocamIcon style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.1em' }}/>,
  [Path.Courses]: <IconSvg width={38} height={32} viewBoxSize={'0 0 38 32'} path={coursesNavPath} />,
  [Path.CourseStats]: <IconSvg width={36} height={36} viewBoxSize={'0 0 36 36'} path={coursesStatsNavPath} />,
  [Path.HomeWork]: <IconSvg width={39} height={33} viewBoxSize={'0 0 39 33'} path={homeworkNavPath} />,
  [Path.Settings]: <IconSvg width={35} height={35} viewBoxSize={'0 0 35 35'} path={settingsNavPath} />,
  [Path.Chat]: <IconSvg width={38} height={34} viewBoxSize={'0 0 28 24'} path={chatIconPath} />,
}
