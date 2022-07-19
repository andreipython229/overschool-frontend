import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import styles from './App.module.scss'

import {InitialPage} from "./Pages/InitialPage/InitialPage";
import {Path} from "./enum/pathE";
import {PageNotFound} from "./Pages/PageNotFound/PageNotFound";
import {MainLayOut} from "./Pages/layout/MainLayOut";
import {Admin} from "./Pages/Admin/Admin";
import {useAppSelector} from "./store/redux/store";
import {Profile} from "./Pages/Profile/Profile";

function App() {
    const isLogin = useAppSelector(state => state.user.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate(Path.InitialPage)
        }
    }, [isLogin, navigate])

    return (
        <div className={styles.container}>
            <Routes>
                <Route path={Path.InitialPage} element={<InitialPage/>}/>

                <Route path={Path.InitialPage} element={<MainLayOut/>}>
                    <Route path={Path.SuperAdmin} element={<Admin/>}/>
                    {/*<Route path={`${Path.SuperAdmin}`} element={<Admin/>}/>*/}
                    <Route path={Path.Profile} element={<Profile/>}/>
                </Route>
                <Route path={'*'} element={<PageNotFound/>}/>
            </Routes>

        </div>
    );
}

export default App;
