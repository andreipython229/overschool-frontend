import { FC } from 'react'
import { useLazyFetchHomeworkStatsQuery } from 'api/homeworksStatsService'
import { useAppSelector } from 'store/hooks'
import { Button } from '../../common/Button/Button'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from 'xlsx'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { LimitModal } from 'components/Modal/LimitModal/LimitModal'

export const StudentsHomeworkExport: FC = () => {
  const filters = useAppSelector(state => state.filters['homework'])
  const schoolName = localStorage.getItem('school')
  const [fetchHomeworks, { isFetching }] = useLazyFetchHomeworkStatsQuery()
  const [setShow, { onToggle }] = useBoolean(false)

  // формирование спика словарей по статистеке проверенных преподами домашек
  const getTeacherStatus = (data: any) => {
    const result: any = {}

    data.forEach((item: any) => {
      const teacherName = item.teacher_name
      const status = item.status

      if (!result[teacherName]) {
        result[teacherName] = {
          Ментор: teacherName,
          'Всего заданий': 0,
          Принято: 0,
          Отклонено: 0,
          'Ждёт проверки': 0,
        }
      }

      result[teacherName]['Всего заданий'] += 1

      if (status === 'Ждет проверки') {
        result[teacherName]['Ждёт проверки'] += 1
      } else if (status === 'Отклонено') {
        result[teacherName]['Отклонено'] += 1
      } else if (status === 'Принято') {
        result[teacherName]['Принято'] += 1
      }
    })

    return Object.values(result)
  }

  const handleExport = async () => {
    if (schoolName) {
      const response = await fetchHomeworks({
        filters: filters,
        page: -1,
        schoolName: schoolName,
      })
      const allHomeworks = response.data ?? []
      if (Array.isArray(allHomeworks) && allHomeworks.length > 0) {
        const wb = XLSX.utils.book_new(),
          ws = XLSX.utils.json_to_sheet(getTeacherStatus(allHomeworks))
        XLSX.utils.book_append_sheet(wb, ws, 'MySheet1')
        XLSX.writeFile(wb, 'Домашние задания учеников.xlsx')
      } else {
        onToggle()
      }
    }
  }

  return (
    <>
      <Button onClick={handleExport} className={styles.students_group_header_export_button} text={''}>
        Скачать
        {isFetching && <SimpleLoader style={{ height: '12px', width: '12px' }} loaderColor="white" />}
      </Button>
      {setShow && (
        <Portal closeModal={onToggle}>
          <LimitModal message="Произошла ошибка при формировании таблицы, попробуйте еще раз." setShowLimitModal={onToggle} />
        </Portal>
      )}
    </>
  )
}
