import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import Select from 'react-select'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { CheckboxBall } from 'components/common/CheckboxBall'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { createGroupIconPath } from '../config/svgIconsPath'
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
import {PeopleIconPath} from "../../../../assets/Icons/svgIconPath";
import {Radio} from "../../../common/Radio/Radio";
import {penIconPath} from "../../../../Pages/Settings/Main/iconComponents";

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
  const [role, setRole] = useState<string>('')

  const handleChangeRole = (role: string) => {
    setRole(role)
  }

  useEffect(() => {
    if (schoolName) {
      getUsers({schoolName: schoolName, role: "staff", size: 100});
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
    if (role==="WithoutMentor") {
      setTeacherId('')
    }
  }, [role])

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
        type: role === "WithMentor" ? 'WITH_TEACHER' : 'WITHOUT_TEACHER',
        training_duration: 0,
        certificate: false,
      }
      if (role==="WithoutMentor") {
        await createGroupWithoutTeacher({ studentsGroupInfo: groupToCreate, schoolName })
      } else {
        Object.assign(groupToCreate, { teacher_id: +teacher_id })
        await createStudentsGroup({ studentsGroupInfo: groupToCreate, schoolName })
      }
    }
    setShowModal(false)
  }
  return (
    <form onSubmit={handleCreateGroup} className={styles.container}>
      <div onClick={() => setShowModal(false)} className={styles.container_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <IconSvg styles={{marginBottom: "20px"}} viewBoxSize="0 0 25 20" height={50} width={50} path={PeopleIconPath} />
      <div className={styles.addGroup}>
        <div className={styles.container_header}>
          <span className={styles.container_header_title}>Создание новой группы</span>
        </div>
        <div className={styles.addGroup_input}>
          <span>Название группы:</span>
          <div style={{position: "relative", width: "100%"}}>
          <Input name={'group'} type={'text'} value={groupName} placeholder="Введите название группы" onChange={onChangeGroupName}/>
            <div className={styles.addGroup_input_svg}>
            <IconSvg width={24} height={24}viewBoxSize={'0 0 24 24'} path={penIconPath}/>
              </div>
            </div>
          <div style={{display: "flex"}}>
          <div className={styles.addGroup_input_radio_btn}>
            <div style={{marginTop: "10px"}}>
            <Radio func={handleChangeRole} title="С ментором" id="WithMentor" name="role"/>
              </div>
            <div>
            <Radio func={handleChangeRole} title="Без ментора" id="WithoutMentor" name="role"/>
            </div>
          </div>
            </div>

          {role==="WithoutMentor" &&
            <div className={styles.addGroup_description}>
              Такой тип группы предполагает отсутствие ментора и автоматическое принятие домашних заданий без проверки
            </div>}
          {role === "WithMentor" ? (
            <div>
              <Select
                required
                onChange={handleTeacher}
                options={teachers}
                getOptionLabel={(user: any) => user.email}
                getOptionValue={(user: any) => user.id}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder={'Выбрать ментора'}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.addGroup_btn}>
          <Button
            type={'submit'}
            disabled={!groupName || isLoading || isLoadingNoT || (role !== '' && !teacher_id)}
            variant={!groupName || isLoading || isLoadingNoT || (role !== '' && !teacher_id) ? 'newPrimary' : 'newPrimary'}
            text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать группу'}
          />
        </div>
      </div>
    </form>
  )
}
