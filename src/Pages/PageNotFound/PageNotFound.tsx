import {generatePath, useNavigate} from 'react-router-dom'

import {Path} from '../../enum/pathE'

import styles from './pageNotFound.module.scss'
import {RoleE} from "../../enum/roleE";
import {useAppSelector} from "../../store/hooks";
import {selectUser} from "../../selectors";

export const PageNotFound = () => {
    const navigate = useNavigate()
    const { role } = useAppSelector(selectUser)
    const goBack = () => {
        const pathLink = generatePath(role === RoleE.Teacher ? `${Path.School}${Path.CourseStudent}` : `${Path.School}${Path.Courses}`, {
            school_name: `${localStorage.getItem('school') || window.location.href.split('/')[4]}`
        })
        navigate(pathLink)
    }

    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <p> Извините, но страница не существует или не найдена.</p>
                <button className={styles.main_link} onClick={goBack}>
                    Back to start
                </button>
            </div>
        </div>
    )
}
