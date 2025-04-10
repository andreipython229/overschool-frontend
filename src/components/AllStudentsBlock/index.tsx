import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { FiltersButton } from '../FiltersButton'
import { dropDownListFilterStudents, dropDownListFilterStudentsCourses, dropDownListFilterStudentsGroups } from '../../constants/dropDownList'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { Button } from '../common/Button/Button'
import { AllStudentsBlockT } from '../../types/componentsTypes'
import { useBoolean } from '../../customHooks'
import { classesSettingIconPath } from './config/svgIconsPath'
import { Portal } from '../Modal/Portal'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { useFetchSchoolStudentsGroupingQuery, useUpdateSchoolStudentsGroupingMutation } from 'api/schoolService'
import { useLazyFetchStudentsTableHeaderQuery } from '../../api/studentTableService'
import { StudentsSchoolExport } from 'components/StudentsTable/StudentsExport/StudentsSchoolExport'
import { StudentsCroupExport } from 'components/StudentsTable/StudentsExport/StudentsCroupExport'
import { StudentsCourseExport } from 'components/StudentsTable/StudentsExport/StudentCourseExport'
import styles from '../AllStudentsBlock/all_students_block.module.scss'
import { SettingStudentTable } from 'components/Modal'
import { RoleE } from 'enum/roleE'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateDataIcon } from '../../config/commonSvgIconsPath'
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentCourseModal'
import { SearchBar } from '../SearchBar'
import { schoolSelector } from 'selectors'
import { PeopleIconPath } from 'assets/Icons/svgIconPath'
import { removeAllFilters } from 'store/redux/filters/slice'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'
import { chipsVal } from 'components/FiltersButton/Chips/config'

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
    const dispatch = useAppDispatch()

    const { data: groupingStudents, error: groupingStudentsError } = useFetchSchoolStudentsGroupingQuery({ school_id: Number(schoolId) || 0 })
    const [updateSchoolStudentsGroupingMutation] = useUpdateSchoolStudentsGroupingMutation()
    const [isGroupingStudents, setIsGroupingStudents] = useState<boolean | null>(null)

    const [isOpen, { off, on }] = useBoolean()

    const { role } = useAppSelector(state => state.user)
    // const [term, filteredData, handleChangeTerm] = useDebouncedFilter()

    const [searchTerm, setSearchTerm] = useState('')
    const onChangeInput = (value: string) => {
      setSearchTerm(value)
    }

    const clearFilters = () => {
      dispatch(removeAllFilters())
      setSearchTerm('')
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
      if (!isOpen) {
        handleReloadTable && handleReloadTable()
      }
    }, [isOpen])

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
    const [isSettingsOpen, { off: isSettingsOn, on: isSettingsOff, onToggle }] = useBoolean()

    return (
      <div>
        <p className={styles.header_block_text}>{headerText}</p>
        <div style={{ fontSize: '12px', color: '#3B3B3B' }}>
          Количество: <b>{all_students_count}</b>
        </div>
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
        <div style={{ marginBottom: '15px' }}>
          <ChipsComponent filterKey={filterKey} filters={filters} chipsVal={chipsVal['students']} />
        </div>
        <div className={styles.searchBlock}>
          <div className={styles.searchFieldBlock}>
            <SearchBar searchTerm={searchTerm} onChangeInput={onChangeInput} />
            <div className={styles.filter_button}>
              <FiltersButton
                clearFilters={clearFilters}
                filteringCategoriesList={filteringCategoriesList}
                addLastActiveFilter={addLastActiveFilter}
                addMarkFilter={addMarkFilter}
                handleAddAvgFilter={handleAddAvgFilter}
                removeLastActiveStartFilter={removeLastActiveStartFilter}
                removeLastActiveEndFilter={removeLastActiveEndFilter}
                {...filters}
              />
            </div>
          </div>
          <div className={styles.arrow_add_file_block} onClick={() => handleReloadTable && handleReloadTable()}>
            <IconSvg width={36} height={36} viewBoxSize="0 0 36 36" path={updateDataIcon} />
          </div>
          <div className={styles.svgSettingsWrapper}>
            <IconSvg functionOnClick={isSettingsOn} width={30} height={30}  viewBoxSize={'0 0 16 15'} path={classesSettingIconPath} />
          </div>
          {invite && (
            <div className={styles.button_search_block_wButton}>
              {role != RoleE.Teacher && invite ? (
                <Button onClick={off} text={'Добавить учеников'} variant={'newPrimary'}>
                  <IconSvg width={30} height={30} viewBoxSize={'0 0 23 23'} path={PeopleIconPath} />
                </Button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        {isOpen && <Portal closeModal={on}>{courses && <AddStudentModal setShowModal={on} courses={courses?.results} />}</Portal>}
        {isSettingsOpen && (
              <Portal closeModal={isSettingsOff}>
                <SettingStudentTable setShowModal={onToggle} tableId={tableId} />
              </Portal>
          )}
      </div>
    )
  },
)
