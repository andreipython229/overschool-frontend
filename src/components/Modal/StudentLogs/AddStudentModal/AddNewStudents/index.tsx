import React, {ChangeEventHandler, FC, MouseEventHandler, useEffect, useRef, useState} from 'react'
import { Input } from '../../../../common/Input/Input/Input'
import styles from '../../studentsLog.module.scss'
import {CrossIconPath, PeopleIconPath, SettingsIconPath} from "../../../../../assets/Icons/svgIconPath";
import {IconSvg} from "../../../../common/IconSvg/IconSvg";
import {deleteIconPath} from "../../../../../Pages/School/config/svgIconsPath";




type AddNewStudentsT = {
  studentEmail: string
  studentName: string
  studentLastName: string
  studentPatronymic: string
  onChangeEmail: (arg: number) => ChangeEventHandler<HTMLInputElement>
  onChangeName: (arg: number) => ChangeEventHandler<HTMLInputElement>
  onChangeLastName: (arg: number) => ChangeEventHandler<HTMLInputElement>
  onChangePatronymic: (arg: number) => ChangeEventHandler<HTMLInputElement>
  handleRemoveStudent: (arg: number) => MouseEventHandler<HTMLButtonElement>
  index: number
  id: number
}

export const AddNewStudents: FC<AddNewStudentsT> = ({
  id,
  index,
  studentEmail,
  studentName,
  studentLastName,
  studentPatronymic,
  handleRemoveStudent,
  onChangeEmail,
  onChangeLastName,
  onChangeName,
  onChangePatronymic,
}) => {
  return (
    <div className={styles.addStudent_student}>
      <div className={styles.addStudent_student_title}>
        <div style={{display: "flex"}}>
        <span style={{marginTop: "10px", marginRight: "10px"}}>{index + 1}.</span>
      <div style={{minWidth: "400px", display: 'flex', flexDirection: 'column'}}>
        <div className={styles.addStudent_input}>
        <Input value={studentEmail} name={'email'} type={'text'} onChange={onChangeEmail(id)} placeholder={'Email ученика'} required />
        {/*  <div style={{position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none"}}>*/}
        {/*/!*<IconSvg viewBoxSize="0 0 25 20" height={30} width={30} path={SettingsIconPath} />*!/*/}
        {/*  </div>*/}
        </div>
        {/*<Input value={studentLastName} name={'last_name'} type={'text'} onChange={onChangeLastName(id)} placeholder={'Фамилия'} />*/}
        {/*<Input value={studentName} name={'first_name'} type={'text'} onChange={onChangeName(id)} placeholder={'Имя'} />*/}
        {/*<Input value={studentPatronymic} name={'patronymic'} type={'text'} onChange={onChangePatronymic(id)} placeholder={'Отчество'} />*/}
      </div>
      </div>
        {index > 0 && (
            <button className={styles.addStudent_student_btn_remove} type="button" onClick={handleRemoveStudent(id)}>
            <IconSvg width={20} height={20} viewBoxSize="0 0 19 19" path={deleteIconPath} />
              </button>
        )}
          </div>
        </div>
  )
}
