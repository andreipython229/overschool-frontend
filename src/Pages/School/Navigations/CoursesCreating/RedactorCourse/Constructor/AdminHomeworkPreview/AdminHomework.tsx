import {IHomework} from "../../../../../../../types/sectionT";
import {FC} from "react";
import styles from "../../../../../../StudentCourse/StudentLessonPreview/lesson.module.scss";
import {StudentCourseNavArr} from "../../../../../../StudentCourse/StudentLessonPreview/StudentCourseNavArr";
import {StudentLessonDesc} from "../../../../../../StudentCourse/StudentLessonPreview/StudentLessonDesc";
import {UploadedFile} from "../../../../../../../components/UploadedFile";
import {AudioPlayer} from "../../../../../../../components/common/AudioPlayer";

interface AdminHomeworkT {
    lesson: IHomework
}

export const AdminHomework: FC<AdminHomeworkT> = ({lesson}) => {
    return (
        <div className={styles.lesson}>
            <StudentCourseNavArr/>
            <h1 className={styles.lesson__name}>{lesson?.name}</h1>
            <div className={styles.lesson__blocks}>
                <div className={styles.lesson__wrap}>
                    <div className={styles.lesson__card}>
                        <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
                        <div className={styles.lesson__content}>
                            <StudentLessonDesc text={lesson?.description || ''}/>
                        </div>
                        <div className={styles.lesson__content}>
                            {/* {lesson?.code && (
                <div className={styles.lesson__codeWraper}>
                  <pre className={styles.lesson__code_text}>
                    <code>{lesson?.code}</code>
                  </pre>
                </div>
              )} */}
                            <span className={styles.lesson__materials}>Материалы к занятию:</span>
                            {lesson?.text_files.map(({file, id}, index: number) => (
                                <UploadedFile key={id} file={file} index={index} size={34487}/>
                            ))}
                            <AudioPlayer styles={{margin: '5px'}} audioUrls={lesson?.audio_files} title=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}