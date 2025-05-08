import { useAuthLoginQuery } from 'api/userLoginService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { FC } from 'react'

export const SocialAuthPage: FC = () => {
  const { data: authData } = useAuthLoginQuery()
  
  return <LoaderLayout></LoaderLayout>
}
