import { FC, useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { Params, useNavigate } from 'react-router-dom'

import styles from './studentTest.module.scss'
import { sectionT, ITest } from 'types/sectionT'
import { StudentTestPreview } from '../StudentTestPreview'
import { useBoolean } from '../../../../customHooks'
import { StudentTestBlock } from 'Pages/StudentCourse/StudentTestBlock'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'
import { LESSON_TYPE } from '../../../../enum/lessonTypeE'
import { useFetchQuestionsListQuery, useLazyFetchQuestionsListQuery, useGetUserTestsByTestMutation } from '../../../../api/questionsAndAnswersService'
import { useLazyFetchCommentsByLessonQuery, useCreateCommentMutation } from 'api/modulesServices'
import { CommentList, Comment } from 'types/comments'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { LessonComments } from 'components/LessonComments'

type studentTestT = {
  lessons: sectionT
  params: Params
  activeLessonIndex: number
  sended?: boolean
  completed?: boolean
  nextDisabled: boolean
  setNextDisabled: (arg: boolean) => void
}

export const StudentTest: FC<studentTestT> = ({ lessons, params, activeLessonIndex, sended, completed, nextDisabled, setNextDisabled }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params
  const schoolName = window.location.href.split('/')[4]
  const [fetchQuestionsList, { data: lesson, isFetching }] = useLazyFetchQuestionsListQuery()
  const [getUsertests] = useGetUserTestsByTestMutation()
  const [passStatus, setPassStatus] = useState('')
  const [fetchComments, comments] = useLazyFetchCommentsByLessonQuery()
  const [commentsList, setCommentsList] = useState<CommentList>()
  const [createComment] = useCreateCommentMutation()
  const [newCommentContent, setNewCommentContent] = useState('')
  const user = useAppSelector(selectUser)
  const [testSended, setTestSended] = useState(sended)
  const [testSuccess, setTestSuccess] = useState(completed)
  const navigate = useNavigate()

  useEffect(() => {
    if (lessonId && schoolName && courseId) {
      fetchQuestionsList({ id: String(lessonId), schoolName, course_id: courseId })
    }
  }, [lessonId, schoolName, courseId])

  useEffect(() => {
    getUsertests({ id: String(lessonId), schoolName }).then((data: any) => {
      const usertests = data.data
      if (usertests.length) {
        const passedTest = usertests.filter((usertest: any) => usertest.status === true)
        passedTest.length ? setPassStatus('passed') : setPassStatus('not_passed')
      }
    })
  }, [lessonId])

  useEffect(() => {
    const disabled = (lessons.group_settings.submit_test_to_go_on && !testSended) || (lessons.group_settings.success_test_to_go_on && !testSuccess)
    setNextDisabled(disabled)
  }, [testSended, testSuccess])

  useEffect(() => {
    if (lesson && lesson.baselesson_ptr_id) {
      fetchComments({ lesson_id: lesson.baselesson_ptr_id, schoolName: schoolName, course_id: Number(courseId) })
        .then(data => {
          if (data && data.data) {
            const commentsData: Comment[] = data.data.comments.map((commentData: any) => {
              return {
                avatar: commentData.avatar,
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
        .catch((error: any) => {
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
                      avatar: commentData.avatar,
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
              .catch((error: any) => {
                console.error('Ошибка при загрузке комментариев:', error)
              })
          }
        },
      )
    }
  }

  const [isOpenTest, { on: closeTest, off: openTest }] = useBoolean()

  if (!isFetching && lesson) {
    return (
      <div className={styles.wrapper}>
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
        <div className={styles.wrapper_testWrapper}>
          {!isOpenTest && lessonType !== 'lesson' ? (
            <StudentTestPreview lesson={lesson} passStatus={passStatus} setTestSended={setTestSended} setTestSuccess={setTestSuccess} setShow={openTest} />
          ) : (
            isOpenTest && (
              <StudentTestBlock
                lesson={lesson}
                activeLessonIndex={activeLessonIndex}
                lessons={lessons}
                setTestSended={setTestSended}
                setTestSuccess={setTestSuccess}
              />
            )
          )}
        </div>
        <LessonComments
          handleNewCommentChange={handleNewCommentChange}
          handleSubmitNewComment={handleSubmitNewComment}
          newCommentContent={newCommentContent}
          commentsList={commentsList}
        />
      </div>
    )
  } else {
    return <SimpleLoader />
  }
}
