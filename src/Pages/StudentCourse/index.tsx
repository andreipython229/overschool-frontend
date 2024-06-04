import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {setModules, clearModules, modulesSlice, modulesReduce} from "../../store/redux/modules/modules";

import {sectionsT} from '../../types/sectionT'
import {useFetchModulesQuery, useLazyFetchModulesQuery} from '../../api/modulesServices'
import {StudentAccardion} from 'components/StudentAccardion/StudentAccardion'
import {StudentCourseHeader} from "./StudentCourseHeader";
import {Portal} from "../../components/Modal/Portal";
import {LimitModal} from "../../components/Modal/LimitModal/LimitModal";
import {useBoolean} from "../../customHooks";


export const StudentCourse: FC = () => {
    const dispatch = useDispatch();
    const {course_id: courseId} = useParams()
    const [fetchModules, {data, error, isError}] = useLazyFetchModulesQuery()
    const [isOpenLimitModal, { onToggle }] = useBoolean()
    const [message, setMessage] = useState<string>('')
    const [course, setCourse] = useState<any>()
    const schoolName = window.location.href.split('/')[4]

    useEffect(() => {
        fetchModules({id: courseId as string, schoolName})
    }, [courseId])

    useEffect(() => {
        if (data) {
           setCourse(data)
        }
        if (data?.sections.length !== undefined) {
            localStorage.setItem('sections_count', data?.sections.length.toString());
            dispatch(setModules(data));
        }
        if (error && "data" in error) {
           setMessage(JSON.parse(JSON.stringify(error.data)).error);
           onToggle();
           setCourse(null);
        }
    }, [data, error, dispatch])

    return (
        <>
            <StudentCourseHeader teacher_id={course?.teacher_id as number}/>
            {course ?
            <StudentAccardion modules={course as sectionsT}/>
                : <></>}
             {isOpenLimitModal ? (
               <Portal closeModal={onToggle}>
                   <LimitModal message={message} setShowLimitModal={onToggle}/>
               </Portal>
             ) : null}
        </>
    )
}