import React, {ChangeEvent, memo, useState} from 'react';
import {Previous} from "../Admin/Previous/Previous";
import styles from './profile.module.scss'
import {Input} from "../../Components/common/Input/Input/Input";
import {Button} from "../../Components/common/Button/Button";
import {useAppDispatch, useAppSelector} from "../../store/redux/store";
import {AboutUser} from "./AboutUser/AboutUser";
import {Toggle} from "@skbkontur/react-ui/index";
import noAvatar from '../../assets/img/noAvatar.svg'

export const Profile = memo(() => {
    const dispatch = useAppDispatch()
    const {avatar, name, email, phone, city} = useAppSelector(state => state.user)
    const [isToggle, setIsToggle] = useState<boolean[]>([true, true, false, false])

    const changeUserAvatar = (avatar: string): void => {
        // dispatch(requestChangeUserInfo(name,avatar,email))
    }
    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const index = 0
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[index])
            reader.onloadend = event => {
                if (typeof event?.target?.result === 'string') {
                    changeUserAvatar(event?.target?.result)
                }
            }
        }
    }
    return (
        <div>
            <Previous avatar={avatar || noAvatar} name={'User Name'}/>
            <div className={styles.profile}>
                <AboutUser avatar={avatar} onChangeAvatar={onChangeAvatar}/>
                <div>
                    <div style={{width: '546px'}} className={styles.container}>
                        <h5>Изменить email</h5>
                        <Input name={'Новый email адрес'} type={'text'} onChange={() => alert('hello')} value={''}
                               placeholder={'Новый email адрес'}/>
                        <div className={styles.container_wrapper}>
                            <Button variant={'disabled'} text={'Сохранить'}/>
                        </div>
                    </div>
                    <div style={{width: '546px', marginTop: '32px'}} className={styles.container}>
                        <h5>Смена пароля</h5>
                        <Input name={'Новый пароль'} type={'text'} onChange={() => alert('hello')} value={''}
                               placeholder={'Новый пароль'}/>
                        <div className={styles.container_wrapper}>
                            <Input name={'Повторить новый пароль'} placeholder={'Повторить новый пароль'} type={'text'}
                                   onChange={() => alert('hello')}
                                   value={''}/>
                        </div>
                        <div className={styles.container_wrapper}>
                            <Button variant={'disabled'} text={'Сменить пароль'}/>
                        </div>
                    </div>
                    <div style={{width: '566px', marginTop: '32px'}} className={styles.notification}>
                        <h5>Уведомления</h5>
                        <div className={styles.notification_toggleWrapper}>
                            <div className={styles.notification_toggleWrapper_toggleBlock}>
                                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                                    <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>Уведомлять о присланных домашних заданиях</span>
                                    <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>После каждой
                                        присланной домашней работы вам будет приходить уведомление на
                                        почту</p>
                                </div>
                                <div>
                                    {/*Нужно сделать собственные и удалить зависимости библиотеки*/}
                                    <Toggle/>
                                </div>
                            </div>
                            <div className={styles.notification_toggleWrapper_toggleBlock}>
                                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                                    <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>Уведомлять о непрочитанных сообщениях</span>
                                    <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>Раз в сутки
                                        вам на почту будет приходить уведомление, если у вас есть
                                        непрочитанные сообщения</p>
                                </div>
                                <div>
                                    <Toggle/>
                                </div>
                            </div>
                            <div className={styles.notification_toggleWrapper_toggleBlock}>
                                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                                    <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>Уведомлять о предстоящем вебинаре</span>
                                    <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>Вы будете
                                        уведомлены перед началом вебинара, в котором вы указаны ответственным
                                        сотрудником</p>
                                </div>
                                <div>
                                    <Toggle/>
                                </div>
                            </div>
                            <div className={styles.notification_toggleWrapper_toggleBlock}>
                                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                                    <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>Уведомлять о пройденных учениками курсах</span>
                                    <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>На почту
                                        придет уведомление, когда один из учеников пройдет все занятия курса</p>
                                </div>
                                <div>
                                    <Toggle/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

