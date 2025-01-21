import React, { FC, FormEvent, memo, useEffect, useState } from 'react'

import { BonusPropsT } from 'types/pageTypes'
import { useDeleteBonusMutation } from 'api/schoolBonusService'
import {avatarPrize} from "assets/img/common";
import styles from './bonus.module.scss'
import {IconSvg} from "../../../../components/common/IconSvg/IconSvg";
import {settingsIconPath} from "../../../School/config/svgIconsPath";
import { deleteHoverIconPath } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config';

export const Bonus: FC<BonusPropsT> = memo(({ bonus, bonuses, setBonuses, setFormBonus, setIsEdit,
      setIsActivate, setShowBonusForm, groupIds, setIsAllGroupsSelected}) => {
  const [deleteBonus, { isSuccess: isDeleted }] = useDeleteBonusMutation()
  const schoolName = window.location.href.split('/')[4]

  const handleEditForm = () => {
    setIsEdit(true);
    setFormBonus({
       ...bonus,
       expire_date: new Date(bonus.expire_date),
    })
    const activeBonus = bonuses.find(item => item.id !== bonus.id && item.active);
    if (activeBonus) {
       setIsActivate(false);
    } else {
       setIsActivate(true);
    }
    const notIncludedGroups = groupIds.filter(id => ! bonus.student_groups.includes(id))

    if (notIncludedGroups.length) {
        setIsAllGroupsSelected(false);
    } else {
        setIsAllGroupsSelected(true);
    }
    setShowBonusForm(true);
  };

  const handleDeleteBonus = async () => {
    await deleteBonus({ id: bonus.id, schoolName })
      .unwrap()
      .then(async () => {
        console.log('uspeh')
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    if (isDeleted) {
      setBonuses(bonuses.filter(item => item.id !== bonus.id))
    }
  }, [isDeleted])

  const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <tr className={styles.table_body_row} key={bonus.id}>
      <td>
        <div className={styles.table_body_row_icon}>
          <img src={bonus.logo || avatarPrize} alt="logo" />
        </div>
      </td>
      <td>
        <div className={styles.table_body_row_icon}>
          <p>{bonus.link}</p>
        </div>
      </td>
      <td>
        <div className={styles.table_body_row_icon}>
          <p>{bonus.text}</p>
        </div>
      </td>
      <td>
        <div className={styles.table_body_row_expires}>
          <p>{dateFormatter.format(new Date(bonus.expire_date))}</p>
        </div>
      </td>
      <td>
        <div className={styles.table_body_row_button}>
          <span className={bonus.active ? styles.table_body_row_button_active : styles.table_body_row_button_inactive} />
          <p>{bonus.active ? 'Активирован' : 'Не активирован'}</p>
        </div>
      </td>
      <td>
        <button className={styles.table_body_row_icon_svg} onClick={handleEditForm}>
          <IconSvg viewBoxSize='0 0 16 16' width={32} height={30} path={settingsIconPath} />
        </button>
      </td>
      <td>
        <button style={{ background: 'transparent', border: 'none' }} onClick={handleDeleteBonus}>
          <IconSvg width={32} height={32} path={deleteHoverIconPath} />
        </button>
      </td>
    </tr>
  )
})
