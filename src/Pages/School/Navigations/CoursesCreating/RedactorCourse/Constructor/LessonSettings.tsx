import {ChangeEvent, FC, memo, useEffect, useState} from 'react'

import {UploadedFile} from 'components/UploadedFile'
import {Button} from 'components/common/Button/Button'
import {AddFileBtn} from 'components/common/AddFileBtn/index'
import {CheckboxBall} from 'components/common/CheckboxBall'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {AddPost} from 'components/AddPost'
import {settingsIconPath, deleteIconPath} from '../../../../config/svgIconsPath'
import {useFetchLessonQuery, usePatchLessonsMutation} from 'api/modulesServices'
import {ClassesSettingsPropsT} from 'types/navigationTypes'
import {commonLessonT} from 'types/sectionT'
import {useBoolean} from 'customHooks/useBoolean'
import {AddQuestion} from 'components/AddQuestion'
import {SimpleLoader} from 'components/Loaders/SimpleLoader/index'
import {usePostTextFilesMutation} from 'api/filesService'

import styles from './constructor.module.scss'

export const LessonSettings: FC<ClassesSettingsPropsT> = memo(({deleteLesson, lessonIdAndType, setType}) => {
    const [isToggle, {onToggle}] = useBoolean()
    const [files, setFiles] = useState<File[]>([])
    const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])

    const {data, isFetching, isSuccess} = useFetchLessonQuery({id: +lessonIdAndType.id, type: lessonIdAndType.type})

    // const [addFile] = usePatchLessonsMutation()
    const [addTextFiles] = usePostTextFilesMutation()

    const [lesson, setLesson] = useState(data as commonLessonT)

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
                    <span
                        className={styles.redactorCourse_rightSideWrapper_rightSide_title}>{lesson && 'name' in lesson && lesson.name}</span>
                    <div className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock}>
                        <button onClick={showSettingsModal}
                                className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_setting}>
                            <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath}/>
                            Настройки
                        </button>
                        <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_delete}>
                            <IconSvg functionOnClick={handleDeleteLesson} width={19} height={19} viewBoxSize="0 0 19 19"
                                     path={deleteIconPath}/>
                        </button>
                    </div>
                </div>
                <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
                    <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_content}>
                        <span
                            className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия</span>
                        <div className={styles.redactorCourse_rightSideWrapper_rightSide_review}>
                            <span
                                className={styles.redactorCourse_rightSideWrapper_rightSide_functional_content_preview}>Предпросмотр</span>
                            <CheckboxBall isChecked={isToggle} toggleChecked={onToggle}/>
                        </div>
                    </div>

                    <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_container}>
                        <AddPost lessonIdAndType={lessonIdAndType} lesson={lesson} isPreview={isToggle}/>
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
                </div>
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
            {lessonIdAndType.type === 'test' && <AddQuestion testId={lessonIdAndType.id}/>}
        </section>
    )
})
