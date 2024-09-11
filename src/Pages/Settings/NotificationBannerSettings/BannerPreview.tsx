import { IBanner } from 'api/apiTypes'
import { FC, FormEvent, useState } from 'react'
import styles from './Banner.module.scss'
import HubImage from './assets/course-hub-banner.png'
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

  const handleCheckAll = () => {
    const checkedGrps = groups.results.map(grp => grp.group_id)
    const validateArray = checkedGrps instanceof Array && (checkedGrps as number[]).every(item => typeof item === 'number')
    if (validateArray) {
      setActiveGroups(checkedGrps as number[])
    }
  }

  const handleUncheckAll = () => {
    setActiveGroups([])
  }

  const handleDeleteBanner = () => {
    deleteBanner({ id: banner.id, schoolName: schoolName })
      .unwrap()
      .then(() => {
        refetch()
        close()
      })
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    if (title && description) {
      const formdata = new FormData()
      formdata.append('title', title)
      formdata.append('description', description)
      formdata.append('is_active', String(isActive))
      formdata.append('link', link)
      activeGroups.map(grp => formdata.append('groups', String(grp)))
      await saveChanges({ schoolName: schoolName, data: formdata, id: banner.id })
        .unwrap()
        .then(() => {
          closeEditing()
          refetch()
        })
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
      <form className={styles.wrapper} onSubmit={handleSave}>
        <div className={styles.wrapper_content}>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckboxBall toggleChecked={toggleActive} isChecked={isActive} />
              <span style={{ fontWeight: '500' }}>{isActive ? 'Баннер включен' : 'Выключен'}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontWeight: '500' }}>
                {isActive ? <p style={{ color: 'green' }}>Баннер активен</p> : <p style={{ color: 'red' }}>Баннер неактивен</p>}
              </span>
            </div>
          )}
          {!isEditing ? (
            <span className={styles.wrapper_content_title}>{banner.title}</span>
          ) : (
            <>
              <span style={{ fontWeight: '500' }}>Название баннера</span>
              <Input value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" required />
            </>
          )}
          {!isEditing ? (
            <span className={styles.wrapper_content_description}>{HTMLReactParser(banner.description)}</span>
          ) : (
            <>
              <span style={{ fontWeight: '500' }}>
                Объявление <span style={{ color: '#fc6d6d' }}>(обязательно сохраните текст после редактирования!)</span>
              </span>
              <div style={{ width: 'calc(100% + 10px)' }}>
                <MyEditor editedText={description} setDescriptionLesson={setDescription} />
              </div>
            </>
          )}
          {banner.link &&
            (!isEditing ? (
              <a href={banner.link} target="_blank" rel="noreferrer">
                <Button text="Перейти по ссылке" />
              </a>
            ) : (
              <>
                <span style={{ fontWeight: '500' }}>Ссылка под кнопкой в баннере</span>
                <Input value={link} onChange={e => setLink(e.target.value)} type="text" name="link" required />
              </>
            ))}
          {groups &&
            (!isEditing ? (
              <div className={styles.wrapper_content_groups}>
                <span style={{ fontWeight: '500' }}>Группы в которых отображается этот баннер при входе на платформу:</span>
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
                      <b>{`Группы курса "${courseName}":`}</b>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {groups.map(
                          grp =>
                            activeGroups.includes(Number(grp.group_id)) && (
                              <span key={grp.group_id} style={{ color: '#4d5766', fontSize: '12px', marginRight: '1rem' }}>
                                {grp.name}
                              </span>
                            ),
                        )}
                        {/* {groups.map((group, index) => (
                        <span key={group.group_id} style={{ color: '#4d5766', fontSize: '12px', marginRight: '1rem' }}>
                          {group.name}
                        </span>
                      ))} */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.wrapper_content_groups}>
                <span style={{ fontWeight: '500' }}>Группы в которых будет отображен этот баннер:</span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button text={'Выбрать все группы'} onClick={handleCheckAll} type="button" />
                  <Button text={'Снять выделение со всех групп'} variant="delete" onClick={handleUncheckAll} type="button" />
                </div>
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
            ))}
        </div>
        <div className={styles.wrapper_buttons}>
          {!isEditing ? (
            <button className={styles.wrapper_buttons_edit} onClick={openEditing}>
              <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
            </button>
          ) : (
            <>
              <Tooltip title="Сохранить баннер">
                <button className={styles.wrapper_buttons_confirm} type="submit">
                  {isLoading ? <SimpleLoader /> : <CheckIcon />}
                </button>
              </Tooltip>
              <Tooltip title="Удалить баннер">
                <div className={styles.wrapper_buttons_delete} onClick={open}>
                  <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
                </div>
              </Tooltip>
            </>
          )}
        </div>
      </form>
    </motion.div>
  )
}
