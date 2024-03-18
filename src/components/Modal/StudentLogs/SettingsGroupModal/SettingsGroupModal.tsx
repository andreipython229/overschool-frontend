import {ChangeEvent, FC, useEffect, useState} from 'react'

import {MainSettingsGroup} from 'components/Modal/StudentLogs/SettingsGroupModal/Main'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {crossIconPath} from '../../../../config/commonSvgIconsPath'
import {settingsGroupIconPath} from '../config/svgIconsPath'
import {SettingsGroupModalPropsT} from '../../ModalTypes'
import {
    useDeleteStudentsGroupMutation,
    useFetchStudentGroupQuery,
    usePatchStudentsGroupMutation,
    usePatchGroupWithoutTeacherMutation
} from '../../../../api/studentsGroupService'
import styles from '../studentsLog.module.scss'
import {SimpleLoader} from '../../../Loaders/SimpleLoader'
import {
    useLazyFetchGroupLessonsQuery,
    useSetGroupLessonsAccessMutation
} from "../../../../api/lessonAccessService";
import {groupSections, sectionLessons} from "../../../../types/lessonAccessT";

export const SettingsGroupModal: FC<SettingsGroupModalPropsT> = ({closeModal, groupId, courseId}) => {
    const schoolName = window.location.href.split('/')[4]
    const [blockHomework, setBlockHomework] = useState<boolean>(false)
    const [strongSubsequence, setStrongSubsequence] = useState<boolean>(false)
    const [textNameField, setTextNameField] = useState<string>('')
    const [groupType, setGroupType] = useState<string>('')
    const [duration, setDuration] = useState<number>(0)
    const [isLimited, setIsLimited] = useState<boolean>(false)
    const [currentTeacher, setCurrentTeacher] = useState<number>()
    const {data, isSuccess} = useFetchStudentGroupQuery({id: String(groupId), schoolName})
    const [deleteStudentsGroup, {isLoading, isError}] = useDeleteStudentsGroupMutation()
    const [patchGroup] = usePatchStudentsGroupMutation()
    const [patchGroupWithoutTeacher] = usePatchGroupWithoutTeacherMutation()
    const [fetchGroupLessons, { data: groupAccessInfo, isFetching }] = useLazyFetchGroupLessonsQuery()
    const [groupLessons, setGroupLessons] = useState<sectionLessons[]>()
    const [setAccess] = useSetGroupLessonsAccessMutation()

    useEffect(() => {
        setBlockHomework(Boolean(data?.group_settings?.task_submission_lock))
        setStrongSubsequence(Boolean(data?.group_settings?.strict_task_order))
        setTextNameField(String(data?.name))
        setGroupType(String(data?.type))
        setDuration(Number(data?.training_duration))
        data?.training_duration && setIsLimited(true)
        data?.teacher_id && setCurrentTeacher(Number(data?.teacher_id))
    }, [isSuccess])

    useEffect(() => {
        groupId && fetchGroupLessons({group_id: groupId, schoolName: schoolName})
    }, [groupId])

    useEffect(() => {
        if (groupAccessInfo) {
            groupAccessInfo && setGroupLessons(groupAccessInfo.sections)
        }
    }, [groupAccessInfo])

    const handlerHomeworkCheck = () => {
        setBlockHomework(!blockHomework)
    }
    const handlerSubsequenceCheck = () => {
        setStrongSubsequence(!strongSubsequence)
    }

    const handleDuration = (event: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(event.target.value))
    }

    const handlerIsLimited = () => {
        setIsLimited(!isLimited)
    }

    const handleDeleteGroup = async () => {
    await deleteStudentsGroup({id: groupId, schoolName})
    closeModal()
    }

    const handleSaveGroupSettings = async () => {
        const dataToSend = {
            name: `${textNameField}`,
            course_id: courseId,
            group_settings: {
                strict_task_order: strongSubsequence,
                task_submission_lock: blockHomework,
            },
            training_duration: isLimited ? duration : 0,
        }
        if (groupType === "WITH_TEACHER") {
            Object.assign(dataToSend, {teacher_id: currentTeacher})
            await patchGroup({id: groupId, data: dataToSend, schoolName: schoolName}).unwrap().catch(error => console.log(error.data))
        } else {
            await patchGroupWithoutTeacher({id: groupId, data: dataToSend, schoolName: schoolName}).unwrap().catch(error => console.log(error.data))
        }
        closeModal()
    }

    const handleAccessSetting = async () => {
        const lesson_data: { lesson_id: number; available: boolean }[] = []
        groupLessons &&
        groupLessons.map(section => {
            section.lessons.map(lesson => {
                lesson_data.push({
                    lesson_id: lesson.lesson_id,
                    available: lesson.availability
                })
            })
        })
        const accessData = {
            student_group_id: groupId,
            lesson_data: lesson_data,
        }

        console.log(accessData)
        await setAccess({data: accessData, schoolName})
            .unwrap()
            .then(async () => {
                console.log('uspeh')
            })
            .catch(error => {
                console.log(error.data)
            })
    }

    if (!isSuccess) {
        return <SimpleLoader/>
    }

    return (
        <>
            {isSuccess && data && (
                <div className={styles.container}>
                    <div onClick={closeModal} className={styles.container_closed}>
                        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath}/>
                    </div>
                    <div className={styles.groupSetting}>
                        <div className={styles.container_header}>
                            <IconSvg width={44} height={50} viewBoxSize="0 0 44 50" path={settingsGroupIconPath}/>
                            <span className={styles.container_header_title}>Настройки группы </span>
                        </div>
                        <MainSettingsGroup
                            course={courseId}
                            groupType={groupType}
                            changeTeacher={setCurrentTeacher}
                            teacher={currentTeacher as number}
                            strongSubsequence={strongSubsequence}
                            blockHomework={blockHomework}
                            setGroupName={setTextNameField}
                            title={textNameField}
                            duration={duration}
                            changeDuration={handleDuration}
                            isLimited={isLimited}
                            handlerIsLimited={handlerIsLimited}
                            deleteGroup={handleDeleteGroup}
                            isLoading={isLoading}
                            isError={isError}
                            groupLessons={groupLessons}
                            setGroupLessons={setGroupLessons}
                            handleAccessSetting={handleAccessSetting}
                            handlerHomeworkCheck={handlerHomeworkCheck}
                            handlerSubsequence={handlerSubsequenceCheck}
                            handleSave={handleSaveGroupSettings}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
