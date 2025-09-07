import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { acceptedHwPath, autoCheckHwPath, underRevisionHwPath, rejectedHwPath, waitingdHwPath } from '../../../config/commonSvgIconsPath'

type iconByStatusValT = { icon: ReactNode; textColor: string; circleColor: string }

export const iocnsByStatus: { [key: string]: iconByStatusValT } = {
  ['Отклонено']: {
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={rejectedHwPath} />,
    circleColor: '#E84242',
    textColor: '#000000',
  },
  ['Ждет проверки']: {
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />,
    circleColor: '#717985',
    textColor: '#000000',
  },
  ['Принято']: {
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={acceptedHwPath} />,
    circleColor: '#4CC700',
    textColor: '#FFFFFF',
  },
  ['На доработке']: {
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={underRevisionHwPath} />,
    circleColor: '#FFCA71',
    textColor: '#000000',
  },
  ['Автопроверка']: {
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={autoCheckHwPath} />,
    circleColor: '#6B7484',
    textColor: '#000000',
  },
}
