import { IBanner } from 'api/apiTypes'
import React, { FC, useState } from 'react'
import styles from './Banner.module.scss'
import HubImage from '../../../assets/img/common/present_image.png'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deletePath } from 'config/commonSvgIconsPath'
import { settingsIconPath } from 'Pages/School/config/svgIconsPath'
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material'
import { useBoolean } from 'customHooks'
import { Input } from 'components/common/Input/Input/Input'
import CheckIcon from '@mui/icons-material/Check'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { CheckboxBall } from 'components/common/CheckboxBall'
import { useDeleteBannerMutation, useUpdateSchoolBannerMutation } from 'api/schoolBonusService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import HTMLReactParser from 'html-react-parser'
import { motion } from 'framer-motion'
import { Button } from 'components/common/Button/Button'
import { studentsGroupT } from 'types/studentsGroup'
import { isCheckedFunc } from 'utils/isCheckedFunc'
import { NewTextEditor } from 'components/AddTextEditor/NewTextEditor'
import { SelectInput } from '../../../components/common/SelectInput/SelectInput'
interface IBannerPreview {
  banner: IBanner
  groups: studentsGroupT
  refetch: () => void
}

export const BannerPreview: FC<IBannerPreview> = ({ banner, refetch, groups }) => {
  const schoolName = window.location.href.split('/')[4]
  const [isEditing, { on: closeEditing, off: openEditing }] = useBoolean(false)
  const [isActive, { onToggle: toggleActive }] = useBoolean(banner.is_active)
  const [description, setDescription] = useState<string>(banner.description)
  const [title, setTitle] = useState<string>(banner.title)
  const [link, setLink] = useState<string>(banner.link)
  const [saveChanges, { isLoading }] = useUpdateSchoolBannerMutation()
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation()
  const [activeGroups, setActiveGroups] = useState<number[]>(banner.groups)
  const [showDeleteModal, { on: close, off: open }] = useBoolean(false)
  const [allGroups, setAllGroups] = useState<boolean>(activeGroups.length === groups.results.length)


  const optionsList = [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' },
  ];

  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);


  const handleDeleteBanner = () => {
    deleteBanner({ id: banner.id, schoolName: schoolName })
      .unwrap()
      .then(() => {
        refetch()
        close()
      })
  }

  const handleSave = async () => {
    if (title && description) {
      const formdata = new FormData()
      formdata.append('title', title)
      formdata.append('description', description)
      formdata.append('is_active', String(isActive))
      activeGroups.map(grp => formdata.append('groups', String(grp)))
      await saveChanges({ schoolName: schoolName, data: formdata, id: banner.id })
        .unwrap()
        .then(() => {
          closeEditing()
          refetch()
        })
    }
  }

  const handleAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isAll = event.target.checked
    setAllGroups(isAll)
    const groupsIds = groups?.results.map(group => Number(group.group_id))
    if (isAll) {
      setActiveGroups(groupsIds)
    } else {
      setActiveGroups([])
    }
  }

  return (
    <motion.div className={styles.wrapper}>
      <Dialog open={showDeleteModal} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Вы действительно хотите удалить баннер "${banner.title}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Это действие безвозвратно удалит баннер, если вы не уверены, что хотите удалять баннер {`"${banner.title}"`}, то нажмите {'отмена'}. Если
            вы уверены, что хотите продолжить, нажмите {'удалить'}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} text={'Отмена'} />
          <Button onClick={handleDeleteBanner} autoFocus text={'Удалить'} variant={'delete'} />
        </DialogActions>
      </Dialog>
      <img src={HubImage} className={styles.image} />

      <div className={styles.wrapper_content}>
        <span>
          {isActive ? <p style={{ color: 'green' }}>Баннер активен</p> : <p style={{ color: 'red' }}>Баннер не активен</p>}
        </span>
        {/* {isEditing ? ( */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <CheckboxBall toggleChecked={toggleActive} isChecked={isActive} />
          <span className={styles.banner_checkbox_status}>{isActive ? 'Баннер включен' : 'Выключен'}</span>
        </div>
        {/* // ) : ( */}
        {/* // <div style={{ display: 'flex', gap: '10px' }}> */}
        {/* <span style={{ fontWeight: '500' }}> */}
        {/* {isActive ? <p style={{ color: 'green' }}>Баннер активен</p> : <p style={{ color: 'red' }}>Баннер не активен</p>} */}
        {/* </span> */}
        {/* </div> */}
        {/* // )} */}
        {!isEditing ? (
          <span className={styles.wrapper_content_title}>{banner.title}</span>
        ) : (
          <>
            <span>Название баннера</span>
            <Input value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" />
          </>
        )}
        {!isEditing ? (
          <span className={styles.wrapper_content_description}>{HTMLReactParser(banner.description)}</span>
        ) : (
          <div className={styles.wrapper_content_announcement}>
            <span>
              Введите текст нового баннера <span style={{ color: '#fc6d6d' }}>(обязательно сохраните текст после редактирования!)</span>
            </span>
            <div style={{ width: 'calc(100% + 10px)' }}>
              {/* <NewTextEditor text={description} setLessonDescription={setDescription} block={} setLessonBlocks={} lessonBlocks={} /> */}
            </div>
          </div>
        )}
        {banner.link &&
          (!isEditing ? (
            <a href={banner.link} target="_blank" rel="noreferrer">
              <Button text="Перейти по ссылке" />
            </a>
          ) : (
            <>
              <span>Ссылка под кнопкой в баннере</span>
              <Input value={link} onChange={e => setLink(e.target.value)} type="text" name="link" />
            </>
          ))}
        {groups &&
          (!isEditing ? (
            <div className={styles.wrapper_content_groups}>
              <span>Группы в которых отображается этот баннер при входе на платформу:</span>
              <div style={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'column' }}>
                {/* {groups.results.map(
                  grp =>
                    activeGroups.includes(Number(grp.group_id)) && (
                      <span style={{ color: '#4d5766', fontSize: '12px', marginRight: '1rem', flexBasis: 20 }}>{grp.name}</span>
                    ),
                )} */}
                {Object.entries(
                  groups.results.reduce<Record<string, typeof groups.results>>((acc, group) => {
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
                  <div key={courseName} style={{ marginBlockStart: '8px' }}>
                    {groups.length > 0 && groups.find(grp => activeGroups.includes(Number(grp.group_id))) && <b>{courseName}</b>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {groups.map(
                        (group, index) =>
                          activeGroups.includes(Number(group.group_id)) && (
                            <span style={{ color: '#4d5766', fontSize: '12px', marginRight: '1rem', flexBasis: 20 }}>{group.name}</span>
                          ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className={styles.wrapper_content_groups}>
                <span>Группы в которых будет отображен этот баннер:</span>
                <div>
                <Checkbox
                  style={{ color: '#ba75ff' }}
                  checked={allGroups}
                  onChange={e => {
                    handleAllGroups(e)
                  }}
                />
                <span>
                  <b>выбрать все группы</b>
                </span>
              </div>
                {/* {/* <SelectInput  */}
                {/* optionsList={optionsList} */}
              {/* ></SelectInput> */}

                {Object.entries(
                  groups.results.reduce<Record<string, typeof groups.results>>((acc, group) => {
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
                          style={{ color: '#ba75ff' }}
                          checked={isCheckedFunc(group.group_id as number, activeGroups)}
                          onChange={e => {
                            const isChecked = e.target.checked
                            if (!isChecked) {
                              setAllGroups(false)
                              setActiveGroups(prevGrps => prevGrps.filter(grp => grp !== Number(group.group_id)))
                            } else {
                              setActiveGroups(prevGrps => prevGrps.concat(Number(group.group_id)))
                            }
                          }}
                        />
                        {group.name}
                        <span> (Кол-во студентов: {group.students.length})</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className={styles.wrapper_buttons}>
                <div className={styles.wrapper_buttons_confirm} onClick={handleSave}>
                  Сохранить
                </div>
                <div className={styles.wrapper_buttons_delete} onClick={open}>
                  Удалить
                </div>
              </div>
            </>
          ))}
      </div>
      {!isEditing ? (
        <button className={styles.wrapper_buttons_edit} onClick={openEditing}>
          <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
        </button>
      ) : (<div></div>)}
    </motion.div>
  )
}
