import { FC, ChangeEvent, useState, MouseEvent } from 'react'

import { AddFileBtn } from 'components/common/AddFileBtn/index'
import { Button } from 'components/common/Button/Button'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { usePostUserHomeworkMutation } from 'api/userHomeworkService'
import { UploadedFile } from 'components/UploadedFile'
import { usePostTextFilesMutation } from 'api/filesService'

import styles from './studentLessonTextEditor.module.scss'

type textEditorT = {
  homeworkId: number
}

export const StudentLessonTextEditor: FC<textEditorT> = ({ homeworkId }) => {
  const [files, setFiles] = useState<File[]>([])
  const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
  const [text, setText] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]
  const courseId = localStorage.getItem('course_id')

  const [postHomewrok] = usePostUserHomeworkMutation()
  const [postFiles] = usePostTextFilesMutation()

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

  const handleSendHomework = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('file', files[0])
    formData.append('user_homework', `${homeworkId}`)

    if (courseId) {
      postHomewrok({ homework: homeworkId, text, schoolName, course_id: Number(courseId) })
      postFiles({ formData, schoolName })
    }
  }

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.wrapper_title}>Введите ответ на задание:</h5>
      <MyEditor setDescriptionLesson={setText} />
      <AddFileBtn handleChangeFiles={handleChangeFiles} />
      <span className={styles.wrapper_form_help}>Добавьте файл(-ы) с решением задания</span>
      {urlFiles?.map(({ url, name }, index: number) => (
        <UploadedFile key={index} file={url} index={index} name={name} size={files[index].size} handleDeleteFile={handleDeleteFile} />
      ))}
      {urlFiles.length > 0 && <Button style={{ marginTop: '20px' }} variant="primary" text="Загрузить" type="submit" onClick={handleSendHomework} />}
    </div>
  )
}
