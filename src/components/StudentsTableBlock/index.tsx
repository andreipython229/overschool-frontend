import React, { FC } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants'
import { Student } from './Student'
import { SettingItemT } from '../../Pages/CoursesStats/CoursesStats'

import styles from '../../Pages/School/Navigations/StudentsStats/studentsStats.module.scss'

type StudentsTableBlockT = {
  settingList?: SettingItemT[]
  setToggleSettingModal?: (arg: boolean) => void
}

const studentList = [
  {
    name: 'Вася',
    email: 'test@mail.com',
    course: 'Course',
    totalScore: '94',
    lastActivity: '13.09.2022',
    progress: '30%',
    comments: 'Hello World',
    group: '25',
    averageScore: '8',
    updateDate: '10.09.2022',
    completionDate: '10.09.2022',
  },
  {
    name: 'Петя',
    email: 'test@mail.com',
    course: 'Course',
    totalScore: '84',
    lastActivity: '13.09.2022',
    progress: '50%',
    comments: 'Hello World',
    group: '35',
    averageScore: '7',
    updateDate: '10.09.2022',
    completionDate: '10.09.2022',
  },
]

export const StudentsTableBlock: FC<StudentsTableBlockT> = ({ settingList, setToggleSettingModal }) => {
  const openSettingsModal = () => {
    setToggleSettingModal && setToggleSettingModal(true)
  }
  const foo = () => {
    const arr: any = []
    settingList?.reduce((priviosValue: any, currentValue: any, index) => {
      const key: any = Object.values(settingList)[index].name

      const value = Object.keys(studentList[0])

      if (studentList) {
        const newObj = {
          [value[index]]: key,
        }
        arr.push(newObj)
      }
    }, [])
    return arr
  }

  //console.log(foo())

  return (
    <section className={styles.student_info_table}>
      <div className={styles.student_info_table_header}>
        <input className={styles.student_info_table_header_checkbox} type="checkbox" name="name" />

        {settingList?.map((item: SettingItemT) => (
          <div key={item.id}>{item.checked && item.name}</div>
        ))}

        <div className={styles.student_info_table_header_settings_btn}>
          <IconSvg
            functionOnClick={openSettingsModal}
            width={15}
            height={15}
            viewBoxSize={'0 0 15 15'}
            fill={'#6B7280'}
            d={classesSettingSvgIcon.setting}
          />
        </div>
      </div>
      <div className={styles.student_info_table_contents_wrapper}>
        {/*{studentList.map(item => (*/}
        {/*  <p style={{ display: 'flex', justifyContent: 'space-between' }} key={item.name}>*/}
        {/*    <span>{item.name}</span>*/}
        {/*    <span>{item.email}</span>*/}
        {/*    <span>{item.progress}</span>*/}
        {/*    <span>{item.group}</span>*/}
        {/*    <span>{item.completionDate}</span>*/}
        {/*    <span>{item.course}</span>*/}
        {/*    <span>{item.totalScore}</span>*/}
        {/*  </p>*/}
        {/*))}*/}
        <Student name={'Без имени'} date={new Date().toTimeString().split('G')[0]} progress={'0%'} email={'pochta@mail.ru'} balls={'0'} />
        <Student name={'Без имени'} date={new Date().toTimeString().split('G')[0]} progress={'0%'} email={'pochta@mail.ru'} balls={'0'} />
      </div>
    </section>
  )
}
