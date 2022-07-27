import React, {FC, memo, useState} from "react";
import {Previous} from "../../Previous/Previous";
import Avatar from "../../../../assets/img/avatar.svg";
import {NavAccount} from "../../NavAccount/NavAccount";
import {AddEmployeeModal} from "../../../../components/Modal/AddEmployee/AddEmployeeModal";
import {Route, Routes} from "react-router-dom";
import {useAppSelector} from "../../../../store/redux/store";
import {Path} from "../../../../enum/pathE";
import {Main} from "./Main/Main";
import {Employees} from "./Employees/Employees";
import {RoleE} from "../../../../enum/roleE";
import {Logs} from "./Logs/Logs";
import {DecorPlatform} from "./DecorPlatform/DecorPlatform";

export const Settings: FC = memo(() => {
    const role = useAppSelector(state => state.user.permission)
    const projectName = useAppSelector<string>(state => state.platform.projectName)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const setModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    return (
        <>
            <Previous name={projectName} avatar={Avatar} description={'Онлайн обучение'} about={'Краткое описание'}/>
            <NavAccount role={role}/>
            {
                modalIsOpen ? <AddEmployeeModal setModal={setModal}/> : null
            }
            <Routes>
                <Route path={'/*'} element={<Main/>}/>
                <Route path={Path.Employees} element={<Employees setModal={setModal}/>}/>
                {role === RoleE.SuperAdmin ? <Route path={Path.Logs} element={<Logs/>}/> : null}
                <Route path={Path.Decoration} element={<DecorPlatform/>}/>
            </Routes>
        </>
    )
})