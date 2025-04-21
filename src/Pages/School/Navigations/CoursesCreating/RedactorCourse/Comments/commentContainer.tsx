import { useFetchLessonQuery, useLazyFetchCommentsByLessonQuery, useUpdateCommentsMutation } from 'api/modulesServices'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'
import { FC, useEffect, useState } from 'react'
import { schoolSelector } from 'selectors'
import { useAppSelector } from 'store/hooks'
import { commonLessonT } from 'types/sectionT'
import styles from './comments.module.scss'
import { Comment, CommentList } from 'types/comments'
import { NewCheckbox } from 'components/common/Checkbox/NewCheckbox'
import user from './images/user.png'
import { Pagination } from 'components/Pagination/Pagination'

export interface ICommentRightContent {
  lessonIdAndType: lessonIdAndTypeT
  courseId: string
  error: string
  setError: (error: string) => void
}

const ITEMS_ON_PAGE_COUNT = 8

export const CommentContainer: FC<ICommentRightContent> = ({ lessonIdAndType, courseId, error, setError }) => {
  const { schoolName } = useAppSelector(schoolSelector)
  const { data, isFetching } = useFetchLessonQuery(
    { id: +lessonIdAndType.id, type: lessonIdAndType.type, schoolName, courseId },
    { refetchOnMountOrArgChange: true },
  )
  const [updateComments] = useUpdateCommentsMutation()
  const [lesson, setLesson] = useState(data as commonLessonT)
  const [fetchComments, comments] = useLazyFetchCommentsByLessonQuery()

  const [totalPageArr, setTotalPageArr] = useState<number[]>([])
  const [commentsList, setCommentsList] = useState<CommentList>()
  const [show, setShow] = useState<number>(0)
  const [showMore, setShowMore] = useState<number>(ITEMS_ON_PAGE_COUNT)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [checkedCommentsArr, setCommentsArr] = useState<number[]>([])

  const handleCancelChanges = () => {
    checkedCommentsArr.forEach((value: number) => {
      setCommentsList((prevComments: CommentList | undefined) => {
        if (prevComments) {
          const updatedComments = prevComments.comments.map(comment => {
            if (comment.id === value) {
              return { ...comment, public: !comment.public }
            }
            return comment
          })
          return { comments: updatedComments }
        }
        return prevComments
      })
    })
    checkedCommentsArr.splice(0)
  }

  const toggleCommentPublic = (commentId: number) => {
    checkedCommentsArr.push(commentId)
    setCommentsList((prevComments: CommentList | undefined) => {
      if (prevComments) {
        const updatedComments = prevComments.comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, public: !comment.public }
          }
          return comment
        })
        return { comments: updatedComments }
      }
      return prevComments
    })
  }

  const handleClickPagination = (val: number) => {
    setShow(ITEMS_ON_PAGE_COUNT * val - ITEMS_ON_PAGE_COUNT)
    setShowMore(ITEMS_ON_PAGE_COUNT * val)
    setPageNumber(val)
  }

  const handleSaveChanges = async () => {
    checkedCommentsArr.splice(0)
    try {
      if (commentsList?.comments && Object.keys(commentsList.comments).length > 0) {
        const commentsToUpdate: Record<number, boolean> = {}
        commentsList.comments.forEach((comment: Comment) => {
          commentsToUpdate[comment.id] = comment.public
        })
        if (lessonIdAndType) {
          await updateComments({ schoolName: schoolName, lesson_id: lessonIdAndType.id, comments: commentsToUpdate, course_id: Number(courseId) })
        } else {
          showErrorForSevenSeconds(`Не удалось получить идентификатор курса`)
        }
      } else {
        showErrorForSevenSeconds(`Нет комментариев для обновления`)
      }
    } catch (error) {
      showErrorForSevenSeconds(`Ошибка при обновлении комментариев: ${error}`)
    }
  }

  const showErrorForSevenSeconds = (errorMessage: string) => {
    setError(errorMessage)
    setTimeout(() => {
      setError('')
    }, 7000)
  }

  useEffect(() => {
    data && setLesson(data)
  }, [data])

  useEffect(() => {
    if (lessonIdAndType.baseLessonId)
      fetchComments({ lesson_id: lessonIdAndType.baseLessonId, schoolName: schoolName, course_id: Number(courseId) })
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

            const commentsList: CommentList = { comments: commentsData }
            setCommentsList(commentsList)
            totalPageArr.splice(0)
            const num: number = Math.ceil(commentsList.comments.length / ITEMS_ON_PAGE_COUNT)
            let i: number
            for (i = 1; i <= num; i += 1) {
              totalPageArr.push(i)
            }
          }
        })
        .catch(error => {
          showErrorForSevenSeconds(`Ошибка при загрузке комментариев: ${error}`)
        })
  }, [lessonIdAndType])

  return (
    <div style={{ position: 'relative' }} className={styles.redactorCourse_rightSideWrapper_rightSide}>
      <section style={{ opacity: isFetching ? 0.5 : 1 }} className={styles.redactorCourse_rightSideWrapper}>
        <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_nameBlock}>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
              <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>{lesson && 'name' in lesson && lesson.name}</span>
            </div>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_btnBlock}>
              <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_cancel} onClick={handleCancelChanges}>
                Отменить
              </button>
              <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_save} onClick={handleSaveChanges}>
                Сохранить
              </button>
            </div>
          </div>
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Комментарии к уроку:</div>
          {error && (
            <div role="alert" className={styles.error}>
              {error}
            </div>
          )}
          <div className={styles.commentContainer}>
            {commentsList && Array.isArray(commentsList?.comments) && commentsList.comments.length > 0 ? (
              <table className={styles.commentTable}>
                <thead className={styles.commentTable_title}>
                  <th className={styles.commentTable_title_name}>Имя</th>
                  <th className={styles.commentTable_title_date}>Дата</th>
                  <th className={styles.commentTable_title_comments}>Комментарий</th>
                </thead>
                <tbody>
                  {commentsList.comments.slice(show, showMore).map((comment: Comment) => (
                    <tr key={comment.id}>
                      <td className={styles.commentTable_user}>
                        <td>
                          <img src={user} alt="user" />
                        </td>
                        <td>{`${comment.author_first_name} ${comment.author_last_name}`}</td>
                      </td>
                      <td className={styles.commentTable_date}>{new Date(comment.created_at).toLocaleString()}</td>
                      <td className={styles.commentTable_commentWrap}>
                        <td className={styles.commentTable_commentWrap_comment}>{comment.content}</td>
                        <td>
                          <div className={styles.centeredContent}>
                            <label className={`${styles.publicLabel} ${styles.centeredCheckbox}`}>
                              <NewCheckbox name={'isComment'} checked={true} onChange={() => toggleCommentPublic(comment.id)} />
                            </label>
                          </div>
                        </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Комментариев пока нет</p>
            )}
          </div>
          <Pagination
            className={styles.paginationTable}
            currentPage={pageNumber}
            paginationRange={totalPageArr}
            onPageChange={handleClickPagination}
          />
        </div>
      </section>
    </div>
  )
}
