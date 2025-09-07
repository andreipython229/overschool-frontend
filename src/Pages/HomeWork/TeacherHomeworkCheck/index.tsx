import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import styles from './teacherHomeworkCheck.module.scss'
import { AddFileBtn } from 'components/common/AddFileBtn'
import { Button } from 'components/common/Button/Button'
import { UploadedFile } from 'components/UploadedFile'
import { useCreateCheckReplyMutation, useFetchUserHomeworkQuery } from 'api/userHomeworkService'
import { usePostTextFilesMutation } from 'api/filesService'
import { useParams } from 'react-router-dom'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { UserHomework } from 'types/homeworkT'
import { IHomework } from 'types/sectionT'
import { StudentModalCheckHomeWork } from 'components/Modal/StudentModalCheckHomeWork/StudentModalCheckHomeWork'
import { SelectDropDown } from 'components/SelectDropDown/SelectDropDown'
import { CheckSelectChildren } from 'components/common/CheckSelect/CheckSelectChildren'
import { Dropdown } from 'primereact/dropdown'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { MedalIconPath } from 'assets/Icons/svgIconPath'
import { checkHomeworkStatusFilters } from 'constants/dropDownList'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'

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
  userHomework: UserHomework
  refetch: () => void
  isFetching: boolean
}

export const TeacherHomeworkCheck: FC<studentHomeworkCheckI> = ({ homework, replyArray, userHomework, refetch, isFetching }) => {
  const schoolName = window.location.href.split('/')[4]
  const { courseId } = useParams()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { role } = useAppSelector(selectUser)
  const [files, setFiles] = useState<File[]>([])
  const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
  const [text, setText] = useState<string>('')
  const [sendHomeworkCheck, { data: checkData, isLoading: sendingReply, isSuccess: successReply }] = useCreateCheckReplyMutation()
  const [sendFiles, { data: filesData, isLoading, isSuccess: sendFilesSuccess }] = usePostTextFilesMutation()
  const [mark, setMark] = useState<number>(0)
  const [status, setStatus] = useState<string>('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleCreateHomeworkCheck = () => {
    const dataToSend = {
      status: status.length > 0 ? status : 'Отклонено',
      text,
      mark: Number(mark),
      user_homework: userHomework?.user_homework_id,
      courseId: Number(courseId),
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
    setFiles(prevFiles => {
      const filtered = chosenFiles.filter(newFile => !prevFiles.some(existingFile => existingFile.name === newFile.name))
      return [...prevFiles, ...filtered]
    })

    setUrlFiles(prevUrlFiles => {
      const newUrlFiles = chosenFiles
        .filter(file => !files.some(existingFile => existingFile.name === file.name)) // фильтрация для urlFiles
        .map(file => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }))
      return [...prevUrlFiles, ...newUrlFiles]
    })
  }

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const chosenFiles = Array.prototype.slice.call(event.target.files)

    handleUploadFiles(chosenFiles)
  }

  useEffect(() => {
    setIsChecked(replyArray.length > 0 ? replyArray[0].status === 'Принято' : false)
  }, [replyArray])

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardItems = event.clipboardData?.items
      if (!clipboardItems) return

      const filesToUpload: File[] = []

      for (const item of clipboardItems) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile()
          if (blob) {
            const file = new File([blob], `screenshot-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.png`, { type: blob.type })
            filesToUpload.push(file)
          }
        }
      }

      if (filesToUpload.length > 0) {
        handleUploadFiles(filesToUpload)
      }
    }

    const textarea = textAreaRef.current
    textarea?.addEventListener('paste', handlePaste)

    return () => {
      textarea?.removeEventListener('paste', handlePaste)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      {(sendingReply || isLoading || isFetching) && <LoaderLayout />}
      <h5 className={styles.wrapper_title}>
        Проверка домашней работы {userHomework?.status === 'Принято' ? <p style={{ color: 'green' }}>- Принято</p> : ''}
      </h5>
      {userHomework && <StudentModalCheckHomeWork userHomework={userHomework} closeModal={close} hwStatus={isChecked} />}

      {userHomework?.status !== 'Принято' && RoleE.Teacher === role && (
        <div className={styles.commentForm}>
          <textarea
            ref={textAreaRef}
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: '1rem' }}>
            <AddFileBtn handleChangeFiles={handleChangeFiles} style={{ background: 'transparent', fontWeight: 700, alignSelf: 'center' }} />
            <div className={styles.dropdownWrapper}>
              <p>Количество баллов:</p>
              <Dropdown
                options={['1', '2', '3', '4', '5']}
                style={{ display: 'flex', alignItems: 'center' }}
                value={mark}
                onChange={e => setMark(e.target.value)}
                placeholder="-"
                required
              />
              <IconSvg width={21} height={21} viewBoxSize="0 0 21 21" path={MedalIconPath} />
            </div>
            <div className={styles.dropdownWrapper}>
              <p>Статус:</p>
              <Dropdown
                options={['Принято', 'Отклонено']}
                style={{ display: 'flex', alignItems: 'center' }}
                value={status}
                onChange={e => setStatus(e.target.value)}
                defaultValue={'Отклонено'}
                placeholder="Выберите вариант"
                required
              />
            </div>
            <Button variant="newPrimary" onClick={handleCreateHomeworkCheck} text="Отправить ответ" />
          </div>
        </div>
      )}
    </div>
  )
}
