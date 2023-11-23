import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import {Button} from 'components/common/Button/Button'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {crossIconPath} from '../../../config/commonSvgIconsPath'
// import {addStudentIconPath} from 'config/svgIconsPath'
import {AddSchoolModalPropsT} from '../ModalTypes'

import {SimpleLoader} from 'components/Loaders/SimpleLoader'

import styles from "../Modal.module.scss";
import {useCreateSchoolMutation} from 'api/schoolService'
import {Portal} from "../Portal";
import {LimitModal} from "../LimitModal/LimitModal";
import {useBoolean} from "../../../customHooks";
import {Radio} from "../../common/Radio/Radio";

type schoolT = {
    name: string
}

export const AddSchoolModal: FC<AddSchoolModalPropsT> = ({setShowModal, schools}) => {
    const [name, setName] = useState<string>('')

    const [createSchool, {isSuccess, isLoading, isError}] = useCreateSchoolMutation()

    const [isOpenLimitModal, {onToggle}] = useBoolean()
    const [message, setMessage] = useState<string>('')

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleCreateSchool = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        await createSchool(formData).unwrap().then(async (data: any) => {
            console.log('uspeh')
            await setShowModal()
            await window.location.reload()
        }).catch((error) => {
            setMessage((JSON.parse(error.data)).detail)
            onToggle()
        })
    }

    const handleClose = () => {
        setShowModal()
    }

    return (
        <>
        <form noValidate onSubmit={handleCreateSchool} className={styles.main_school}>
            <div className={styles.main_school_container}>
                <div onClick={handleClose} className={styles.main_school_closedModal}>
                    <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    {/*<IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={addStudentIconPath}/>*/}
                    <span className={styles.main_school_title}>Создание школы</span>
                </div>
                <div className={styles.main_school_name}>
                    <label htmlFor="name">Название школы:</label>
                    <br/>
                    <div className={styles.main_school_name_input}>
                        <input value={name} onChange={handleChangeName} type="text"/>
                    </div>
                    <br/>
                </div>

                <div className={styles.main_school_btn}>
                    <Button
                        type={'submit'}
                        style={{width: '474px'}}
                        variant={isLoading || !name ? 'disabled' : 'primary'}
                        text={isLoading ? <SimpleLoader style={{width: '25px', height: '25px'}}
                                                        loaderColor="#ffff"/> : 'Создать'}
                        disabled={isLoading || !name}
                    />
                </div>
            </div>
        </form>
        {
        isOpenLimitModal ? (
            <Portal closeModal={onToggle}>
                <LimitModal message={message} setShowLimitModal={onToggle} setShowMainModal={setShowModal}/>
            </Portal>
        ) : null  }
</>
)
}
