import React, { FC } from 'react'
import { ScoresFilter } from '../FilterButton/ScoresFilter/ScoresFilter'
import { CalendarFilter } from '../FilterButton/CalendarFilter/CalendarFilter';
import { Filter } from 'components/FilterButton/Filter/Filter';
import { useAppSelector } from 'store/hooks';


type ContainerFiltersT = {
  title: string
  props: any
}

export const ContainerFilters: FC<ContainerFiltersT> = ({ title, ...props }: any) => {

  const {courses} = useAppSelector((state: any) => state.allCourses);

  if (title && title === 'курсы') {
    return (
      <div>
        <Filter name={'course'} header={'ВЫБЕРИТЕ КУРСЫ'} data={courses.map((i:any) => i.name)}/>
      </div>
    )
  } else if (title && title === 'группа') {
    return (
      <div>
        {/* <Filter name={'group'} header={'ВЫБЕРИТЕ ГРУППЫ'}/> */}
      </div>
    )
  } else if (title && title === 'задание') {
    return (
      <div>
        {/* <Filter name={'task'} header={'ВЫБЕРИТЕ ЗАДАНИЯ'}/> */}
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
