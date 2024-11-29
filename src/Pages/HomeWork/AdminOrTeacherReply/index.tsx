import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../StudentCourse/StudentLessonPreview/lesson.module.scss'
import { useFetchCourseQuery } from 'api/coursesServices'
import { useFetchLessonQuery } from 'api/modulesServices'
import { renderStudentBlocks } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/AdminLessonPreview/AdminLesson'
import { Reorder } from 'framer-motion'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { Button } from 'components/common/Button/Button'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { StudentCourseHeaderBanner } from 'Pages/StudentCourse/StudentLessonHeaderBanner'
import { UploadedFile } from 'components/UploadedFile'
import { NewAudioPlayer } from 'components/NewAudioPlayer'
import { StudentLessonTextEditor } from 'Pages/StudentCourse/StudentLessonPreview/StudentLessonTextEditor'
import { IHomework } from 'types/sectionT'
import { StudentModalCheckHomeWork } from 'components/Modal/StudentModalCheckHomeWork/StudentModalCheckHomeWork'
import { useFetchUserHomeworkQuery } from 'api/userHomeworkService'
import { CheckHw, StudentHomeworkCheck } from 'Pages/StudentCourse/StudentLessonPreview/StudentHomeworkCheck'
import { TeacherHomeworkCheck } from '../TeacherHomeworkCheck'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'

export const AdminOrTeacherReplyHomework: FC = () => {
  const { lesson_id: lessonId, studentHomeworkId: userHomeworkId, courseId } = useParams()
  const schoolName = window.location.href.split('/')[4]
  const { data: lesson, isFetching: isLoading } = useFetchLessonQuery({ id: Number(lessonId), type: 'homework', schoolName })
  const { data: courseData } = useFetchCourseQuery({ id: Number(courseId), schoolName: schoolName })
  const { role } = useAppSelector(selectUser)
  const {
    data: userHomework,
    isFetching,
    isSuccess,
    refetch,
  } = useFetchUserHomeworkQuery({
    id: Number(userHomeworkId),
    schoolName,
    courseId: courseId,
  })
  const navigate = useNavigate()
  const [order, setOrder] = useState<number[]>([])
  const [hwSended, setHwSended] = useState<boolean>(false)
  const [replyArray, setReplyArray] = useState<CheckHw[]>([])

  useEffect(() => {
    if (lesson) {
      const homework = lesson as IHomework
      setReplyArray(homework.user_homework_checks)
    }
  }, [lesson])

  if (!lesson || !courseData || !userHomework) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.lesson}>
      <div className={styles.lessonHeader}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h2 className={styles.lessonHeader_title}>{lesson?.name}</h2>
        </div>
        <div className={styles.lessonHeader_nav}>
          <Button
            text={'К списку домашних заданий'}
            onClick={() => navigate('../')}
            variant="emptyInside"
            className={styles.lessonHeader_backToMaterials}
          >
            <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
          </Button>
        </div>
      </div>
      {courseData && <StudentCourseHeaderBanner photo={courseData.photo || ''} courseName={lesson?.name || ''} />}
      {lesson && (
        <div className={styles.lesson__blocks}>
          <div className={styles.lesson__wrap}>
            <div className={styles.lesson__card}>
              <div className={styles.lesson__content}>
                <Reorder.Group style={{ display: 'flex', flexDirection: 'column', gap: '1em' }} onReorder={() => setOrder} values={order}>
                  {renderStudentBlocks(lesson)}
                </Reorder.Group>
              </div>
              <div className={styles.lesson__content}>
                {'text_files' in lesson && lesson.text_files && lesson.text_files.length > 0 && (
                  <>
                    <span className={styles.lesson__materials}>Материалы</span>
                    <div className={styles.lesson__materials_files}>
                      {lesson.text_files.map(({ file, id, file_url, size }, index: number) => (
                        <UploadedFile key={id} file={file} index={index} name={file_url} size={size} />
                      ))}
                    </div>
                  </>
                )}
                {'audio_files' in lesson &&
                  lesson.audio_files &&
                  lesson.audio_files.length > 0 &&
                  lesson.audio_files.map(audio => <NewAudioPlayer music={audio.file} key={audio.id} />)}
              </div>
            </div>
            <div style={{ width: '96%', height: '1px', background: 'linear-gradient(#0D28BB, #357EEB)', margin: '0 auto' }}></div>
            {userHomework && (
              <TeacherHomeworkCheck
                userHomework={userHomework}
                refetch={refetch}
                isFetching={isFetching}
                homework={lesson as IHomework}
                replyArray={replyArray?.length > 0 ? replyArray : []}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
