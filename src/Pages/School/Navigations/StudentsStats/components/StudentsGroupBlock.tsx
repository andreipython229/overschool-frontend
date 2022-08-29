import React, { FC } from 'react'
import { StudentGroup } from 'Pages/School/Navigations/StudentsStats/components/StudentsCountGroup'
import { createGroupLittleSvgIcon } from '../../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../../../components/common/IconSvg/IconSvg'
import { useAppDispatch } from '../../../../../store/hooks'
import { showModal } from '../../../../../store/redux/modal/slice'

import styles from 'Pages/School/Navigations/StudentsStats/studentsStats.module.scss'

type StudentsGroupBlockPropsT = {
  showGroupModal: () => void
}

export const StudentsGroupBlock: FC<StudentsGroupBlockPropsT> = ({ showGroupModal }) => {
  const dispatch = useAppDispatch()

  const handleShowGroupModal = () => {
    showGroupModal()
    dispatch(showModal(true))
  }

  return (
    <section className={styles.students_group}>
      <div className={styles.students_group_header}>
        <h4 className={styles.students_group_header_title}>Группы учеников</h4>
        <div onClick={handleShowGroupModal} className={styles.students_group_header_add_group_btn}>
          <IconSvg
            width={22}
            height={18}
            d={createGroupLittleSvgIcon.humanSvg}
            d2={createGroupLittleSvgIcon.plusSvg}
            viewBoxSize="0 0 22 18"
            fill={'#BA75FF'}
          />
          Создать новую группу
        </div>
      </div>
      <div className={styles.students_group_content_wrapper}>
        <StudentGroup title="Сотрудники" countStudent="2 ученика" />
        <StudentGroup title="Группа Валерия Б.." countStudent="51 ученик" />
        <div className={styles.students_group_content_wrapper_show_all_groups_btn}>
          <IconSvg
            width={15}
            height={9}
            d={'M1.25 1.15625L7.5 7.40625L13.75 1.15625'}
            viewBoxSize="0 0 15 9"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <span>Показать все группы</span>
        </div>
      </div>
    </section>
  )
}
