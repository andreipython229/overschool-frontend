import React, { FC, FormEvent, memo, useEffect, useState } from 'react'

import { BonusPropsT } from 'types/pageTypes'
import { useDeleteBonusMutation } from 'api/schoolBonusService'
import {avatar} from "assets/img/common";
import styles from './bonus.module.scss'
import {IconSvg} from "../../../../components/common/IconSvg/IconSvg";
import {deleteIconPath, settingsIconPath} from "../../../School/config/svgIconsPath";

export const Bonus: FC<BonusPropsT> = memo(({ bonus, bonuses, setBonuses, setFormBonus, setIsEdit, setIsActivate, setShowBonusForm}) => {
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
    <div className={styles.wrapper}>
      <div className={styles.bonus}>
        <div className={styles.bonus_item}>
          <img className={styles.bonus_item_logo} src={bonus.logo || avatar} alt="Logo" />
            <span>
               {bonus.link}
            </span>
        </div>
        <div className={styles.bonus_text}>
            <span>
               {bonus.text}
            </span>
        </div>
        <div className={styles.bonus_date}>
          <span>{dateFormatter.format(new Date(bonus.expire_date))}</span>
        </div>
        <div className={styles.bonus_setting}>
          <div className={styles.bonus_setting_active}>
              {bonus.active
                  ? <span className={styles.bonus_setting_active_on}>✔️</span>
                  : <span className={styles.bonus_setting_active_off}>❌</span>}
          </div>
          <div className={styles.bonus_setting_buttons}>
             <button className={styles.bonus_setting_buttons_btn} onClick={handleEditForm}>
              <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
            </button>
             <button className={styles.bonus_setting_buttons_btn} onClick={handleDeleteBonus}>
              <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
            </button>
          </div>
          </div>
        </div>
    </div>
  )
})
