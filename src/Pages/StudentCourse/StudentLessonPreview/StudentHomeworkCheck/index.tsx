import { IHomework } from '../../../../types/sectionT'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './studentHomeworkCheck.module.scss'
import { StudentModalCheckHomeWork } from '../../../../components/Modal/StudentModalCheckHomeWork/StudentModalCheckHomeWork'
import { AddFileBtn } from 'components/common/AddFileBtn'
import { Button } from 'components/common/Button/Button'
import { UploadedFile } from 'components/UploadedFile'
import { useCreateCheckReplyMutation, useFetchUserHomeworkQuery } from 'api/userHomeworkService'
import { usePostTextFilesMutation } from 'api/filesService'
import { useParams } from 'react-router-dom'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { UserHomework } from 'types/homeworkT'

export interface CheckHw {
  audio_files: File[]
  author: number
  author_first_name: string
  author_last_name: string
  created_at: string
  mark: number
  profile_avatar: string
  status: string
  text: string
  text_files: File[]
  updated_at: string
  user_homework: number
  user_homework_check_id: number
}

type studentHomeworkCheckI = {
  homework: IHomework
  replyArray: CheckHw[]
}

export const StudentHomeworkCheck: FC<studentHomeworkCheckI> = ({ homework, replyArray }) => {
  const schoolName = window.location.href.split('/')[4]
  const { course_id: courseId } = useParams()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
  const [text, setText] = useState<string>('')
  const { data: userHomework, isFetching, isSuccess, refetch } = useFetchUserHomeworkQuery({ id: replyArray[0].user_homework, schoolName, courseId })
  const [sendHomeworkCheck, { data: checkData, isLoading: sendingReply, isSuccess: successReply }] = useCreateCheckReplyMutation()
  const [sendFiles, { data: filesData, isLoading, isSuccess: sendFilesSuccess }] = usePostTextFilesMutation()

  const handleCreateHomeworkCheck = () => {
    const dataToSend = {
      text,
      user_homework: userHomework?.user_homework_id,
      courseId,
    }

    sendHomeworkCheck({ data: dataToSend, schoolName })
      .unwrap()
      .then(data => {
        setText('')
      })
      .catch(error => {
        return null
      })
    if (files && files.length > 0) {
      null
    } else {
      refetch()
    }
  }

  useEffect(() => {
    if (files && files.length > 0 && checkData && !isLoading) {
      const formData = new FormData()
      formData.append('user_homework_check', `${checkData.user_homework_check_id}`)
      formData.append('courseId', `${courseId}`)
      files.forEach(file => {
        formData.append(`files`, file)
      })
      setFiles([])
      setUrlFiles([])
      sendFiles({ formData, schoolName })
        .unwrap()
        .then(data => {
          refetch()
        })
        .catch(error => {
          refetch()
        })
    }
  }, [checkData, isLoading])

  const handleDeleteFile = (index: number) => {
    setFiles(files => files.filter((_, id) => id !== index))
    setUrlFiles(files => files.filter((_, id) => id !== index))
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

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const chosenFiles = Array.prototype.slice.call(event.target.files)

    handleUploadFiles(chosenFiles)
  }

  useEffect(() => {
    setIsChecked(replyArray.length > 0 ? replyArray[0].status === 'Принято' : false)
  }, [replyArray])

  return (
    <div className={styles.wrapper}>
      {(sendingReply || isLoading || isFetching) && <LoaderLayout />}
      <h5 className={styles.wrapper_title}>
        Проверка домашней работы {userHomework?.status === 'Принято' ? <p style={{ color: 'green' }}>- Принято</p> : ''}
      </h5>
      {userHomework && <StudentModalCheckHomeWork userHomework={userHomework} closeModal={close} hwStatus={isChecked} />}

      {userHomework?.status !== 'Принято' && (
        <div className={styles.commentForm}>
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
              isHw={false}
              isLocal
              handleDeleteFile={handleDeleteFile}
            />
          ))}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <AddFileBtn handleChangeFiles={handleChangeFiles} style={{ background: 'transparent', fontWeight: 700, alignSelf: 'center' }} />
            <Button variant="newPrimary" onClick={handleCreateHomeworkCheck} text="Отправить" />
          </div>
        </div>
      )}
    </div>
  )
}
