import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyFetchAllStudentsPerGroupQuery } from 'api/courseStat'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Button } from '../../common/Button/Button'
import {useDebounceFunc} from "../../../customHooks";
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { downLoadIconPath } from '../../StudentsTableWrapper/config/svgIconsPath'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsCroupExport: FC = () => {
    const { group_id } = useParams()
    const dispatch = useAppDispatch()
    const schoolName = window.location.href.split('/')[4]
    const filters = useAppSelector(state => state.filters['studentsPerGroup'])
    const debounce = useDebounceFunc(dispatch)
    const [fetchStudents, { data, isFetching }] = useLazyFetchAllStudentsPerGroupQuery()

    const handleReloadTable = () => {
       fetchStudents({ id: group_id, filters, schoolName })
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