import React, {memo, useState} from 'react';
import styles from './admin.module.scss'
import {useAppSelector} from "../../store/redux/store";
import {CoursePage} from "./CoursesCreating/CoursePage";

export const Platform = memo(() => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const role = useAppSelector(state => state.user.role)
    const setModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    return (
        <div className={styles.container}>
            {/*<Routes>*/}
            {/*    <Route path={Path.Settings} element={<Settings setModal={setModal}/>}>*/}
            {/*        <Route path={Path.Main} element={<Main/>}/>*/}
            {/*        <Route path={Path.Employees} element={<Employees setModal={setModal}/>}/>*/}
            {/*        {role === RoleE.SuperAdmin ? <Route path={Path.Logs} element={<Logs/>}/> : null}*/}
            {/*        <Route path={Path.Decoration} element={<DecorPlatform/>}/>*/}
            {/*    </Route>*/}
            {/*</Routes>*/}
            <CoursePage/>
        </div>
    );
});

