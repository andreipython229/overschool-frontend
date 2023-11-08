import {FC, memo} from 'react'
import {Link, generatePath, useNavigate} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {Path} from 'enum/pathE'
import {Button} from 'components/common/Button/Button'
import {authSelector} from 'selectors'
import {InitPageHeaderPT} from '../../types/pageTypes'
import {logo} from '../../assets/img/common/index'
import {selectUser} from 'selectors/index'
import {RoleE} from 'enum/roleE'

import styles from './initial.module.scss'
import {logOutIconPath} from "../../components/Header/config/svgIconsPath";
import {IconSvg} from "../../components/common/IconSvg/IconSvg";
import {auth} from "../../store/redux/users/slice";
import {useLazyLogoutQuery} from "../../api/userLoginService";

export const InitPageHeader: FC<InitPageHeaderPT> = memo(({setLoginShow, setRegistrationShow}) => {
    const isLogin = useAppSelector(authSelector)
    const {role: userRole, userName: name} = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const [logout] = useLazyLogoutQuery()
    const navigate = useNavigate()

    const handleLoginUser = () => {
        setLoginShow(true)
    }

    const handleRegistrationUser = () => {
        navigate(generatePath(Path.CreateSchool))
    }

    const logOut = async () => {
        await localStorage.clear()
        await logout()
        window.location.reload()

        dispatch(auth(false))
    }

    return (
        <header className={styles.init_header}>
            <img src={logo} alt="Logotype ITOVERONE"/>
            <div className={styles.btn_block}>
                {isLogin ? (
                    <div className={styles.header_block}>
                        <Link className={styles.header_block_logIn} to={Path.ChooseSchool}>
                            Аккаунт
                        </Link>
                        <IconSvg className={styles.header_block_logOut} width={26} height={26} viewBoxSize="0 0 26 25"
                                 path={logOutIconPath} functionOnClick={logOut}/>
                    </div>
                ) : (
                    <>
                        <Button variant={'logIn'} onClick={handleLoginUser} text={'Войти'}/>
                        <Button onClick={handleRegistrationUser} variant={'registrationDisabled'}
                                text={'Зарегистрироваться'}/>
                    </>
                )}
            </div>
        </header>
    )
})
