import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import { IWithRange } from '../../../types/componentsTypes'
import { Button } from '../../common/Button'
import { convertDate } from 'utils/convertDate'
import { useBoolean } from 'customHooks/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { filtersSelector } from 'selectors/index'
import { addFilters } from 'store/redux/filters/slice'

import 'react-datepicker/dist/react-datepicker.css'
import './calendar.css'

registerLocale('ru', ru)

export const CalendarFilter = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(filtersSelector)
  const [isFilterClosed, { off }] = useBoolean()

  const [startDate, setStartDate] = useState<Date>(filters.start_date ? new Date(`${filters.start_date}`) : new Date())
  const [endDate, setEndDate] = useState<Date>(filters.start_date ? new Date(`${filters.end_date}`) : new Date())

  const onChange = (dates: IWithRange extends false | undefined ? Date : [Date, Date]): void => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const { reversedmmddyyyy: convertedStartDate } = convertDate(new Date(startDate), '-')
  const { reversedmmddyyyy: convertedEndDate } = convertDate(new Date(endDate), '-')

  const handleAddFilter = () => {
    dispatch(addFilters({ start_date: convertedStartDate, end_date: convertedEndDate }))
    off()
  }

  if (isFilterClosed) return null

  return (
    <div className="date_picker__container">
      <p className="date_picker__title">ВЫБЕРИТЕ ДИАПАЗОН ДАТ</p>
      <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} locale="ru" selectsRange inline>
        <Button variant="primary" text="Применить" onClick={handleAddFilter} />
      </DatePicker>
    </div>
  )
}
