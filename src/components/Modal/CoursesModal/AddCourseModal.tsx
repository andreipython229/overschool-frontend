import {FormEvent, ChangeEvent, FC, useState, useEffect} from 'react'
import {generatePath, useNavigate} from 'react-router-dom'

import {useCreateCoursesMutation, useLazyFetchCourseQuery} from 'api/coursesServices'
import {Path} from '../../../enum/pathE'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {Button} from '../../common/Button/Button'
import {Input} from '../../common/Input/Input/Input'
import {crossIconPath} from '../../../config/commonSvgIconsPath'
import {AddCourseModalPropsT} from '../ModalTypes'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'

import styles from '../Modal.module.scss'
import {useBoolean} from "../../../customHooks";
import {Portal} from "../Portal";
import {LimitModal} from "../LimitModal/LimitModal";
import {checkCourseT} from "../../../types/CoursesT";

export const AddCourseModal: FC<AddCourseModalPropsT> = ({courses, setShowModal}) => {
    const navigate = useNavigate()
    const schoolName = window.location.href.split('/')[4]

    const [name, setName] = useState<string>('')
    const [createCourses, {isLoading}] = useCreateCoursesMutation()
    // const [createCourses, {isLoading}] = useLazyFetchCourseQuery()

    const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }
    const school = localStorage.getItem('school_id')

    const [isOpenLimitModal, {onToggle}] = useBoolean()
    const [message, setMessage] = useState<string>('')

    const addCourseName = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (name && school) {
            const formdata = new FormData()
            formdata.append('name', name)
            formdata.append('school', school)

            await createCourses({course: formdata, schoolName}).unwrap().then(async (data: any) => {
                const {data: course}: any = data;
                setShowModal()
                if (course) {
                    navigate(
                        generatePath(Path.CreateCourse, {
                            course_id: course?.course_id,
                        }),
                    )
                }
            }).catch((error) => {
                setMessage(error.data)
                onToggle()
            })
        }
        window.location.reload();
    }

    return (
        <div className={styles.mainCourse}>
            <div className={styles.mainCourse_container}>
                <div className={styles.mainCourse_closed} onClick={setShowModal}>
                    <IconSvg width={25} height={25} path={crossIconPath}/>
                </div>

                <div className={styles.mainCourse_title}>Создание курса</div>
                <form onSubmit={addCourseName}>
                    <div className={styles.mainCourse_input}>
                        <Input
                            style={{width: '280px'}}
                            label="Введите название курса:"
                            placeholder="Введите название курса"
                            name={'course'}
                            type={'text'}
                            onChange={nameCourse}
                            value={name}
                            focus={true}
                        />
                    </div>

                    <div className={styles.mainCourse_btn}>
                        <Button
                            style={{minWidth: '280px'}}
                            type={'submit'}
                            variant={!name || isLoading ? 'disabled' : 'primary'}
                            text={//isLoading  ? <SimpleLoader style={{width: '25px', height: '25px'}}
                                                            //loaderColor="#ffff"/> : 
                                                            'Создать курс'}
                            disabled={!name || isLoading}
                        />
                    </div>
                </form>
            </div>
            {isOpenLimitModal ? (
                <Portal closeModal={onToggle}>
                    <LimitModal message={message} setShowLimitModal={onToggle} setShowMainModal={setShowModal}/>
                </Portal>
            ) : null}
        </div>
    )
}
