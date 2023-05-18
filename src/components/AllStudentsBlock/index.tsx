import { FC, memo } from 'react'

import { FiltersButton } from '../FiltersButton'
import { dropDownListFilterStudents } from '../../constants/dropDownList'
import { Input } from '../common/Input/Input/Input'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { Button } from '../common/Button/Button'
import { AddStudentModal } from '../Modal/StudentLogs/AddStudentModal/AddStudentModal'
import { AllStudentsBlockT } from '../../types/componentsTypes'
import { useBoolean } from '../../customHooks/useBoolean'
import { searchIconPath, addStudentIconPath, updateArrPath } from './config/svgIconsPath'
import { Portal } from '../Modal/Portal'
import { useFetchCoursesQuery } from '../../api/coursesServices'
// import { useDebouncedFilter } from '../../customHooks/useDebouncedFilter'

import styles from '../AllStudentsBlock/all_students_block.module.scss'

export const AllStudentsBlock: FC<AllStudentsBlockT> = memo(({ headerText }) => {
  const { data: courses } = useFetchCoursesQuery()

  const [isOpen, { off, on }] = useBoolean()

  // const [term, filteredData, handleChangeTerm] = useDebouncedFilter()

  return (
    <div>
      <p className={styles.header_block_text}>{headerText}</p>
      <div className={styles.button_search_block}>
        <FiltersButton filteringCategoriesList={dropDownListFilterStudents} />
        <Input name="" type="search" value={''} onChange={() => console.log('заглушка')} placeholder="Поиск по курсам">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
        <div className={styles.arrow_add_file_block}>
          <IconSvg width={13} height={17} viewBoxSize="0 0 13 17" path={updateArrPath} />
        </div>
        <Button onClick={off} className={styles.add_students_btn} text={'Добавить учеников'} variant={'primary'}>
          <IconSvg width={16} height={16} viewBoxSize={'0 0 16 16'} path={addStudentIconPath} />
        </Button>
      </div>
      {isOpen && <Portal closeModal={on}>{courses && <AddStudentModal setShowModal={on} courses={courses?.results} />}</Portal>}
    </div>
  )
})
