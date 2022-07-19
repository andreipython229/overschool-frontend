import React, {ChangeEvent, FC, memo} from 'react';
import styles from "../profile.module.scss";
import {Input} from "../../../Components/common/Input/Input/Input";
import {Button} from "../../../Components/common/Button/Button";
import {SelectInput} from "../../../Components/common/SelectInput/SelectInput";

type AboutUserPropsT = {
    avatar: string | null
    onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void
}
const optionsList = ['Выберите пол', 'Мужской', 'Женский',]

export const AboutUser: FC<AboutUserPropsT> = memo(({avatar, onChangeAvatar}) => {
    return (
        <div style={{width: 'calc(100% * 0.6)', marginRight: '26px', marginBottom: '108px'}}
             className={styles.container}>
            <h3>Настройка профиля</h3>
            <div className={styles.profile_block}>
                <Input name={'Email'} type={'text'} label={'Email:'} onChange={() => alert('Hello')}
                       value={'user@gmail.com'}/>
            </div>
            <div className={styles.profile_block}>
                <div className={styles.profile_block_avatarBlock}>
                    <span className={styles.profile_block_avatarBlock_title}>Аватар:</span>
                    {avatar ?
                        <img className={styles.profile_block_avatarBlock_avatar} src="/" alt="User Avatar"/>
                        : <div className={styles.profile_block_avatarBlock_avatar}/>}
                    <input className={styles.profile_block_avatarBlock_input} name={'Avatar'} type={'file'}
                           onChange={onChangeAvatar}/>
                </div>
            </div>
            <div className={styles.profile_block}>
                <Input name={'Name'} type={'text'} label={'Имя и Фамилия:'} onChange={() => alert('Hello')}
                       value={'Без имени'}/>
            </div>
            <div className={styles.profile_block}>
                <Input name={'phone'} type={'text'} label={'Телефон:'} onChange={() => alert('Hello')}
                       value={''} placeholder={'Введите номер телефона'}/>
            </div>
            <div className={styles.profile_block}>
                <Input name={'city'} type={'text'} label={'Город:'} onChange={() => alert('Hello')}
                       value={''} placeholder={'Введите город'}/>
            </div>
            <div className={styles.profile_block}>
                <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
                <textarea className={styles.profile_block_textArea}
                          placeholder={'Опишите вашу карьеру и достижения. Эта информация будет отображена на страницах курсов, в которых вы являетесь преподавателем'}/>
            </div>
            <div className={styles.profile_block}>
                <span className={styles.profile_block_avatarBlock_title}>Пол:</span>
                <SelectInput optionsList={optionsList}/>
            </div>
            <div>
                <Button text={'Сохранить'} variant={'disabled'} disabled={true}/>
            </div>
        </div>
    );
});

