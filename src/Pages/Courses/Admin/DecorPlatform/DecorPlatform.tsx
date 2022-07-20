import React, {ChangeEvent, memo} from 'react';
import styles from "../superAdmin.module.scss";
import Cover from '../../../../assets/img/super_admin_cover.jpg'
import {LogoAddBlock} from "./LogoAddBlock/LogoAddBlock";
import {useAppDispatch} from "../../../../store/redux/store";
import {changeFavicon, changeLogo} from "../../../../store/redux/platform/slice";


export const DecorPlatform = memo(() => {
    const dispatch = useAppDispatch()

    const onChangeLogotype = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const index = 0
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[index])
            reader.onloadend = event => {
                if (typeof event?.target?.result === 'string') {
                    dispatch(changeLogo(event?.target?.result))
                }
            }
        }
    }
    const onChangeFavicon = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const index = 0
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[index])
            reader.onloadend = event => {
                if (typeof event?.target?.result === 'string') {
                    dispatch(changeFavicon(event?.target?.result))
                }
            }
        }
    }
    return (
        <div className={styles.wrapper_actions}>
            <div className={styles.decor}>
                <div className={styles.decor_title}>Оформление платформы</div>

                <LogoAddBlock title={'Ваш логотип'}
                              logotype={Cover}
                              logoDesc={'Загрузите логотип Вашей компании: он будет отображаться в интерфейсе и системных email'}
                              aboutRequirements={'Требования к логотипу:'}
                              onChange={onChangeLogotype}
                              requirementsArr={['Формат файла PNG', 'Размер файла не более 2 мб', ' Оптимальный размер логотипа 200px х 50px']}/>
                <LogoAddBlock title={'Ваш favicon'}
                              logotype={Cover}
                              logoDesc={'Загрузите favicon Вашей компании: он будет отображаться на страницах вашей школы во вкладке браузера'}
                              aboutRequirements={'Требования к favicon:'}
                              onChange={onChangeFavicon}
                              requirementsArr={['Формат файла PNG', 'Размер файла не более 200 кб', 'Оптимальный размер favicon 100px х 100px']}/>
            </div>
        </div>
    );
});

