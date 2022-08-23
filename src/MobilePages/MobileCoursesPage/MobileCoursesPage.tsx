import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react'
import styles from './mobileCoursesPage.module.scss'
import { CourseSearchInput } from 'MobilePages/MobileCoursesPage/CourseSearchInput/CourseSearchInput'
import {CoursesT, getCourses} from '../../store/redux/courses/slice'
import { MobileCourseBlock } from 'MobilePages/MobileCoursesPage/MobileCourseBlock/MobileCourseBlock'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {allCoursesSelector} from "../../selectors";
import {useFetchCoursesQuery} from "../../api/coursesServices";



export const MobileCoursesPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const dispatch = useAppDispatch()

    const { courses } = useAppSelector(allCoursesSelector)
    const { data: coursesList } = useFetchCoursesQuery('')

    useEffect(() => {
        dispatch(getCourses(coursesList))
    }, [coursesList])
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_container}>
                    <img src="" alt="" />
                    <div className={styles.header_container_title}>
                        <span>Онлайн-обучение</span>
                        <span>Название</span>
                        <span>Краткое описание</span>
                    </div>
                </div>
            </div>
            <div className={styles.search}>
                <CourseSearchInput searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
            </div>
            <span className={styles.title}>Мои курсы</span>
            <div className={styles.course}>
                {courses &&
                    courses?.map((course: CoursesT) => (
                        <MobileCourseBlock
                            key={course.course_id}
                            name={course.name}
                            progress={'58'}
                            desc={course.description}
                        />
                    ))}
            </div>
        </div>
    )
}
