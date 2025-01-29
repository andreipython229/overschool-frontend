import {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {NewCheckbox} from "../../../../../../components/common/Checkbox/NewCheckbox";
import {
  useFetchModulesQuery,
  useFetchLessonQuery,
  useLazyFetchCommentsByLessonQuery,
  useUpdateCommentsMutation
} from 'api/modulesServices';
import {Pagination} from "components/Pagination/Pagination";
import { lessonSvgMapper } from 'config';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { acceptedHwPath } from 'config/commonSvgIconsPath';
import { sectionT, commonLessonT } from 'types/sectionT';
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes';
import { Comment, CommentList } from 'types/comments';
import styles from './comments.module.scss';
import styles1 from 'components/Modal/Modal.module.scss';
import stylesModules from '../Constructor/ModulesAndLessonsBlock/ModulesBlock/modules_block.module.scss';
import up from './images/up.png';
import background from './images/background.jpg';
import user from './images/user.png';
import vectorBack from './images/vectorBack.png';
import vectorForward from './images/vectorForward.png';
import vectorContent from './images/vectorContent.png';
import { lessonIcon } from './config'


const ITEMS_ON_PAGE_COUNT = 8;

export const Comments: FC = () => {
    const schoolName = window.location.href.split('/')[4];
    const { course_id: courseId } = useParams();
    const [courseName, setCourseName] = useState<string>('');
    const [selectedLessonId, setSelectedLessonId] = useState<number>();
    const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT);
    const [modulesList, setModulesList] = useState<sectionT[]>([]);
    const [check, setCheck] = useState(false);
    const { data: modulesAndLessons, isSuccess } = useFetchModulesQuery({id: courseId as string, schoolName});
    const { data, isFetching, refetch } = useFetchLessonQuery({
        id: +lessonIdAndType.id,
        type: lessonIdAndType.type,
        schoolName,
        courseId,
      });
    const [lesson, setLesson] = useState(data as commonLessonT);
    const [fetchComments, comments] = useLazyFetchCommentsByLessonQuery();
    const [updateComments] = useUpdateCommentsMutation();
    const [commentsList, setCommentsList] = useState<CommentList>();
    const [error, setError] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPageArr, setTotalPageArr] = useState<number[]>([]);
    const [show, setShow] = useState<number>(0);
    const [showMore, setShowMore] = useState<number>(ITEMS_ON_PAGE_COUNT);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [clickedSectionId, setClickedSectionId] = useState<number>();
    const [clickedSectionIdArr, setClickedSectionIdArr] = useState<number[]>([]);
    const [clickedLessonId, setClickedLessonId] = useState<number>();
    const [checkedCommentsArr, setCommentsArr] = useState<number[]>([]);

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
        setClickedLessonId(baselesson);
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
            totalPageArr.splice(0);
            const num:number = Math.ceil(commentsList.comments.length / ITEMS_ON_PAGE_COUNT);
            let i:number;
            for(i = 1; i<=num; i+=1) {
                totalPageArr.push(i);
             }
          }
        }).catch(error => {
          showErrorForSevenSeconds(`Ошибка при загрузке комментариев: ${error}`);
        });
      };
    };

    const toggleCommentPublic = (commentId: number) => {
      checkedCommentsArr.push(commentId);
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
          setCourseName(modulesAndLessons?.course_name)
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
      checkedCommentsArr.splice(0);
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

    const handleCancelChanges = () => {
      checkedCommentsArr.forEach((value: number) => {
      setCommentsList((prevComments: CommentList | undefined) => {
        if (prevComments) {
          const updatedComments = prevComments.comments.map((comment) => {
            if (comment.id === value) {
              return { ...comment, public: !comment.public };
            }
            return comment;
          });
          return { comments: updatedComments };
        }
        return prevComments;
      });
     })
      checkedCommentsArr.splice(0);
}

    const handleClickPagination = (val: number) =>{
      setShow(ITEMS_ON_PAGE_COUNT*val-ITEMS_ON_PAGE_COUNT);
      setShowMore(ITEMS_ON_PAGE_COUNT*val);
      setPageNumber(val);
    }

    const handleClickSection = (index: number) =>{
      setClickedLessonId(0);
      setClickedSectionId(index);
        if(clickedSectionIdArr.includes(index)){
          setShowContent(false);
          const startIndex = clickedSectionIdArr.indexOf(index);
          const deleteCount = 1;
          if (startIndex !== -1) {
            clickedSectionIdArr.splice(startIndex, deleteCount);
          }
        }else{
          setShowContent(true);
          clickedSectionIdArr.push(index);
          }
      }

    return (
      <div className={styles.wrapper}>
        <div className={styles.redactorCourse_leftSide}>
            <div className={styles.redactorCourse_leftSide_title}>
              <img src={background} alt='background'/>
                <h2>{courseName}</h2>
            </div>
          <div className={styles.redactorCourse_leftSide_desc}>
            {modulesList &&
              modulesList.map(({ section_name, lessons }, index: number) => {
                if (!section_name) return
                return (
                  <>
                  <ul>
                  <li key={section_name}>
                  <button
                    onClick={() => handleClickSection(index)}
                    className={`${styles.redactorCourse_leftSide_desc_lessonWrapper}`}
                  >
                    <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_lesson}>
                      <span><img/></span>
                       <span style={{ textAlign: 'left' }}>{section_name}</span>
                    </span>
                    <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_counter}>+2</span>
                  </button>
                  {lessons.map((lesson) => (
                   clickedSectionId === index && showContent === true  ?
                   <ul className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable}>
                        <li key={lesson.baselesson_ptr_id} className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line}>
                          <button onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                            className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content}>
                            <span>
                              <span style={{float:'left', marginLeft:'20px'}}>
                                <IconSvg className={clickedLessonId===lesson.baselesson_ptr_id ? styles.fillColorWhite : '' } width={24} height={24} viewBoxSize="0 0 24 24" path={clickedLessonId===lesson.baselesson_ptr_id ? lessonIcon : lessonIcon} />
                                </span>
                              <span style={{marginLeft:'-10px'}}>{lesson.name}</span>
                            </span>
                              <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_counter}>+2</span>
                          </button>
                        </li>
                     </ul>
                    : clickedSectionId === index && !clickedSectionIdArr.includes(index) && showContent === false ?
                    <ul className={styles.redactorCourse_leftSide_desc_lessonWrapper_noWrapTable}>
                      <li key={lesson.baselesson_ptr_id} className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line}>
                        <button onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                          className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content}>
                          <span>
                            <span style={{float:'left', marginLeft:'20px'}}>
                              <IconSvg className={clickedLessonId===lesson.baselesson_ptr_id ? styles.fillColorWhite : '' } width={24} height={24} viewBoxSize="0 0 24 24" path={clickedLessonId===lesson.baselesson_ptr_id ? lessonIcon : lessonIcon} />
                            </span>
                            <span style={{marginLeft:'-10px'}}>{lesson.name}</span>
                          </span>
                            <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_counter}>+2</span>
                        </button>
                      </li>
                    </ul>
                    :clickedSectionId !== index &&  clickedSectionIdArr.includes(index) ?
                      <ul className={styles.redactorCourse_leftSide_desc_lessonWrapper_stateWrapTable}>
                        <li key={lesson.baselesson_ptr_id} className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line}>
                          <button onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                            className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content}>
                            <span>
                              <span style={{float:'left', marginLeft:'20px'}}>
                                <IconSvg className={clickedLessonId===lesson.baselesson_ptr_id ? styles.fillColorWhite : '' } width={24} height={24} viewBoxSize="0 0 24 24" path={clickedLessonId===lesson.baselesson_ptr_id ? lessonIcon : lessonIcon} />
                              </span>
                              <span style={{marginLeft:'-10px'}}>{lesson.name}</span>
                            </span>
                              <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_counter}>+2</span>
                          </button>
                        </li>
                      </ul>
                    :null
                   ))}
                  </li>
                  </ul>
                  </>
                )
              })}
          </div>
        </div>
        <div style={{ position: 'relative' }} className={styles.redactorCourse_rightSideWrapper_rightSide}>
          <section
          style={{ opacity: isFetching ? 0.5 : 1}}
          className={styles.redactorCourse_rightSideWrapper}
        >
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
                <div className={styles.redactorCourse_rightSideWrapper_rightSide_nameBlock}>
                  <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
                    <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>
                      {lesson && 'name' in lesson && lesson.name}
                    </span>
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
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Комментарии к уроку:</span>
                {error && (
                    <div role="alert" className={styles.error}>
                      {error}
                    </div>
                  )}
          <div className={styles.commentContainer}>
            {commentsList && Array.isArray(commentsList?.comments) && commentsList.comments.length > 0 ? (
               <table className={styles.commentTable}>
                  <thead className={styles.commentTable_title}>
                      <th style={{width: '270px', textAlign: 'left'}}>Имя</th>
                      <th style={{width: '230px', textAlign: 'left'}}>Дата</th>
                      <th style={{width: '359px', textAlign: 'left'}}>Комментарий</th>
                  </thead>
                <tbody>
                  {commentsList.comments.slice(show,showMore).map((comment: Comment) => (
                    <tr key={comment.id}>
                      <td style={{paddingLeft: '20px', minWidth: '270px', maxWidth: '270px'}}>
                        <td>
                          <img src={user} alt='user'/>
                        </td>
                        <td>
                          {`${comment.author_first_name} ${comment.author_last_name}`}
                        </td>
                      </td>
                      <td style={{maxWidth: '230px', minWidth: '230px'}}>{new Date(comment.created_at).toLocaleString()}</td>
                      <td style={{minWidth: '359px', maxWidth: '359px'}}>
                        <td style={{minWidth: '300px', maxWidth: '300px'}}>{comment.content}</td>
                          <td>
                          <div className={styles.centeredContent}>
                            <label className={`${styles.publicLabel} ${styles.centeredCheckbox}`}>
                            <NewCheckbox name={'isComment'}
                                         checked={comment.public}
                                         onChange={() => toggleCommentPublic(comment.id)}/>
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
            <Pagination className={styles.paginationTable} currentPage={pageNumber} paginationRange={totalPageArr} onPageChange={handleClickPagination}/>
          </div>
          </section>
      </div>
    </div>
  )
}

