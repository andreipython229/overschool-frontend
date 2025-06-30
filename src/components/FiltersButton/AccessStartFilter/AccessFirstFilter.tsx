import { useState, FC } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import { useAppDispatch } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { IWithRange } from '../../../types/componentsTypes'
import { Button } from '../../common/Button/Button'
import { convertDate } from 'utils/convertDate'
import { useBoolean } from 'customHooks/index'

import 'react-datepicker/dist/react-datepicker.css'
import '../CalendarFilter/calendar.css'

registerLocale('ru', ru)

type accessFirstFilterT = {
  filterKey: string
}

export const AccessFirstFilter: FC<accessFirstFilterT> = ({ filterKey }) => {
  const dispatch = useAppDispatch()
  const [isFilterClosed, { off }] = useBoolean()

  const [startData, setStartDate] = useState<Date>(new Date())
  const [endData, setEndDate] = useState<Date>(new Date())

  const handleSetDays = (dates: IWithRange extends false | undefined ? Date : [Date, Date]): void => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const { reversedmmddyyyy: convertedStartDate } = convertDate(new Date(startData), '-')
  const { reversedmmddyyyy: convertedEndDate } = endData ? convertDate(new Date(endData), '-') : convertDate(new Date(startData), '-')

  const handleAddFilter = () => {
    dispatch(addFilters({ key: filterKey, filters: { access_period_from: convertedStartDate, access_period_to: convertedEndDate, p: 1 } }))
    off()
  }

  const handleRemoveFilter = () => {
    dispatch(removeFilter({ key: filterKey, filterName: 'access_period_from' }))
    dispatch(removeFilter({ key: filterKey, filterName: 'access_period_to' }))
    off()
  }

  if (isFilterClosed) return null

  return (
    <div className="date_picker__container">
      <p className="date_picker__title">ВЫБЕРИТЕ ДИАПАЗОН ДАТ</p>
      <DatePicker selected={startData} onChange={handleSetDays} className='container' startDate={startData} endDate={endData} locale="ru" selectsRange inline required >
        <div className="date_picker__buttons">
          <Button variant='newPrimary' text="Применить" onClick={handleAddFilter} className="full_width_button" />
          <Button variant="newSecondary" text="Отменить фильтр даты" onClick={handleRemoveFilter} className="full_width_button" />
        </div>
      </DatePicker>
    </div>
  )
}
