import { ChangeEvent, FC, FormEvent, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { createGroupIconPath } from '../config/svgIconsPath'
import { useCreateStudentsGroupMutation } from '../../../../api/studentsGroupService'
import { CreateGroupModalPropsT } from '../../ModalTypes'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../studentsLog.module.scss'

export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({ setShowModal, courseId }) => {
  const [groupName, setGroupName] = useState<string>('')

  const [createStudentsGroup, { isLoading }] = useCreateStudentsGroupMutation()

  const onChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

  const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (courseId) {
      const groupToCreate = {
        name: groupName,
        course_id: +courseId,
        students: [1],
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
