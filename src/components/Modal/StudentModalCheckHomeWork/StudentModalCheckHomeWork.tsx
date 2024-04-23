import React, { useState, FC, ChangeEvent, useEffect, memo } from 'react'
import parse from 'html-react-parser'

import { UploadedFile } from 'components/UploadedFile'
import { iocnsByStatus } from 'components/HomeworksStatsTable/config/iocnsByStatus'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { useFetchUserHomeworkQuery, useFetchHomeworkDataQuery, useCreateCheckReplyMutation } from '../../../api/userHomeworkService'
import { convertDate } from 'utils/convertDate'
import { UserHomework, CurrentUser } from 'types/homeworkT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { UserHomeworkHistory } from 'components/UserHomeworkHistory'
import { usePostTextFilesMutation } from 'api/filesService'
import { AudioFile } from '../../AudioFile'
import {
  taskIconPath,
  lastAnswIconPath,
  humanIconPath,
  paperClipIconPath,
  starIconPath,
  sendIconPath,
  arrIconPath,
  closeHwModalPath,
} from './config/svgIconsPsth'

import styles from './modal_check_home_work.module.scss'
import { TextField } from '@mui/material'

type studentModalHomeworkT = {
  id: number
  closeModal: () => void
  hwStatus: boolean
}

type fileT = {
  name: string
  size: number
  file: string
}

export const StudentModalCheckHomeWork: FC<studentModalHomeworkT> = memo(({ id, closeModal, hwStatus }) => {
  const [userHomework, setUserHomework] = useState<UserHomework>()
  const [currentUser, setCurrentUser] = useState<CurrentUser>()
  const [isUser, setIsUser] = useState<boolean>(true)
  const schoolName = window.location.href.split('/')[4]

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isHwOpen, setIsHwOpen] = useState<boolean>(false)

  const [mark, setMark] = useState<number>(0)
  const [status, setStatus] = useState<string>('Принято')
  const [text, setText] = useState<string>('')
  const [files, setFiles] = useState<fileT[]>([])
  const [nativeFiles, setNativeFiles] = useState<File[]>([])

  const { data, isFetching, isSuccess } = useFetchUserHomeworkQuery({ id, schoolName })
  const { data: homework, isFetching: isHwFetching } = useFetchHomeworkDataQuery({ id: userHomework?.homework as number, schoolName })
  const [sendHomeworkCheck, { data: sendResult, status: sendHwCheckSuccess }] = useCreateCheckReplyMutation()
  const [sendFiles, { isLoading, isSuccess: sendFilesSuccess }] = usePostTextFilesMutation()

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = e.target.files

    const prevFiles = [...nativeFiles]
    const uploadedFiles = [...files]

    Array.from(chosenFiles ?? []).some(file => {
      if (files.findIndex(f => f.name === file.name) === -1) {
        const fileString = URL.createObjectURL(file)
        uploadedFiles.push({ name: file.name, size: file.size, file: fileString })
        prevFiles.push(file)
      }
    })

    setFiles(uploadedFiles)
    setNativeFiles(prevFiles)
  }

  const handleDeleteFile = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index))
  }

  const handleCreateHomeworkCheck = async () => {
    const dataToSend = {
      text,
      mark,
      user_homework: userHomework?.user_homework_id,
    }

    try {
      await sendHomeworkCheck({ data: dataToSend, schoolName })
        .unwrap()
        .then(data => {
          setText('')
          setMark(0)
          setStatus('')
          if (files && files.length > 0) {
            const formData = new FormData()
            formData.append('user_homework_check', `${data.user_homework_check_id}`)
            nativeFiles.forEach(file => {
              formData.append(`files`, file)
            })
            sendFiles({ formData, schoolName })
              .unwrap()
              .then(data => {
                setNativeFiles([])
                setFiles([])
              })
              .catch(error => {
                setText('')
                setMark(0)
                setStatus('')
                setNativeFiles([])
                setFiles([])
              })
          }
        })
        .catch(error => {
          return null
        })
    } catch (error) {
      return null
    }
  }

  console.log(text)

  useEffect(() => {
    if (isSuccess) {
      setUserHomework(data)
      const {
        last_reply: { author_last_name, author_first_name, updated_at, profile_avatar, text_files, audio_files, text },
      } = data

      const user = {
        name: author_first_name,
        surname: author_last_name,
        last_reply: updated_at,
        avatar: profile_avatar,
        text_files,
        audio_files,
        text,
      }

      setCurrentUser(user)

      if (data.status.toLocaleLowerCase() === 'ждет проверки') {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
    }
  }, [isFetching])

  useEffect(() => {
    if (sendFilesSuccess) {
      setNativeFiles([])
      setFiles([])
    }
  }, [sendFilesSuccess])

  useEffect(() => {
    if (sendHwCheckSuccess) {
      setText('')
      setMark(0)
      setStatus('')
    }
  }, [sendHwCheckSuccess])

  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(currentUser?.last_reply || ''))

  return (
    <div className={styles.modal_content} role="dialog" aria-modal="true">
      {(isFetching || isHwFetching) && (
        <div className={styles.loader_wrapper}>
          <SimpleLoader style={{ margin: '50px', height: '50px' }} />
        </div>
      )}
      <button className={styles.modal_content_close} onClick={closeModal}>
        <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
      </button>
      <div className={styles.header_info}>
        <h3 className={styles.answer_header}>{userHomework?.homework_name} </h3>
        <p className={styles.task_status}> {hwStatus ? ' - Принято' : ' - Отправлен запрос ИИ'}</p>
        <div className={styles.task_container}>
          <button className={styles.btn_grey} onClick={() => setIsHwOpen(open => !open)}>
            <IconSvg width={19} height={20} viewBoxSize="0 0 19 20" path={taskIconPath} />
            <span>Посмотреть задачу в чек-поинте</span>
          </button>
          {isHwOpen && (
            <div className={styles.task_modal}>
              <div className={styles.task_modal_track}>
                <div className={styles.task_modal_inner}>
                  <div className={styles.task_modal_title}>
                    <h3>{homework?.name}</h3>
                    {/* <span>{userHomework?.course_name}</span> */}
                  </div>
                  <div className={styles.task_modal_text}>{parse(homework?.description || '')}</div>
                  {((homework?.audio_files && homework.audio_files.length > 0) || (homework?.text_files && homework.text_files.length > 0)) && (
                    <div className={styles.task_modal_files}>
                      <span>Материалы к заданию:</span>
                      <div>
                        {homework?.text_files.map((file, index) => (
                          <UploadedFile key={file.id} index={index} name={file.file_url} file={`${file.file}`} size={1000} />
                        ))}
                      </div>
                      <div className={styles.task_modal_audio}>
                        {homework?.audio_files.map(file => (
                          <AudioFile key={file.id} audioUrl={`${file.file_url}`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.task_info}>
        <div className={styles.task_info_item}>
          {iocnsByStatus[userHomework?.status as string]?.icon}
          <span>
            {userHomework?.status === 'Ждет проверки'
              ? 'Отправлен запрос ИИ'
              : userHomework?.status === 'Отклонено'
              ? 'Вы направили некорректные данные. Рекомендуем вернуться к справочному материалу и попробовать снова'
              : userHomework?.status}
          </span>
        </div>

        <div className={styles.task_info_item}>
          <IconSvg width={18} height={18} viewBoxSize="0 0 18 18" path={lastAnswIconPath} />
          <span>
            Последний ответ: {mmddyyyy} в {hoursAndMinutes}
          </span>
        </div>

        {/* <div className={styles.task_info_item}>
          <IconSvg width={16} height={18} viewBoxSize="0 0 16 18" path={humanIconPath} />
          <span>Проверяющий: </span>
          {!isUser && (
            <div className={styles.task_info_wrapper}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="avatar" />
              ) : (
                <div className={styles.task_info_avatar_block}>
                  {currentUser?.surname.charAt(0) || 'б'}
                  {currentUser?.name.charAt(0) || 'и'}
                </div>
              )}
              <span>
                {currentUser?.surname || 'без'} {currentUser?.name || 'имени'}
              </span>
            </div>
          )}
        </div> */}
      </div>
      <h3 className={styles.answer_hw_header}>Последний ответ {isUser ? 'пользователя' : 'ИИ-помощника'}</h3>
      <div className={styles.teacher}>
        {currentUser?.avatar ? (
          <img className={styles.teacher_avatar} src={currentUser?.avatar} alt="User Avatar" />
        ) : (
          <div className={styles.teacher_avatar_block}>
            {currentUser?.surname.charAt(0) || 'б'}
            {currentUser?.name.charAt(0) || 'и'}
          </div>
        )}
        <div className={styles.teacher_teacherData}>
          <span className={styles.teacher_teacherData_name}>{`${currentUser?.surname || 'Без'} ${currentUser?.name || 'Имени'}`}</span>
          <span className={styles.teacher_teacherData_date}>
            {mmddyyyy} в {hoursAndMinutes}
          </span>
        </div>
      </div>

      <div className={styles.speech_bubble}>
        <div>{parse(currentUser?.text || '')}</div>
        <div style={{ maxWidth: '500px' }}>
          <div>
            {userHomework?.last_reply.text_files.map((file, index) => (
              <UploadedFile key={file.id} index={index} name={file.file_url} file={`${file.file}`} size={file.size} />
            ))}
          </div>
          <div className={styles.task_modal_audio}>
            {userHomework?.last_reply.audio_files.map(file => (
              <AudioFile key={file.id} audioUrl={`${file.file}`} />
            ))}
          </div>
        </div>
      </div>

      {!hwStatus && (
        <>
          <TextField
            id="outlined-basic"
            label="Введите Ваш ответ..."
            variant="outlined"
            style={{ width: '100%' }}
            rows={5}
            onChange={event => setText(event.target.value)}
            value={text}
          />
          <div className={styles.bottomButtons}>
            <div className={styles.files_upload_container}>
              <form acceptCharset="utf-8" className={styles.wrapper_form}>
                <label className={styles.wrapper_form_addFiles}>
                  <IconSvg width={18} height={15} viewBoxSize="0 0 20 18" path={paperClipIconPath} />
                  <input type="file" onChange={handleUploadFiles} multiple />
                  Прикрепить файл
                </label>
              </form>
              <div>
                {files?.map(({ file, size, name }, index: number) => (
                  <UploadedFile key={index} file={file} size={size} name={name} index={index} handleDeleteFile={handleDeleteFile} isHw={true} />
                ))}
              </div>
            </div>
            <div className={styles.btns__container}>
              <button className={styles.bottomButtons_btn_send} onClick={handleCreateHomeworkCheck}>
                <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={sendIconPath} />
                <span>Отправить данные</span>
              </button>
            </div>
          </div>
        </>
      )}

      <button className={styles.modal_btn_is_toggle} onClick={handleToggleHiddenBlocks}>
        <span className={isOpen ? styles.arrow_rotate : ''}>
          <IconSvg width={25} height={25} viewBoxSize="0 0 21 21" path={arrIconPath} />
        </span>
        {isOpen ? 'Скрыть историю проверки' : 'Показать историю проверки'}
      </button>
      {isOpen && (
        <div className={styles.modal_hidden_block}>
          <p className={styles.modal_hidden_block_title}>История проверок</p>

          <div className={styles.modal_hidden_block_history}>
            {userHomework?.user_homework_checks?.map(homework => (
              <UserHomeworkHistory key={homework.user_homework_check_id} homework={homework} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
})
