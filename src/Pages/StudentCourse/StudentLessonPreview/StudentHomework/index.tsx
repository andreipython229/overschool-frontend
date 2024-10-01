import { FC, useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Params, useNavigate } from 'react-router-dom'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { sectionT, IHomework } from 'types/sectionT'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { StudentLessonTextEditor } from '../StudentLessonTextEditor'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'
import styles from '../lesson.module.scss'
import { renderStudentBlocks } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/AdminLessonPreview/AdminLesson'
import { Reorder } from 'framer-motion'
import { useLazyFetchCommentsByLessonQuery, useCreateCommentMutation } from 'api/modulesServices'
import { CommentList, Comment } from 'types/comments'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { useFetchCourseQuery } from 'api/coursesServices'
import { StudentCourseHeaderBanner } from 'Pages/StudentCourse/StudentLessonHeaderBanner'

type studentHomeworkT = {
  lesson: IHomework
  lessons: sectionT
  params: Params
  activeLessonIndex: number
  sended?: boolean
  nextDisabled: boolean
  setNextDisabled: (arg: boolean) => void
  download?: boolean
}

export const StudentHomework: FC<studentHomeworkT> = ({
  lesson,
  lessons,
  params,
  activeLessonIndex,
  sended,
  nextDisabled,
  setNextDisabled,
  download,
}) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params
  const [order, setOrder] = useState([])
  const schoolName = window.location.href.split('/')[4]
  const [fetchComments, comments] = useLazyFetchCommentsByLessonQuery()
  const [commentsList, setCommentsList] = useState<CommentList>()
  const { data: courseData } = useFetchCourseQuery({ id: Number(courseId), schoolName: schoolName })
  const [createComment] = useCreateCommentMutation()
  const [newCommentContent, setNewCommentContent] = useState('')
  const user = useAppSelector(selectUser)
  const [hwSended, setHwSended] = useState(sended)
  const navigate = useNavigate()

  useEffect(() => {
    const disabled = lessons.group_settings.submit_homework_to_go_on && !hwSended
    setNextDisabled(disabled)
  }, [hwSended])

  useEffect(() => {
    if (lesson && lesson.baselesson_ptr_id) {
      fetchComments({ lesson_id: lesson.baselesson_ptr_id, schoolName: schoolName, course_id: Number(courseId) })
        .then(data => {
          if (data && data.data) {
            const commentsData: Comment[] = data.data.comments.map((commentData: any) => {
              return {
                id: commentData.id,
                author: commentData.author,
                author_first_name: commentData.author_first_name,
                author_last_name: commentData.author_last_name,
                content: commentData.content,
                created_at: new Date(commentData.created_at),
                lesson: commentData.lesson,
                public: commentData.public,
              }
            })
            const publicCommentsData: Comment[] = commentsData.filter(comment => comment.public === true || comment.author === user.userId)
            publicCommentsData.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
            const commentsList: CommentList = { comments: publicCommentsData }
            setCommentsList(commentsList)
          }
        })
        .catch(error => {
          console.error('Ошибка при загрузке комментариев:', error)
        })
    }
  }, [lesson, schoolName, params])

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentContent(e.target.value)
  }

  const handleSubmitNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newCommentContent.trim() !== '') {
      createComment({ lesson_id: lesson.baselesson_ptr_id, content: newCommentContent, schoolName: schoolName, course_id: Number(courseId) }).then(
        () => {
          setNewCommentContent('')
          if (lesson && lesson.baselesson_ptr_id) {
            fetchComments({ lesson_id: lesson.baselesson_ptr_id, schoolName: schoolName, course_id: Number(courseId) })
              .then(data => {
                if (data && data.data) {
                  const commentsData: Comment[] = data.data.comments.map((commentData: any) => {
                    return {
                      id: commentData.id,
                      author: commentData.author,
                      author_first_name: commentData.author_first_name,
                      author_last_name: commentData.author_last_name,
                      content: commentData.content,
                      created_at: new Date(commentData.created_at),
                      lesson: commentData.lesson,
                      public: commentData.public,
                    }
                  })
                  const publicCommentsData: Comment[] = commentsData.filter(comment => comment.public === true || comment.author === user.userId)
                  publicCommentsData.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
                  const commentsList: CommentList = { comments: publicCommentsData }
                  setCommentsList(commentsList)
                }
              })
              .catch(error => {
                console.error('Ошибка при загрузке комментариев:', error)
              })
          }
        },
      )
    }
  }

  return (
    <div className={styles.lesson}>
      <div className={styles.lessonHeader}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h2 className={styles.lessonHeader_title}>{lesson.name}</h2>
        </div>
        <div className={styles.lessonHeader_nav}>
          <Button text={'К материалам курса'} onClick={() => navigate('../')} variant="emptyInside" className={styles.lessonHeader_backToMaterials}>
            <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
          </Button>
          <StudentLessonNavBtns
            courseId={`${courseId}`}
            lessonId={`${lessonId}`}
            sectionId={`${sectionId}`}
            lessonType={`${lessonType}` as LESSON_TYPE}
            activeLessonIndex={activeLessonIndex as number}
            nextDisabled={false}
            lessons={lessons as sectionT}
          />
        </div>
      </div>
      {courseData && <StudentCourseHeaderBanner photo={courseData.photo || ''} courseName={lesson.name} />}
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <div className={styles.lesson__content}>
              <Reorder.Group style={{ display: 'flex', flexDirection: 'column', gap: '1em' }} onReorder={() => setOrder} values={order}>
                {renderStudentBlocks(lesson, download)}
              </Reorder.Group>
            </div>
            <div className={styles.lesson__content}>
              {lesson.text_files && lesson.text_files.length > 0 && (
                <>
                  <span className={styles.lesson__materials}>Материалы к занятию:</span>
                  <div className={styles.lesson__materials_files}>
                    {lesson.text_files.map(({ file, id, file_url, size }, index: number) => (
                      <UploadedFile key={id} file={file} index={index} name={file_url} size={size} />
                    ))}
                  </div>
                </>
              )}
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
            </div>
          </div>
          {!lessons.group_settings.task_submission_lock && (
            <StudentLessonTextEditor homeworkId={lesson?.homework_id} homework={lesson} setHwSended={setHwSended} />
          )}
          <div className={styles.commentContainer}>
            <form onSubmit={handleSubmitNewComment} className={styles.commentForm}>
              <textarea value={newCommentContent} onChange={handleNewCommentChange} placeholder="Введите ваш комментарий..." />
              <button type="submit">Отправить</button>
            </form>
            {commentsList && Array.isArray(commentsList?.comments) && commentsList.comments.length > 0 ? (
              commentsList.comments.map((comment: Comment) => (
                <div className={styles.commentBox} key={comment.id}>
                  <p>
                    <b>
                      {comment.author_first_name} {comment.author_last_name}
                    </b>
                  </p>
                  <p>Опубликован: {new Date(comment.created_at).toLocaleString()}</p>
                  <p>Комментарий: {comment.content}</p>
                </div>
              ))
            ) : (
              <p style={{ marginBlockStart: '10px' }}>
                <b>Комментариев пока нет</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
