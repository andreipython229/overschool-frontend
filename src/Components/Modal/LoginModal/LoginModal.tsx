import React, {FC, memo, useState} from 'react';
import styles from '../Modal.module.scss'
import {InputAuth} from "../../common/Input/InputAuth/InputAuth";
import unSecurity from '../../../assets/img/unSecurity.svg'
import Security from '../../../assets/img/isecurity.svg'
import {Button} from "../../common/Button/Button";
import {useFormik} from "formik";
import {LoginParamsT, validateLogin} from "../../../utils/validationLogin";
import {Link} from 'react-router-dom';
import {useAppDispatch} from "../../../store/redux/store";
import {auth} from "../../../store/redux/users/slice";

type LoginModalPropsT = {
    setShowModal: (value: boolean) => void
    logIn: (email: string) => void
}

export const LoginModal: FC<LoginModalPropsT> = memo(({setShowModal, logIn}) => {
    const [security, setSecurity] = useState<boolean>(true)
    const dispatch = useAppDispatch()

    const changeSecurityStatus = () => {
        setSecurity(!security)
    }
    const onSubmitForm = async (values: LoginParamsT): Promise<any> => {
        // const res: AuthResponse = await userApi.register(values)
        // if (typeof res === 'string') {
        //     setError(res)
        // }
        // navigate(Paths.Login)
        logIn(values.email)
        dispatch(auth(true))
    }

    const formik = useFormik({
        validate: values => validateLogin(values),
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: LoginParamsT) => {
            onSubmitForm(values)
                .then(() => {
                    formik.resetForm()
                })
            // alert(JSON.stringify(values))
            setShowModal(false)
        },

    })
    const disabled = !(Object.keys(formik.errors).length === 0)

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.container}>
                        <svg className={styles.main_closed} onClick={() => setShowModal(false)} width="16" height="16"
                             viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 15L15 1M15 15L1 1" stroke="#2E4454" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>

                        <div className={styles.main_title}>Войти</div>
                        <div className={styles.inputs_block}>
                            <InputAuth name={'email'} type={'text'}
                                       onChange={formik.handleChange} value={formik.values.email}
                                       placeholder={'Email или номер телефона'}/>
                            <InputAuth name={'password'} type={security ? 'password' : 'text'}
                                       onChange={formik.handleChange} value={formik.values.password}
                                       placeholder={'Пароль'}
                                       onClick={changeSecurityStatus}
                                       icon={security ? Security : unSecurity}/>
                        </div>

                        <div className={styles.main_btn}>
                            <Button style={{width: '246px'}} type={'submit'} variant={disabled ? 'disabled' : "primary"}
                                    text={'Войти'}/>
                        </div>

                        <div className={styles.restorePass}>
                            <Link style={{textDecoration: 'none', padding: '15px'}} to={'/'}>
                                Забыли пароль?
                            </Link>
                        </div>


                    </div>
                </form>

            </div>
        </div>

    );
});

