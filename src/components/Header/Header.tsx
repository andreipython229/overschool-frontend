import React, {memo, useState, useEffect} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'

import {useFetchProfileDataQuery} from '../../api/profileService'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {auth} from 'store/redux/users/slice'
import {Path} from 'enum/pathE'
import {useFetchSchoolHeaderQuery} from '../../api/schoolHeaderService'
import {IconSvg} from '../common/IconSvg/IconSvg'
import {logOutIconPath} from './config/svgIconsPath'
import {useLazyLogoutQuery} from 'api/userLoginService'
import {selectUser} from '../../selectors'
import {logo} from '../../assets/img/common'
import {headerUserRoleName} from 'config/index'
import {profileT} from 'types/profileT'
import styles from './header.module.scss'
import {SimpleLoader} from "../Loaders/SimpleLoader";
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {SvgIcon} from "@mui/material";
import { ChatI } from 'types/chatsT'
import { setTotalUnread } from '../../store/redux/chats/unreadSlice'
import { setChats } from "../../store/redux/chats/chatsSlice";

import { UserProfileT } from "../../types/userT"
import { setUserProfile, clearUserProfile } from "../../store/redux/users/profileSlice"
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux/store";


export const Header = memo(() => {
    const dispatch = useAppDispatch()
    const {role} = useAppSelector(selectUser)
    const navigate = useNavigate()
    const [logout, {isLoading}] = useLazyLogoutQuery()
    const headerId = localStorage.getItem('header_id')
    const {data, isSuccess} = useFetchSchoolHeaderQuery(Number(headerId))
    const {data: profile, isSuccess: profileIsSuccess} = useFetchProfileDataQuery()

    const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
    const chats = useSelector((state: RootState) => state.chats.chats);

    const logOut = async () => {
        await localStorage.clear()
        await logout()
        if (isLoading) {
            return <SimpleLoader/>
        }
        dispatch(clearUserProfile())
        window.location.reload()
        dispatch(auth(false))
    }

    const [profileData, setProfileData] = useState<profileT>()
    const [logotype, setLogo] = useState<string | undefined>('')

    useEffect(() => {
        if (isSuccess) {
            setLogo(data?.logo_school)
        }
    }, [data])

    useEffect(() => {
        profileIsSuccess && setProfileData(profile[0])
    }, [profileIsSuccess])

    useEffect(() => {
        if (profileData) {
            const newProfileData: UserProfileT = {
                id: profileData.profile_id || 0,
                username: profileData.user.username || "",
                first_name: profileData.user.first_name || "",
                last_name: profileData.user.last_name || "",
                email: profileData.user.email || "",
                phone_number: profileData.user.phone_number || "",
                avatar: profileData.avatar || "",
            };

            if (newProfileData) {
                dispatch(setUserProfile(newProfileData));
            }
        }
    }, [profileData])



    useEffect(() => {
        const totalUnread = totalUnreadMessages || 0;
        dispatch(setTotalUnread(totalUnread.toString()));
    }, [totalUnreadMessages])

     const fetchChatsData = async () => {
        // console.log("fetchChatsInfo");
        try {
            const response = await fetch('/api/chats/info/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const chatsInfo = await response.json();
            setTotalUnreadMessages(chatsInfo[0].total_unread)

            if (chatsInfo.length > 1) {
                const fetchedChats: ChatI[] = chatsInfo.slice(1);
                const isDifferent = JSON.stringify(fetchedChats) !== JSON.stringify(chats);

                if (isDifferent) {
                    dispatch(setChats(fetchedChats));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchChatsData();
        const intervalId = setInterval(fetchChatsData, 5000);

        return () => clearInterval(intervalId);
        }, []);


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const goToProfile = () => {
        navigate(Path.Profile)
        setAnchorEl(null);
    };

    const goToChooseSchool = () => {
        navigate(Path.ChooseSchool)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className={styles.header}>
            <NavLink to={Path.Courses}>
                <img className={styles.header_logotype} src={logotype || logo} alt="Logotype IT Overone"/>
            </NavLink>
            <div className={styles.header_block}>
                <React.Fragment>
                    <Tooltip title={'Аккаунт пользователя'}>
                        <div style={{textDecoration: 'none'}} onClick={handleClick}>
                            <div className={styles.header_block_user}>
                                {profileData?.avatar ? (
                                    <img
                                        width={'50'}
                                        height={'50'}
                                        className={styles.header_block_user_avatar}
                                        src={profileData?.avatar}
                                        alt="avatar"
                                    />
                                ) : (
                                    <div className={styles.header_block_user_avatar_div}>
                                        {profileData?.user.last_name[0] || 'Б'}
                                        {profileData?.user.first_name[0] || 'И'}
                                    </div>
                                )}
                                <div className={styles.header_block_user_userName}>
                                <span style={{color: '#BA75FF'}} className={styles.header_block_user_userName_status}>
                                    {headerUserRoleName[role]}
                                </span>
                                    <span className={styles.header_block_user_userName_name}>
                                    {profileData?.user.last_name || 'Без'} {profileData?.user.first_name || 'Имени'}
                                </span>
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                    <Menu anchorEl={anchorEl}
                          id="account-menu" open={open}
                          onClose={handleClose} onClick={handleClose}
                          PaperProps={{
                              elevation: 0,
                              sx: {
                                  overflow: 'visible',
                                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                  mt: 1.5,
                                  '& .MuiAvatar-root': {
                                      width: 32,
                                      height: 32,
                                      ml: -0.5,
                                      mr: 1,
                                  },
                                  '&:before': {
                                      content: '""',
                                      display: 'block',
                                      position: 'absolute',
                                      top: 0,
                                      right: 14,
                                      width: 10,
                                      height: 10,
                                      bgcolor: 'background.paper',
                                      transform: 'translateY(-50%) rotate(45deg)',
                                      zIndex: 0,
                                  },
                              },
                          }}
                          transformOrigin={{horizontal: 'right', vertical: 'top'}}
                          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <MenuItem onClick={goToProfile}>
                            <Avatar/>
                            <Link to={Path.Profile} style={{color: 'slategrey'}}>Открыть профиль</Link>
                        </MenuItem>
                        <MenuItem onClick={goToChooseSchool}>
                            <SvgIcon color='disabled' fontSize={'large'} viewBox='3 0 24 24'>
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </SvgIcon>
                            <Link to={Path.ChooseSchool} style={{color: 'slategrey'}}>Смена школы</Link>
                        </MenuItem>
                    </Menu>
                </React.Fragment>
                <Tooltip title={'Выход из профиля'}>
                    <div
                        className={styles.header_block_logOut}>
                        <IconSvg
                            width={26}
                            height={26}
                            viewBoxSize="0 0 26 25"
                            path={logOutIconPath}
                            functionOnClick={logOut}
                        />
                    </div>
                </Tooltip>
            </div>
        </header>
    )
})
