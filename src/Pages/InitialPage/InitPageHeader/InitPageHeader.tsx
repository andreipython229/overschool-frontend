import React, {FC, memo} from 'react';
import styles from "../initialPage.module.scss";
import Logotype from "../../../assets/img/logotype.svg";
import {Button} from "../../../components/common/Button/Button";
import {useAppSelector} from "../../../store/redux/store";
import {Link} from "react-router-dom";
import {Path} from "../../../enum/pathE";

type InitPageHeaderPT = {
    setLoginShow: (show: boolean) => void
    setRegistrationShow: (show: boolean) => void
}
export const InitPageHeader: FC<InitPageHeaderPT> = memo(({setLoginShow, setRegistrationShow}) => {

    const isLogin = useAppSelector<boolean>(state => state.user.auth)
    return (
        <div>
            <div className={styles.init_header}>
                <img src={Logotype} alt="Logotype IT OVERONE"/>
                <div className={styles.btn_block}>
                    {isLogin
                        ? <Link className={styles.btn_block_logIn} to={`${Path.Courses}`}>Аккаунт</Link>
                        : <>
                            <Button onClick={() => setLoginShow(true)} text={'Войти'}/>
                            <Button onClick={() => setRegistrationShow(true)} variant={'primary'}
                                    text={'Зарегистрироваться'}/>
                        </>
                    }
                </div>
            </div>
        </div>
    );
});

