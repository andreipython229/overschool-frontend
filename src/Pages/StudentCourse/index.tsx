import {FC, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {setModules} from "../../store/redux/modules/modules";

import {sectionsT} from '../../types/sectionT'
import {useFetchModulesQuery} from '../../api/modulesServices'
import {StudentAccardion} from 'components/StudentAccardion/StudentAccardion'
import {StudentCourseHeader} from "./StudentCourseHeader";

export const StudentCourse: FC = () => {
    const dispatch = useDispatch();
    const {course_id: courseId} = useParams()
    const {data: course} = useFetchModulesQuery(courseId as string)

    useEffect(() => {
        if (course?.sections.length !== undefined) {
            localStorage.setItem('sections_count', course?.sections.length.toString());
            dispatch(setModules(course));
        }

    }, [course, dispatch])

    return (
        <>
            <StudentCourseHeader/>
            <StudentAccardion modules={course as sectionsT}/>
        </>
    )
}