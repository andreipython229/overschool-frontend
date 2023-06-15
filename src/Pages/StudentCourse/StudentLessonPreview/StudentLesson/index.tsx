import {useEffect, useState, FC} from 'react'
import {Params} from 'react-router-dom'
import parse from 'html-react-parser'
// import YouTube, { YouTubeProps } from 'react-youtube'

import {LESSON_TYPE} from 'enum/lessonTypeE'
import {sectionT, ILesson} from 'types/sectionT'
import {StudentCourseNavArr} from '../StudentCourseNavArr/index'
import {UploadedFile} from 'components/UploadedFile/index'
import {AudioPlayer} from 'components/common/AudioPlayer'
import {youtubeParser} from 'utils/youtubeParser'
import {StudentLessonNavBtns} from '../StudentLessonNavBtns/index'
import {VideoPlayer} from "../../../../components/VideoPlayer/player";

import styles from '../lesson.module.scss'

type studentLessonT = {
    lesson: ILesson
    lessons: sectionT
    params: Params
    activeLessonIndex: number
}

export const StudentLesson: FC<studentLessonT> = ({lesson, lessons, params, activeLessonIndex}) => {
    const {course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType} = params
    const [videoLinkId, setVideoLinkId] = useState(youtubeParser(lesson?.video))

    useEffect(() => {
        setVideoLinkId(youtubeParser(lesson?.video))
    }, [lesson, lessonId])

    // useEffect(() => {
    //     const iframe = document.querySelector('iframe');
    //     const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^падает в этом моменте из-за разных протоколов http и https, хз как пофиксить
    //      const ytButtons = iframeDoc?.getElementsByClassName('ytp-impression-link');
    //      if (ytButtons && ytButtons.length > 0) {
    //          Array.prototype.forEach.call(ytButtons, (button) => {
    //              button.style.display = 'none';
    //          });
    //      }
    // }, [videoLoaded])

    return (
        <div className={styles.lesson}>
            <StudentCourseNavArr/>
            <h1 className={styles.lesson__name}>{lesson?.name}</h1>
            <div className={styles.lesson__blocks}>
                <div className={styles.lesson__wrap}>
                    <div className={styles.lesson__card}>
                        <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
                        <div className={styles.lesson__content}>
                            <span
                                className={styles.lesson__desc}>{lesson?.description ? parse(`${lesson?.description}`) : 'Нет описания'}</span>
                        </div>
                        <VideoPlayer videoSrc={videoLinkId? encodeURIComponent(videoLinkId): null}/>
                        <div className={styles.lesson__content}>
                            {/* {lesson?.code && (
                                <div className={styles.lesson__codeWraper}>
                                  <pre className={styles.lesson__code_text}>
                                    <code>{lesson?.code}</code>
                                  </pre>
                                </div>
                              )} */}
                            <AudioPlayer styles={{margin: '5px'}} audioUrls={lesson?.audio_files} title=""/>
                            <span className={styles.lesson__materials}>Материалы к занятию:</span>
                            {lesson?.text_files.map(({file, id}, index: number) => (
                                <UploadedFile key={id} file={file} index={index} size={43445}/>
                            ))}
                        </div>
                    </div>
                    <StudentLessonNavBtns
                        courseId={`${courseId}`}
                        lessonId={`${lessonId}`}
                        sectionId={`${sectionId}`}
                        lessonType={`${lessonType}` as LESSON_TYPE}
                        activeLessonIndex={activeLessonIndex as number}
                        lessons={lessons as sectionT}
                    />
                </div>
            </div>
        </div>
    )
}
