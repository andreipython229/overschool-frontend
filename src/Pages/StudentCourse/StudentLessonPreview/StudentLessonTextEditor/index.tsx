import React, { FC, ChangeEvent, useState, MouseEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AddFileBtn } from 'components/common/AddFileBtn/index'
import { Button } from 'components/common/Button/Button'
import { usePostUserHomeworkMutation } from 'api/userHomeworkService'
import { UploadedFile } from 'components/UploadedFile'
import { usePostTextFilesMutation } from 'api/filesService'
import { Alert, Snackbar, Stack, TextareaAutosize } from '@mui/material'
import { IHomework } from '../../../../types/sectionT'
import { CheckHw, StudentHomeworkCheck } from '../StudentHomeworkCheck'

import styles from './studentLessonTextEditor.module.scss'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'

type textEditorT = {
  homeworkId: number
  homework: IHomework
  setHwSended: (arg: boolean) => void
}

export const StudentLessonTextEditor: FC<textEditorT> = ({ homeworkId, homework, setHwSended }) => {
  const [files, setFiles] = useState<File[]>([])
  const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
  const [text, setText] = useState<string>('')
  const [hwStatus, setHwStatus] = useState<boolean>(!!homework?.user_homework_checks)
  const [replyArray, setReplyArray] = useState<CheckHw[]>(homework?.user_homework_checks)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const schoolName = window.location.href.split('/')[4]
  const { course_id: courseId } = useParams()

  const [postHomework] = usePostUserHomeworkMutation()
  const [postFiles] = usePostTextFilesMutation()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleUploadFiles = (chosenFiles: File[]) => {
    const uploaded = [...files]
    const uploadedUrlFiles = [...urlFiles]

    chosenFiles.some(file => {
      if (uploaded.findIndex(f => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })

    chosenFiles.forEach(file => {
      const url = URL.createObjectURL(file)
      uploadedUrlFiles.push({ url, name: file.name })
    })

    setFiles(uploaded)
    setUrlFiles(uploadedUrlFiles)
  }

  const handleDeleteFile = (index: number) => {
    setFiles(files => files.filter((_, id) => id !== index))
    setUrlFiles(files => files.filter((_, id) => id !== index))
  }

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files)

    handleUploadFiles(chosenFiles)
  }

  const handleSendHomework = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (courseId) {
      // Извлекаем список курсов и их значений is_copy из localStorage
      const courseData = JSON.parse(localStorage.getItem('course_data') || '{}');
      const formDataHw = new FormData()
      formDataHw.append('homework', String(homeworkId))
      formDataHw.append('text', String(text))

      // Если courseId является копией, добавляем его в запрос
      const homeworkPayload = { homework: homeworkId, text, schoolName, course_id: Number(courseId) }

      await postHomework(homeworkPayload)
        .unwrap()
        .then((data) => {
          setHwSended(true)
          const formDataFile = new FormData()

          files.forEach((file, index) => {
            formDataFile.append('files', file)
            formDataFile.append('courseId', courseId)
          })
          formDataFile.append('user_homework', String(data.user_homework_id))

          if (!replyArray) {
            setReplyArray([
              {
                audio_files: [],
                author: data.author,
                author_first_name: '',
                author_last_name: '',
                created_at: data.created_at,
                mark: 0,
                profile_avatar: '',
                status: data.status,
                text: String(formDataHw.get('text')) || '',
                text_files: [],
                updated_at: data.updated_at,
                user_homework: data.user_homework_id,
                user_homework_check_id: 0,
              },
            ])
          }
          if (files && files.length > 0) {
            postFiles({ formData: formDataFile, schoolName })
              .unwrap()
              .then(() => {
                setHwStatus(true)
                setIsLoading(false)
              })
              .catch(() => {
                setHwStatus(true)
                setOpen(true)
                setIsLoading(false)
              })
          } else {
            setHwStatus(true)
            setIsLoading(false)
          }
        })
        .catch(() => {
          setIsLoading(false)
          setHwStatus(true)
          setOpen(true)
        })
    }
  }

  useEffect(() => {
    setReplyArray(homework.user_homework_checks)
    setHwStatus(!!homework.user_homework_checks)
    setText('')
    setFiles([])
    setUrlFiles([])
  }, [homeworkId, homework])

  if (isLoading) {
    return <SimpleLoader />
  }

  return !hwStatus ? (
    <div className={styles.wrapper}>
      <h5 className={styles.wrapper_title}>Отправить данные, запросить ответ ИИ:</h5>
      <TextareaAutosize
        aria-label="Введите ответ на индивидуальное занятие..."
        placeholder="Введите ответ на индивидуальное занятие..."
        minRows={5}
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <span className={styles.wrapper_form_help}>Добавьте файл(-ы):</span>
      <AddFileBtn handleChangeFiles={handleChangeFiles} />
      {urlFiles?.map(({ url, name }, index: number) => (
        <UploadedFile
          key={index}
          file={url}
          index={index}
          name={name}
          size={files.length > 0 ? files[index].size : 0}
          isHw={true}
          handleDeleteFile={handleDeleteFile}
        />
      ))}
      {(text || urlFiles.length > 0) && (
        <Button style={{ marginTop: '20px' }} variant="primary" text="Отправить" type="submit" onClick={handleSendHomework} />
      )}
    </div>
  ) : (
    <>
      <StudentHomeworkCheck homework={homework} replyArray={replyArray?.length > 0 ? replyArray : []} />
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            {'Ошибка отправки чек-поинта :('}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}
