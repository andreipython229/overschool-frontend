import React, { memo, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Button } from '../../common/Button/Button'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.css'

import ru from 'date-fns/locale/ru'

registerLocale('ru', ru)

export const CalendarFilter = memo(() => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const onChange = (dates: any): void => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <div className="date_picker__container">
      <p className="date_picker__title">ВЫБЕРИТЕ ДИАПАЗОН ДАТ</p>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        locale="ru"
        selectsRange
        inline
      >
        <Button variant="primary" text="Применить" />
      </DatePicker>
    </div>
  )
})
