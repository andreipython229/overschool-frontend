import React, { useState } from 'react'
import { Previous } from '../Courses/Previous/Previous'
import { SelectDropDown } from '../../components/SelectDropDown/SelectDropDown'
import { FilterButton } from '../../components/FilterButton/FilterButton'
import { Input } from '../../components/common/Input/Input/Input'
import { searchSvgIcon } from '../../constants/iconSvgConstants'

import styles from './home_work_page.module.scss'

import { arrowUsers } from '../../mockData/mockData'

export const HomeWorkPage = () => {
  const [arrowUsersState, setArrowUsersState] = useState(arrowUsers)
  // fetch('http://194.62.19.27:8000/api/answers/')
  //   .then(response => response.json())
  //   .then(json => console.log(json))
  //
  // // admin@gmail.com
  // // admin
  return (
    <div>
      <Previous avatar={''} name={'No name'} />
      <h3>Входящие работы от учеников</h3>
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <SelectDropDown setArrowUsersState={setArrowUsersState} />
          <FilterButton setArrowUsersState={setArrowUsersState} />
        </div>
        {/* <Input */}
        {/*  name="" */}
        {/*  type="text" */}
        {/*  value="" */}
        {/*  // onChange={() => {}} */}
        {/*  placeholder="Поиск по ученикам и заданиям" */}
        {/* > */}
        {/*  <svg */}
        {/*    width="20" */}
        {/*    height="20" */}
        {/*    viewBox="0 0 20 20" */}
        {/*    fill="none" */}
        {/*    xmlns="http://www.w3.org/2000/svg" */}
        {/*  >*/}
        {/*    <path */}
        {/*      d={searchSvgIcon} */}
        {/*      stroke="#D1D5DB" */}
        {/*      strokeWidth="2" */}
        {/*      strokeLinecap="round" */}
        {/*      strokeLinejoin="round" */}
        {/*    /> */}
        {/*  </svg> */}
        {/* </Input> */}
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
