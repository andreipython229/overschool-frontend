import React, { useState } from 'react'
import { Previous } from '../Courses/Previous/Previous'
import { SelectDropDown } from '../../components/SelectDropDown/SelectDropDown'
import { FilterButton } from '../../components/FilterButton/FilterButton'
import { Input } from '../../components/common/Input/Input/Input'
import { searchSvgIcon } from '../../constants/iconSvgConstants'
// import { ModalCheckHomeWork } from '../../components/Modal/ModalCheckHomeWork/ModalCheckHomeWork'

import styles from './home_work_page.module.scss'

export const HomeWorkPage = () => {
  const [arrowUsersState, setArrowUsersState] = useState([])
  return (
    <>
      <Previous avatar={''} name={'No name'} />
      <h3>Входящие работы от учеников</h3>
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <SelectDropDown setArrowUsersState={setArrowUsersState} />
          <FilterButton setArrowUsersState={setArrowUsersState} />
        </div>
        <Input
          name=""
          type="text"
          value=""
          onChange={() => {
            console.log(arrowUsersState)
          }}
          placeholder="Поиск по ученикам и заданиям"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={searchSvgIcon}
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Input>
      </div>
      {/* <ModalCheckHomeWork /> */}
    </>
  )
}
