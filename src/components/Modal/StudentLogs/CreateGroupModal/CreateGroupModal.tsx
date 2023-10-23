import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Select from 'react-select'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { createGroupIconPath } from '../config/svgIconsPath'
import { useCreateStudentsGroupMutation, useFetchStudentsGroupQuery } from '../../../../api/studentsGroupService'
import { CreateGroupModalPropsT } from '../../ModalTypes'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useFetchAllUsersQuery } from '../../../../api/allUsersList'
import styles from '../studentsLog.module.scss'


export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({ setShowModal, courseId }) => {
  const [groupName, setGroupName] = useState<string>('')
  const [teacher_id, setTeacherId] = useState<string>('')
  const [studentsList, setStudentsList] = useState<any>([])
  const { data: userList } = useFetchAllUsersQuery()
  const { data: allGroups } = useFetchStudentsGroupQuery()
  const [createStudentsGroup, { isLoading }] = useCreateStudentsGroupMutation()

  const teacherList = userList ? userList.filter((teacher: any) => teacher.role === 'Teacher') : []
  const studentList = userList ? userList.filter((student: any) => student.role === 'Student') : []
  const filteredGroupList = allGroups?.results.filter((group) => group.course_id === +courseId)
  const studentsGroups = filteredGroupList?.map((user: any) => user.students)

  const studentsListWithoutGroup = studentList.filter((num: any) => {
    return !new Set(studentsGroups?.flat()).has(num.id)
  })

  const handleTeacher = (teacher_id: any) => {
    setTeacherId(teacher_id.id)
  }

  const handleStudents = (studentsList: any) => {
    setStudentsList([studentsList.map((object: any) => object['id'])])
  }

  const onChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

  const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (courseId) {
      const groupToCreate = {
        name: groupName,
        course_id: +courseId,
        students: studentsList[0] || [],
        teacher_id: +teacher_id,
      }
      await createStudentsGroup(groupToCreate)
    }

    setShowModal(false)
  }

  return (
    <form onSubmit={handleCreateGroup} style={{ width: '485px' }} className={styles.container}>
      <div onClick={() => setShowModal(false)} className={styles.container_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.addGroup}>
        <div className={styles.container_header}>
          <IconSvg width={60} height={49} viewBoxSize="0 0 60 49" path={createGroupIconPath} />
          <span className={styles.container_header_title}>Создание группы</span>
        </div>
        <div className={styles.addGroup_input}>
          <span>Введите название группы:</span>
          <Input name={'group'} type={'text'} value={groupName} onChange={onChangeGroupName} />
          <span>Выбирите учителя из списка:</span>
          <Select
            required
            onChange={handleTeacher}
            options={teacherList}
            getOptionLabel={(user: any) => user.username}
            getOptionValue={(user: any) => user.id}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder={''}
          />
          <span>Выбирите учеников:</span>
          <Select
            required={false}
            onChange={handleStudents}
            options={studentsListWithoutGroup}
            isMulti
            getOptionLabel={(user: any) => user.username}
            getOptionValue={(user: any) => user.id}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder={''}
          />
        </div>
        <div className={styles.addGroup_btn}>
          <Button
            type={'submit'}
            disabled={!groupName || isLoading}
            variant={!groupName || isLoading ? 'disabled' : 'primary'}
            text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать группу'}
          />
        </div>
      </div>
    </form>
  )
}
