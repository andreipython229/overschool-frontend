import {FC, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {Link, useNavigate} from 'react-router-dom'

import {InputAuth} from '../../common/Input/InputAuth/InputAuth'
import {Button} from '../../common/Button/Button'
import {LoginParamsT, validateLogin} from 'utils/validationLogin'
import {useAppDispatch} from '../../../store/hooks'
import {auth, id, userName, role} from 'store/redux/users/slice'
import {AuthSelect} from '../../common/AuthSelect'
import {useLoginMutation, useLazyGetUserInfoQuery} from '../../../api/userLoginService'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {crossIconPath} from '../../../config/commonSvgIconsPath'

import {isSecurity, unSecurity} from '../../../assets/img/common'

import {Path} from '../../../enum/pathE'

import {LoginModalPropsT} from '../ModalTypes'

import styles from '../Modal.module.scss'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'
import {RoleE} from 'enum/roleE'

export const LoginModal: FC<LoginModalPropsT> = ({setShowModal}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [security, setSecurity] = useState<boolean>(true)
    const [authVariant, setAuthVariant] = useState<keyof LoginParamsT>('email')

    const [attemptAccess, {error, isSuccess, isLoading}] = useLoginMutation()
    const [getUserInfo, {data, isFetching, isError, isSuccess: userSuccess}] = useLazyGetUserInfoQuery()

    const getInputVariant = (variant: keyof LoginParamsT): void => {
        setAuthVariant(variant)
    }
    const changeSecurityStatus = () => {
        setSecurity(!security)
    }

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
            await attemptAccess(user)
        },
    })

    useEffect(() => {
        if (isSuccess) {
            getUserInfo()
            if (userSuccess && data) {
                setShowModal(false)
                dispatch(auth(true))
                dispatch(role(data[0]?.groups[0]))
                dispatch(userName(data[0]?.username))
                dispatch(id(data[0]?.id))
                navigate(Path.ChooseSchool)
            }
        }
    }, [isSuccess, userSuccess])

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <div className={styles.main}>
            {isFetching ||
                (isLoading && (
                    <div className={styles.loader}>
                        <SimpleLoader style={{width: '50px', height: '50px'}}/>
                    </div>
                ))}
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.container}>
          <span className={styles.main_closed} onClick={handleClose}>
            <IconSvg width={25} height={25} path={crossIconPath}/>
          </span>
                    <div className={styles.main_title}>Войти</div>
                    <div className={styles.inputs_block}>
                        <div>
                            <div style={{display: 'flex'}}>
                                <InputAuth
                                    name={authVariant}
                                    type={authVariant === 'email' ? 'email' : 'tel'}
                                    onChange={formik.handleChange}
                                    value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                                    placeholder={authVariant}
                                />
                                {/* <AuthSelect getInputVariant={getInputVariant}/> */}
                            </div>
                            <div className={styles.errors}>{formik.errors.email || (error && 'Неверный логин')}</div>
                        </div>
                        <InputAuth
                            name={'password'}
                            type={security ? 'password' : 'text'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder={'Пароль'}
                            onClick={changeSecurityStatus}
                            icon={security ? isSecurity : unSecurity}
                        />
                        <div className={styles.errors}>{formik.errors.password}</div>
                    </div>
                    <div className={styles.main_btn}>
                        <Button type="submit" text={'Войти'} style={{width: '246px'}} variant={'primary'}/>
                    </div>

                    <div className={styles.restorePass}>
                        <Link style={{textDecoration: 'none', padding: '15px'}} to={'/'}>
                            Забыли пароль?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
