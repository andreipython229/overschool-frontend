import { ChangeEvent, FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { StudentLogs } from 'enum/pathE'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../../customHooks/useShowModal'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { createGroupIconPath } from '../config/svgIconsPath'
import { useCreateStudentsGroupMutation } from '../../../../api/studentsGroupService'

import styles from '../studentsLog.module.scss'
import { CreateGroupModalPropsT } from '../../ModalTypes'


export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({ setShowModal, courseId }) => {
  const [groupName, setGroupName] = useState<string>('')

  const [createStudentsGroup] = useCreateStudentsGroupMutation()

  const onChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

  const handleCreateGroup = () => {
    const groupToCreate = {
      name: groupName,
      course_id: courseId,
      students: [1],
    }
    createStudentsGroup(groupToCreate)
    setShowModal(false)
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '485px' }} className={styles.container}>
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
          </div>
          <div className={styles.addGroup_btn}>
            <Link to={StudentLogs.GroupSettings}>
              <Button disabled={groupName.length <= 1} variant={'primary'} onClick={handleCreateGroup} text={'Создать группу'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
