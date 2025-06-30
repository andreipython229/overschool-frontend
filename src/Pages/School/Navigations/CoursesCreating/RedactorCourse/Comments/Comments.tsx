import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchModulesQuery } from 'api/modulesServices'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { sectionT } from 'types/sectionT'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'
import styles from './comments.module.scss'
import background from './images/background.jpg'
import { lessonIcon } from './config'
import { schoolSelector } from 'selectors'
import { useAppSelector } from 'store/hooks'
import { CommentContainer } from './commentContainer'

export const Comments: FC = () => {
  const { schoolName } = useAppSelector(schoolSelector)
  const { course_id: courseId } = useParams()
  const [courseName, setCourseName] = useState<string>('')
  const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT)
  const [modulesList, setModulesList] = useState<sectionT[]>([])
  const [check, setCheck] = useState(false)
  const { data: modulesAndLessons, isSuccess } = useFetchModulesQuery({ id: courseId as string, schoolName })
  const [error, setError] = useState<string>('')
  const [showContent, setShowContent] = useState<boolean>(false)
  const [clickedSectionId, setClickedSectionId] = useState<number>()
  const [clickedSectionIdArr, setClickedSectionIdArr] = useState<number[]>([])

  const handleChangeLesson = (lessonId: number, baselesson: number, lessonType: string) => {
    return () => {
      const idAndType: lessonIdAndTypeT = { id: lessonId, type: lessonType, baseLessonId: baselesson }
      setLessonIdAndType(idAndType)
    }
  }

  useEffect(() => {
    if (modulesAndLessons?.sections.length) {
      setModulesList(modulesAndLessons?.sections)
      setCourseName(modulesAndLessons?.course_name)
      setCheck(true)
      const initialState = {
        id: modulesAndLessons?.sections[0]?.lessons[0]?.id,
        type: modulesAndLessons?.sections[0]?.lessons[0]?.type,
        baseLessonId: modulesAndLessons?.sections[0]?.lessons[0]?.baselesson_ptr_id,
      }
      if (!lessonIdAndType.type) {
        setLessonIdAndType(initialState)
      }
    }
  }, [modulesAndLessons?.sections, lessonIdAndType.type])

  useEffect(() => {
    if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
      if (!lessonIdAndType.id) {
        setLessonIdAndType({
          id: modulesList[0].lessons[0].id,
          type: modulesList[0].lessons[0].type,
          baseLessonId: modulesList[0].lessons[0].baselesson_ptr_id,
        })
      }
    }
  }, [modulesList, check])

  const handleClickSection = (index: number) => {
    setClickedSectionId(index)
    if (clickedSectionIdArr.includes(index)) {
      setShowContent(false)
      const startIndex = clickedSectionIdArr.indexOf(index)
      const deleteCount = 1
      if (startIndex !== -1) {
        clickedSectionIdArr.splice(startIndex, deleteCount)
      }
    } else {
      setShowContent(true)
      clickedSectionIdArr.push(index)
    }
  }
    return (
    <div className={styles.wrapper}>
      <div className={styles.redactorCourse_leftSide}>
        <div className={styles.redactorCourse_leftSide_title}>
          <img src={background} alt="background" />
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
                      <button onClick={() => handleClickSection(index)} className={`${styles.redactorCourse_leftSide_desc_lessonWrapper}`}>
                        <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_lesson}>
                          <span>
                            <img />
                          </span>
                          <span style={{ textAlign: 'left' }}>{section_name}</span>
                        </span>
                        {/* <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_counter}>+2</span> */}
                      </button>
                      {lessons.map(lesson =>
                        clickedSectionId === index && showContent === true ? (
                          <ul className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable}>
                            <li
                              key={lesson.baselesson_ptr_id}
                              className={
                                lessonIdAndType.id === lesson.id
                                  ? styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTableActive_line
                                  : styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line
                              }
                            >
                              <button
                                onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                                className={
                                  lessonIdAndType.id === lesson.id
                                    ? styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTableActive_line_content
                                    : styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content
                                }
                              >
                                <div
                                  className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_inside}
                                  style={{ float: 'left' }}
                                >
                                  <IconSvg
                                    className={lessonIdAndType.id === lesson.id ? styles.fillColorWhite : styles.fillColorBlue}
                                    width={24}
                                    height={24}
                                    viewBoxSize="0 0 24 24"
                                    path={lessonIdAndType.id === lesson.id ? lessonIcon : lessonIcon}
                                  />
                                </div>
                                <div className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_text}>{lesson.name}</div>
                                {/* <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_counter}>+2</span> */}
                              </button>
                            </li>
                          </ul>
                        ) : clickedSectionId === index && !clickedSectionIdArr.includes(index) && showContent === false ? (
                          <ul className={styles.redactorCourse_leftSide_desc_lessonWrapper_noWrapTable}>
                            <li
                              key={lesson.baselesson_ptr_id}
                              className={
                                lessonIdAndType.id === lesson.id
                                  ? styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTableActive_line
                                  : styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line
                              }
                            >
                              <button
                                onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                                className={
                                  lessonIdAndType.id === lesson.id
                                    ? styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTableActive_line_content
                                    : styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content
                                }
                              >
                                  <div
                                    className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_inside}
                                    style={{ float: 'left' }}
                                  >
                                    <IconSvg
                                      className={lessonIdAndType.id === lesson.id ? styles.fillColorWhite : styles.fillColorBlue}
                                      width={24}
                                      height={24}
                                      viewBoxSize="0 0 24 24"
                                      path={lessonIdAndType.id === lesson.id ? lessonIcon : lessonIcon}
                                    />
                                 </div>
                                  <div className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_text}>{lesson.name}</div>

                                {/* <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_counter}>+2</span> */}
                              </button>
                            </li>
                          </ul>
                        ) : clickedSectionId !== index && clickedSectionIdArr.includes(index) ? (
                          <ul className={styles.redactorCourse_leftSide_desc_lessonWrapper_stateWrapTable}>
                            <li
                              key={lesson.baselesson_ptr_id}
                              className={
                                lessonIdAndType.id === lesson.id
                                  ? styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTableActive_line
                                  : styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line
                              }
                            >
                              <button
                                onClick={handleChangeLesson(lesson.id, lesson.baselesson_ptr_id, lesson.type)}
                                className={
                                  lessonIdAndType.id === lesson.id
                                    ? styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTableActive_line_content
                                    : styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content
                                }
                              >

                                  <div
                                    className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_inside}
                                    style={{ float: 'left' }}
                                  >
                                    <IconSvg
                                      className={lessonIdAndType.id === lesson.id ? styles.fillColorWhite : styles.fillColorBlue}
                                      width={24}
                                      height={24}
                                      viewBoxSize="0 0 24 24"
                                      path={lessonIdAndType.id === lesson.id ? lessonIcon : lessonIcon}
                                    />
                                  </div>
                                  <div className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_text}>{lesson.name}</div>

                                {/* <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_wrapTable_line_content_counter}>+2</span> */}
                              </button>
                            </li>
                          </ul>
                        ) : null,
                      )}
                    </li>
                  </ul>
                </>
              )
            })}
        </div>
      </div>
      {courseId && lessonIdAndType && <CommentContainer lessonIdAndType={lessonIdAndType} courseId={courseId} error={error} setError={setError} />}
    </div>
  )
}