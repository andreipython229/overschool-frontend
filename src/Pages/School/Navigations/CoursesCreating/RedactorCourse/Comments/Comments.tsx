import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Checkbox} from "../../../../../../components/common/Checkbox/Checkbox";

import { 
  useFetchModulesQuery, 
  useFetchLessonQuery, 
  useLazyFetchCommentsByLessonQuery,
  useUpdateCommentsMutation
} from 'api/modulesServices';

import { lessonSvgMapper } from 'config';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { acceptedHwPath } from 'config/commonSvgIconsPath';

import { sectionT, commonLessonT } from 'types/sectionT';
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes';
import { Comment, CommentList } from 'types/comments';

import styles from './comments.module.scss';
import styles1 from 'components/Modal/Modal.module.scss';
import stylesModules from '../Constructor/ModulesAndLessonsBlock/ModulesBlock/modules_block.module.scss';

export const Comments: FC = () => {
    const schoolName = window.location.href.split('/')[4];
    const { course_id: courseId } = useParams();

    const [selectedLessonId, setSelectedLessonId] = useState<number>();
    const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT);
    const [modulesList, setModulesList] = useState<sectionT[]>([]);
    const [check, setCheck] = useState(false);
    const { data: modulesAndLessons, isSuccess } = useFetchModulesQuery({id: courseId as string, schoolName});
    const { data, isFetching, refetch } = useFetchLessonQuery({
        id: +lessonIdAndType.id,
        type: lessonIdAndType.type,
        schoolName,
        courseId
      });
    const [lesson, setLesson] = useState(data as commonLessonT);
    const [fetchComments, comments] = useLazyFetchCommentsByLessonQuery();
    const [updateComments] = useUpdateCommentsMutation();
    const [commentsList, setCommentsList] = useState<CommentList>();
    const [error, setError] = useState<string>('');

    const showErrorForSevenSeconds = (errorMessage: string) => {
      setError(errorMessage);
      setTimeout(() => {
        setError('');
      }, 7000);
    };

    const handleChangeLesson = (lessonId: number, baselesson: number, lessonType: string) => {
      return () => {
        const idAndType: lessonIdAndTypeT = { id: lessonId, type: lessonType };
        setLessonIdAndType(idAndType);
        setSelectedLessonId(baselesson);
        fetchComments({lesson_id: baselesson, schoolName: schoolName, course_id: Number(courseId)}).then((data) => {
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
                public: commentData.public
              };
            });
          
            const commentsList: CommentList = { comments: commentsData };
            setCommentsList(commentsList);
          }
        }).catch(error => {
          showErrorForSevenSeconds(`Ошибка при загрузке комментариев: ${error}`);
        });
      };
    };

    const toggleCommentPublic = (commentId: number) => {
      setCommentsList((prevComments: CommentList | undefined) => {
        if (prevComments) {
          const updatedComments = prevComments.comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, public: !comment.public };
            }
            return comment;
          });
          return { comments: updatedComments };
        }
        return prevComments;
      });
    };

    useEffect(() => {
      isSuccess && data && setLesson(data);
    }, [data, isSuccess]);

    useEffect(() => {
        if (modulesAndLessons?.sections.length) {
          setModulesList(modulesAndLessons?.sections)
          setCheck(true)
          const initialState = {
            id: modulesAndLessons?.sections[0]?.lessons[0]?.id,
            type: modulesAndLessons?.sections[0]?.lessons[0]?.type,
          }
          if (!lessonIdAndType.type) {
            setLessonIdAndType(initialState)
            setSelectedLessonId(modulesAndLessons?.sections[0]?.lessons[0]?.id)
          }
        }
      }, [modulesAndLessons?.sections, lessonIdAndType.type])

    useEffect(() => {
      if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
        if (lessonIdAndType.baseLessonId) {
          setSelectedLessonId(lessonIdAndType.baseLessonId)
        } else {
          setSelectedLessonId(modulesList[0].lessons[0].baselesson_ptr_id)
          fetchComments({lesson_id: modulesList[0].lessons[0].baselesson_ptr_id, schoolName: schoolName, course_id: Number(courseId)}).then((data) => {
  
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
                  public: commentData.public
                };
              });
            
              const commentsList: CommentList = { comments: commentsData };
              setCommentsList(commentsList);
            }
          }).catch(error => {
            showErrorForSevenSeconds(`Ошибка при загрузке комментариев: ${error}`);
          });
        }
      }
    }, [modulesList, check]);

    const handleSaveChanges = async () => {
      try {
        
        if (commentsList?.comments && Object.keys(commentsList.comments).length > 0) {
          const commentsToUpdate: Record<number, boolean> = {}
          commentsList.comments.forEach((comment: Comment) => {
            commentsToUpdate[comment.id] = comment.public
          })
          if (selectedLessonId) {
            await updateComments({ schoolName: schoolName, lesson_id: selectedLessonId, comments: commentsToUpdate, course_id: Number(courseId) });
          } else {
            showErrorForSevenSeconds(`Не удалось получить идентификатор курса`);
          }
        } else {
          showErrorForSevenSeconds(`Нет комментариев для обновления`);
        }
      } catch (error) {
        showErrorForSevenSeconds(`Ошибка при обновлении комментариев: ${error}`);
      }
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.redactorCourse_leftSide}>
          <h5 className={styles.redactorCourse_leftSide_title}>Структура курса:</h5>
          <div className={styles.redactorCourse_leftSide_desc}>
            {modulesList &&
              modulesList.map(({ section_name, lessons }, index: number) => {
                if (!section_name) return
                return (
                  <>
                  {lessons && lessons.length > 0 && (
                    <ul className={styles1.settings_list}>
                      {lessons.map((lesson) => (
                        <li
                          key={lesson.baselesson_ptr_id}
                          onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                          className={`${styles.redactorCourse_leftSide_desc_lessonWrapper} ${stylesModules.btnWrapper} ${(selectedLessonId === lesson.baselesson_ptr_id) ? styles.selectedLesson : ''}`}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_lesson}>
                            <span>{lessonSvgMapper[lesson.type]}</span>
                            <span style={{ textAlign: 'left' }}>{lesson.name}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
                )
              })}
          </div>
        </div>
        <div style={{ position: 'relative' }} className={styles.redactorCourse_rightSideWrapper_rightSide}>
          <section
          style={{ opacity: isFetching ? 0.5 : 1, position: 'relative' }}
          className={styles.redactorCourse_rightSideWrapper}
        >
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
                <div className={styles.redactorCourse_rightSideWrapper_rightSide_nameBlock}>
                  <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
                    <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>
                      {lesson && 'name' in lesson && lesson.name}
                    </span>
                  </div>
                  <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_save} onClick={handleSaveChanges}>
                    <IconSvg width={16} height={16} viewBoxSize="0 0 20 20" path={acceptedHwPath} />
                    Сохранить изменения
                  </button>
                </div>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Все комментарии:</span>
                {error && (
                    <div role="alert" className={styles.error}>
                      {error}
                    </div>
                  )}
          <div className={styles.commentContainer}>
            {commentsList && Array.isArray(commentsList?.comments) && commentsList.comments.length > 0 ? (
              <table className={styles.commentTable}>
                <thead>
                  <tr>
                    <th>Автор</th>
                    <th>Создан</th>
                    <th>Комментарий</th>
                    <th>Опубликован</th>
                  </tr>
                </thead>
                <tbody>
                  {commentsList.comments.map((comment: Comment) => (
                    <tr key={comment.id}>
                      <td>{`${comment.author_first_name} ${comment.author_last_name}`}</td>
                      <td>{new Date(comment.created_at).toLocaleString()}</td>
                      <td>{comment.content}</td>
                      <td>
                        <div className={styles.centeredContent}>
                          <label className={`${styles.publicLabel} ${styles.centeredCheckbox}`}>
                          <Checkbox  name={'isComment'} checked={comment.public}
                                  onChange={() => toggleCommentPublic(comment.id)}/>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Комментариев пока нет</p>
            )}
          </div>
            </div>
              </section>
        </div>
        </div>
      )
  }