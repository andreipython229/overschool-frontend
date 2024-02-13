import { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useFetchCourseQuery } from 'api/coursesServices'
import { useFetchModulesQuery } from 'api/modulesServices'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { backArr } from 'components/Previous/config/svgIconPath'
import { lessonT, sectionT } from 'types/sectionT'
import { lessonSvgMapper } from 'config/index'
import { getNounDeclension } from 'utils/getNounDeclension'

import styles from './student_course_header.module.scss'
import { useFetchProgressQuery, useFetchSertificateMutation } from '../../../api/userProgressService'
import { SimpleLoader } from '../../../components/Loaders/SimpleLoader'
import { Button } from 'components/common/Button/Button'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useBoolean } from 'customHooks'
import { schoolIdSelector, selectUser } from 'selectors'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Portal } from '../../../components/Modal/Portal'
import { Chat } from '../../../components/Modal/Chat'
import { selectChat } from '../../../store/redux/chats/slice'
import { RoleE } from '../../../enum/roleE'
import { ChatI } from '../../../types/chatsT'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { addChat } from '../../../store/redux/chats/chatsSlice'
import { useCreatePersonalChatForAdminOrTeacherMutation } from '../../../api/chatsService'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CryptoJS from 'crypto-js'

export type studentCourseHeaderT = {
  teacher_id: number
}

export const StudentCourseHeader: FC<studentCourseHeaderT> = ({ teacher_id }) => {
  const [isChatOpen, { on: chatModalOff, off: chatModalOn, onToggle: toggleChatModal }] = useBoolean()
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const { schoolId } = useAppSelector(schoolIdSelector)
  const [createPersonalChatForAdminOrTeacher, { isLoading: chatIsLoading }] = useCreatePersonalChatForAdminOrTeacherMutation()
  const { course_id: courseId } = useParams()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const school = window.location.href.split('/')[4]
  const [modal, { on: close, off: open }] = useBoolean()
  const { data: userProgress, isLoading, isError } = useFetchProgressQuery({ course_id: courseId as string, schoolName: school })
  const { data: course } = useFetchCourseQuery({ id: courseId as string, schoolName: school })
  const { data: modules, isSuccess } = useFetchModulesQuery({ id: courseId as string, schoolName: school })
  const [getSertificate, { data: sertData, isLoading: sertLoading, isError: errorSert }] = useFetchSertificateMutation()

  const [sertLink, setSertLink] = useState<string>('')
  const [modulesData, setModulesData] = useState(modules)
  const [copy, { onToggle: toggleCopy }] = useBoolean(false)

  const arrOfLessons = modulesData?.sections.reduce((acc: lessonT[], item: sectionT) => {
    return [...acc, ...item.lessons]
  }, [])

  const countOfLessons = arrOfLessons?.reduce(
    (acc: { [key: string]: number }, item: lessonT) => ((acc[item.type] = (acc[item.type] || 0) + 1), acc),
    {},
  )

  const generateSertLink = (courseId: number, userId: number, schoolId: number) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({ courseId, userId, schoolId }), 'секретный_ключ').toString()
    const sanitizedData = encryptedData.replace(/\//g, '_');
    setSertLink(`https://overschool.by/certificate/${sanitizedData}`)

    return sanitizedData
  }

  const decryptSertLink = (encryptedString: string): { courseId: number; userId: number; schoolId: number } => {
    const bytes = CryptoJS.AES.decrypt(encryptedString, 'секретный_ключ')
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return decryptedData
  }

  const handleSertificate = () => {
    if (courseId && user.userId) {
      getSertificate({ course_id: Number(courseId), user_id: user.userId, school_id: Number(schoolId) })
        .unwrap()
        .then(async data => {
          await generateSertLink(Number(courseId), user.userId, Number(schoolId))
          open()
        })
        .catch(() => open())
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setModulesData(modules)
    }
  }, [isSuccess])

  if (isLoading || isError) {
    return <SimpleLoader style={{ width: '100px', height: '100px' }} />
  }

  const handleToggleChatModal = () => {
    if (teacher_id) {
      const personalChatData = new FormData()
      personalChatData.append('user_id', teacher_id.toString())
      personalChatData.append('role_name', RoleE[role])
      createPersonalChatForAdminOrTeacher(personalChatData)
        .then(async (response: { data: ChatI } | { error: FetchBaseQueryError | SerializedError }) => {
          if ('data' in response) {
            dispatch(addChat(response.data))
            dispatch(selectChat(response.data.id))
            chatModalOn()
          }
        })
        .catch(error => {
          console.error('Произошла ошибка при создании персонального чата:', error)
        })
    }
  }

  return (
    <div className={styles.previous}>
      <Dialog open={modal} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        {sertLink ? (
          <>
            <DialogTitle id="alert-dialog-title">{'Поздравляем с завершением курса!'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  sx={{ marginTop: '0.5rem', width: '100%', minWidth: '400px' }}
                  id="standard-name"
                  label="Ссылка на сертификат"
                  value={sertLink}
                  InputProps={{
                    endAdornment: (
                      <CopyToClipboard text={sertLink} onCopy={() => (copy ? console.log('Уже скопировано') : toggleCopy())}>
                        <ContentCopyIcon sx={{ padding: '5px', cursor: 'pointer' }} />
                      </CopyToClipboard>
                    ),
                  }}
                />
                {copy && <p style={{ marginTop: '0.3rem', color: 'green' }}>Ссылка успешно скопирована!</p>}
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">{'Ссылка не может быть сформирована'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p style={{ marginTop: '0.3rem' }}>
                  Произошла ошибка при формировании ссылки на сертификат. Приносим свои извинения, наши специалисты уже работают над устранением
                  проблемы. Пожалуйста, попробуйте позже.
                </p>
              </DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Button style={{ marginInlineEnd: '1em', marginBottom: '.5em' }} onClick={close} text={'Окей'} />
        </DialogActions>
      </Dialog>
      <div className={styles.background_image_course} />
      <div className={styles.previous_bcgrShadow}></div>
      <div onClick={() => navigate(`/school/${school}/courses/`)} className={styles.back_all_course}>
        <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
        <span>Все курсы</span>
      </div>
      {userProgress.courses[0].completed_percent === 100 && (
        <div className={styles.previous_getSertificate}>
          <Button
            variant="primary"
            text={sertLoading ? <SimpleLoader style={{ width: '8em', height: '1.5em' }} /> : 'Получить сертификат'}
            onClick={handleSertificate}
          />
        </div>
      )}
      <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
      <div className={styles.previous_title_name}>{course?.name}</div>
      <div className={styles.previous_courseInfo}>
        {teacher_id !== undefined ? (
          <>
            <Button className={styles.previous_chatButton} text={'Чат со специалистом'} onClick={() => handleToggleChatModal()} />
          </>
        ) : null}
        {countOfLessons && countOfLessons['lesson'] && (
          <div style={{ marginRight: '32px', display: 'flex', alignItems: 'center' }}>
            {lessonSvgMapper['lesson']}
            <span style={{ marginLeft: '0.6em' }}>
              {`${countOfLessons['lesson']} ${countOfLessons && getNounDeclension(countOfLessons['lesson'], ['занятие', 'занятия', 'занятий'])}`}
            </span>
          </div>
        )}
        {countOfLessons && countOfLessons['homework'] && (
          <div style={{ marginRight: '32px', display: 'flex', alignItems: 'center' }}>
            {lessonSvgMapper['homework']}
            <span>{`${countOfLessons['homework']} ${getNounDeclension(countOfLessons['homework'], ['задание', 'задания', 'заданий'])}`}</span>
          </div>
        )}
        {countOfLessons && countOfLessons['test'] && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {lessonSvgMapper['test']}
            <span>{`${countOfLessons['test']} ${getNounDeclension(countOfLessons['test'], ['тест', 'теста', 'тестов'])}`}</span>
          </div>
        )}
      </div>
      <div className={styles.previous_progress}>
        <div className={styles.previous_progress_graph}>
          <CircularProgressbar
            value={userProgress.courses[0]?.completed_percent}
            text={`${userProgress.courses[0]?.completed_percent}%`}
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: `rgba(186, 117, 255, ${userProgress.courses[0]?.completed_percent / 100})`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Customize transition animation
                transition: 'stroke-dashoffset 0.5s ease 0s',
                // Rotate the path
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: '#d6d6d6',
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Rotate the trail
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              // Customize the text
              text: {
                // Text color
                fill: '#fff',
                // Text size
                fontSize: '22px',
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: '#3e98c7',
              },
            }}
          />
        </div>
        <div className={styles.previous_progress_info}>
          {userProgress.courses[0]?.all_baselessons / userProgress.courses[0]?.completed_count !== 1 ? (
            <span>
              В процессе: {userProgress.courses[0]?.completed_count}/{userProgress.courses[0]?.all_baselessons}
            </span>
          ) : (
            <span>
              Завершено: {userProgress.courses[0]?.completed_count}/{userProgress.courses[0]?.all_baselessons}
            </span>
          )}
        </div>
      </div>
      {isChatOpen && (
        <Portal closeModal={chatModalOn}>
          <Chat closeModal={toggleChatModal} />
        </Portal>
      )}
    </div>
  )
}
