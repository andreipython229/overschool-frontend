import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import Select from 'react-select'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { CheckboxBall } from 'components/common/CheckboxBall'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath, peopleIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath, createGroupIconPath } from '../config/svgIconsPath'
import {
  useCreateStudentsGroupMutation,
  useCreateGroupWithoutTeacherMutation,
  useLazyFetchStudentsGroupQuery,
} from '../../../../api/studentsGroupService'
import { CreateGroupModalPropsT } from '../../ModalTypes'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useLazyFetchAllUsersQuery } from '../../../../api/allUsersList'
import styles from '../studentsLog.module.scss'
import { useBoolean } from '../../../../customHooks'
import { studentsGroupsT } from 'types/studentsGroup'
import { PeopleIconPath } from 'assets/Icons/svgIconPath'
import SelectInput from 'components/common/SelectInput/SelectInput'

export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({ setShowModal, courseId }) => {
  const schoolName = window.location.href.split('/')[4]
  const [groupName, setGroupName] = useState<string>('')
  const [teacher_id, setTeacherId] = useState<string>('')
  const [withTeacher, { onToggle: toggleWithTeacher }] = useBoolean(true)
  const [getUsers, { data: userList }] = useLazyFetchAllUsersQuery()
  const [teachers, setTeachers] = useState<any>([])
  const [getGroups, { data: allGroups }] = useLazyFetchStudentsGroupQuery()
  const [createStudentsGroup, { isLoading }] = useCreateStudentsGroupMutation()
  const [createGroupWithoutTeacher, { isLoading: isLoadingNoT }] = useCreateGroupWithoutTeacherMutation()

  useEffect(() => {
    if (schoolName) {
      getUsers({ schoolName: schoolName, role: 'staff', size: 100 })
      getGroups(schoolName)
    }
  }, [schoolName])

  useEffect(() => {
    if (userList && allGroups) {
      const allTeachers = userList.results.filter((user: any) => user.role === 'Teacher')
      const filteredGroupList = allGroups.results.filter(group => group.course_id === +courseId)
      const teachersGroups = filteredGroupList?.map((group: any) => group.teacher_id)
      const availableTeachers = allTeachers.filter((teacher: any) => {
        return !new Set(teachersGroups).has(teacher.id)
      })
      setTeachers(availableTeachers)
    }
  }, [userList, allGroups])

  useEffect(() => {
    if (!withTeacher) {
      setTeacherId('')
    }
  }, [withTeacher])

  const handleTeacher = (teacher: any) => {
    setTeacherId(teacher.id)
  }

  const onChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

  const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (courseId) {
      const groupToCreate: studentsGroupsT = {
        name: groupName,
        course_id: +courseId,
        students: [],
        type: withTeacher ? 'WITH_TEACHER' : 'WITHOUT_TEACHER',
        training_duration: 0,
        certificate: false,
      }
      if (!withTeacher) {
        await createGroupWithoutTeacher({ studentsGroupInfo: groupToCreate, schoolName })
      } else {
        Object.assign(groupToCreate, { teacher_id: +teacher_id })
        await createStudentsGroup({ studentsGroupInfo: groupToCreate, schoolName })
      }
    }
    setShowModal(false)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <form onSubmit={handleCreateGroup} className={styles.container}>
      <div onClick={handleClose} className={styles.container_closed}>
        <IconSvg width={50} height={50} viewBoxSize="0 0 58 58" path={crossIconPath} />
      </div>
      <div className={styles.addStudent}>
        <div className={styles.container_header}>
          <IconSvg width={100} height={100} viewBoxSize="0 0 24 24" path={peopleIconPath} />
          <span className={styles.container_header_title}>Создание новой группы</span>
        </div>
        <div className={styles.addGroup_input}>
          <span>Введите название группы:</span>
          <Input name={'group'} type={'text'} value={groupName} onChange={onChangeGroupName} />
          <div className={styles.addGroup_input_check}>
            <CheckboxBall isChecked={withTeacher} toggleChecked={toggleWithTeacher} />
            <span className={styles.addGroup_input_check_span} style={{ marginTop: '1%' }}>
              С ментором
            </span>
          </div>
          {!withTeacher && (
            <div className={styles.addGroup_description}>
              Такой тип группы предполагает отсутствие ментора и автоматическое принятие домашних заданий без проверки
            </div>
          )}
          {withTeacher ? (
            <div style={{ position: 'relative', zIndex: '20' }}>
              <span>Выберите ментора из списка:</span>
              <Select
                required
                onChange={handleTeacher}
                options={teachers}
                getOptionLabel={(user: any) => user.email}
                getOptionValue={(user: any) => user.id}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder={''}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.addGroup_btn}>
          <Button
            type={'submit'}
            disabled={!groupName || isLoading || isLoadingNoT || (withTeacher && !teacher_id)}
            variant={!groupName || isLoading || isLoadingNoT || (withTeacher && !teacher_id) ? 'newDisabled' : 'newPrimary'}
            text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать группу'}
          />
        </div>
      </div>
    </form>
  )
}
