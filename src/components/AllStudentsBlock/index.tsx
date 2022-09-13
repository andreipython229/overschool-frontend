import React, { ChangeEvent, FC, memo, useState } from 'react'
import { FiltersButton } from '../FiltersButton'
import { dropDownListFilterStudents } from '../../constants/dropDownList'
import { Input } from '../common/Input/Input/Input'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { addStudentSvgIconButton, classesSettingSvgIcon, searchSvgIcon } from '../../constants/iconSvgConstants'
import { Button } from '../common/Button/Button'
import { AddStudentModal } from '../Modal/StudentLogs/AddStudentModal/AddStudentModal'
import { AllStudentsBlockT } from '../componentsTypes'
import { useBoolean } from '../../customHooks/useBoolean'

import styles from '../AllStudentsBlock/all_students_block.module.scss'

export const AllStudentsBlock: FC<AllStudentsBlockT> = memo(({ headerText }) => {
  const [isOpen, { onToggle, on }] = useBoolean()

  const [emailStudent, setEmailStudent] = useState<string>('')

  const handleInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailStudent(event.target.value)
  }

  return (
    <div>
      {isOpen && <AddStudentModal onChangeEmail={handleInputEmail} studentEmail={emailStudent} setShowModal={on} />}
      <h4 className={styles.header_block_text}>{headerText}</h4>
      <div className={styles.button_search_block}>
        <FiltersButton filteringCategoriesList={dropDownListFilterStudents} />
        <Input name="" type="search" value={''} onChange={() => console.log('заглушка')} placeholder="Поиск по курсам">
          <IconSvg
            width={20}
            height={20}
            viewBoxSize="0 0 20 20"
            d={searchSvgIcon}
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Input>
        <div className={styles.arrow_add_file_block}>
          <IconSvg width={13} height={17} d={classesSettingSvgIcon.arrowUpdate} viewBoxSize="0 0 13 17" fill={'#BA75FF'} />
        </div>
        <Button onClick={onToggle} className={styles.add_students_btn} text={'Добавить учеников'} variant={'primary'}>
          <IconSvg width={16} height={16} viewBoxSize={'0 0 16 16'} fill={'#C0B3F9'} d={addStudentSvgIconButton} />
        </Button>
      </div>
    </div>
  )
})
