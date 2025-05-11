import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { LoginParamsT, validateLogin } from 'utils/validationLogin'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth, authState, id, logoutState, role, userName } from 'store/redux/users/slice'
import { useLoginMutation, useLazyGetUserInfoQuery, useLazyLogoutQuery } from '../../api/userLoginService'
import { Input } from 'components/common/Input/Input/Input'
import { facebook, google, isSecurity, maillog, unSecurity, yandex } from '../../assets/img/common'
import { useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailCodeMutation } from 'api/forgotPassword'
import { Toast } from 'primereact/toast'
import { generatePath, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button/Button'
import { InputAuth } from '../../components/common/Input/InputAuth/InputAuth'
import { Path } from '../../enum/pathE'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import styles from './loginPage.module.scss'
import {setHeaderId, setSchoolId, setSchoolName} from '../../store/redux/school/schoolSlice'
import {RoleE} from '../../enum/roleE'
import {SchoolT} from '../ChooseSchool/ChooseSchool'
import {useFetchConfiguredDomainsQuery} from '../../api/DomainService'
import {useGetSchoolsMutation} from '../../api/getSchoolService'

import {logoHeaderLogin, leftArrow} from '../../assets/img/common/index'
import {selectUser} from 'selectors'
import {LoaderLayout} from 'components/Loaders/LoaderLayout'
import {BackgroundAnimation} from 'components/BackgroundAnimation'
import {clearUserProfile} from 'store/redux/users/profileSlice'

interface INotification {
    state: boolean
    text: string
}

type FirstFormValuesT = {
    email: string
}
type LoginModalPropsT = {
    setShowModal: (value: boolean) => void
}

export const LoginPage = () => {
    const DefaultDomains = ['localhost', 'overschool.by', 'sandbox.overschool.by']
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const toast = useRef<Toast>(null)
    const [step, setStep] = useState<number>(1)
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [forgotPasswordFunc, {error: errorSend, isLoading: sendLoading}] = useForgotPasswordMutation()
    const [verifyCode, {error: errorCode, isLoading: codeLoading}] = useVerifyEmailCodeMutation()
    const [resetPassword, {error: errorReset, isLoading: resetLoading}] = useResetPasswordMutation()
    const [getSchools, {isLoading: isFetching}] = useGetSchoolsMutation()
    const {data: DomainData, isSuccess: DomainSuccess} = useFetchConfiguredDomainsQuery()
    const [logout] = useLazyLogoutQuery()
    const [security, setSecurity] = useState<boolean>(true)
    const [authVariant, setAuthVariant] = useState<keyof LoginParamsT>('email')
    const {auth: authetificationState} = useAppSelector(selectUser)

    const [attemptAccess, {error, isSuccess, isLoading}] = useLoginMutation()
    const [getUserInfo] = useLazyGetUserInfoQuery()

    const [isShown, setIsShown] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const currentDomain = window.location.hostname

    const forgotPass = (event: any) => {
        event.preventDefault()
        setIsShown(!isShown)
        setIsHidden(!isHidden)
    }

    const handleEmail = (event: any) => {
        setEmail(event.target.value)
    }

    const handleCode = (event: any) => {
        setCode(event.target.value)
    }

    const handleNewPassword = (event: any) => {
        setPassword(event.target.value)
    }

    const handleNewPasswordC = (event: any) => {
        setPasswordConfirmation(event.target.value)
    }
    const changeSecurityStatus = () => {
        setSecurity(!security)
    }

    useEffect(() => {
        if (authetificationState) {
            navigate(generatePath(Path.ChooseSchool))
        }
    }, [authetificationState])

    const formik = useFormik({
        validate: values => validateLogin(values, authVariant),
        initialValues: {
            email: '',
            phone: '',
            password: '',
        },

        onSubmit: async () => {
            const {email, password, phone} = formik.values
            const user = {login: phone ? phone : email, password}
            try {
                await attemptAccess(user)
                    .unwrap()
                    .then(data => {
                        dispatch(authState({access: data.access, refresh: data.refresh}))
                        dispatch(id(data.user.id))
                        localStorage.setItem('id', data.user.id.toString())
                    })
            } catch {
                console.log('smth went wrong')
            }
        },
    })
    const handleSchool = (school: SchoolT) => {
        dispatch(setSchoolName(school.name))
        dispatch(setSchoolId(school.school_id))
        dispatch(setHeaderId(school.header_school))
        const roleValue = Object.entries(RoleE).find(([key, value]) => key === school.role)?.[1]
        roleValue && dispatch(role(+roleValue))
    }

    useEffect(() => {
        if (isSuccess) {
            getUserInfo()
                .unwrap()
                .then(resp => {
                    dispatch(auth(true))
                    dispatch(userName(resp[0]?.username))
                    // dispatch(id(resp[0]?.id))
                    if (DefaultDomains.includes(currentDomain)) {
                        navigate(generatePath(Path.ChooseSchool))
                    } else {
                        if (DomainSuccess && DomainData) {
                            const currentDomainData = DomainData.find(domain => domain.domain_name === currentDomain)
                            if (currentDomainData) {
                                const currentSchoolId = currentDomainData.school
                                dispatch(role(RoleE.Unknown))
                                getSchools()
                                    .unwrap()
                                    .then((data: SchoolT[]) => {
                                        const school = data.find(school => school.school_id === currentSchoolId)
                                        if (school) {
                                            handleSchool(school)
                                            navigate(Path.School + Path.Courses)
                                        }
                                    })
                                    .catch(err => {
                                        if (err.status === 401) {
                                            localStorage.clear()
                                            logout()
                                            dispatch(logoutState())
                                            dispatch(clearUserProfile())
                                            navigate(generatePath(Path.InitialPage))
                                        }
                                    })
                            } else {
                                console.error('No current domain data found.')
                            }
                        } else {
                            console.error('DomainData is not available.')
                        }
                    }
                })
                .catch(() => console.log('Error fetching user data'))
        }
    }, [isSuccess, isLoading])

    //   const handleClose = () => {
    // //     setShowModal(false)
    //   }

    const submitformikforgot = async (event: any) => {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('email', email)
        await forgotPasswordFunc(formdata)
            .unwrap()
            .then(() => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: `Ссылка для сброса пароля успешно отправлена на почту ${email}`,
                    life: 5000,
                })
                setTimeout(() => navigate(Path.InitialPage), 3000)
            })
            .catch(() => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: `Проверьте правильность ввода email`,
                    life: 5000,
                })
            })
    }

    const submitCode = async (event: any) => {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('email', email)
        formdata.append('token', code)
        await verifyCode(formdata)
            .unwrap()
            .then(data => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: `Токен принят и введен верно!`,
                    life: 3000,
                })
                setStep(3)
            })
            .catch(error => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: `Проверьте правильность ввода токена!`,
                    life: 3000,
                })
            })
    }

    const submitNewPassword = async (event: any) => {
        event.preventDefault()
        if (password === passwordConfirmation && password.length !== 0) {
            const formdata = new FormData()
            formdata.append('email', email)
            formdata.append('new_password', password)
            formdata.append('new_password_again', passwordConfirmation)
            await resetPassword(formdata)
                .unwrap()
                .then(data => {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Успех',
                        detail: 'Пароль успешно изменен!',
                        life: 3000,
                    })
                })
        }
    }

    return (
        <section className={styles.loginPage}>
            {isFetching || (isLoading && <LoaderLayout/>)}
            <BackgroundAnimation/>
            <div className={styles.loginPage_btnBack}>
                <a href={Path.InitialPage}>
                    <img src={leftArrow} alt="leftArrow"/>
                </a>
            </div>
            <div className={styles.loginPage_logoWrapper}>
                <svg width="332" height="186" viewBox="0 0 332 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M309.529 59.5648C306.596 59.5648 304.172 60.5064 302.256 62.3896C300.369 64.2729 299.309 66.7645 299.077 69.8645H319.545C319.4 66.6776 318.427 64.1714 316.627 62.3462C314.856 60.492 312.49 59.5648 309.529 59.5648ZM319.806 85.2053H331.608C330.65 89.754 328.211 93.3466 324.292 95.983C320.401 98.5905 315.524 99.8943 309.659 99.8943C302.343 99.8943 296.638 97.7214 292.544 93.3755C288.451 89.0007 286.404 82.9165 286.404 75.123C286.404 67.3294 288.465 61.1728 292.588 56.6531C296.71 52.1334 302.343 49.8736 309.485 49.8736C316.569 49.8736 322.085 52.0031 326.034 56.262C330.011 60.5209 332 66.4603 332 74.08V77.9478H299.033V78.5997C299.12 82.1632 300.136 84.988 302.082 87.0741C304.056 89.1311 306.698 90.1596 310.008 90.1596C312.504 90.1596 314.595 89.7395 316.279 88.8993C317.963 88.0301 319.138 86.7988 319.806 85.2053Z"
                        fill="black"/>
                    <path
                        d="M237.149 64.9972C237.149 60.4485 238.978 56.798 242.637 54.0456C246.324 51.2643 251.158 49.8736 257.139 49.8736C263.235 49.8736 268.011 51.1049 271.466 53.5676C274.95 56.0302 276.866 59.5504 277.215 64.128H265.5C265.181 62.5635 264.295 61.3466 262.843 60.4775C261.421 59.5793 259.548 59.1303 257.226 59.1303C254.932 59.1303 253.045 59.6083 251.564 60.5644C250.083 61.4915 249.343 62.7083 249.343 64.2149C249.343 65.3738 249.866 66.3444 250.911 67.1266C251.956 67.8799 253.596 68.5028 255.832 68.9953L264.847 70.951C269.521 71.965 272.932 73.515 275.081 75.601C277.258 77.687 278.347 80.5118 278.347 84.0754C278.347 88.8269 276.402 92.6512 272.511 95.5485C268.621 98.4457 263.511 99.8943 257.182 99.8943C250.853 99.8943 245.845 98.6485 242.158 96.1569C238.47 93.6653 236.409 90.1161 235.973 85.5096H248.342C249.358 88.9283 252.392 90.6376 257.443 90.6376C259.911 90.6376 261.914 90.1741 263.453 89.247C264.992 88.2909 265.761 87.0451 265.761 85.5096C265.761 84.3217 265.282 83.3656 264.324 82.6413C263.366 81.888 261.827 81.2796 259.708 80.816L250.998 78.8604C246.324 77.8464 242.84 76.2094 240.546 73.9496C238.282 71.6608 237.149 68.6766 237.149 64.9972Z"
                        fill="black"/>
                    <path
                        d="M200.524 98.8513V50.9166H212.805V58.5653H213.589C214.228 56.1316 215.679 54.118 217.944 52.5246C220.238 50.9311 222.894 50.1344 225.914 50.1344C228.091 50.1344 229.746 50.3372 230.878 50.7428V62.2593C229.543 61.7378 227.539 61.477 224.868 61.477C221.355 61.477 218.525 62.4476 216.376 64.3887C214.257 66.3299 213.197 68.9664 213.197 72.2982V98.8513H200.524Z"
                        fill="black"/>
                    <path
                        d="M187.808 50.9166V98.8513H175.527V91.1591H174.743C172.362 96.9826 167.688 99.8943 160.72 99.8943C155.523 99.8943 151.415 98.3298 148.396 95.2008C145.405 92.0428 143.91 87.697 143.91 82.1632V50.9166H156.583V78.9039C156.583 85.5675 159.53 88.8993 165.423 88.8993C168.53 88.8993 170.925 87.9867 172.609 86.1614C174.293 84.3362 175.135 81.8011 175.135 78.5562V50.9166H187.808Z"
                        fill="black"/>
                    <path
                        d="M60.2079 100.459C51.0916 100.459 43.8914 97.5186 38.6074 91.6372C33.3524 85.7268 30.725 77.6725 30.725 67.4743C30.725 57.276 33.3524 49.2362 38.6074 43.3548C43.8914 37.4735 51.0916 34.5328 60.2079 34.5328C67.6404 34.5328 73.9115 36.7492 79.0213 41.1819C84.1601 45.5857 86.9763 51.2063 87.4699 58.0438H74.6663C74.0276 54.4223 72.3873 51.525 69.7453 49.3521C67.1323 47.1792 63.9532 46.0927 60.2079 46.0927C55.2723 46.0927 51.3674 48.0049 48.4931 51.8292C45.6189 55.6536 44.1817 60.8686 44.1817 67.4743C44.1817 74.08 45.6189 79.3095 48.4931 83.1628C51.3674 86.9871 55.2868 88.8993 60.2515 88.8993C64.0258 88.8993 67.2194 87.8708 69.8324 85.8138C72.4453 83.7567 74.0712 81.0044 74.7099 77.5566H87.5134C86.9618 84.3362 84.1601 89.8554 79.1084 94.1143C74.0857 98.3443 67.7855 100.459 60.2079 100.459Z"
                        fill="black"/>
                    <path
                        d="M38.8251 131.3C38.8251 109.795 56.2951 92.3615 77.8455 92.3615H285.025C306.575 92.3615 324.045 109.795 324.045 131.3V147.061C324.045 168.567 306.575 186 285.025 186H77.8455C56.2951 186 38.8251 168.567 38.8251 147.061V131.3Z"
                        fill="#357EEB"/>
                    <path
                        d="M250.069 168.197C246.672 168.197 243.667 167.472 241.054 166.024C238.47 164.575 236.54 162.547 235.262 159.939H234.478V167.458H222.197V101.227H234.87V127.172H235.654C236.874 124.535 238.761 122.478 241.316 121.001C243.87 119.494 246.788 118.741 250.069 118.741C256.137 118.741 260.898 120.928 264.353 125.303C267.808 129.678 269.536 135.733 269.536 143.469C269.536 151.146 267.794 157.187 264.31 161.591C260.855 165.995 256.108 168.197 250.069 168.197ZM253.596 133.126C251.651 130.605 249.009 129.345 245.67 129.345C242.332 129.345 239.675 130.619 237.701 133.169C235.756 135.69 234.769 139.137 234.74 143.512C234.769 147.858 235.756 151.306 237.701 153.855C239.675 156.376 242.332 157.636 245.67 157.636C249.038 157.636 251.68 156.376 253.596 153.855C255.542 151.335 256.514 147.872 256.514 143.469C256.514 139.094 255.542 135.646 253.596 133.126Z"
                        fill="white"/>
                    <path
                        d="M209.045 119.523V167.458H196.764V159.766H195.981C193.6 165.589 188.926 168.501 181.958 168.501C176.761 168.501 172.653 166.936 169.633 163.807C166.643 160.649 165.148 156.303 165.148 150.77V119.523H177.82V147.51C177.82 154.174 180.767 157.506 186.661 157.506C189.768 157.506 192.163 156.593 193.847 154.768C195.531 152.943 196.373 150.408 196.373 147.163V119.523H209.045Z"
                        fill="white"/>
                    <path
                        d="M151.604 167.458H138.452V141.252H110.145V167.458H96.9927V104.747H110.145V130.04H138.452V104.747H151.604V167.458Z"
                        fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M42.4563 34.4859L26.2388 32.9677L12.7664 31.6446L11.3939 31.547L10.0213 31.4495L9.04878 31.3256L5.68895 30.8977C4.52084 30.6458 3.35269 30.3943 2.18458 30.1429L2.16827 30.1393L0 29.6724C5.18414 24.7301 10.3684 19.7878 15.5527 14.8456C20.7436 9.89708 25.9344 4.94858 31.1251 0L48.4732 2.0804L48.9716 2.14016C57.3382 3.14345 65.7048 4.14672 74.0712 5.15021L58.2364 19.8434L42.4563 34.4859ZM22.1617 52.7841L47.3223 54.2285L51.2111 52.9279L70.3045 37.6473C69.4936 35.296 68.1834 31.4578 66.8765 27.6292L66.8711 27.6134C65.5826 23.8388 64.298 20.0754 63.4987 17.7571C59.7848 21.293 56.5898 24.1829 53.3947 27.0729C50.2008 29.9619 47.0067 32.8511 43.2939 36.3857C38.6597 35.809 34.0894 35.4224 29.519 35.0359C24.9498 34.6494 20.3805 34.263 15.7473 33.6865C17.2682 38.2136 20.626 48.2114 22.1533 52.7589L22.1617 52.7841Z"
                          fill="black"/>
                    <path
                        d="M14.6715 48.787H12.8134H9.09577H7.23765L7.27789 58.9767L10.9553 63.6204L14.6715 58.988L14.6715 48.787Z"
                        fill="#357EEB"/>
                    <path
                        d="M12.7664 31.6446L11.3939 31.547C10.8975 31.516 10.4011 31.485 10.0213 31.4495L9.04878 31.3256L9.09577 48.787H12.8134L12.7664 31.6446Z"
                        fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M110.333 81.2374L125.663 72.4054C128.14 70.9781 128.14 67.4096 125.663 65.9822L110.333 57.1503C107.856 55.7229 104.759 57.5071 104.759 60.3619V78.0258C104.759 80.8806 107.856 82.6648 110.333 81.2374ZM129.379 78.8287C136.811 74.5465 136.811 63.8411 129.379 59.559L114.05 50.727C106.617 46.4449 97.3266 51.7976 97.3266 60.3619V78.0258C97.3266 86.5901 106.617 91.9428 114.05 87.6606L129.379 78.8287Z"
                          fill="#357EEB"/>
                </svg>
            </div>
            <div className={styles.loginPage_formWrapper}>
                {isHidden && (
                    <form className={styles.loginPage_formWrapper_form} onSubmit={formik.handleSubmit}>
                        <p className={styles.loginPage_formWrapper_form_title}>Авторизация</p>
                        <p className={styles.loginPage_formWrapper_form_title_comment}>Введите свои учетные данные</p>
                        <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
                            <p className={styles.loginPage_formWrapper_form_eMailWrapper_title}></p>
                            <InputAuth
                                name={authVariant}
                                type={authVariant === 'email' ? 'email' : 'tel'}
                                onChange={formik.handleChange}
                                value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                                placeholder={'Адрес электронной почты'}
                                error={error ? true : false}
                            />
                            {/* <AuthSelect getInputVariant={getInputVariant}/> */}
                            <div
                                className={styles.errors}>{formik.errors.email || (error && 'Неверный логин или пароль')}</div>
                        </div>
                        <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
                            <p className={styles.loginPage_formWrapper_form_passwordWrapper_title}></p>
                            <InputAuth
                                name={'password'}
                                type={security ? 'password' : 'text'}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder={'Пароль'}
                                onClick={changeSecurityStatus}
                                icon={security ? isSecurity : unSecurity}
                                error={formik.errors.password && formik.errors.password.length > 0 ? true : false}
                            />
                            <div className={styles.errors}>{formik.errors.password}</div>
                        </div>
                        <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
                            {/* <p>Нет Аккаунта?</p>
              <div className={styles.btn} style={{ marginBottom: '10px' }}>
                <Button
                  onClick={handleRegistrationUser}
                  type="submit"
                  text={'Зарегистрироваться'}
                  style={{ borderRadius: '10px' }}
                  variant={'newLogInHeader'}
                />
              </div> */}
              <div className={styles.btn}>
                <Button type="submit" text={'Вход'} style={{ borderRadius: '10px' }} variant={'newPrimary'} />
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn}>
                <a className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn_a} href="" onClick={forgotPass}>
                  Забыли пароль?
                </a>
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or}>
                <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or_lineLeft}></div>
                <p>Или</p>
                <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or_lineRight}></div>
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_socialMedia}>
                {/* <img src={facebook} alt="facebook" /> */}
                <a
                  href={`${
                    process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru'
                  }/accounts/google/login/`}
                  className={styles.socialIcon}
                  style={{ padding: '8px' }}
                  title="Google"
                >
                  <img src={google} alt="google" style={{ objectFit: 'fill', width: '100%' }} />
                </a>
                <a
                  href={`${
                    process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru'
                  }/accounts/yandex/login/`}
                  className={styles.socialIcon}
                  title="Yandex"
                >
                  <img src={yandex} alt="yandex" style={{ objectFit: 'fill', width: '100%' }} />
                </a>
              </div>
            </div>
          </form>
        )}
        {isShown && step === 1 && (
          <div className={styles.loginPage_formWrapper_form}>
            <div className={styles.loginPage_formWrapper_form_title} style={{ margin: '15px 0 30px 0' }}>
              Введите почту:
            </div>
            <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
              <div style={{ display: 'flex' }}>
                <Input className={styles.input_container} name="email" type="text" onChange={handleEmail} value={email} placeholder="Email" />
              </div>
              <div className={styles.errors_forgot}>{errorSend && 'Неверная почта'}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <Button
                onClick={submitformikforgot}
                variant={email.length === 0 ? 'disabled' : 'primary'}
                disabled={email.length === 0 || sendLoading}
                text={
                  sendLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
            <div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
            </div>
          </div>
        )}
        {isShown && step === 2 && (
          <div className={styles.loginPage_formWrapper_form}>
            <div className={styles.loginPage_formWrapper_form_title_next} style={{ margin: '10px 0 30px 0 ' }}>
              Введите код подтверждения, который был выслан на Ваш email:
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <div style={{ display: 'flex' }}>
                <Input name="code" type="text" onChange={handleCode} value={code} placeholder="Код подтверждения" />
              </div>
              <div className={styles.errors_forgot}>{errorCode && 'Неверный код'}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <Button
                onClick={submitCode}
                variant={code.length === 0 ? 'disabled' : 'primary'}
                disabled={code.length === 0 || codeLoading}
                text={
                  codeLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
            <div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
            </div>
          </div>
        )}
        {isShown && step === 3 && (
          <div className={styles.loginPage_formWrapper_form}>
            <div className={styles.loginPage_formWrapper_form_title_next} style={{ margin: '10px 0 30px 0 ' }}>
              Введите новый пароль для вашей учетной записи:
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <div style={{ display: 'flex' }}>
                <Input name="newPassword" type="text" onChange={handleNewPassword} value={password} placeholder="Новый пароль" />
              </div>
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <div style={{ display: 'flex' }}>
                <Input
                  name="confirmPassword"
                  type="text"
                  onChange={handleNewPasswordC}
                  value={passwordConfirmation}
                  placeholder="Подтвердите пароль"
                />
              </div>
              <div className={styles.errors_forgot}>{errorReset && 'Пароли не совпадают'}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <Button
                onClick={submitNewPassword}
                variant={(password.length === 0 || passwordConfirmation.length === 0) && password !== passwordConfirmation ? 'disabled' : 'primary'}
                disabled={password.length === 0 || passwordConfirmation.length === 0 || password !== passwordConfirmation || resetLoading}
                text={
                  resetLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
            <div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
            </div>
          </div>
        )}
        <Toast position="top-left" ref={toast} />
      </div>
    </section>
  )
}
