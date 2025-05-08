import { useAuthSocialQuery } from 'api/userLoginService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { Path } from 'enum/pathE'
import { FC, useEffect } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { selectUser } from 'selectors'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { authState, id } from 'store/redux/users/slice'

export const SocialAuthPage: FC = () => {
  const { data: authData } = useAuthSocialQuery()
  const dispatch = useAppDispatch()
  const { auth: authetificationState } = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (authData) {
      dispatch(authState({ access: authData.access, refresh: authData.refresh }))
      dispatch(id(authData.user.id))
      localStorage.setItem('id', authData.user.id.toString())
    }
  }, [authData])

  useEffect(() => {
    if (authetificationState) {
      navigate(generatePath(Path.ChooseSchool))
    }
  }, [authetificationState])

  return <LoaderLayout></LoaderLayout>
}
