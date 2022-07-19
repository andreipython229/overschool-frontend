import React, {memo} from 'react';
import styles from './header.module.scss'
import Logotype from '../../assets/img/logotype.svg'
import Avatar from '../../assets/img/avatar.svg'
import {useAppDispatch} from "../../store/redux/store";
import {auth} from "../../store/redux/users/slice";
import {Link} from "react-router-dom";
import {Path} from "../../enum/pathE";

export const Header = memo(() => {

    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(auth(false))
    }

    return (
        <div className={styles.header}>
            <img className={styles.header_logotype} src={Logotype} alt="Logotype IT Overone"/>
            <div className={styles.header_block}>
                <Link style={{textDecoration: 'none'}} to={Path.Profile}>
                    <div className={styles.header_block_user}>
                        <img className={styles.header_block_user_avatar} src={Avatar} alt="User Avatar"/>
                        <div className={styles.header_block_user_userName}>
                        <span style={{color: `#BA75FF`}}
                              className={styles.header_block_user_userName_status}>Супер пользователь</span>
                            <span className={styles.header_block_user_userName_name}>Без имени</span>
                        </div>
                    </div>
                </Link>

                <svg className={styles.header_block_logOut} onClick={logOut} width="26"
                     height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M11.2083 22.8333C11.2083 22.12 10.63 21.5417 9.91667 21.5417H3.45833V3.45833H9.91667C10.63 3.45833 11.2083 2.88003 11.2083 2.16667C11.2083 1.4533 10.63 0.875 9.91667 0.875H3.45833C2.0316 0.875 0.875 2.0316 0.875 3.45833V21.5417C0.875 22.9684 2.0316 24.125 3.45833 24.125H9.91667C10.63 24.125 11.2083 23.5467 11.2083 22.8333Z"
                          fill="#6B7280"/>
                    <path
                        d="M25.0467 13.4049C25.1664 13.283 25.2571 13.1433 25.3187 12.9944C25.3813 12.8433 25.4162 12.6776 25.4167 12.5039L25.4167 12.5L25.4167 12.4961C25.4157 12.1669 25.2896 11.8379 25.0383 11.5867L19.8717 6.41999C19.3673 5.91556 18.5494 5.91556 18.045 6.41999C17.5406 6.92441 17.5406 7.74225 18.045 8.24668L21.0066 11.2083H8.625C7.91163 11.2083 7.33333 11.7866 7.33333 12.5C7.33333 13.2134 7.91163 13.7917 8.625 13.7917H21.0066L18.045 16.7533C17.5406 17.2577 17.5406 18.0756 18.045 18.58C18.5494 19.0844 19.3673 19.0844 19.8717 18.58L25.0374 13.4143L25.0467 13.4049Z"
                        fill="#6B7280"/>
                </svg>
            </div>
        </div>
    );
});

