import React, { ChangeEvent, FC, memo } from 'react'

type CourseSearchInputPropsT = {
  searchValue: string
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void
}
export const CourseSearchInput: FC<CourseSearchInputPropsT> = memo(
  ({ searchValue, onChangeSearchValue }) => {
    return (
      <input
        type="text"
        value={searchValue}
        onChange={e => onChangeSearchValue(e)}
        placeholder={'Поиск по курсам и категориям'}
      />
    )
  },
)
