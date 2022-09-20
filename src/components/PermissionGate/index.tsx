import { ReactNode, FC } from 'react'

import { PERMISSIONS } from '../../config/permissions'

type permissionGateT = {
  permissions: string[]
  children: ReactNode
}

export const PermissionGate: FC<permissionGateT> = ({ permissions, children }) => {
  const permitted = permissions.some((item: string) => item === PERMISSIONS[item])
  if (!permitted) return null
  return <>{children}</>
}
