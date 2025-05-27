import { IBanner } from 'api/apiTypes'
import React, { FC, useState } from 'react'
import styles from './Banner.module.scss'
import HubImage from '../../../assets/img/common/present_image.png'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deletePath, arrowDownPoligonPath } from 'config/commonSvgIconsPath'
import { settingsIconPath } from 'Pages/School/config/svgIconsPath'
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, Tooltip } from '@mui/material'
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
import { BannerStatistics } from 'components/BannerStatistics'

import { BannerGroups } from 'components/Modal/BannerGroups/BannerGroups'
import { Portal } from 'components/Modal/Portal'
import { penIconPath } from '../Main/iconComponents'
import { getNounDeclension } from 'utils/getNounDeclension'

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
  const [showCount, setShowCount] = useState<number>(banner.clicks_to_accept)
  const [showDeleteModal, { on: close, off: open }] = useBoolean(false)
  const [showGroupsModal, { on: closeGroups, off: openGroups, onToggle: setShow }] = useBoolean()

  const handleDeleteBanner = () => {
    deleteBanner({ id: banner.id, schoolName: schoolName })
      .unwrap()
      .then(() => {
        refetch()
        close()
      })
  }

  const toggleBanner = async () => {
    const formdata = new FormData()
    formdata.append('is_active', String(!banner.is_active))
    await saveChanges({ schoolName: schoolName, data: formdata, id: banner.id })
      .unwrap()
      .then(() => {
        refetch()
        toggleActive()
      })
  }

  const handleSave = async () => {
    if (title && description) {
      const formdata = new FormData()
      formdata.append('title', title)
      formdata.append('description', description)
      formdata.append('is_active', String(isActive))
      formdata.append('link', link)
      formdata.append('clicks_to_accept', String(showCount))
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
      <div className={styles.content_section}>
        <img src={HubImage} className={styles.image} />

        <div className={styles.wrapper_content}>
          <span>{isActive ? <p style={{ color: 'green' }}>Баннер активен</p> : <p style={{ color: 'red' }}>Баннер не активен</p>}</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckboxBall toggleChecked={toggleBanner} isChecked={isActive} />
            <span className={styles.banner_checkbox_status}>{isActive ? 'Баннер включен' : 'Выключен'}</span>
          </div>
          {!isEditing ? (
            <span className={styles.wrapper_content_title}>{banner.title}</span>
          ) : (
            <>
              <span>Название баннера</span>
              <div className={styles.banner_input_container}>
                <Input value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
            </>
          )}
          {!isEditing ? (
            <span className={styles.wrapper_content_description}>{HTMLReactParser(banner.description)}</span>
          ) : (
            <div className={styles.wrapper_content_announcement}>
              <span className={styles.wrapper_content_announcement_header}>
                Введите текст нового баннера{' '}
                <span className={styles.wrapper_content_announcement_header} style={{ color: '#fc6d6d' }}>
                  (обязательно сохраните текст после редактирования!)
                </span>
              </span>
              <div style={{ width: 'calc(100% + 10px)' }}>
                <MyEditor editedText={description} setDescriptionLesson={setDescription} />
              </div>
            </div>
          )}
          {banner.link &&
            (!isEditing ? (
              <a href={banner.link} className={styles.banner_go_link_btn_container} target="_blank" rel="noreferrer">
                <Button className={styles.banner_go_link_btn} variant={'newPrimary'} text="Перейти по ссылке" />
              </a>
            ) : (
              <>
                <div className={styles.banner_link_container}>
                  <span>Ссылка под кнопкой в баннере</span>
                  <div className={styles.banner_input_container}>
                    <Input value={link} onChange={e => setLink(e.target.value)} type="text" name="link" />
                    <div className={styles.penIcon}>
                      <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                    </div>
                  </div>
                </div>
              </>
            ))}
          {isEditing && (
            <div className={styles.banner_counterBlock}>
              <span>
                Баннер отобразится {showCount} {getNounDeclension(showCount, ['раз', 'раза', 'раз'])} у ученика
              </span>
              <Slider
                aria-label="Количество открытий у ученика"
                value={showCount}
                onChange={(event, value) => {
                  if (Array.isArray(value)) {
                    setShowCount(value[0])
                  } else {
                    setShowCount(value)
                  }
                }}
                color="primary"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                sx={{ ml: 1, color: '#1976d2 !important' }}
              />
            </div>
          )}
          {groups &&
            (!isEditing ? (
              <div className={styles.wrapper_content_groups}>
                <div style={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'column' }}></div>
              </div>
            ) : (
              <>
                <div className={styles.wrapper_content_groups}>
                  <span>Группы в которых будет отображен этот баннер:</span>
                  <div className={styles.banner_groups_btn_cont}>
                    <button onClick={setShow} className={styles.banner_groups_btn}>
                      Выберите одну или несколько групп
                    </button>
                    <IconSvg width={14} height={15} viewBoxSize="0 0 14 15" path={arrowDownPoligonPath}></IconSvg>
                  </div>

                  {showGroupsModal && (
                    <Portal closeModal={closeGroups}>
                      <BannerGroups refetch={refetch} schoolName={schoolName} setShowModal={setShow} groups={groups} banner={banner} />
                    </Portal>
                  )}
                </div>
                <div className={styles.wrapper_buttons}>
                  <Button style={{ padding: '17px 40px' }} onClick={handleSave} text="Сохранить" variant={'newPrimary'} />
                  <Button style={{ padding: '15px 40px' }} onClick={open} text="Удалить" variant={'cancel'} />
                </div>
              </>
            ))}
        </div>
      </div>
      {isEditing ? (
        <div className={styles.statistics_container}>
          <BannerStatistics banner={banner} schoolName={schoolName} />
        </div>
      ) : (
        <div></div>
      )}
      {!isEditing ? (
        <button className={styles.wrapper_buttons_edit} onClick={openEditing}>
          <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
        </button>
      ) : (
        <div></div>
      )}
    </motion.div>
  )
}
