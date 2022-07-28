import React, { ChangeEvent, memo, useState } from 'react';

import styles from './profile.module.scss';

import { Input } from 'components/common/Input/Input/Input';
import { Button } from 'components/common/Button/Button';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import { AboutUser } from './AboutUser/AboutUser';
import { Toggle } from '@skbkontur/react-ui/index';
import noAvatar from '../../assets/img/noAvatar.svg';
import { Previous } from '../Courses/Previous/Previous';

export const Profile = memo(() => {
  const dispatch = useAppDispatch();
  const { avatar, user, phone_number, city, aboutMySelf } = useAppSelector((state) => state.user);
  const { last_name, first_name, email } = user;

  const [phone, setPhone] = useState<string>(phone_number);
  const [userAvatar, setUserAvatar] = useState<string | null>(avatar);
  const [fullName, setFullName] = useState(first_name + ' ' + last_name);
  const [userEmail, setUserEmail] = useState(email);
  const [userCity, setUserCity] = useState(city);
  const [aboutUser, setAboutUser] = useState(aboutMySelf);
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
  };
  const changeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatNewPassword(e.currentTarget.value);
  };

  //  const onChange = (e: ChangeEvent<HTMLInputElement>, callback: (value: string) => void): void => {
  // callback(e.currentTarget.value);
  //  };

  const changePhoneNumber = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.currentTarget.value);
  };
  const changeFullName = (e: ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.currentTarget.value);
  };
  const changeCity = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCity(e.currentTarget.value);
  };
  const changeAboutMyself = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutUser(e.currentTarget.value);
  };
  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.currentTarget.value);
  };

  // const changeUserInfo = (avatar: string): void => {
  // dispatch(requestChangeUserInfo(name,userAvatar,email))
  // }

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const index = 0;
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[index]);
      reader.onloadend = (event) => {
        if (typeof event?.target?.result === 'string') {
          setUserAvatar(event?.target?.result);
        }
      };
    }
  };
  return (
    <div>
      <Previous avatar={avatar || noAvatar} name={'User Name'} />
      <div className={styles.profile}>
        <AboutUser
          city={userCity}
          phone_number={phone}
          full_name={fullName}
          email={email}
          avatar={userAvatar}
          aboutUser={aboutUser}
          changePhoneNumber={changePhoneNumber}
          onChangeAvatar={onChangeAvatar}
          changeFullName={changeFullName}
          changeCity={changeCity}
          changeAboutMyself={changeAboutMyself}
        />
        <div>
          <div style={{ width: '546px' }} className={styles.container}>
            <h5>Изменить email</h5>
            <Input
              name={'Новый email адрес'}
              type={'text'}
              onChange={(e) => changeEmail(e)}
              value={userEmail}
              placeholder={'Новый email адрес'}
            />
            <div className={styles.container_wrapper}>
              <Button variant={email === userEmail ? 'disabled' : 'primary'} text={'Сохранить'} />
            </div>
          </div>
          <div style={{ width: '546px', marginTop: '32px' }} className={styles.container}>
            <h5>Смена пароля</h5>
            <Input
              name={'Новый пароль'}
              type={'password'}
              onChange={(e) => changePassword(e)}
              value={newPassword}
              placeholder={'Новый пароль'}
            />
            <div className={styles.container_wrapper}>
              <Input
                name={'Повторить новый пароль'}
                placeholder={'Повторить новый пароль'}
                type={'password'}
                onChange={(e) => changeRepeatPassword(e)}
                value={repeatNewPassword}
              />
            </div>
            <div className={styles.container_wrapper}>
              <Button
                variant={
                  newPassword.length >= 8 && newPassword === repeatNewPassword
                    ? 'primary'
                    : 'disabled'
                }
                text={'Сменить пароль'}
              />
            </div>
          </div>
          <div style={{ width: '566px', marginTop: '32px' }} className={styles.notification}>
            <h5>Уведомления</h5>
            <div className={styles.notification_toggleWrapper}>
              <div className={styles.notification_toggleWrapper_toggleBlock}>
                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                  <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>
                    Уведомлять о присланных домашних заданиях
                  </span>
                  <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>
                    После каждой присланной домашней работы вам будет приходить уведомление на почту
                  </p>
                </div>
                <div>
                  {/* Нужно сделать собственные и удалить зависимости библиотеки*/}
                  <Toggle />
                </div>
              </div>
              <div className={styles.notification_toggleWrapper_toggleBlock}>
                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                  <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>
                    Уведомлять о непрочитанных сообщениях
                  </span>
                  <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>
                    Раз в сутки вам на почту будет приходить уведомление, если у вас есть
                    непрочитанные сообщения
                  </p>
                </div>
                <div>
                  <Toggle />
                </div>
              </div>
              <div className={styles.notification_toggleWrapper_toggleBlock}>
                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                  <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>
                    Уведомлять о предстоящем вебинаре
                  </span>
                  <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>
                    Вы будете уведомлены перед началом вебинара, в котором вы указаны ответственным
                    сотрудником
                  </p>
                </div>
                <div>
                  <Toggle />
                </div>
              </div>
              <div className={styles.notification_toggleWrapper_toggleBlock}>
                <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                  <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>
                    Уведомлять о пройденных учениками курсах
                  </span>
                  <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>
                    На почту придет уведомление, когда один из учеников пройдет все занятия курса
                  </p>
                </div>
                <div>
                  <Toggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
