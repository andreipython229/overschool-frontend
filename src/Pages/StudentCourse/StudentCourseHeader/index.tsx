import {FC, useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import {useFetchCourseQuery} from 'api/coursesServices'
import {useFetchModulesQuery} from 'api/modulesServices'
import {Path} from 'enum/pathE'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {backArr} from 'components/Previous/config/svgIconPath'
import {lessonT, sectionT} from 'types/sectionT'
import {lessonSvgMapper} from 'config/index'
import {getNounDeclension} from 'utils/getNounDeclension'

import styles from './student_course_header.module.scss'
import {useFetchProgressQuery} from "../../../api/userProgressService";
import {SimpleLoader} from "../../../components/Loaders/SimpleLoader";

export const StudentCourseHeader: FC = () => {
    const {course_id: courseId} = useParams()
    const navigate = useNavigate()

    const {data: userProgress, isLoading, isError} = useFetchProgressQuery(courseId as string)
    const {data: course} = useFetchCourseQuery(courseId as string)
    const {data: modules, isSuccess} = useFetchModulesQuery(courseId as string)

    const [modulesData, setModulesData] = useState(modules)

    const arrOfLessons = modulesData?.sections.reduce((acc: lessonT[], item: sectionT) => {
        return [...acc, ...item.lessons]
    }, [])

    const countOfLessons = arrOfLessons?.reduce(
        (acc: { [key: string]: number }, item: lessonT) => ((acc[item.type] = (acc[item.type] || 0) + 1), acc),
        {},
    )

    useEffect(() => {
        if (isSuccess) {
            setModulesData(modules)
        }
    }, [isSuccess])

    if (isLoading || isError) {
        return <SimpleLoader style={{width: '100px', height: '100px'}}/>;
    }

    return (
        <div className={styles.previous}>
            <img className={styles.background_image_course} src={course?.photo_url} alt=""/>
            <div className={styles.previous_bcgrShadow}></div>
            <div onClick={() => navigate('/school/School_1/courses/')} className={styles.back_all_course}>
                <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr}/>
                <span>Все курсы</span>
            </div>
            <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
            <div className={styles.previous_title_name}>{course?.name}</div>
            <div className={styles.previous_courseInfo}>
                <div style={{marginRight: '32px', display: 'flex', alignItems: 'center'}}>
                    {lessonSvgMapper['lesson']}
                    <span style={{marginLeft: '4px'}}>
            {countOfLessons && countOfLessons['lesson']}{' '}
                        {countOfLessons && getNounDeclension(countOfLessons['lesson'], ['занятие', 'занятия', 'занятий'])}
          </span>
                </div>
                <div style={{marginRight: '32px', display: 'flex', alignItems: 'center'}}>
                    {lessonSvgMapper['homework']}
                    <span style={{marginLeft: '4px'}}>
            {countOfLessons && countOfLessons['homework']}{' '}
                        {countOfLessons && getNounDeclension(countOfLessons['homework'], ['задание', 'задания', 'заданий'])}
          </span>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {lessonSvgMapper['test']}
                    <span>
            {countOfLessons && countOfLessons['test']} {countOfLessons && getNounDeclension(countOfLessons['test'], ['тест', 'теста', 'тестов'])}
          </span>
                </div>
            </div>
            <div className={styles.previous_progress}>
                <div className={styles.previous_progress_graph}>{userProgress.courses[0]?.completed_percent}%</div>
                <div className={styles.previous_progress_info}>
                    {(userProgress.courses[0]?.all_baselessons / userProgress.courses[0]?.completed_count !== 1) ? (
                        <span>В процессе: {userProgress.courses[0]?.completed_count}/{userProgress.courses[0]?.all_baselessons}</span>
                    ) : (
                        <span>Завершено: {userProgress.courses[0]?.completed_count}/{userProgress.courses[0]?.all_baselessons}</span>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
