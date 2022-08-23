import React, { ChangeEvent, FC } from 'react'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { StudentLogs } from 'enum/pathE'
import { Link } from 'react-router-dom'
import { createGroupSvgIcon, cross } from '../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../../customHooks/useShowModal'

import styles from '../studentsLog.module.scss'

type CreateGroupModalPropsT = {
  setShowModal: (arg: boolean) => void
  addNameGroup: (e: ChangeEvent<HTMLInputElement>) => void
  nameGroup: string
}

export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({
  setShowModal,
  addNameGroup,
  nameGroup,
}) => {
  const handleClose = () => {
    setShowModal(false)
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '485px' }} className={styles.container}>
        <div onClick={handleClose} className={styles.container_closed}>
          <IconSvg
            width={14}
            height={14}
            d={cross}
            stroke={'#E0DCED'}
            strokeWidth={'2'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            viewBoxSize="0 0 14 14"
          />
        </div>
        <div className={styles.addGroup}>
          <div className={styles.container_header}>
            <IconSvg
              width={60}
              height={49}
              d={createGroupSvgIcon.humanSvg}
              d2={createGroupSvgIcon.plusSvg}
              viewBoxSize="0 0 60 49"
              fill={'#BA75FF'}
            />
            <span className={styles.container_header_title}>Создание группы</span>
          </div>
          <div className={styles.addGroup_input}>
            <span>Введите название группы:</span>
            <Input name={'group'} type={'text'} value={nameGroup} onChange={e => addNameGroup(e)} />
          </div>
          <div className={styles.addGroup_btn}>
            <Link to={StudentLogs.GroupSettings}>
              <Button
                disabled={nameGroup.length === 1}
                variant={'primary'}
                onClick={handleClose}
                text={'Создать группу'}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
