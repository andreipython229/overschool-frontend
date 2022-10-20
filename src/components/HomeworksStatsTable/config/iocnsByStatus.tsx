import { ReactNode } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { acceptedHwPath, autoCheckHwPath, underRevisionHwPath, rejectedHwPath, waitingdHwPath } from '../../../config/commonSvgIconsPath'

export const iocnsByStatus: { [key: string]: ReactNode } = {
  ['Отклонено']: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={rejectedHwPath} />,
  ['Ждет проверки']: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />,
  ['Принято']: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={acceptedHwPath} />,
  ['На доработке']: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={underRevisionHwPath} />,
  ['Автопроверка']: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={autoCheckHwPath} />,
}
