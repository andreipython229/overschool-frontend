import React, {ChangeEvent, FC, memo, useEffect, useState} from "react";
import {useFetchBonusesQuery, useCreateBonusMutation, usePatchBonusMutation,} from "api/schoolBonusService";
import {BonusT} from "types/bonusesT";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { purple } from '@mui/material/colors';
import {useFetchStudentsGroupQuery} from "api/studentsGroupService";
import styles from '../superAdmin.module.scss'
import {Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, Chip} from "@mui/material";
import {Button} from 'components/common/Button/Button'
import styles_load from "../../../components/Modal/Modal.module.scss";
import {SimpleLoader} from "../../../components/Loaders/SimpleLoader";
import {Bonus} from "../Bonuses/Bonus/Bonus";

export const Bonuses: FC = () => {
    const schoolName = window.location.href.split('/')[4];
    const {data: bonusesData, isSuccess: bonusesSuccess, isFetching} = useFetchBonusesQuery(schoolName);
    const [showBonusForm, setShowBonusForm] = useState(false);
    const [createBonus, {isSuccess: isCreated, error}] = useCreateBonusMutation();
    const [patchBonus, {isSuccess: isUpdated, error: patchError}] = usePatchBonusMutation();
    const {data: studentsGroups, isSuccess: groupsSuccess} = useFetchStudentsGroupQuery(schoolName);
    const [groupIds, setGroupIds] = useState<number[]>([])
    const [isEdit, setIsEdit] = useState(false);
    const [isActivate, setIsActivate] = useState(true);
    const emptyBonus = {
        id: 0,
        student_groups: [],
        logo: '',
        link: '',
        text: '',
        active: false,
        expire_date: new Date()
    }
    const [formBonus, setFormBonus] = useState<BonusT>(emptyBonus)
    const [bonuses, setBonuses] = useState<BonusT[]>([])
    const [logoFile, setLogoFile] = useState<File | Blob>()
    const [logoError, setLogoError] = useState<string>('')
    const [showGroupForm, setShowGroupForm] = useState(false)
    const [isAllGroupsSelected, setIsAllGroupsSelected] = useState(false);

    useEffect(() => {
      if (bonusesSuccess) {
        setBonuses(bonusesData)
      }
    }, [bonusesData]);

    useEffect(() => {
      if (isCreated) {
        setBonuses([...bonuses, formBonus])
      }
    }, [isCreated])

    useEffect(() => {
      if (studentsGroups?.results) {
         setGroupIds(studentsGroups.results.map(group => group.group_id as number));
      }
    }, [studentsGroups]);

   function getLocalISOString(date: Date) {
      const offset = date.getTimezoneOffset()
      const offsetAbs = Math.abs(offset)
      const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
      return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`
   }

    const getData = () => {
        const formData = new FormData()
        logoFile && formData.append('logo', logoFile)
        formData.append('link', formBonus.link)
        formData.append('text', formBonus.text)
        const dateobj = formBonus.expire_date
        const year = dateobj.getFullYear()
        const month = ("0" + (dateobj.getMonth() + 1)).slice(-2)
        const day = ("0" + dateobj.getUTCDate()).slice(-2)
        let hours: string = (dateobj.getUTCHours()).toString();
        hours = ("0" + hours).slice(-2);
        const minutes = ("0" + dateobj.getMinutes()).slice(-2);
        const seconds = ("0" + dateobj.getSeconds()).slice(-2);
        formData.append('expire_date', `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

        formBonus.student_groups.map((group: number) => {
           formData.append('student_groups', String(group))
          })

        return formData
    }

    const handleAddBonus = async () => {
        const data = getData()
        await createBonus({bonus: data, schoolName})
          .unwrap()
          .then(async () => {
            console.log('added')
          })
          .catch(error => {
            console.log(error)
          });
        setShowBonusForm(false);
    }

    const handleUpdateBonus = async () => {
        const data = getData()
        data.append('active', String(formBonus.active))
        await patchBonus({data: data, id: formBonus.id, schoolName})
          .unwrap()
          .then(async () => {
            console.log('updated')
          })
          .catch(error => {
            console.log(error)
          });
        setShowBonusForm(false);
    }

    const handleCreateForm = () => {
        setIsEdit(false);
        setFormBonus(emptyBonus);
        setIsAllGroupsSelected(false);
        setShowBonusForm(true);
    }

    const onChangeLogo = (e: ChangeEvent<HTMLInputElement>) => {
      setLogoError('')
      if (e.target.files && e.target.files[0]) {
        if (e.target.files[0].size <= 7 * 1024 * 1024) {
          const url = URL.createObjectURL(e.target.files[0])
          setFormBonus({
            ...formBonus,
            logo: url,
          })
          setLogoFile(e.target.files[0])
        } else {
          setLogoError('Допустимый размер файла не должен превышать 7 МБ')
        }
      }
    }

    // const handleChangeGroups = (event: any) => {
    //    setFormBonus({...formBonus, student_groups: event.target.value})
    // };
    //
    // const renderSelectedGroups = (selected: any) => {
    //     return (
    //       <Stack gap={1} direction="row" flexWrap="wrap">
    //         {selected?.map((value: any) => (
    //           <Chip
    //             key={value}
    //             label={studentsGroups?.results.find((group) => group.group_id === value)?.name}
    //             onDelete={() =>
    //               setFormBonus({...formBonus, student_groups: formBonus.student_groups.filter((group) => group !== value)})
    //             }
    //             deleteIcon={
    //               <CancelIcon
    //                 onMouseDown={(event) => event.stopPropagation()}
    //               />
    //             }
    //           />
    //         ))}
    //       </Stack>
    //     )}

    const handleSelectAllGroups = (isChecked: boolean) => {
      if (isChecked) {
        setIsAllGroupsSelected(true);
        setFormBonus({
          ...formBonus,
          student_groups: groupIds,
        });
      } else {
        setIsAllGroupsSelected(false);
        setFormBonus({
          ...formBonus,
          student_groups: [],
        });
      }
    };

    return (
        <>
        {isFetching && (
          <div className={styles_load.loader}>
            <SimpleLoader style={{ width: '50px', height: '50px' }} />
          </div>
        )}
        <div className={styles.wrapper_actions}>
        <div className={styles.bonuses}>
          <div className={styles.bonuses_header}>
            <div className={styles.bonuses_header_title}>Бонусы / акции</div>
            <button onClick={handleCreateForm} className={styles.bonuses_header_btn}>
              Добавить бонус
            </button>
          </div>
          <div className={styles.bonuses_table}>
            {bonuses && bonuses?.length ? (
              <div className={styles.wrapper}>
                <div className={styles.bonuses_table_title}>
                  <div></div>
                  <div>Ссылка</div>
                  <div>Описание</div>
                  <div>Срок истекает</div>
                  <div>Активирован</div>
                </div>
                {bonuses?.map((bonus: BonusT) => (
                    <Bonus
                        key={bonus.id}
                        bonus={bonus}
                        bonuses={bonuses}
                        setBonuses={setBonuses}
                        setFormBonus={setFormBonus}
                        setIsEdit={setIsEdit}
                        setIsActivate={setIsActivate}
                        setShowBonusForm={setShowBonusForm}
                        groupIds={groupIds}
                        setIsAllGroupsSelected={setIsAllGroupsSelected}
                    />
                ))}
              </div>
            ) : (
              <p style={{ color: 'lightslategrey' }}>Пока бонусов на платформе нет</p>
            )}
          </div>
        </div>
        <Dialog open={showBonusForm} onClose={() => setShowBonusForm(false)}
                            PaperProps={{style: {maxHeight: '100vh', maxWidth: '600px', width: '100%'},}}>
            <DialogTitle>{isEdit ? "Изменить бонус" : "Добавить бонус"}</DialogTitle>
               <DialogContent>
                 <div className={styles.form_logoWrapper_logoBlock}>
                    <div className={styles.form_logoWrapper}>
                      <span className={styles.form_logoWrapper_logoBlock_title}>Логотип:</span>
                      {formBonus.logo ? (
                          <img className={styles.form_logoWrapper_logoBlock_img} src={formBonus.logo} alt="" />
                         ) : (
                        <div className={styles.bonus_block_logoBlock_logo} />
                      )}
                  <input className={styles.bonus_block_logoBlock_input} value={''} name={'logo'} type={'file'} onChange={onChangeLogo} />
                    </div>
                  {logoError && <p className={styles.form_logoWrapper_error}>{logoError}</p>}
                 </div>
                             <div style={{marginBottom: '1.5rem', marginTop: '1.5rem'}}>
                                <TextField
                                    id="link"
                                    label="Ссылка"
                                    value={formBonus.link}
                                    fullWidth={true}
                                    onChange={(e) =>
                                        setFormBonus({...formBonus, link: e.target.value})
                                    }
                                />
                            </div>
                             <div style={{marginBottom: '1.5rem'}}>
                                <TextField
                                    id="text"
                                    label="Описание"
                                    value={formBonus.text}
                                    multiline={true}
                                    fullWidth={true}
                                    onChange={(e) =>
                                        setFormBonus({...formBonus, text: e.target.value})
                                    }
                                />
                            </div>
                            <div style={{marginBottom: '1.5rem'}}>
                                <TextField
                                    id="datetime-local"
                                    label="Выберите дату и время окончания действия акции"
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={getLocalISOString(formBonus.expire_date).slice(0, 16)}
                                    fullWidth={true}
                                    onChange={(e) => {
                                        setFormBonus({
                                            ...formBonus,
                                            expire_date: new Date(e.target.value),
                                        })
                                      }
                                    }
                                />
                            </div>
                            {/*<div style={{marginBottom: '1.5rem'}}>*/}
                            {/*    <TextField*/}
                            {/*        id="student_groups"*/}
                            {/*        select*/}
                            {/*        SelectProps={{*/}
                            {/*          multiple: true,*/}
                            {/*          value: formBonus.student_groups,*/}
                            {/*          onChange: handleChangeGroups,*/}
                            {/*          renderValue: renderSelectedGroups,*/}
                            {/*        }}*/}
                            {/*        label="Выберите группы"*/}
                            {/*        fullWidth={true}*/}
                            {/*    >*/}
                            {/*        {studentsGroups?.results.map(group => (*/}
                            {/*            <MenuItem key={group.group_id} value={group.group_id}>*/}
                            {/*                {group.name}*/}
                            {/*            </MenuItem>*/}
                            {/*        ))}*/}
                            {/*    </TextField>*/}
                            {/*</div>*/}

                            <div style={{marginBottom: '1.5rem'}}>
                                <div className={styles.form_groups}
                                    onClick={() => setShowGroupForm(true)}>
                                    Выберите одну или несколько групп
                                </div>
                            </div>
                            <Dialog
                  open={showGroupForm}
                  onClose={() => setShowGroupForm(false)}
                  PaperProps={{ style: { maxHeight: '100vh', maxWidth: '600px', width: '100%' } }}
                >
                  <DialogTitle>Доступные для выбора группы</DialogTitle>
                  <DialogContent>

                    <span>Выбор всех групп</span>
                    {studentsGroups && (
                      <Checkbox
                      style={{ color: '#ba75ff' }}
                      checked={isAllGroupsSelected}
                      onChange={(e) => handleSelectAllGroups(e.target.checked)}
                      color='primary'
                    />
                    )}
                    {studentsGroups &&
                      Object.entries(
                        studentsGroups.results
                          .reduce<Record<string, typeof studentsGroups.results>>((acc, group) => {
                            const courseName = group.course_name;
                            if (courseName) {
                              if (!acc[courseName]) {
                                acc[courseName] = [];
                              }
                              acc[courseName].push(group);
                            }
                            return acc;
                          }, {})
                      ).map(([courseName, groups]) => (
                        <div key={courseName} style={{ marginBlockStart: '3px' }}>
                          <b>{courseName}</b>
                          {groups.map((group, index) => (
                            <div key={group.group_id} style={{ marginBlockStart: index === 0 ? '3px' : '-10px' }}>
                              <Checkbox
                                style={{ color: '#ba75ff' }}
                                checked={formBonus.student_groups.includes(group.group_id as number)}
                                onChange={e => {
                                  const isChecked = e.target.checked;
                                  if (isChecked && group.group_id !== undefined) {
                                    setFormBonus({
                                      ...formBonus,
                                      student_groups: [...formBonus.student_groups, group.group_id as number],
                                    });
                                  } else if (!isChecked && group.group_id !== undefined) {
                                    setFormBonus({
                                      ...formBonus,
                                      student_groups: formBonus.student_groups.filter(id => id !== group.group_id),
                                    });
                                  }
                                }}
                              />
                              {group.name}
                            </div>
                          ))}
                        </div>
                      ))}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setShowGroupForm(false)} text="Подтвердить" />
                  </DialogActions>
                  </Dialog>

                             {isEdit &&
                             <div style={{marginBottom: '1.5rem'}}>
                                <FormControlLabel control={<Checkbox
                                    id="active"
                                    checked={formBonus.active}
                                    sx={{
                                       color: purple[800],
                                       '&.Mui-checked': {
                                          color: purple[600],
                                       },
                                    }}
                                    onChange={(e) => isActivate &&
                                        setFormBonus({
                                            ...formBonus,
                                            active: e.target.checked,
                                        })
                                    }
                                />} label="Активировать" />
                                {!isActivate && <div className={styles.warning}>Активирован может быть только один бонус</div> }
                            </div>}

                        </DialogContent>
                        <DialogActions>
                            {isEdit
                            ? <Button onClick={handleUpdateBonus} text="Сохранить"/>
                            : <Button onClick={handleAddBonus} text="Добавить"/>}
                            <Button onClick={() => setShowBonusForm(false)} text="Отмена"/>
                        </DialogActions>
                    </Dialog>
        </div>
       </>
    )
}


