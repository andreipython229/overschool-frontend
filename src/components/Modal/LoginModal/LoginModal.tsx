import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import {InputAuth} from '../../common/Input/InputAuth/InputAuth'
import {Button} from '../../common/Button/Button'
import {LoginParamsT, validateLogin} from 'utils/validationLogin'
import {useAppDispatch} from '../../../store/hooks'
import {auth, id, userName, role} from 'store/redux/users/slice'
import {AuthSelect} from '../../common/AuthSelect'
import {useLoginMutation, useLazyGetUserInfoQuery} from '../../../api/userLoginService'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {crossIconPath} from '../../../config/commonSvgIconsPath'
import { Input } from 'components/common/Input/Input/Input'



import {isSecurity, unSecurity} from '../../../assets/img/common'

import { Path } from '../../../enum/pathE'

import {LoginModalPropsT} from '../ModalTypes'


import styles from '../Modal.module.scss'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'

import { useForgotPasswordMutation } from 'api/forgotPassword'


export const LoginModal: FC<LoginModalPropsT> = ({setShowModal}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [forgotPasswordFunc, {error:errorSend, isSuccess:sendSuccess}] = useForgotPasswordMutation()
    
    

  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<keyof LoginParamsT>('email')

    const [attemptAccess, {error, isSuccess, isLoading}] = useLoginMutation()
    const [getUserInfo, {data, isFetching, isError, isSuccess: userSuccess}] = useLazyGetUserInfoQuery()
   
    
    const [isShown, setIsShown] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const forgotPass = () => {
        setIsShown(!isShown)
        setIsHidden(!isHidden)
    }
     
   

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
      const { email, password, phone } = formik.values
      const user = { login: phone ? phone : email, password }
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


    const formikforgot = useFormik({
        initialValues: {
            email: '',
        },

        onSubmit: async () => {
            const email = formikforgot.values
            forgotPasswordFunc(email)
        },
    })
       

    useEffect(()=>{
        if (sendSuccess) {
        setShowModal(false)
        }
    }, [sendSuccess])
    

        

    return (
        <div className={styles.main}>
            {isFetching ||
                (isLoading && (
                    <div className={styles.loader}>
                        <SimpleLoader style={{width: '50px', height: '50px'}}/>
                    </div>
                ))}
            { isHidden &&
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.container}>
          <span className={styles.main_closed} onClick={handleClose}>
            <IconSvg width={17} height={17} viewBoxSize="0 0 16 16" path={crossIconPath} />
          </span>
            
            <div>
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

                    <div className={styles.main_btn}>
                    
                    <Button type="submit" text={'Забыли пароль?'} style={{width: '246px'}} onClick={forgotPass}/>
                    </div>
                </div>
             
                    
                </div>
            </form>
            }
            { isShown &&
                        <div>
                            <form className={styles.container} onSubmit={formikforgot.handleSubmit}>
                            <span className={styles.main_closed} onClick={handleClose}>
                                <IconSvg width={15} height={15} viewBoxSize="0 0 14 14" path={crossIconPath}/>
                            </span>
                        <div className={styles.main_title} style={{margin: "60px 0 30px 0 "}}>Введите почту</div>
                        <div className={styles.inputs_block}>
                            <div>
                            
                                <div style={{display: 'flex'}}>
                                <Input className={styles.input_container} 
                                name="email" type="text" onChange={formikforgot.handleChange} value={formikforgot.values.email} placeholder="Email" />
                                </div>
                                <div className={styles.errors_forgot}>{formikforgot.errors.email || (error && 'Неверный логин')}</div>
                                <div className={styles.isSubmitting}>{formikforgot.isSubmitting || (sendSuccess && 'Письмо отправлено')}</div>
                            </div>
                        </div>
                        <div className={styles.container_wrapper}>
                        <Button
                            style={{}}
                            
                            className={styles.profile_block_btn}
                            type="submit"
                            variant={'primary'}
                            text={'Отправить'}
                        />
                    </div>
                    </form>
                    </div>
                        }   
                    
        </div>
    )
}
