import { useAuthSocialQuery } from 'api/userLoginService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { FC } from 'react'

export const SocialAuthPage: FC = () => {
  const { data: authData } = useAuthSocialQuery()
  
  return <LoaderLayout></LoaderLayout>
}
