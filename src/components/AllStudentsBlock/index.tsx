import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react'

import {FiltersButton} from '../FiltersButton'
import {
    dropDownListFilterStudents,
    dropDownListFilterStudentsCourses,
    dropDownListFilterStudentsGroups
} from '../../constants/dropDownList'
import {IconSvg} from '../common/IconSvg/IconSvg'
import {Button} from '../common/Button/Button'
import {AllStudentsBlockT} from '../../types/componentsTypes'
import {useBoolean} from '../../customHooks'
import {Portal} from '../Modal/Portal'
import {useFetchCoursesQuery} from '../../api/coursesServices'
import {useFetchSchoolStudentsGroupingQuery, useUpdateSchoolStudentsGroupingMutation} from 'api/schoolService'
import {ChipsComponent} from 'components/FiltersButton/Chips/chips'
import {chipsVal} from 'components/FiltersButton/Chips/config'
import {StudentsSchoolExport} from 'components/StudentsTable/StudentsExport/StudentsSchoolExport'
import {StudentsCroupExport} from 'components/StudentsTable/StudentsExport/StudentsCroupExport'
import {StudentsCourseExport} from 'components/StudentsTable/StudentsExport/StudentCourseExport'
import styles from '../AllStudentsBlock/all_students_block.module.scss'

import {RoleE} from 'enum/roleE'
import {useAppSelector} from 'store/hooks'
import {updateDataIcon} from '../../config/commonSvgIconsPath'
import {AddStudentModal} from 'components/Modal/StudentLogs/AddStudentModal/AddStudentCourseModal'
import {SearchBar} from "../SearchBar";
import {PeopleIconSvg} from "../StudentGroupMiniCard/assets/iconsComponents";
import {SettingsIconPath} from "../../assets/Icons/svgIconPath";
import {SettingStudentTable} from "../Modal";



export interface FilterItem {
    id: number
    title: string
}

export const AllStudentsBlock: FC<AllStudentsBlockT> = memo(
    ({
         tableId,
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
         ...restFilters
     }) => {
        const schoolName = window.location.href.split('/')[4]
        const schoolId = localStorage.getItem('school_id');
        const {data: courses} = useFetchCoursesQuery(schoolName)


        const {
            data: groupingStudents,
            error: groupingStudentsError
        } = useFetchSchoolStudentsGroupingQuery({school_id: Number(schoolId) || 0});
        const [updateSchoolStudentsGroupingMutation] = useUpdateSchoolStudentsGroupingMutation();
        const [isGroupingStudents, setIsGroupingStudents] = useState<boolean | null>(null);

        const [isOpen, {off, on}] = useBoolean()

        const {role} = useAppSelector(state => state.user)
        // const [term, filteredData, handleChangeTerm] = useDebouncedFilter()

        const [searchTerm, setSearchTerm] = useState('')

        const [isModalOpen, { on: SettingTableModal, off: SettingTableModalOff, onToggle: toggleSettingTableModal }] = useBoolean()

        const onChangeInput = (value: string) => {
            setSearchTerm(value)
        }

        const handleGroupStudents = async (event: ChangeEvent<HTMLInputElement>) => {
            setIsGroupingStudents(!isGroupingStudents);
            try {
                if (isGroupingStudents !== null) {
                    await updateSchoolStudentsGroupingMutation({
                        school: Number(schoolId) || 0,
                        is_students_grouped: event.target.checked
                    });
                }
            } catch (error) {
                console.error('Ошибка при выполнении мутации:', error);
            }

            isGrouping(event.target.checked)
        };

        useEffect(() => {
            if (groupingStudents && !groupingStudentsError) {
                setIsGroupingStudents(groupingStudents.is_students_grouped);
                isGrouping(groupingStudents.is_students_grouped)
            }
        }, [groupingStudents]);

        useEffect(() => {
            updateStudents(searchTerm)
        }, [searchTerm]);

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
                <div style={{fontSize: "12px", color: "#3B3B3B"}}>Количество: <b>{all_students_count}</b></div>
                {headerText === 'Все ученики платформы' && <StudentsSchoolExport/>}
                {headerText === 'Все ученики группы' && <StudentsCroupExport/>}
                {headerText === 'Все ученики курса' && <StudentsCourseExport/>}
                <div className={styles.header_block_text_chips_components}>
                    <ChipsComponent filterKey={filterKey} filters={filters} chipsVal={chipsVal['students']}/>
                </div>
                        <div className={styles.header_block_text_add_student_btn_line}>
                <div className={invite ? styles.button_search_block_wButton : styles.button_search_block}>
                    {role != RoleE.Teacher && invite ? (
                        <Button onClick={off} className={styles.add_students_btn} style={{'height': '40px'}} text={'Добавить учеников'}
                                variant={'newPrimary'}>
                            <PeopleIconSvg/>
                        </Button>
                    ) : (
                        <></>
                    )}
                        <div><FiltersButton
                    filteringCategoriesList={filteringCategoriesList}
                    addLastActiveFilter={addLastActiveFilter}
                    addMarkFilter={addMarkFilter}
                    handleAddAvgFilter={handleAddAvgFilter}
                    removeLastActiveStartFilter={removeLastActiveStartFilter}
                    removeLastActiveEndFilter={removeLastActiveEndFilter}
                    {...filters}
                /></div>
                    </div>
                            </div>

                <div className={styles.header_block_text_search_line}>
                <SearchBar
                    searchTerm={searchTerm}
                    onChangeInput={onChangeInput}
                />

                    <div className={styles.header_block_text_search}>
                    <div className={styles.arrow_add_file_block}
                         onClick={() => handleReloadTable && handleReloadTable()}>
                        <IconSvg width={25} height={25} viewBoxSize="0 0 32 32" path={updateDataIcon}/>
                    </div>
                </div>

                        <div className={styles.filter_button}>
                        <IconSvg functionOnClick={SettingTableModalOff} width={25} height={25} viewBoxSize={'0 0 25 25'} path={SettingsIconPath} />
                            </div>
                        </div>

                {isOpen && <Portal closeModal={on}>{courses &&
                    <AddStudentModal setShowModal={on} courses={courses?.results}/>}</Portal>}

                {isModalOpen && (
                    <Portal closeModal={SettingTableModal}>
                        <SettingStudentTable setShowModal={toggleSettingTableModal} tableId={tableId}/>
                    </Portal>
                )}

            </div>
        )
    },
)
