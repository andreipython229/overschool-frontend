import {FC, useEffect, useState} from 'react'

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

export const SettingsGroupModal: FC<SettingsGroupModalPropsT> = ({closeModal, groupId, courseId}) => {
    const [blockHomework, setBlockHomework] = useState<boolean>(false)
    const [strongSubsequence, setStrongSubsequence] = useState<boolean>(false)
    const [textNameField, setTextNameField] = useState<string>('')
    const [groupType, setGroupType] = useState<string>('')
    const [currentTeacher, setCurrentTeacher] = useState<number>()
    const {data, isSuccess} = useFetchStudentGroupQuery(`${groupId}`)
    const [deleteStudentsGroup, {isLoading, isError}] = useDeleteStudentsGroupMutation()
    const [patchGroup] = usePatchStudentsGroupMutation()
    const [patchGroupWithoutTeacher] = usePatchGroupWithoutTeacherMutation()

    useEffect(() => {
        setBlockHomework(Boolean(data?.group_settings?.task_submission_lock))
        setStrongSubsequence(Boolean(data?.group_settings?.strict_task_order))
        setTextNameField(String(data?.name))
        setGroupType(String(data?.type))
        data?.teacher_id && setCurrentTeacher(Number(data?.teacher_id))
    }, [isSuccess])

    const handlerHomeworkCheck = () => {
        setBlockHomework(!blockHomework)
    }
    const handlerSubsequenceCheck = () => {
        setStrongSubsequence(!strongSubsequence)
    }

    const handleDeleteGroup = async () => {
        await deleteStudentsGroup(groupId)
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
        }
        if (groupType === "WITH_TEACHER") {
            Object.assign(dataToSend, {teacher_id: currentTeacher})
            await patchGroup({id: groupId, data: dataToSend}).unwrap().catch(error => console.log(error.data))
        } else {
            await patchGroupWithoutTeacher({id: groupId, data: dataToSend}).unwrap().catch(error => console.log(error.data))
        }
        closeModal()
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
                            deleteGroup={handleDeleteGroup}
                            isLoading={isLoading}
                            isError={isError}
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
