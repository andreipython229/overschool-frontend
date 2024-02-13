import { FC, useEffect, useState, useMemo } from 'react'
import { useLazyFetchAllStudentsPerSchoolQuery } from 'api/schoolHeaderService'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { Button } from '../../common/Button/Button'
import {useDebounceFunc} from "../../../customHooks";
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { downLoadIconPath } from '../../StudentsTableWrapper/config/svgIconsPath'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsSchoolExport: FC = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['studentsPerSchool'])
  const schoolId = localStorage.getItem('school_id')
  const schoolName = window.location.href.split('/')[4] 
  const [fetchStudents, { data, isFetching }] = useLazyFetchAllStudentsPerSchoolQuery()
  const debounce = useDebounceFunc(dispatch)

  const handleReloadTable = () => {
    schoolId && fetchStudents({ id: Number(schoolId), filters })
  }

  useEffect(() => {
    handleReloadTable()
  }, [filters])

  const handleExport = () => {
      const allStudents = data ?? [];
      const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(allStudents);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, "Отчёт.xlsx");
  };

 return (
     <Button onClick={handleExport} className={styles.students_group_header_add_teacher_btn} text={''}>
         <IconSvg width={22} height={22} viewBoxSize={"0 0 18 18"} path={downLoadIconPath} />
     </Button>
 )
}


