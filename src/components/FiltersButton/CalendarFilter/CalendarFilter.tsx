import { useState, FC } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import { IWithRange } from '../../../types/componentsTypes'
import { Button } from '../../common/Button/Button'
import { convertDate } from 'utils/convertDate'
import { useBoolean } from 'customHooks/index'

import 'react-datepicker/dist/react-datepicker.css'
import './calendar.css'

registerLocale('ru', ru)

type calendarFiletrT = {
  removeLastActiveStartFilter?: () => void
  removeLastActiveEndFilter?: () => void
  addLastActiveFilter?: (data1: string, data2: string) => void
  startDate?: string | number
  endDate?: string | number
}

export const CalendarFilter: FC<calendarFiletrT> = ({
  startDate,
  endDate,
  addLastActiveFilter,
  removeLastActiveStartFilter,
  removeLastActiveEndFilter,
}) => {
  const [isFilterClosed, { off }] = useBoolean()

  const [startData, setStartDate] = useState<Date>(startDate ? new Date(`${startDate}`) : new Date())
  const [endData, setEndDate] = useState<Date>(endDate ? new Date(`${endDate}`) : new Date())

  const onChange = (dates: IWithRange extends false | undefined ? Date : [Date, Date]): void => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const { reversedmmddyyyy: convertedStartDate } = convertDate(new Date(startData), '-')
  const { reversedmmddyyyy: convertedEndDate } = convertDate(new Date(endData), '-')

  const handleAddFilter = () => {
    addLastActiveFilter && addLastActiveFilter(convertedStartDate, convertedEndDate)
    off()
  }

  const handleRemoveFilter = () => {
    removeLastActiveStartFilter && removeLastActiveStartFilter()
    removeLastActiveEndFilter && removeLastActiveEndFilter()
  }

  if (isFilterClosed) return null

  return (
    <div className="date_picker__container">
      <p className="date_picker__title">ВЫБЕРИТЕ ДИАПАЗОН ДАТ</p>
      <DatePicker selected={startData} onChange={onChange} startDate={startData} endDate={endData} locale="ru" selectsRange inline>
        <div className="date_picker__buttons">
          <Button variant="primary" text="Применить" onClick={handleAddFilter} className="full_width_button" />
          <Button variant="primary" text="Отменить фильтр даты" onClick={handleRemoveFilter} className="full_width_button" />
        </div>
      </DatePicker>
    </div>
  )
}
