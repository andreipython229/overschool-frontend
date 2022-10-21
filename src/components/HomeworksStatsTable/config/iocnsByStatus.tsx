import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { acceptedHwPath, autoCheckHwPath, underRevisionHwPath, rejectedHwPath, waitingdHwPath } from '../../../config/commonSvgIconsPath'

type iconByStatusValT = { icon: ReactNode; textColor: string }

export const iocnsByStatus: { [key: string]: iconByStatusValT } = {
  ['Отклонено']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={rejectedHwPath} />, textColor: '#FF2C2C' },
  ['Ждет проверки']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />, textColor: '#717985' },
  ['Принято']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={acceptedHwPath} />, textColor: '#17B198' },
  ['На доработке']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={underRevisionHwPath} />, textColor: '#FFCA71' },
  ['Автопроверка']: { icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={autoCheckHwPath} />, textColor: '#6B7484' },
}
