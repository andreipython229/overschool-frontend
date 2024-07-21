import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { 
  useFetchModulesQuery, 
  useLazyFetchLessonQuery, 
} from 'api/modulesServices';

import { Reorder } from 'framer-motion';
import { lessonSvgMapper } from 'config';

import { lessonIdAndTypeT } from 'components/Modal/ModalTypes';

import { LESSON_TYPE } from 'enum/lessonTypeE';
import { sectionT, commonLessonT } from 'types/sectionT';

import styles from './materials.module.scss';
import styles1 from 'components/Modal/Modal.module.scss';
import stylesModules from '../Constructor/ModulesAndLessonsBlock/ModulesBlock/modules_block.module.scss';
import { SimpleLoader } from 'components/Loaders/SimpleLoader';
import { AdminLesson } from '../Constructor/AdminLessonPreview/AdminLesson';
import { AdminHomework } from '../Constructor/AdminHomeworkPreview/AdminHomework';
import { AdminTest } from '../Constructor/AdminTestPreview/AdminTest';

export const CourseMaterials: FC = () => {
    const schoolName = window.location.href.split('/')[4];
    const { course_id: courseId } = useParams();
    const [selectedLessonId, setSelectedLessonId] = useState<number>();
    const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT);
    const [modulesList, setModulesList] = useState<sectionT[]>([]);
    const [check, setCheck] = useState(false);
    const { data: modulesAndLessons } = useFetchModulesQuery({id: courseId as string, schoolName});
    const [fetchLesson, { data, isFetching, isSuccess }] = useLazyFetchLessonQuery();
    const [lesson, setLesson] = useState(data as commonLessonT)

  useEffect(() => {
    const fetchInitialLesson = async () => {
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
  }
  fetchInitialLesson();
  }, [modulesAndLessons?.sections, lessonIdAndType.type])

  useEffect(() => {
    const asycnFetchLesson = async () => {
      if (lessonIdAndType.id !== undefined && lessonIdAndType.type !== undefined && courseId !== undefined) {
        if (courseId === '247') {
          const resp = await fetchLesson({id: lessonIdAndType.id, type: lessonIdAndType.type, schoolName: schoolName, courseId: courseId });
          if (resp.data) {
            setLesson(resp.data);
          } else {
            console.error("No data returned for the lesson");
          }
        } else {
          const resp = await fetchLesson({id: lessonIdAndType.id, type: lessonIdAndType.type, schoolName: schoolName });
          if (resp.data) {
            setLesson(resp.data);
          } else {
            console.error("No data returned for the lesson");
          }
        }
      }
    }
    asycnFetchLesson();
  }, [lessonIdAndType])

    const handleChangeLesson = (lessonId: number, baselesson: number, lessonType: string) => {
      return () => {
        const idAndType: lessonIdAndTypeT = { id: lessonId, type: lessonType };
        setLessonIdAndType(idAndType);
        setSelectedLessonId(baselesson);
      };
    };

    useEffect(() => {
      if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
        if (lessonIdAndType.baseLessonId) {
          setSelectedLessonId(lessonIdAndType.baseLessonId)
        } else {
          setSelectedLessonId(modulesList[0].lessons[0].baselesson_ptr_id)
        }
      }
    }, [modulesList, check]);

    const renderUI = () => {
      if (isSuccess) {
        switch (lesson?.type) {
          case LESSON_TYPE.LESSON:
            return <AdminLesson lesson={lesson} />
          case LESSON_TYPE.HOMEWORK:
            return <AdminHomework lesson={lesson} />
          case LESSON_TYPE.TEST:
            return <AdminTest testId={lessonIdAndType.id as number} />
        }
      }
    }

    if (!modulesAndLessons)
      return (
        <div className={styles.loader_container}>
          <SimpleLoader />
        </div>
      )

    return (
      <div className={styles.wrapper}>
        <div className={styles.redactorCourse_leftSide}>
          <h5 className={styles.redactorCourse_leftSide_title}>Структура курса:</h5>
          <div className={`${styles.redactorCourse_leftSide_desc} ${styles.scrollable}`}>
            {modulesList &&
              modulesList.map(({ section_name, lessons }, index: number) => {
                if (!section_name) return
                return (
                  <>
                    {lessons && lessons.length > 0 ? (
                      <ul className={styles1.settings_list}>
                        {(courseId === '247') ? (
                          lessons.filter(lesson => lesson.active).length > 0 ? (
                            lessons.filter(lesson => lesson.active).map((lesson) => (
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
                            ))
                          ) : (
                            <p>Нет доступных уроков</p>
                          )
                        ) : (
                          lessons.map((lesson) => (
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
                          ))
                        )}
                      </ul>
                    ) : (
                      <p>Нет доступных уроков</p>
                    )}
                </>
                )
              })}
          </div>
        </div>
        <section
          style={{ opacity: isFetching ? 0.5 : 1, position: 'relative' }}
          className={styles.redactorCourse_rightSideWrapper}
        >
          <div style={{ position: 'relative' }} className={styles.redactorCourse_rightSideWrapper_rightSide}>
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_nameBlock}>
              <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>
                  {lesson && 'name' in lesson && lesson.name}
                </span>
              </div>
            </div>
            <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
            {renderUI()}
          </div>
            {(isFetching) && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  top: '50%',
                  left: '-50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <SimpleLoader style={{ width: '100px', height: '100px' }} />
              </div>
            )}
          </div>
        </section>
        </div>
      )
  }