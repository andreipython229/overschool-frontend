import React, {memo, useState} from 'react';
import styles from './admin.module.scss'
import {Previous} from "./Previous/Previous";
import {NavAccount} from "./NavAccount/NavAccount";
import {Main} from "./SuperAdmin/Main/Main";
import {Logs} from "./SuperAdmin/Logs/Logs";
import {Employees} from "./SuperAdmin/Employees/Employees";
import {DecorPlatform} from "./SuperAdmin/DecorPlatform/DecorPlatform";
import {Route, Routes} from "react-router-dom";
import {AddEmployeeModal} from "../../Components/Modal/AddEmployee/AddEmployeeModal";
import Avatar from '../../assets/img/avatar.svg'

export const Admin = memo(() => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const setModal = () => {
        setModalIsOpen(!modalIsOpen)
    }
    return (
        <div className={styles.container}>

            <Previous name={'Название'} avatar={Avatar} description={'Онлайн обучение'} about={'Краткое описание'}/>
            <NavAccount/>
            {modalIsOpen ? <AddEmployeeModal setModal={setModal}/> : null}
            <Routes>
                <Route path={'main'} element={<Main/>}/>
                <Route path={'employees'} element={<Employees setModal={setModal}/>}/>
                <Route path={'logs'} element={<Logs/>}/>
                <Route path={'decoration'} element={<DecorPlatform/>}/>
            </Routes>
        </div>
    );
});

