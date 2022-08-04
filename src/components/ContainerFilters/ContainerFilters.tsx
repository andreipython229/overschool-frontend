import React, { FC } from 'react'
import { ScoresFilter } from '../FilterButton/ScoresFilter/ScoresFilter'
import { CalendarFilter } from '../CalendarFilter/CalendarFilter'

type ContainerFiltersT = {
  title: string
  props: any
}

export const ContainerFilters: FC<ContainerFiltersT> = ({ title, ...props }: any) => {
  if (title && title === 'курс') {
    return (
      <div>
        <div> {title}</div>
      </div>
    )
  } else if (title && title === 'группа') {
    return (
      <div>
        <div>{title}</div>
      </div>
    )
  } else if (title && title === 'задание') {
    return (
      <div>
        <div>{title}</div>
      </div>
    )
  } else if (title && title === 'последний ответ') {
    return (
      <div>
        <CalendarFilter />
      </div>
    )
  } else {
    return (
      <ScoresFilter
        scoresStart={props.props.scoresStart}
        scoresEnd={props.props.scoresEnd}
        setScoresStart={props.props.setScoresStart}
        setScoresEnd={props.props.setScoresEnd}
        handleApplyFilter={props.props.handleApplyFilter}
      />
    )
  }
}
