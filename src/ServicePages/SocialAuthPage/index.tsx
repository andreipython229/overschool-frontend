import { useFetchConfiguredDomainsQuery } from 'api/DomainService'
import { useGetSchoolsMutation } from 'api/getSchoolService'
import { useAuthSocialQuery, useLazyGetUserInfoQuery } from 'api/userLoginService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { Path } from 'enum/pathE'
import { RoleE } from 'enum/roleE'
import { SchoolT } from 'Pages/ChooseSchool/ChooseSchool'
import { FC, useEffect } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { selectUser } from 'selectors'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { auth, authState, id, role, userName } from 'store/redux/users/slice'

export const SocialAuthPage: FC = () => {
  const { data: authData, isSuccess, isFetching: isLoading } = useAuthSocialQuery()
  const dispatch = useAppDispatch()
  const { auth: authetificationState } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [getUserInfo] = useLazyGetUserInfoQuery()

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

  useEffect(() => {
    if (isSuccess) {
      getUserInfo()
        .unwrap()
        .then(resp => {
          dispatch(auth(true))
          dispatch(userName(resp[0]?.username))
        })
        .catch(() => console.log('Error fetching user data'))
    }
  }, [isSuccess, isLoading])

  return <LoaderLayout></LoaderLayout>
}
