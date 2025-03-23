import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { FiltersButton } from '../FiltersButton'
import { dropDownListFilterStudents, dropDownListFilterStudentsCourses, dropDownListFilterStudentsGroups } from '../../constants/dropDownList'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { Button } from '../common/Button/Button'
import { AllStudentsBlockT } from '../../types/componentsTypes'
import { useBoolean } from '../../customHooks'
import { addStudentIconPath, classesSettingIconPath, studentsIconPath, updateSvgNewIconPath } from './config/svgIconsPath'
import { Portal } from '../Modal/Portal'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { useLazyFetchStudentsTableHeaderQuery } from '../../api/studentTableService'
import { useFetchSchoolStudentsGroupingQuery, useUpdateSchoolStudentsGroupingMutation } from 'api/schoolService'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'
import { chipsVal } from 'components/FiltersButton/Chips/config'
// import { useDebouncedFilter } from '../../customHooks/useDebouncedFilter'
import { StudentsSchoolExport } from 'components/StudentsTable/StudentsExport/StudentsSchoolExport'
import { StudentsCroupExport } from 'components/StudentsTable/StudentsExport/StudentsCroupExport'
import { StudentsCourseExport } from 'components/StudentsTable/StudentsExport/StudentCourseExport'
import styles from '../AllStudentsBlock/all_students_block.module.scss'
import { SettingStudentTable } from 'components/Modal'
import { RoleE } from 'enum/roleE'
import { useAppSelector } from 'store/hooks'
import { updateDataIcon } from '../../config/commonSvgIconsPath'
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentCourseModal'
import { SearchBar } from '../SearchBar'
import { schoolSelector } from 'selectors'

export interface FilterItem {
  id: number
  title: string
}

export const AllStudentsBlock: FC<AllStudentsBlockT> = memo(
  ({
    invite,
    headerText,
    all_students_count,
    addLastActiveFilter,
    addMarkFilter,
    removeLastActiveStartFilter,
    removeLastActiveEndFilter,
    handleAddAvgFilter,
    handleReloadTable,
    isGrouping,
    filters,
    filterKey,
    updateStudents,
    tableId,
    ...restFilters
  }) => {
    const { schoolName, schoolId } = useAppSelector(schoolSelector)
    const [coursesPage, setCoursesPage] = useState<number>(1)
    const { data: courses } = useFetchCoursesQuery({ schoolName, page: coursesPage })
    const [isModalOpen, { on, off, onToggle }] = useBoolean()

    const { data: groupingStudents, error: groupingStudentsError } = useFetchSchoolStudentsGroupingQuery({ school_id: Number(schoolId) || 0 })
    const [updateSchoolStudentsGroupingMutation] = useUpdateSchoolStudentsGroupingMutation()
    const [isGroupingStudents, setIsGroupingStudents] = useState<boolean | null>(null)

    const [isAddStudentOpen, { off: addStudentOn, on: addStudentOff }] = useBoolean()

    const { role } = useAppSelector(state => state.user)
    // const [term, filteredData, handleChangeTerm] = useDebouncedFilter()

    const [searchTerm, setSearchTerm] = useState('')
    const onChangeInput = (value: string) => {
      setSearchTerm(value)
    }
    const [fetchTableHeader, { data: tableHeaderData, isSuccess, isFetching: isTableHeaderFetching }] = useLazyFetchStudentsTableHeaderQuery()

    const handleGroupStudents = async (event: ChangeEvent<HTMLInputElement>) => {
      setIsGroupingStudents(!isGroupingStudents)
      try {
        if (isGroupingStudents !== null) {
          await updateSchoolStudentsGroupingMutation({
            school: Number(schoolId) || 0,
            is_students_grouped: event.target.checked,
          })
        }
      } catch (error) {
        console.error('Ошибка при выполнении мутации:', error)
      }

      isGrouping(event.target.checked)
    }

    useEffect(() => {
      if (groupingStudents && !groupingStudentsError) {
        setIsGroupingStudents(groupingStudents.is_students_grouped)
        isGrouping(groupingStudents.is_students_grouped)
      }
    }, [groupingStudents])

    useEffect(() => {
      updateStudents(searchTerm)
    }, [searchTerm])

    useEffect(() => {
      if (!isAddStudentOpen) {
        handleReloadTable && handleReloadTable()
      }
    }, [isAddStudentOpen])
    useEffect(() => {
          if (tableId) {
            fetchTableHeader({ id: tableId, schoolName })
          }
        }, [tableId])

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
        <p className={styles.header_block_text} style={{marginTop: '0', marginBottom: '12px'}}>
          Количество: <span>{all_students_count}</span>
        </p>
        {headerText === 'Все ученики платформы' && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', marginBlockStart: '5px' }}>
            <label htmlFor="groupStudentsCheckbox" style={{ marginRight: '5px', fontSize: '14px' }}>
              Сгруппировать учеников:
            </label>
            <input
              type="checkbox"
              id="groupStudentsCheckbox"
              name="groupStudentsCheckbox"
              style={{
                width: '15px',
                height: '15px',
                marginBlockStart: '2px',
              }}
              onChange={handleGroupStudents}
              checked={isGroupingStudents ?? false}
            />
          </div>
        )}
        {headerText === 'Все ученики платформы' && <StudentsSchoolExport />}
        {headerText === 'Все ученики группы' && <StudentsCroupExport />}
        {headerText === 'Все ученики курса' && <StudentsCourseExport />}
        <div>
          <ChipsComponent filterKey={filterKey} filters={filters} chipsVal={chipsVal['students']} />
        </div>
        <div className={styles.search_container}>
          <SearchBar searchTerm={searchTerm} onChangeInput={onChangeInput}>
            <div className={styles.filters_dropdown}>
              <FiltersButton
                filteringCategoriesList={filteringCategoriesList}
                addLastActiveFilter={addLastActiveFilter}
                addMarkFilter={addMarkFilter}
                handleAddAvgFilter={handleAddAvgFilter}
                removeLastActiveStartFilter={removeLastActiveStartFilter}
                removeLastActiveEndFilter={removeLastActiveEndFilter}
                {...filters}
              />
            </div>
          </SearchBar>
          <div className={styles.header_block_text_search} style={{display: 'flex', alignItems: 'center'}}>
            <div className={styles.arrow_add_file_block} onClick={() => handleReloadTable && handleReloadTable()}>
              <IconSvg width={60} height={54} viewBoxSize="0 0 60 54" path={updateSvgNewIconPath} />
            </div>
          </div>
          <div className={invite ? styles.button_search_block_wButton : styles.button_search_block} style={{display: 'flex', alignItems: 'center'}}>
            {role != RoleE.Teacher && invite ? (
              <Button onClick={addStudentOn} text={'Добавить учеников'} variant={'primary'} className={styles.add_students_btn}>
                <IconSvg width={15} height={15} viewBoxSize={'0 0 15 15'} path={studentsIconPath} styles={{ marginRight: '0.2em' }} />
              </Button>
            ) : (
              null
            )}
          </div>
          {isAddStudentOpen && <Portal closeModal={addStudentOn}>{courses && <AddStudentModal setShowModal={addStudentOff} courses={courses?.results} />}</Portal>}
          <div style={{display: 'flex', alignItems: 'center'}}>
              <button className={styles.svgSettingsWrapper}>
                <IconSvg functionOnClick={off} width={20} height={20} viewBoxSize={'0 0 16 15'} path={classesSettingIconPath} />
              </button>
          </div>
          {isModalOpen && (
              <Portal closeModal={on}>
                <SettingStudentTable setShowModal={onToggle} tableId={tableId} />
              </Portal>
          )}
        </div>
      </div>
    )
  },
)
