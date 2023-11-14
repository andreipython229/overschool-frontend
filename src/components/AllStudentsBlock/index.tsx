import { FC, memo, useEffect, useState, } from 'react'

import { FiltersButton } from '../FiltersButton'
import { dropDownListFilterStudents } from '../../constants/dropDownList'
import { Input } from '../common/Input/Input/Input'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { Button } from '../common/Button/Button'
import { AllStudentsBlockT } from '../../types/componentsTypes'
import {useBoolean, useDebouncedFilter} from '../../customHooks'
import {searchIconPath, addStudentIconPath, updateArrPath} from './config/svgIconsPath'
import { Portal } from '../Modal/Portal'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'
import { chipsVal } from 'components/FiltersButton/Chips/config'
// import { useDebouncedFilter } from '../../customHooks/useDebouncedFilter'

import styles from '../AllStudentsBlock/all_students_block.module.scss'

import {RoleE} from 'enum/roleE'
import { useAppSelector } from 'store/hooks'
import {updateDataIcon} from "../../config/commonSvgIconsPath";
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentCourseModal'

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
    const { data: courses } = useFetchCoursesQuery()

    const [isOpen, { off, on }] = useBoolean()

    const { role } = useAppSelector(state => state.user)
    // const [term, filteredData, handleChangeTerm] = useDebouncedFilter()

    const [searchTerm, setSearchTerm] = useState('');
    const onChangeInput = (value: string) => {
            setSearchTerm(value)
            updateStudents(value)
    }

    return (
      <div>
        <p className={styles.header_block_text}>{headerText}</p>
        <div style={{ marginBottom: '15px' }}>
          <ChipsComponent filterKey={filterKey} filters={filters} chipsVal={chipsVal['students']} />
        </div>
        <div className={invite? styles.button_search_block_wButton: styles.button_search_block}>
          <FiltersButton
            filteringCategoriesList={dropDownListFilterStudents}
            addLastActiveFilter={addLastActiveFilter}
            addMarkFilter={addMarkFilter}
            handleAddAvgFilter={handleAddAvgFilter}
            removeLastActiveStartFilter={removeLastActiveStartFilter}
            removeLastActiveEndFilter={removeLastActiveEndFilter}
            {...restFilters}
          />
          <Input name="" type="search" value={searchTerm} onChange={(e) => onChangeInput(e.target.value)} placeholder="Поиск по курсам" style={{width: '100%'}}>
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>
          <div className={styles.arrow_add_file_block} onClick={() => handleReloadTable && handleReloadTable()}>
            <IconSvg width={19} height={23} viewBoxSize="0 0 30 30" path={updateDataIcon} />
          </div>
            {role != RoleE.Teacher && invite ? (
          <Button onClick={off} className={styles.add_students_btn} text={'Добавить учеников'} variant={'primary'}>
            <IconSvg width={16} height={16} viewBoxSize={'0 0 16 16'} path={addStudentIconPath} />
          </Button>) : <></>}
        </div>
        {isOpen && <Portal closeModal={on}>{courses && <AddStudentModal setShowModal={on} courses={courses?.results} />}</Portal>}
      </div>
    )
  },
)
