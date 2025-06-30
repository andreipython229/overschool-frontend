import React, { FC, useEffect, useState, useRef } from 'react'
import { useCreateAutowebinarMutation, useUpdateAutowebinarMutation, useDeleteAutowebinarMutation } from 'api/autowebinarsService'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Button } from 'components/common/Button/Button'
import styles from './addWebinar.module.scss'
import { Input } from 'components/common/Input/Input/Input'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector } from 'selectors'
import { Autowebinar, CreateWebinar } from "types/autowebinarsT";
import { crossIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'

interface AddWebinarProps {
  showAddWebinarForm: boolean
  setShowAddWebinarForm: (show: boolean) => void
  existingWebinar?: Autowebinar
}

export const AddWebinar: FC<AddWebinarProps> = ({ showAddWebinarForm, setShowAddWebinarForm, existingWebinar }) => {
  const schoolName = useAppSelector(schoolNameSelector)
  const [createWebinar, { isLoading, error }] = useCreateAutowebinarMutation()
  const [updateWebinar] = useUpdateAutowebinarMutation()
  const [deleteWebinar] = useDeleteAutowebinarMutation()
  const [isEditMode, setIsEditMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonFileName, setJsonFileName] = useState('');
  const weekdayList = [
    { label: 'Пн', value: 0 },
    { label: 'Вт', value: 1 },
    { label: 'Ср', value: 2 },
    { label: 'Чт', value: 3 },
    { label: 'Пт', value: 4 },
    { label: 'Сб', value: 5 },
    { label: 'Вс', value: 6 },
  ];
  const initialWebinarState: CreateWebinar = {
    title: '',
    description: '',
    youtube_url: '',
    video: undefined,
    is_active: true,
    start_time: '',
    weekdays: [],
    has_chat: true,
    chat_script: {},
    duration_minutes: undefined,
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      console.log('json')
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    setJsonFileName(file.name);
    reader.onload = function() {
      try {
        if (typeof reader.result === 'string') {
          const json = JSON.parse(reader.result);
          setNewWebinarData((prev) => ({ ...prev, chat_script: json }));
        } else {
          console.log('err')
        }
      } catch (err) {
        console.log(err)
      }
    };
  };

  const [newWebinarData, setNewWebinarData] = useState<CreateWebinar>(initialWebinarState);

  const createNewWebinar = () => {
    const formData = new FormData();
    formData.append('title', newWebinarData.title);
    formData.append('description', newWebinarData.description ?? '');
    formData.append('youtube_url', newWebinarData.youtube_url ?? '');
    formData.append('start_time', newWebinarData.start_time);
    formData.append('is_active', String(newWebinarData.is_active));
    formData.append('has_chat', String(newWebinarData.has_chat));
    formData.append('duration_minutes', String(newWebinarData.duration_minutes ?? ''));
    formData.append('weekdays', JSON.stringify(newWebinarData.weekdays));
    formData.append('chat_script', JSON.stringify(newWebinarData.chat_script));
    if (newWebinarData.video) {
      formData.append('video', newWebinarData.video);
    }
    createWebinar({ schoolName, formData });
  }
  const editExistsWebinar = () => {
    const formData = new FormData();
    formData.append('title', newWebinarData.title);
    formData.append('description', newWebinarData.description ?? '');
    formData.append('youtube_url', newWebinarData.youtube_url ?? '');
    formData.append('start_time', newWebinarData.start_time);
    formData.append('is_active', String(newWebinarData.is_active));
    formData.append('has_chat', String(newWebinarData.has_chat));
    formData.append('duration_minutes', String(newWebinarData.duration_minutes ?? ''));
    formData.append('weekdays', JSON.stringify(newWebinarData.weekdays));
    formData.append('chat_script', JSON.stringify(newWebinarData.chat_script));
    if (newWebinarData.video) {
      formData.append('video', newWebinarData.video);
    }
    if (existingWebinar) {
      updateWebinar({
        id: existingWebinar.id,
        formData,
        schoolName,
      })
      .unwrap()
      .then(() => {
        setShowAddWebinarForm(false)
      })
      .catch(error => {
        console.error('Error updating meeting', error)
      })
    }
  }

  const deleteExistsWebinar = () => {
    if (existingWebinar) {
      deleteWebinar({
        id: existingWebinar.id,
        schoolName,
      })
      .then(() => {
        setShowAddWebinarForm(false)
      })
    }
  }

  const handleAddWebinar = () => {
    if (isEditMode) {
      editExistsWebinar()
    } else {
      createNewWebinar()
    }
  }

  const handleCancel = () => {
    if (isEditMode) {
      deleteExistsWebinar()
    } else {
      setShowAddWebinarForm(false)
    }
  }

  useEffect(() => {
    if (existingWebinar) {
      setIsEditMode(true)
      setNewWebinarData({
        ...newWebinarData,
        title: existingWebinar.title || '',
        description: existingWebinar.description || '',
        youtube_url: existingWebinar.youtube_url || undefined,
        is_active: existingWebinar.is_active || true,
        start_time: existingWebinar.start_time || '',
        weekdays: existingWebinar.weekdays,
        has_chat: existingWebinar.has_chat,
        chat_script: existingWebinar.chat_script || undefined,
        duration_minutes: existingWebinar.duration_minutes,
      })
    }
  }, [existingWebinar])

  return (
    <>
      <Dialog
        className={styles.modal_background}
        open={showAddWebinarForm}
        onClose={() => setShowAddWebinarForm(false)}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#fff',
            border: '1px solid #3170E7',
            borderRadius: '24px',
            padding: '44px',
            '@media screen and (max-width: 1023px), screen and (max-aspect-ratio: 1/1)': {
              padding: '20px',
              width: '90%',
            },
          },
          '& .MuiTypography-h6': {
            fontSize: '24px',
            fontWeight: '500',
            color: '#332F36',
            '@media screen and (max-width: 1023px), screen and (max-aspect-ratio: 1/1)': {
              padding: '20px 0',
              fontSize: '18px',
            },
          },
          '& .MuiTypography-root': {
            width: '100%',
            textAlign: 'center',
            zIndex: '2',
          },
          '& .MuiDialogContent-root': {
            fontSize: '16px',
            color: '#332F36',
            padding: '0',
            zIndex: '2',
          },
          '& .MuiInputBase-root': {
            borderRadius: '10px',
            border: 'none',
            textAlign: 'left',
          },

          '& .MuiSelect-select': {
            backgroundColor: '#CFE2FF',
            borderRadius: '10px',
          },

          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
            borderRadius: '10px',
          },

          '& .MuiDialogActions-root': {
            marginTop: '24px',
            display: 'flex',
            gap: '6px',
            justifyContent: 'space-between',
            padding: '0',
            borderRadius: '10px',
            button: {
              padding: '16px',
              width: '100%',
              zIndex: '2',
            },
          },
        }}
      >
        <div className={styles.modal_ellipse}></div>
        <div onClick={() => setShowAddWebinarForm(false)} className={styles.modal_closed}>
          <IconSvg width={50} height={50} viewBoxSize="0 0 58 58" path={crossIconPath} />
        </div>
        <DialogTitle>{!isEditMode ? 'Добавить автовебинар' : 'Редактировать автовебинар'}</DialogTitle>
        <DialogContent className={styles.modal_window}>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Тема автовебинара"
              value={newWebinarData.title}
              onChange={e => setNewWebinarData({ ...newWebinarData, title: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Описание"
              value={newWebinarData.description ?? ''}
              onChange={e => setNewWebinarData({ ...newWebinarData, description: e.target.value })}
            />
          </div>
          <div>
            <Input
              type="text"
              id="youtube_url"
              name="youtube_url"
              placeholder="YouTube URL (если используется*)"
              value={newWebinarData.youtube_url ?? ''}
              onChange={e => setNewWebinarData({ ...newWebinarData, youtube_url: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>*Рекомендуется загружать видеофайл напрямую. При использовании ссылки на YouTube возможны ограничения функционала из-за условий пользования платформой.</div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={e =>
                setNewWebinarData({ ...newWebinarData, video: e.target.files?.[0] })
              }
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #332f36',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                backgroundColor: '#ffffff',
              }}
            >
              <span className={styles.input_span}>
                {newWebinarData.video?.name || 'Загрузите видео...'}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Выбрать
              </button>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              type="time"
              id="start_time"
              name="start_time"
              placeholder="Время начала"
              value={newWebinarData.start_time}
              onChange={e => setNewWebinarData({ ...newWebinarData, start_time: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              type="number"
              id="duration_minutes"
              name="duration_minutes"
              placeholder="Длительность (в минутах)"
              value={newWebinarData.duration_minutes?.toString() ?? ''}
              onChange={e => setNewWebinarData({ ...newWebinarData, duration_minutes: Number(e.target.value)})}
            />
          </div>
          <div>
            <label style={{ alignItems: 'center', marginRight: 'auto', gap: '1rem', display: 'inline-flex' }}>
              <input
                type="checkbox"
                checked={newWebinarData.has_chat}
                onChange={e => setNewWebinarData({ ...newWebinarData, has_chat: e.target.checked })}
              />
              Включить чат
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="file"
              id="chat_script_input"
              accept="application/JSON"
              ref={jsonInputRef}
              style={{ display: 'none' }}
              onChange={handleJsonUpload}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #332f36',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                backgroundColor: '#ffffff',
              }}
            >
              <span className={styles.input_span}>
                {jsonFileName || 'Загрузите json-файл с комментариями...'}
              </span>
              <button
                type="button"
                onClick={() => jsonInputRef.current?.click()}
                style={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Выбрать
              </button>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Выберете дни недели:</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {weekdayList.map(day => (
                <label key={day.value} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <input
                    type="checkbox"
                    checked={newWebinarData.weekdays?.includes(day.value)}
                    onChange={e => {
                      const updated = e.target.checked
                        ? [...newWebinarData.weekdays, day.value]
                        : newWebinarData.weekdays.filter(d => d !== day.value);
                      setNewWebinarData({ ...newWebinarData, weekdays: updated });
                    }}
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className={styles.add_meeting_btn} onClick={handleAddWebinar} variant={'newPrimary'} text={isEditMode ? 'Сохранить' : 'Добавить'} />
          <Button className={styles.add_meeting_btn} onClick={handleCancel} variant={'cancel'} text={isEditMode ? 'Удалить' : 'Отмена'} />
        </DialogActions>
      </Dialog>
    </>
  )
}
