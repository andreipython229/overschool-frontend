import { useLazyGetUserInfoQuery } from 'api/userLoginService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { Path } from 'enum/pathE'
import { FC, useEffect, useMemo } from 'react'
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom'
import { selectUser } from '@/selectors'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { auth, authState, id, role, userEmail, userName } from '@/store/redux/users/slice'
import { RoleE } from '@/enum/roleE'

export const SocialAuthPage: FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const { auth: authetificationState, authState: authStateRedux, userId, email } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [getUserInfo, { isSuccess }] = useLazyGetUserInfoQuery()

  const authData = useMemo(() => {
    return Object.fromEntries(searchParams.entries())
  }, [searchParams])

  useEffect(() => {
    if (authData && authData.access && authData.refresh && authData.id && authData.email) {
      dispatch(authState({ access: authData.access, refresh: authData.refresh }))
      dispatch(id(Number(authData.id)))
      dispatch(userEmail(authData.email))
      localStorage.setItem('id', authData.id.toString())
    }
  }, [authData, dispatch])

  useEffect(() => {
    if (authetificationState && isSuccess) {
      navigate(generatePath(Path.ChooseSchool))
    }
  }, [authetificationState, navigate, isSuccess])

  useEffect(() => {
    if (authStateRedux && userId && email) {
      getUserInfo()
        .unwrap()
        .then(resp => {
          dispatch(auth(true))
          dispatch(userName(resp[0]?.username))
          dispatch(role(RoleE.Unknown))
        })
        .catch(() => navigate(generatePath(Path.LoginPage)))
    }
  }, [authStateRedux, userId, email, getUserInfo, dispatch, navigate])

  return <LoaderLayout></LoaderLayout>
}
