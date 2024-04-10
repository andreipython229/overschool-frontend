import {FC, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {InputAuth} from '../../common/Input/InputAuth/InputAuth'
import {Checkbox} from '../../common/Checkbox/Checkbox'
import {Button} from 'components/common/Button/Button'
import {auth} from 'store/redux/users/slice'
import {AuthSelect} from '../../common/AuthSelect'
import {useAppDispatch} from '../../../store/hooks'
import {useRegistrationMutation} from '../../../api/userRegisterService'
import {isSecurity, unSecurity} from '../../../assets/img/common/index'

import styles from '../Modal.module.scss'
import {RegistrationModalPropsT} from '../ModalTypes'
import {crossIconPath} from "../../../config/commonSvgIconsPath";
import {Path} from "../../../enum/pathE";
import {Link} from "react-router-dom";

export const RegistrationModal: FC<RegistrationModalPropsT> = ({setShowModal, setCodeModal}) => {

    const dispatch = useAppDispatch()
    const [security, setSecurity] = useState<boolean>(true)
    const [authVariant, setAuthVariant] = useState<string>('email')
    const [attemptAccess, {data, error, isSuccess}] = useRegistrationMutation()

    const getAuthVariant = (variant: string) => {
        setAuthVariant(variant)
    }
    const registration = () => {
        // dispatch(auth(true))
    }

    const changeSecurityStatus = () => {
        setSecurity(!security)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: '',
            oferta: false,
            politics: false,
            phone: '',
        },
        onSubmit: async () => {
            // registration()
            const userData = formik.values
            await attemptAccess(userData)
            await setShowModal(false)
            await setCodeModal(true)
        },
    })
    const disabled = !(Object.keys(formik.errors).length === 0)

    return (
        <div className={styles.wrapper}>
            {
                <div className={styles.main}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.container}>
                            <span className={styles.main_closed} onClick={() => setShowModal(false)}>
                                <IconSvg width={17} height={17} viewBoxSize="0 0 16 16" path={crossIconPath}/>
                            </span>
                            <div className={styles.main_title}>Зарегистрироваться</div>

                            <div className={styles.inputs_block}>
                                <div style={{display: 'flex'}}>
                                    {authVariant === 'phone' ? (
                                        <InputAuth
                                            name={'phone'}
                                            type={'tel'}
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            placeholder={'Номер телефона'}
                                        />
                                    ) : (
                                        <InputAuth name={'email'} type={'text'} onChange={formik.handleChange}
                                                   value={formik.values.email} placeholder={'Email'}/>
                                    )}
                                    <AuthSelect getInputVariant={getAuthVariant}/>
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
                                <InputAuth
                                    name={'password_confirmation'}
                                    type={security ? 'password' : 'text'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password_confirmation}
                                    placeholder={'Повтор пароля'}
                                    onClick={changeSecurityStatus}
                                    icon={security ? isSecurity : unSecurity}
                                />
                            </div>
                            <div className={styles.main_blockDesc}>
                                <div className={styles.main_blockDesc_checkbox}>
                                    <Checkbox id={'oferta'} name={'oferta'} checked={formik.values.oferta}
                                              onChange={formik.handleChange}/>
                                </div>
                                <p className={styles.main_blockDesc_description}>
                                    Я подтверждаю согласие на обработку персональных данных в соответствии с условиями
                                    <a href={'/'} rel={'noreferrer'} target={'_blank'}
                                       className={styles.main_blockDesc_link}>
                                        {' '}Политики конфиденциальности
                                    </a>
                                </p>
                            </div>
                            <div className={styles.main_blockDesc}>
                                <div className={styles.main_blockDesc_checkbox}>
                                    <Checkbox id={'politics'} name={'politics'} checked={formik.values.politics}
                                              onChange={formik.handleChange}/>
                                </div>
                                <p className={styles.main_blockDesc_description}>
                                    Принимаю условия
                                    <a href={'/'} rel={'noreferrer'} target={'_blank'}
                                       className={styles.main_blockDesc_link}>
                                        {' '}договора оферты
                                    </a>
                                </p>
                            </div>
                            <div className={styles.main_btn}>
                                <Button style={{width: '15em'}} type={'submit'} variant={'primary'}
                                        text={'Зарегистрироваться'}/>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} className={styles.main_blockDescReg_description}>
                                Есть собственная платформа?
                                <Link to={Path.CreateSchool} style={{marginLeft: '0.2em'}} className={styles.main_blockDescReg_link}>
                                    Создайте свой проект на нашей платформе бесплатно
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
