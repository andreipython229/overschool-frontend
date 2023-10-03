import {ChangeEvent, FC, useEffect, useState} from 'react'

import {noPublishedGreyIconPath} from '../../../config/svgIconsPath'
import {IconSvg} from '../../../../../components/common/IconSvg/IconSvg'
import {Input} from '../../../../../components/common/Input/Input/Input'
import {useDeleteCoursesMutation, usePatchCoursesMutation} from '../../../../../api/coursesServices'
import {formDataConverter} from '../../../../../utils/formDataConverter'
import {CheckboxBall} from '../../../../../components/common/CheckboxBall'

import {CoursesDataT} from '../../../../../types/CoursesT'

import styles from './setting_course.module.scss'
import {useDebounceFunc} from '../../../../../customHooks'
import {Button} from "../../../../../components/common/Button/Button";
import {Path} from "../../../../../enum/pathE";
import {generatePath, useNavigate} from "react-router-dom";
import {SimpleLoader} from "../../../../../components/Loaders/SimpleLoader";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type BasicSettingsT = {
    toggleCheckbox: boolean
    toggleCheckboxPublished: () => void
    courseFind: CoursesDataT
}

export const BasicSettings: FC<BasicSettingsT> = ({toggleCheckbox, toggleCheckboxPublished, courseFind}) => {
    const [update, {isLoading}] = usePatchCoursesMutation()
    const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
    const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')
    const [deleteCourses, {isSuccess: isSuccessDelete}] = useDeleteCoursesMutation()
    const [alertOpen, setAlertOpen] = useState<boolean>(false)

    const debounce = useDebounceFunc(update)
    const navigate = useNavigate()

    const handleCloseAlert = () => {
        setAlertOpen(false)
    }

    const handleOpenAlert = () => {
        setAlertOpen(true)
    }

    const handleNameCourse = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'nameCourse') {
            setNameCourse(e.target.value)
        } else {
            setShortDescription(e.target.value)
        }
    }

    const handleDeleteCourse = async () => {
        courseFind && (await deleteCourses(courseFind?.course_id))
        setAlertOpen(false)
    }

    const handleSaveChanges = async () => {
        const updateCurse = {
            name: nameCourse,
            description: shortDescription,
            public: 'О',
        }

        const formdata = formDataConverter(updateCurse)
        if (formdata && courseFind) {
            const id = courseFind?.course_id
            debounce({formdata, id})
        }
    }

    useEffect(() => {
        if (isSuccessDelete) {
            navigate(generatePath(Path.School + Path.Courses, {
                school_name: localStorage.getItem('school') || window.location.href.split('/')[4],
            }))
        }
    }, [isSuccessDelete])


    return (
        <div className={`${styles.basic_settings}`}>
            <div className={`${styles.header_basic_settings}`}>
                <p>Основные настройки</p>
                {/* {!toggleCheckbox && (
                    <p className={styles.right_content_header}>
                        <IconSvg width={20} height={15} viewBoxSize=" 0 0 21 16" path={noPublishedGreyIconPath}/>
                        Не опубликован
                    </p>
                )} */}
            </div>
            {/* <div className={styles.publish_switch}>
                <p className={styles.publish_switch_title}>Статус курса</p>
                <div className={styles.publish_switch_wrapper_switch}>
                    <CheckboxBall isChecked={toggleCheckbox} toggleChecked={toggleCheckboxPublished}/>
                </div>
            </div> */}
            <div className={styles.course_name_wrapper}>
                <p className={styles.course_name_title}>Название курса:</p>
                <Input type={'text'} name="nameCourse" value={nameCourse} onChange={handleNameCourse}/>
            </div>
            <div className={styles.short_discription_wrapper}>
                <p className={styles.short_discription_title}>Кратное описание:</p>
                <Input type={'text'} name="shortDescription" value={shortDescription} onChange={handleNameCourse}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1em'}}>
                <Button onClick={handleSaveChanges} text={isLoading ?
                    <SimpleLoader style={{height: '1em', width: '11em'}}/> : 'Применить изменения'}
                        variant={'secondary'}/>
                <Button onClick={handleOpenAlert} text={'Удалить курс'} variant={'delete'}/>
            </div>
            <Dialog
                open={alertOpen}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {`Вы действительно хотите удалить курс "${courseFind.name}"?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Это действие безвозвратно удалит курс, если вы не уверены,
                        что хотите удалять курс {`"${courseFind.name}"`}, то нажмите {"отмена"}.
                        Если вы уверены, что хотите продолжить, нажмите {"удалить"}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert} text={'Отмена'}/>
                    <Button onClick={handleDeleteCourse} autoFocus text={'Удалить'} variant={'delete'}/>
                </DialogActions>
            </Dialog>
        </div>
    )
}
