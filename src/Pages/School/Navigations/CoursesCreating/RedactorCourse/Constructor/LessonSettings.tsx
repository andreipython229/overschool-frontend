import {ChangeEvent, FC, memo, useEffect, useState} from 'react'

import {UploadedFile} from 'components/UploadedFile'
import {Button} from 'components/common/Button/Button'
import {AddFileBtn} from 'components/common/AddFileBtn/index'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {AddPost} from 'components/AddPost'
import {deleteIconPath, noPublishedIconPath, publishedIconPath, settingsIconPath} from '../../../../config/svgIconsPath'
import {useFetchLessonQuery, usePatchLessonsMutation} from 'api/modulesServices'
import {ClassesSettingsPropsT} from 'types/navigationTypes'
import {commonLessonT} from 'types/sectionT'
import {AddQuestion} from 'components/AddQuestion'
import {SimpleLoader} from 'components/Loaders/SimpleLoader/index'
import {usePostTextFilesMutation} from 'api/filesService'
import styles from './constructor.module.scss'
import {LESSON_TYPE} from "../../../../../../enum/lessonTypeE";
import {AdminLesson} from "./AdminLessonPreview/AdminLesson";
import {NewTextEditor} from "../../../../../../components/AddTextEditor/NewTextEditor";
import {VideoPlayer} from "../../../../../../components/VideoPlayer/player";
import {AdminTest} from "./AdminTestPreview/AdminTest";
import {AdminHomework} from "./AdminHomeworkPreview/AdminHomework";
import {acceptedHwPath} from "../../../../../../config/commonSvgIconsPath";

export const LessonSettings: FC<ClassesSettingsPropsT> = memo(({deleteLesson, lessonIdAndType, setType}) => {
    const [files, setFiles] = useState<File[]>([])
    const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [lessonDescription, setLessonDescription] = useState('')

    const {data, isFetching, isSuccess} = useFetchLessonQuery({id: +lessonIdAndType.id, type: lessonIdAndType.type})
    const [addTextFiles] = usePostTextFilesMutation()
    const [saveChanges] = usePatchLessonsMutation()

    const [lesson, setLesson] = useState(data as commonLessonT)

    const handleSaveChanges = async () => {
        const formData = new FormData()
        formData.append('description', lessonDescription)
        formData.append('section', String(lesson.section))
        formData.append('order', String(lesson.order))
        await saveChanges({id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData})
        setIsEditing(false)
    }

    const renderUI = () => {
        if (isSuccess) {
            switch (lesson?.type) {
                case LESSON_TYPE.LESSON:
                    return <AdminLesson lesson={lesson}/>
                case LESSON_TYPE.HOMEWORK:
                    return <AdminHomework lesson={lesson}/>
                case LESSON_TYPE.TEST:
                    return <AdminTest testId={lessonIdAndType.id as number}/>
            }
        }
    }

    useEffect(() => {
        setIsEditing(false)
    }, [lessonIdAndType])

    const showSettingsModal = () => {
        setType('setting' as keyof object)
    }

    const handleDeleteLesson = async () => {
        if ('id' in lessonIdAndType) {
            await deleteLesson({id: lessonIdAndType.id, type: lessonIdAndType.type})
        }
    }

    const handleUploadFiles = (chosenFiles: File[]) => {
        const uploaded = [...files]
        const uploadedUrlFiles = [...urlFiles]

        chosenFiles.some(file => {
            if (uploaded.findIndex(f => f.name === file.name) === -1) {
                uploaded.push(file)
            }
        })

        chosenFiles.forEach(file => {
            const url = URL.createObjectURL(file)
            uploadedUrlFiles.push({url, name: file.name})
        })

        setFiles(uploaded)
        setUrlFiles(uploadedUrlFiles)
    }

    const handleDeleteFile = (index: number) => {
        setFiles(files => files.filter((_, id) => id !== index))
        setUrlFiles(files => files.filter((_, id) => id !== index))
    }

    const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(event.target.files)

        handleUploadFiles(chosenFiles)
    }

    const handleUploadFile = () => {
        if (files.length) {
            const formData = new FormData()

            formData.append('base_lesson', `${data?.baselesson_ptr_id}`)
            formData.append('file', files[0])

            addTextFiles(formData)
        }
    }

    useEffect(() => {
        isSuccess && setLesson(data)
    }, [data])

    return (
        <section style={{opacity: isFetching ? 0.5 : 1, position: 'relative'}}
                 className={styles.redactorCourse_rightSideWrapper}>
            <div style={{position: 'relative'}} className={styles.redactorCourse_rightSideWrapper_rightSide}>
                <div className={styles.redactorCourse_rightSideWrapper_rightSide_header}>
                    <div className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock}>
                        {!isEditing ? (
                            <div className={styles.coursePreviewHeader}>
                                <button onClick={() => setIsEditing(true)}
                                        className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_setting}>
                                    <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath}/>
                                    Редактировать
                                </button>
                                {lesson?.active ? (
                                    <p className={styles.coursePreviewHeader_text_block}>
                                        <IconSvg width={18} height={16} path={publishedIconPath}/>
                                        опубликовано
                                    </p>
                                ) : (
                                    <p className={styles.coursePreviewHeader_text_block}>
                                        <IconSvg width={18} height={16} path={noPublishedIconPath}/>
                                        не опубликовано
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className={styles.coursePreviewHeaderRedactor}>
                                <div style={{display: 'flex'}}>
                                    <button
                                        className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_edit}
                                        onClick={showSettingsModal}>
                                        <IconSvg width={16} height={16} viewBoxSize="0 0 16 16"
                                                 path={settingsIconPath}/>
                                        Изменить название урока
                                    </button>
                                    <button
                                        className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_delete}>
                                        <IconSvg functionOnClick={handleDeleteLesson} width={19} height={19}
                                                 viewBoxSize="0 0 19 19"
                                                 path={deleteIconPath}/>
                                    </button>
                                    <button
                                        className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_save}
                                        onClick={handleSaveChanges}>
                                        <IconSvg width={16} height={16} viewBoxSize="0 0 20 20" path={acceptedHwPath}/>
                                        Сохранить изменения
                                    </button>
                                </div>
                                <div>
                                    {lesson?.active ? (
                                        <p className={styles.coursePreviewHeader_text_block}>
                                            <IconSvg width={18} height={16} path={publishedIconPath}/>
                                            опубликовано
                                        </p>
                                    ) : (
                                        <p className={styles.coursePreviewHeader_text_block}>
                                            <IconSvg width={18} height={16} path={noPublishedIconPath}/>
                                            не опубликовано
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
                        <span
                            className={styles.redactorCourse_rightSideWrapper_rightSide_nameSettings}>{lesson && 'name' in lesson && lesson.name}</span>
                        <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_content}>
                            <></>
                            <span
                                className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
                        </div>
                        {lesson.type !== 'test' && <>
                            {("video" in lesson && lesson.video) ? (
                                <div style={{marginBottom: "20px"}}>
                                    <VideoPlayer videoSrc={lesson.video}/>
                                </div>
                            ) : (
                                <></>
                            )}
                            {("description" in lesson && lesson.description) ? (
                                <NewTextEditor text={lesson.description} setLessonDescription={setLessonDescription}/>
                            ) : (
                                <NewTextEditor text={lessonDescription} setLessonDescription={setLessonDescription}/>
                            )}
                            <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_container}>
                                <AddPost lessonIdAndType={lessonIdAndType} lesson={lesson}/>
                            </div>
                            <span className={styles.redactorCourse_rightSideWrapper_rightSide_functional_form_title}>Прикреплённые файлы</span>
                            <AddFileBtn handleChangeFiles={handleChangeFiles}/>
                            <span className={styles.redactorCourse_rightSideWrapper_rightSide_desc}>Любые файлы размером не более 2 мегабайт</span>

                            {urlFiles?.map(({url, name}, index: number) => (
                                <UploadedFile key={index} index={index} file={url} name={name} size={files[index].size}
                                              handleDeleteFile={handleDeleteFile}/>
                            ))}
                            {urlFiles.length > 0 && (
                                <Button style={{marginTop: '20px'}} variant="primary" text="Загрузить" type="submit"
                                        onClick={handleUploadFile}/>
                            )}
                        </>}
                        {lessonIdAndType.type === 'test' && <AddQuestion testId={lessonIdAndType.id}/>}
                    </div>
                ) : (
                    <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
                        <span
                            className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
                        {renderUI()}
                    </div>
                )}
                {isFetching && (
                    <div style={{
                        position: 'absolute',
                        zIndex: 20,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <SimpleLoader style={{width: '100px', height: '100px'}}/>
                    </div>
                )}
            </div>
        </section>
    )
})
