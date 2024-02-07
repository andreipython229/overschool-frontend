import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyFetchAllCourseStatQuery } from 'api/courseStat'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { Button } from '../../common/Button/Button'
import {useDebounceFunc} from "../../../customHooks";
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsCourseExport: FC = () => {
  const { course_id } = useParams()
  const schoolName = window.location.href.split('/')[4]
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['studentsPerCourse'])
  const debounce = useDebounceFunc(dispatch)
  const [fetchStudents, { data, isFetching }] = useLazyFetchAllCourseStatQuery()

  const handleReloadTable = () => {
    fetchStudents({ id: String(course_id), filters, schoolName })
  }

  useEffect(() => {
    handleReloadTable()
  }, [filters])

  const handleOnExport = () => {
        const allStudents = data ?? [];
        const wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(allStudents);
        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
        XLSX.writeFile(wb, "Отчёт.xlsx");
  };

  return (
       <Button onClick={handleOnExport} className={styles.students_group_header_add_teacher_btn} text={'Выгрузка отчета'}>
        </Button >
  )
}
