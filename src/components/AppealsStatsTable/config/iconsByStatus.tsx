import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { acceptedHwPath, waitingdHwPath } from '../../../config/commonSvgIconsPath'

type iconByStatusValT = { icon: ReactNode; textColor: string }

export const iconsByStatus: { [key: string]: iconByStatusValT } = {
  ['Ждет обработки']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />, textColor: '#717985' },
  ['Обработана']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={acceptedHwPath} />, textColor: '#17B198' },
}
