import {FC, memo, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Path } from 'enum/pathE'
import {useLazyLogoutQuery} from 'api/userLoginService'
import {useAppDispatch, useAppSelector} from '../../../store/hooks'

import {auth} from 'store/redux/users/slice'
import {Chat} from 'components/Modal/Chat'
import {useBoolean} from 'customHooks'
import {chatIconPath} from 'components/Navbar/config/svgIconPath'
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import Badge from '@mui/material/Badge'
import {Portal} from 'components/Modal/Portal'
import {selectUser} from '../../../selectors'
import {navlinkByRoles} from '../config/navlinkByRoles'
import {ChatI, SenderI} from 'types/chatsT'
import { setTotalUnread } from '../../../store/redux/chats/unreadSlice'
import { setChats } from "../../../store/redux/chats/chatsSlice";
import { isEqual, omit } from 'lodash';


import styles from '../navbar.module.scss'

interface IIsActive {
  isActive?: boolean
}

export const MobileNavbar : FC = memo(() => {
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const {role} = useAppSelector(selectUser)
  const isActive = ({isActive}: IIsActive) => (isActive ? styles.isActive : '')
  const [logout] = useLazyLogoutQuery()
  const dispatch = useAppDispatch()
  const [isChatOpen, {on, off}] = useBoolean()
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
    const chats = useAppSelector(state => state.chats.chats);
    const [fetchedChats, setFetchedChats] = useState<ChatI[]>([])
  

  const logOut = async () => {
    await localStorage.clear()
    await logout()
    window.location.reload()

    dispatch(auth(false))
}

// Chat Info Update *******************************************************
useEffect(() => {
  const totalUnread = totalUnreadMessages || 0;
  dispatch(setTotalUnread(totalUnread.toString()));
}, [totalUnreadMessages])

const fetchChatsData = async () => {
  try {
      const response = await fetch('/api/chats/info/');
      if (response.ok) {
          const chatsInfo = await response.json();
          setTotalUnreadMessages(chatsInfo[0].total_unread)
          if (chatsInfo.length > 1 && chats) {
              const fetchChats: ChatI[] = chatsInfo.slice(1);
              if (fetchChats) {
                  setFetchedChats(fetchChats)
              }
          }
      }
  } catch (error) {
      console.error(error)
  }
};

useEffect(() => {
  fetchChatsData();
  const intervalId = setInterval(fetchChatsData, 10000);
  return () => clearInterval(intervalId);
}, []);

// Удаляем AVATAR
const omitAvatar = (sender: SenderI): SenderI => {
  const { avatar, ...rest } = sender;
  return rest;
};
// Проходимся по всем чатас и у каждого сендера удаляем аватарку
const processChats = (chats: ChatI[]): ChatI[] => {
  return chats.map(chat => ({
    ...chat,
    senders: chat.senders.map(omitAvatar)
  }));
};

useEffect(() => {
  if (chats && fetchedChats) {
      const chatsWithoutAvatar = processChats(chats)
      const fetchedChatsWithoutAvatar = processChats(fetchedChats)
      const checkChatsDifferent = isEqual(chatsWithoutAvatar, fetchedChatsWithoutAvatar)
      if (!checkChatsDifferent) {
          dispatch(setChats(fetchedChats))
      }
  }
},[chats, fetchedChats])
// **************************************************************


  return (
    <>
    
      <div className={styles.navbar_setting_account}>
                    {navlinkByRoles[role].map(({path, icon}, index: number) => (
                        <Tooltip title={(path === Path.Courses)? 'Курсы': (path === Path.CourseStats)? 'Ученики школы':
                            (path === Path.HomeWork)? 'Домашние задания': 'Настройки школы'} key={index} arrow placement={'right'}>
                            <NavLink key={index} to={path} className={isActive}>
                                {icon}
                            </NavLink>
                        </Tooltip>
                    ))}
                    <Tooltip title={"Чаты"} arrow placement={'right'}>
                      <div className={`${styles.chatIcon} ${isChatOpen ? styles.chatIcon_active : ''}`} onClick={off}>
                          {/*<Badge badgeContent={unRead} color={Number(unRead) > 0 ? 'secondary' : "primary"}>*/}
                          {/*    <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath}/>*/}
                          {/*</Badge>*/}
                          {Number(unRead) > 0 ? (
                                <Badge badgeContent={unRead} color="error">
                                  <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath}/>
                                </Badge>
                              ) : (
                                <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath}/>
                          )}
                      </div>
                      </Tooltip>

      <NavLink to={Path.Profile} className={isActive}>
        <svg width="38" height="38" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 27.5C8.09625 27.5 2.5 21.9037 2.5 15C2.5 8.09625 8.09625 2.5 15 2.5C21.9037 2.5 27.5 8.09625 27.5 15C27.5 21.9037 21.9037 27.5 15 27.5ZM8.76625 22.82C10.5357 24.2346 12.7346 25.0036 15 25C17.4625 25 19.7162 24.11 21.4587 22.635C20.6447 21.7997 19.6713 21.1361 18.5963 20.6835C17.5213 20.2309 16.3664 19.9985 15.2 20C13.9907 19.9986 12.7944 20.2486 11.6868 20.734C10.5793 21.2195 9.58473 21.9298 8.76625 22.82ZM7.02 21.025C8.07057 19.9101 9.33834 19.0221 10.7452 18.4159C12.152 17.8097 13.6681 17.4979 15.2 17.5C16.6771 17.4981 18.14 17.788 19.5047 18.353C20.8694 18.918 22.1091 19.747 23.1525 20.7925C24.2226 19.2864 24.8545 17.5133 24.9782 15.6699C25.1019 13.8265 24.7124 11.9849 23.8531 10.3493C22.9938 8.71378 21.6982 7.34828 20.11 6.40431C18.5218 5.46033 16.7031 4.9748 14.8558 5.00157C13.0084 5.02833 11.2046 5.56636 9.6444 6.55595C8.08422 7.54554 6.8287 8.948 6.01711 10.6078C5.20553 12.2675 4.86962 14.1196 5.04664 15.9587C5.22367 17.7977 5.90672 19.5518 7.02 21.0262V21.025ZM15 16.25C13.6739 16.25 12.4021 15.7232 11.4645 14.7855C10.5268 13.8479 10 12.5761 10 11.25C10 9.92392 10.5268 8.65215 11.4645 7.71447C12.4021 6.77678 13.6739 6.25 15 6.25C16.3261 6.25 17.5979 6.77678 18.5355 7.71447C19.4732 8.65215 20 9.92392 20 11.25C20 12.5761 19.4732 13.8479 18.5355 14.7855C17.5979 15.7232 16.3261 16.25 15 16.25ZM15 13.75C15.663 13.75 16.2989 13.4866 16.7678 13.0178C17.2366 12.5489 17.5 11.913 17.5 11.25C17.5 10.587 17.2366 9.95107 16.7678 9.48223C16.2989 9.01339 15.663 8.75 15 8.75C14.337 8.75 13.7011 9.01339 13.2322 9.48223C12.7634 9.95107 12.5 10.587 12.5 11.25C12.5 11.913 12.7634 12.5489 13.2322 13.0178C13.7011 13.4866 14.337 13.75 15 13.75Z"
            fill="#E0DCED"
          />
        </svg>
      </NavLink>

      <NavLink to={Path.InitialPage} title={'Выход из профиля'} onClick={logOut} >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e0dced" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </div>
      </NavLink>
      </div>
      {isChatOpen && (
                <Portal closeModal={on}>
                    <Chat closeModal={on}/>
                </Portal>
            )}
    </>
  )
})
