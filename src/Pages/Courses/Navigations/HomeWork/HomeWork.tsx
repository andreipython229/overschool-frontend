import React, { useState } from 'react'
import { Previous } from '../../Previous/Previous'
import { SelectDropDown } from '../../../../components/common/SelectDropDown/SelectDropDown'
import { FilterButton } from '../../../../components/common/FilterButton/FilterButton'
import { arrowUsers } from '../../../../mockData/mockData'

export const HomeWork = () => {
  const [arrowUsersState, setArrowUsersState] = useState(arrowUsers)

  return (
    <div>
      <Previous avatar={''} name={'No name'} />
      <h3>Входящие работы от учеников</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SelectDropDown arrowUsersState={arrowUsersState} setArrowUsersState={setArrowUsersState} />
        <FilterButton setArrowUsersState={setArrowUsersState} />
      </div>
      {/* {arrowUsersState.map(({ avatar, name, email, task, course, date, status, ball }) => ( */}
      {/*  <div key={name}> */}
      {/*    <span>{avatar}</span> */}
      {/*    <span>{name}</span> */}
      {/*    <span>{email}</span> */}
      {/*    <span>{task}</span> */}
      {/*    <span>{course}</span> */}
      {/*    <span>{date}</span> */}
      {/*    <span>{status}</span> */}
      {/*    <span>{ball}</span> */}
      {/*  </div>*/}
      {/* ))} */}
    </div>
  )
}
