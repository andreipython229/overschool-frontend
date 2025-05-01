import React, { FC, ChangeEvent, useState, useEffect, FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { AddFileBtn } from 'components/common/AddFileBtn/index'
import { Button } from 'components/common/Button/Button'
import { usePostUserHomeworkMutation } from 'api/userHomeworkService'
import { UploadedFile } from 'components/UploadedFile'
import { usePostTextFilesMutation } from 'api/filesService'
import { Alert, Snackbar, Stack } from '@mui/material'
import { IHomework } from '../../../../types/sectionT'
import { CheckHw, StudentHomeworkCheck } from '../StudentHomeworkCheck'

import styles from './studentLessonTextEditor.module.scss'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { ModalSuccessHomeworkSended } from 'components/Modal/ModalSuccessHomeworkSended'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

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
  const [showSuccess, { onToggle: toggleModal }] = useBoolean(false)

  const [postHomework] = usePostUserHomeworkMutation()
  const [postFiles] = usePostTextFilesMutation()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleUploadFiles = (chosenFiles: File[]) => {
    setFiles(prevFiles => {
      const filtered = chosenFiles.filter(
        newFile => !prevFiles.some(existingFile => existingFile.name === newFile.name)
      )
      return [...prevFiles, ...filtered]
    })
  
    setUrlFiles(prevUrlFiles => {
      const newUrlFiles = chosenFiles.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }))
      return [...prevUrlFiles, ...newUrlFiles]
    })
  }
  
  const handleDeleteFile = (index: number) => {
    setFiles(files => files.filter((_, id) => id !== index))
    setUrlFiles(files => files.filter((_, id) => id !== index))
  }

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files)

    handleUploadFiles(chosenFiles)
  }

  const handleSendHomework = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    if (courseId) {
      // Извлекаем список курсов и их значений is_copy из localStorage
      const courseData = JSON.parse(localStorage.getItem('course_data') || '{}')
      const formDataHw = new FormData()
      formDataHw.append('homework', String(homeworkId))
      formDataHw.append('text', String(text))

      // Если courseId является копией, добавляем его в запрос
      const homeworkPayload = { homework: homeworkId, text, schoolName, course_id: Number(courseId) }

      await postHomework(homeworkPayload)
        .unwrap()
        .then(data => {
          setHwSended(true)
          const formDataFile = new FormData()

          files.forEach((file, index) => {
            formDataFile.append('files', file)
            formDataFile.append('courseId', courseId)
          })
          formDataFile.append('user_homework', String(data.user_homework_id))

          if (files && files.length > 0) {
            postFiles({ formData: formDataFile, schoolName })
              .unwrap()
              .then(() => {
                setIsLoading(false)
              })
              .catch(() => {
                setOpen(true)
                setIsLoading(false)
              })
          } else {
            setIsLoading(false)
          }

          if (!replyArray) {
            toggleModal()
          }
        })
        .catch(() => {
          setIsLoading(false)
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

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (!event.clipboardData) return
  
      const items = event.clipboardData.items
      const filesToUpload: File[] = []
      
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile()
          if (blob) {
            const file = new File([blob], `screenshot-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.png`, { type: blob.type })
            filesToUpload.push(file)
          }
        }
      }
      if(filesToUpload.length > 0) {
        handleUploadFiles(filesToUpload)
      }
    }
  
    window.addEventListener('paste', handlePaste as any)
  
    return () => {
      window.removeEventListener('paste', handlePaste as any)
    }
  }, [])  

  const handleModalButton = () => {
    if (showSuccess) {
      window.location.reload()
    }
  }

  if (isLoading) {
    return <LoaderLayout />
  }

  
  return !hwStatus ? (
    <>
      <h5 className={styles.hwTitle}>Проверка практической работы</h5>
      <form onSubmit={handleSendHomework} className={styles.commentForm}>
        <textarea
          style={{ resize: 'vertical' }}
          value={text}
          rows={4}
          onChange={event => setText(event.target.value)}
          placeholder="Введите сообщение..."
        />

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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <AddFileBtn handleChangeFiles={handleChangeFiles} style={{ background: 'transparent', fontWeight: 700, alignSelf: 'center' }} />
          <Button variant="newPrimary" text="Отправить" type="submit" />
        </div>
      </form>
      {showSuccess && (
        <Portal closeModal={handleModalButton}>
          <ModalSuccessHomeworkSended toggle={handleModalButton} />
        </Portal>
      )}
    </>
  ) : (
    <>
      <StudentHomeworkCheck homework={homework} replyArray={replyArray?.length > 0 ? replyArray : []} />
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            {'Ошибка отправки домашней работы :('}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}
