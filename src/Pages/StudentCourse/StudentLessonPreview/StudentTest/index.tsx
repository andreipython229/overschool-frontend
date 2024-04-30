import { FC, useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { Params } from 'react-router-dom'

import styles from './studentTest.module.scss'
import { sectionT, ITest } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr'
import { StudentTestPreview } from '../StudentTestPreview'
import { useBoolean } from '../../../../customHooks'
import { StudentTestBlock } from 'Pages/StudentCourse/StudentTestBlock'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'
import { LESSON_TYPE } from '../../../../enum/lessonTypeE'
import { useFetchQuestionsListQuery, useGetUserTestsByTestMutation } from '../../../../api/questionsAndAnswersService'
import {
  useLazyFetchCommentsByLessonQuery,
  useCreateCommentMutation
} from 'api/modulesServices';
import { CommentList, Comment } from 'types/comments'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'

type studentTestT = {
  lessons: sectionT
  params: Params
  activeLessonIndex: number
  sended?: boolean
  completed?: boolean
  nextDisabled: boolean
  setNextDisabled: (arg: boolean) => void
}

export const StudentTest: FC<studentTestT> = ({ lessons, params, activeLessonIndex, sended, completed, nextDisabled, setNextDisabled}) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params
  const schoolName = window.location.href.split('/')[4]
  const { data: lesson, isFetching } = useFetchQuestionsListQuery({ id: String(lessonId), schoolName })
  const [getUsertests] = useGetUserTestsByTestMutation()
  const [passStatus, setPassStatus] = useState('')
  const [fetchComments, comments] = useLazyFetchCommentsByLessonQuery();
  const [commentsList, setCommentsList] = useState<CommentList>();
  const [createComment] = useCreateCommentMutation();
  const [newCommentContent, setNewCommentContent] = useState('');
  const user = useAppSelector(selectUser)
  const [testSended, setTestSended] = useState(sended)
  const [testSuccess, setTestSuccess] = useState(completed)

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
    const disabled = lessons.group_settings.submit_test_to_go_on && !testSended || lessons.group_settings.success_test_to_go_on && !testSuccess
    setNextDisabled(disabled)
  }, [testSended, testSuccess])

  useEffect(() => {
    if (lesson && lesson.baselesson_ptr_id) {
        fetchComments({ lesson_id: lesson.baselesson_ptr_id, schoolName: schoolName }).then((data) => {
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
                        public: commentData.public
                    };
                });
                const publicCommentsData: Comment[] = commentsData.filter(comment => comment.public === true || comment.author === user.userId);
                publicCommentsData.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
                const commentsList: CommentList = { comments: publicCommentsData };
                setCommentsList(commentsList);
            }
        }).catch(error => {
            console.error('Ошибка при загрузке комментариев:', error);
        });
    }
}, [lesson, schoolName, params]);

const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  setNewCommentContent(e.target.value);
};

const handleSubmitNewComment = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (newCommentContent.trim() !== '') {
    createComment({ lesson_id: lesson.baselesson_ptr_id, content: newCommentContent, schoolName: schoolName }).then(() => {
      setNewCommentContent('');
      if (lesson && lesson.baselesson_ptr_id) {
        fetchComments({ lesson_id: lesson.baselesson_ptr_id, schoolName: schoolName }).then((data) => {
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
                        public: commentData.public
                    };
                });
                const publicCommentsData: Comment[] = commentsData.filter(comment => comment.public === true || comment.author === user.userId);
                publicCommentsData.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
                const commentsList: CommentList = { comments: publicCommentsData };
                setCommentsList(commentsList);
            }
        }).catch(error => {
            console.error('Ошибка при загрузке комментариев:', error);
        });
    }
    })
    }
  };

  const [isOpenTest, { on: closeTest, off: openTest }] = useBoolean()

  if (!isFetching) {
    return (
      <div className={styles.wrapper}>
        <StudentCourseNavArr />
        <div className={styles.wrapper_title}>
          {activeLessonIndex + 1}. {lesson?.name}
        </div>
        <div className={styles.wrapper_testWrapper}>
          {!isOpenTest && lessonType !== 'lesson' ? (
            <StudentTestPreview passStatus={passStatus} setTestSended={setTestSended} setTestSuccess={setTestSuccess} setShow={openTest} />
          ) : (
            isOpenTest && <StudentTestBlock lesson={lesson} setTestSended={setTestSended} setTestSuccess={setTestSuccess}/>
          )}
        </div>
        <StudentLessonNavBtns
          courseId={`${courseId}`}
          lessonId={`${lessonId}`}
          sectionId={`${sectionId}`}
          lessonType={`${lessonType}` as LESSON_TYPE}
          activeLessonIndex={activeLessonIndex as number}
          nextDisabled={nextDisabled}
          lessons={lessons as sectionT}
        />
          <div className={styles.commentContainer}>
          <form onSubmit={handleSubmitNewComment} className={styles.commentForm}>
            <textarea
              value={newCommentContent}
              onChange={handleNewCommentChange}
              placeholder="Введите ваш комментарий..."
            />
            <button type="submit">Отправить</button>
          </form>
                {commentsList && Array.isArray(commentsList?.comments) && commentsList.comments.length > 0 ? (
                  commentsList.comments.map((comment: Comment) => (
                    <div className={styles.commentBox} key={comment.id}>
                      <p><b>{comment.author_first_name} {comment.author_last_name}</b></p>
                      <p>Опубликован: {new Date(comment.created_at).toLocaleString()}</p>
                      <p>Комментарий: {comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ marginBlockStart: '10px' }}><b>Комментариев пока нет</b></p>
                )}
              </div>
      </div>
    )
  } else {
    return <SimpleLoader />
  }
}
