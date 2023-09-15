import {FC, memo, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {createGroupIconPath} from '../../../Pages/School/config/svgIconsPath'
import {SettingsGroupModal} from 'components/Modal/StudentLogs/SettingsGroupModal/SettingsGroupModal'
import {Portal} from 'components/Modal/Portal/index'
import {useBoolean} from 'customHooks/useBoolean'
import {useFetchStudentGroupQuery} from 'api/studentsGroupService'
import {useLazyFetchCourseQuery} from 'api/coursesServices'
import {backArr} from '../config/svgIconPath'

import studentsStyles from 'Pages/School/StudentsStats/studentsStats.module.scss'
import styles from '../previou.module.scss'

export const GroupPrevious: FC = memo(() => {
    const [toggleSettingModal, {on: onToggleSettingModal, off: offToggleSettingModal}] = useBoolean()

    const {group_id: groupId} = useParams()
    const navigate = useNavigate()

    const {data, isSuccess} = useFetchStudentGroupQuery(`${groupId}`)
    const [fetchCourse, {data: course}] = useLazyFetchCourseQuery()

    useEffect(() => {
        isSuccess && data?.course_id && fetchCourse(data?.course_id)
    }, [isSuccess])

    return (
        <>
            {toggleSettingModal && isSuccess && (
                <Portal closeModal={onToggleSettingModal}>
                    <SettingsGroupModal closeModal={onToggleSettingModal} name={`${data?.name}`}
                                        groupId={data?.group_id as number}
                                        courseId={Number(data?.course_id)} teacherId={Number(data?.teacher_id)}
                                        students={data?.students}
                                        sequence={Boolean(data?.group_settings?.strict_task_order)}
                                        blockHomeworks={Boolean(data?.group_settings?.task_submission_lock)}/>
                </Portal>
            )}
            <div className={styles.previous}>
                <img className={styles.background_image_course} src={course?.photo} alt="bg"/>
                <div className={styles.previous_bcgrShadow}></div>
                <div className={styles.back_all_course} onClick={() => navigate(-1)}>
                    <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr}/>
                    <span>Курс</span>
                </div>
                <div className={styles.previous_onlineCourses}>Группа учеников</div>
                <div className={styles.previous_title_name}>{data?.name}</div>

                <div className={styles.previous_btn}>
                    <div onClick={offToggleSettingModal} className={studentsStyles.students_group_header_add_group_btn}>
                        <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={createGroupIconPath}/>
                        Создать новую группу
                    </div>
                </div>
            </div>
        </>
    )
})
