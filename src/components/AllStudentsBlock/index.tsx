import { FC, memo, useEffect, useState } from 'react'

import { FiltersButton } from '../FiltersButton'
import { dropDownListFilterStudents, dropDownListFilterStudentsCourses, dropDownListFilterStudentsGroups } from '../../constants/dropDownList'
import { Input } from '../common/Input/Input/Input'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { Button } from '../common/Button/Button'
import { AllStudentsBlockT } from '../../types/componentsTypes'
import { useBoolean, useDebouncedFilter } from '../../customHooks'
import { searchIconPath, addStudentIconPath, updateArrPath } from './config/svgIconsPath'
import { Portal } from '../Modal/Portal'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'
import { chipsVal } from 'components/FiltersButton/Chips/config'
// import { useDebouncedFilter } from '../../customHooks/useDebouncedFilter'

import styles from '../AllStudentsBlock/all_students_block.module.scss'

import { RoleE } from 'enum/roleE'
import { useAppSelector } from 'store/hooks'
import { updateDataIcon } from '../../config/commonSvgIconsPath'
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentCourseModal'


export interface FilterItem {
  id: number
  title: string
}

export const AllStudentsBlock: FC<AllStudentsBlockT> = memo(
  ({
    invite,
    headerText,
    addLastActiveFilter,
    addMarkFilter,
    removeLastActiveStartFilter,
    removeLastActiveEndFilter,
    handleAddAvgFilter,
    handleReloadTable,
    filters,
    filterKey,
    updateStudents,
    ...restFilters
  }) => {
    const schoolName = window.location.href.split('/')[4]
    const { data: courses } = useFetchCoursesQuery(schoolName)

    const [isOpen, { off, on }] = useBoolean()

    const { role } = useAppSelector(state => state.user)
    // const [term, filteredData, handleChangeTerm] = useDebouncedFilter()

    const [searchTerm, setSearchTerm] = useState('')
    const onChangeInput = (value: string) => {
      setSearchTerm(value)
      updateStudents(value)
    }

    useEffect(() => {
      if (!isOpen) {
        handleReloadTable && handleReloadTable()
      }
    }, [isOpen])

    let filteringCategoriesList: FilterItem[] = []
    switch (filterKey) {
      case 'studentsPerSchool':
        filteringCategoriesList = dropDownListFilterStudents
        break
      case 'studentsPerCourse':
        filteringCategoriesList = dropDownListFilterStudentsCourses
        break
      case 'studentsPerGroup':
        filteringCategoriesList = dropDownListFilterStudentsGroups
        break
      default:
        break
    }

    return (
      <div>
        <p className={styles.header_block_text}>{headerText}</p>
        <div style={{ marginBottom: '15px' }}>
          <ChipsComponent filterKey={filterKey} filters={filters} chipsVal={chipsVal['students']} />
        </div>
        <div className={invite ? styles.button_search_block_wButton : styles.button_search_block}>
          <FiltersButton
            filteringCategoriesList={filteringCategoriesList}
            addLastActiveFilter={addLastActiveFilter}
            addMarkFilter={addMarkFilter}
            handleAddAvgFilter={handleAddAvgFilter}
            removeLastActiveStartFilter={removeLastActiveStartFilter}
            removeLastActiveEndFilter={removeLastActiveEndFilter}
            {...restFilters}
          />
          <div className={styles.header_block_text_search}>
            <Input
              name=""
              type="search"
              value={searchTerm}
              onChange={e => onChangeInput(e.target.value)}
              placeholder="Поиск по курсам"
              style={{ width: '100%' }}
            >
              <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
            </Input>
            <div className={styles.arrow_add_file_block} onClick={() => handleReloadTable && handleReloadTable()}>
              <IconSvg width={19} height={23} viewBoxSize="0 0 30 30" path={updateDataIcon} />
            </div>
          </div>
          {role != RoleE.Teacher && invite ? (
            <Button onClick={off} className={styles.add_students_btn} text={'Добавить учеников'} variant={'primary'}>
              <IconSvg width={30} height={30} viewBoxSize={'0 0 16 16'} path={addStudentIconPath} styles={{ marginRight: '0.2em' }} />
            </Button>
          ) : (
            <></>
          )}
        </div>
        {isOpen && <Portal closeModal={on}>{courses && <AddStudentModal setShowModal={on} courses={courses?.results} />}</Portal>}
      </div>
    )
  },
)
