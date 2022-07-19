import React, {FC, memo} from 'react';
import {NavAccountBtn} from "./NavAccountBtn/NavAccountBtn";
import styles from './navAccount.module.scss'
import {RoleE} from "../../../enum/roleE";
import {Path} from "../../../enum/pathE";

type NavAccountPropsT = {
    role: number
}
export const NavAccount: FC<NavAccountPropsT> = memo(({role}) => {
    return (
        <div className={styles.nav_account}>
            <NavAccountBtn path={Path.Main} text={'Основные'}/>
            <NavAccountBtn path={Path.Employees} text={'Сотрудники'}/>
            {role === RoleE.SuperAdmin ? <NavAccountBtn path={Path.Logs} text={'Логи'}/> : null}
            <NavAccountBtn path={Path.Decoration} text={'Оформление'}/>
        </div>
    );
});

