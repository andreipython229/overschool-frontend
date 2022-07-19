import React, {FC, memo, useState} from "react";
import {Previous} from "../../Previous/Previous";
import Avatar from "../../../../assets/img/avatar.svg";
import {NavAccount} from "../../NavAccount/NavAccount";
import {AddEmployeeModal} from "../../../../Components/Modal/AddEmployee/AddEmployeeModal";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../../../store/redux/store";

type SettingsPropsT = {
    setModal: () => void
    modalIsOpen: boolean
}
export const Settings: FC<SettingsPropsT> = memo(({ modalIsOpen, setModal}) => {
    const role = useAppSelector(state => state.user.role)



    return (
        <>
            <Previous name={'Название'} avatar={Avatar} description={'Онлайн обучение'} about={'Краткое описание'}/>
            <NavAccount role={role}/>
            {
                modalIsOpen ? <AddEmployeeModal setModal={setModal}/> : null
            }
            <Outlet/>
        </>
    )
})