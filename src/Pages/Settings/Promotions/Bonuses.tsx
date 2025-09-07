import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { useFetchBonusesQuery, useCreateBonusMutation, usePatchBonusMutation } from 'api/schoolBonusService'
import { BonusT } from 'types/bonusesT'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { blue } from '@mui/material/colors'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import styles from '../superAdmin.module.scss'
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, Chip } from '@mui/material'
import { Button } from 'components/common/Button/Button'
import styles_load from '../../../components/Modal/Modal.module.scss'
import { SimpleLoader } from '../../../components/Loaders/SimpleLoader'
import { Bonus } from './Bonus/Bonus'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { penIconPath } from '../Main/iconComponents'
import { ArrowDownGreyIconPath } from 'Pages/School/config/svgIconsPath'

export const PromotionSettings: FC = () => {
  const schoolName = window.location.href.split('/')[4]
  const { data: bonusesData, isSuccess: bonusesSuccess, isFetching } = useFetchBonusesQuery(schoolName)
  const [showBonusForm, setShowBonusForm] = useState(false)
  const [createBonus, { isSuccess: isCreated, error }] = useCreateBonusMutation()
  const [patchBonus, { isSuccess: isUpdated, error: patchError }] = usePatchBonusMutation()
  const { data: studentsGroups, isSuccess: groupsSuccess } = useFetchStudentsGroupQuery(schoolName)
  const [groupIds, setGroupIds] = useState<number[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [isActivate, setIsActivate] = useState(true)
  const emptyBonus = {
    id: 0,
    student_groups: [],
    logo: '',
    link: '',
    text: '',
    active: false,
    expire_date: new Date(),
  }
  const [formBonus, setFormBonus] = useState<BonusT>(emptyBonus)
  const [bonuses, setBonuses] = useState<BonusT[]>([])
  const [logoFile, setLogoFile] = useState<File | Blob>()
  const [logoError, setLogoError] = useState<string>('')
  const [showGroupForm, setShowGroupForm] = useState(false)
  const [isAllGroupsSelected, setIsAllGroupsSelected] = useState(false)

  useEffect(() => {
    if (bonusesSuccess) {
      setBonuses(bonusesData)
    }
  }, [bonusesData])

  useEffect(() => {
    if (isCreated) {
      setBonuses([...bonuses, formBonus])
    }
  }, [isCreated])

  useEffect(() => {
    if (studentsGroups?.results) {
      setGroupIds(studentsGroups.results.map(group => group.group_id as number))
    }
  }, [studentsGroups])

  function getLocalISOString(date: Date) {
    const offset = date.getTimezoneOffset()
    const offsetAbs = Math.abs(offset)
    const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
    return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(
      offsetAbs % 60,
    ).padStart(2, '0')}`
  }

  const getData = () => {
    const formData = new FormData()
    logoFile && formData.append('logo', logoFile)
    formData.append('link', formBonus.link)
    formData.append('text', formBonus.text)
    const dateobj = formBonus.expire_date
    const year = dateobj.getFullYear()
    const month = ('0' + (dateobj.getMonth() + 1)).slice(-2)
    const day = ('0' + dateobj.getUTCDate()).slice(-2)
    let hours: string = dateobj.getUTCHours().toString()
    hours = ('0' + hours).slice(-2)
    const minutes = ('0' + dateobj.getMinutes()).slice(-2)
    const seconds = ('0' + dateobj.getSeconds()).slice(-2)
    formData.append('expire_date', `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)

    formBonus.student_groups.map((group: number) => {
      formData.append('student_groups', String(group))
    })

    return formData
  }

  const handleAddBonus = async () => {
    const data = getData()
    await createBonus({ bonus: data, schoolName })
      .unwrap()
      .then(async () => {
        console.log('added')
      })
      .catch(error => {
        console.log(error)
      })
    setShowBonusForm(false)
  }

  const handleUpdateBonus = async () => {
    const data = getData()
    data.append('active', String(formBonus.active))
    await patchBonus({ data: data, id: formBonus.id, schoolName })
      .unwrap()
      .then(async () => {
        console.log('updated')
      })
      .catch(error => {
        console.log(error)
      })
    setShowBonusForm(false)
  }

  const handleCreateForm = () => {
    setIsEdit(false)
    setFormBonus(emptyBonus)
    setIsAllGroupsSelected(false)
    setShowBonusForm(true)
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
      setIsAllGroupsSelected(true)
      setFormBonus({
        ...formBonus,
        student_groups: groupIds,
      })
    } else {
      setIsAllGroupsSelected(false)
      setFormBonus({
        ...formBonus,
        student_groups: [],
      })
    }
  }

  return (
    <>
      {isFetching && (
        <div className={styles_load.loader}>
          <SimpleLoader style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      <div className={styles.bonuses_header}>
        <div className={styles.bonuses_header_title}>Бонусы и подарки</div>
        <button onClick={handleCreateForm} aria-hidden="true" tabIndex={-1} className={styles.bonuses_header_btn}>
          Добавить бонус
        </button>
      </div>
      <div className={styles.bonuses}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.table_header_item}></th>
              <th className={styles.table_header_item}>Ссылка</th>
              <th className={styles.table_header_item}>Описание</th>
              <th className={styles.table_header_item}>Срок истекает</th>
              <th className={styles.table_header_item}>Статус</th>
              <th className={styles.table_header_item}></th>
              <th className={styles.table_header_item}></th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {bonuses && bonuses?.length ? (
              bonuses?.map((bonus: BonusT) => (
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
              ))
            ) : (
              <tr style={{ width: '100%' }}>
                <td colSpan={7} className={styles.table_body_row} style={{ height: '84px', textAlign: 'center', color: '#332f36' }}>
                  Пока бонусов на платформе нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Dialog
          open={showBonusForm}
          onClose={() => setShowBonusForm(false)}
          PaperProps={{
            style: {
              maxHeight: '100vh',
              maxWidth: '677px',
              width: '100%',
              borderRadius: '16px',
              border: '1px solid',
              borderImageSource: 'linear-gradient(0deg, #FFFAFA 0%, #808080 100%)',
              padding: '43px 30px 58.5px 34px',
            },
          }}
        >
          <div onClick={() => setShowBonusForm(false)} className={styles.bonuses_closed}>
            <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
          </div>
          <DialogTitle
            sx={{
              fontFamily: 'SFPRORegular',
              fontWeight: 700,
              fontSize: {
                sm: '26px',
                md: '30px',
                lg: '36px',
              },
              color: 'rgba(0, 0, 0, 1)',
              lineHeight: '42.96px',
              margin: '0 auto',
              padding: '32px 0',
            }}
          >
            {isEdit ? 'Изменить акцию' : 'Добавить акцию'}
          </DialogTitle>
          <DialogContent sx={{ padding: 0 }}>
            <div className={styles.form_logoWrapper_logoBlock}>
              <div className={styles.form_logoWrapper}>
                <span className={styles.form_logoWrapper_logoBlock_title}>Логотип</span>
                {formBonus.logo ? (
                  <img className={styles.form_logoWrapper_logoBlock_img} src={formBonus.logo} alt="" />
                ) : (
                  <div className={styles.bonus_block_logoBlock_logo} />
                )}
                <input className={styles.bonus_block_logoBlock_input} value={''} name={'logo'} type={'file'} onChange={onChangeLogo} />
                <p className={styles.bonus_block_logoBlock_logo_title}>Добавьте файл PNG без фона</p>
              </div>
              {logoError && <p className={styles.form_logoWrapper_error}>{logoError}</p>}
            </div>
            <div className={styles.form_logoWrapper_logoBlock_input}>
              <Input
                id={'link'}
                placeholder={'Ссылка'}
                name={'link'}
                onChange={e => setFormBonus({ ...formBonus, link: e.target.value })}
                type={'url'}
                value={formBonus.link}
                style={{ marginBottom: '2rem', marginTop: '2rem' }}
              >
                <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
              </Input>
            </div>
            <div className={styles.form_logoWrapper_logoBlock_input}>
              <Input
                id={'text'}
                placeholder={'Описание'}
                name={'text'}
                onChange={e => setFormBonus({ ...formBonus, text: e.target.value })}
                type={'text'}
                value={formBonus.text}
                style={{ marginBottom: '2rem' }}
              >
                <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
              </Input>
            </div>
            <div className={styles.form_logoWrapper_logoBlock_input}>
              <Input
                id={'datetime-local'}
                placeholder={'Выберите дату и время окончания действия акции'}
                name={'datetime-local'}
                type={'datetime-local'}
                value={getLocalISOString(formBonus.expire_date).slice(0, 16)}
                style={{ marginBottom: '2rem' }}
                onChange={e => {
                  setFormBonus({
                    ...formBonus,
                    expire_date: new Date(e.target.value),
                  })
                }}
              ></Input>
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

            <div className={styles.form_logoWrapper_logoBlock_groups}>
              <div className={styles.form_groups} onClick={() => setShowGroupForm(true)}>
                Выберите одну или несколько групп
                <IconSvg styles={{ cursor: 'pointer' }} width={14} height={14} viewBoxSize={'0 0 14 14'} path={ArrowDownGreyIconPath} />
              </div>
            </div>
            <Dialog
              open={showGroupForm}
              onClose={() => setShowGroupForm(false)}
              PaperProps={{
                style: {
                  maxHeight: '100vh',
                  maxWidth: '600px',
                  width: '100%',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderImageSource: 'linear-gradient(0deg, #FFFAFA 0%, #808080 100%)',
                },
              }}
            >
              <DialogTitle sx={{ fontFamily: 'SFPRORegular' }}>Доступные для выбора группы</DialogTitle>
              <DialogContent>
                <span style={{ fontFamily: 'SFPRORegular' }}>Выбор всех групп</span>
                {studentsGroups && (
                  <Checkbox
                    style={{ color: '#357eeb' }}
                    checked={isAllGroupsSelected}
                    onChange={e => handleSelectAllGroups(e.target.checked)}
                    color="primary"
                  />
                )}
                {studentsGroups &&
                  Object.entries(
                    studentsGroups.results.reduce<Record<string, typeof studentsGroups.results>>((acc, group) => {
                      const courseName = group.course_name
                      if (courseName) {
                        if (!acc[courseName]) {
                          acc[courseName] = []
                        }
                        acc[courseName].push(group)
                      }
                      return acc
                    }, {}),
                  ).map(([courseName, groups]) => (
                    <div key={courseName} style={{ marginBlockStart: '3px' }}>
                      <b>{courseName}</b>
                      {groups.map((group, index) => (
                        <div key={group.group_id} style={{ marginBlockStart: index === 0 ? '3px' : '-10px' }}>
                          <Checkbox
                            style={{ color: '#357eeb' }}
                            checked={formBonus.student_groups.includes(group.group_id as number)}
                            onChange={e => {
                              const isChecked = e.target.checked
                              if (isChecked && group.group_id !== undefined) {
                                setFormBonus({
                                  ...formBonus,
                                  student_groups: [...formBonus.student_groups, group.group_id as number],
                                })
                              } else if (!isChecked && group.group_id !== undefined) {
                                setFormBonus({
                                  ...formBonus,
                                  student_groups: formBonus.student_groups.filter(id => id !== group.group_id),
                                })
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
                <Button onClick={() => setShowGroupForm(false)} text="Подтвердить" variant="newPrimary" />
              </DialogActions>
            </Dialog>

            {isEdit && (
              <div style={{ marginBottom: '1.5rem' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="active"
                      checked={formBonus.active}
                      sx={{
                        color: blue[800],
                        '&.Mui-checked': {
                          color: blue[600],
                        },
                      }}
                      onChange={e =>
                        isActivate &&
                        setFormBonus({
                          ...formBonus,
                          active: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Активировать"
                />
                {!isActivate && <div className={styles.warning}>Активирован может быть только один бонус</div>}
              </div>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: 0, justifyContent: 'space-between' }}>
            {isEdit ? (
              <div className={styles.form_button}>
                <Button onClick={handleUpdateBonus} text="Сохранить" variant="newPrimary" />
              </div>
            ) : (
              <div className={styles.form_button}>
                <Button onClick={handleAddBonus} text="Добавить" variant="newPrimary" />
              </div>
            )}
            <div className={styles.form_button}>
              <Button onClick={() => setShowBonusForm(false)} text="Отмена" variant="cancel" />
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
