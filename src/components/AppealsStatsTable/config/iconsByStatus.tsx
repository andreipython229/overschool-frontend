import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { acceptedHwPath, waitingdHwPath } from '../../../config/commonSvgIconsPath'

type iconByStatusValT = { icon: ReactNode; textColor: string; circleColor: string }

export const iconsByStatus: { [key: string]: iconByStatusValT } = {
  ['Ждет обработки']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />, circleColor: '#717985', textColor: '#000000' },
  ['Обработана']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={acceptedHwPath} />, circleColor: '#4CC700', textColor: '#FFFFFF' },
}
