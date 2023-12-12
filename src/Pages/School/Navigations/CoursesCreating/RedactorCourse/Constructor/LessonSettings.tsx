import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { UploadedFile } from 'components/UploadedFile'
import { AddFileBtn } from 'components/common/AddFileBtn/index'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddPost } from 'components/AddPost'
import { deleteIconPath, settingsIconPath } from '../../../../config/svgIconsPath'
import { useFetchLessonQuery, usePatchLessonsMutation } from 'api/modulesServices'
import { ClassesSettingsPropsT } from 'types/navigationTypes'
import { commonLessonT } from 'types/sectionT'
import { AddQuestion } from 'components/AddQuestion'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'
import { useDeleteAudioFilesMutation, useDeleteTextFilesMutation, usePostTextFilesMutation } from 'api/filesService'
import styles from './constructor.module.scss'
import { LESSON_TYPE } from '../../../../../../enum/lessonTypeE'
import { AdminLesson } from './AdminLessonPreview/AdminLesson'
import { NewTextEditor } from '../../../../../../components/AddTextEditor/NewTextEditor'
import { VideoPlayer } from '../../../../../../components/VideoPlayer/player'
import { AdminTest } from './AdminTestPreview/AdminTest'
import { AdminHomework } from './AdminHomeworkPreview/AdminHomework'
import { acceptedHwPath } from '../../../../../../config/commonSvgIconsPath'
import { IFile } from '../../../../../../types/filesT'
import { CheckboxBall } from '../../../../../../components/common/CheckboxBall'
import { PublishedMark } from '../../../../../../components/common/PublishedMark'
// import { AudioPlayer } from 'components/common/AudioPlayer'

export const LessonSettings: FC<ClassesSettingsPropsT> = memo(({ deleteLesson, lessonIdAndType, setType }) => {
  const [files, setFiles] = useState<File[]>([])
  const schoolName = window.location.href.split('/')[4]
  const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
  const [renderFiles, setRenderFiles] = useState<IFile[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [lessonDescription, setLessonDescription] = useState<string>('')
  const [isPublished, setIsPublished] = useState(false)
  const [audiofiles, setAudiofiles] = useState<File[]>([])

  const { data, isFetching, isSuccess } = useFetchLessonQuery({ id: +lessonIdAndType.id, type: lessonIdAndType.type, schoolName })
  const [addTextFiles] = usePostTextFilesMutation()
  const [saveChanges, { isLoading: isSaving, isSuccess: isCompleted }] = usePatchLessonsMutation()
  const [deleteFile, { isLoading: isDeleting }] = useDeleteTextFilesMutation()
  const [deleteAudio, { isLoading: isAudioDeleting }] = useDeleteAudioFilesMutation()

  const [lesson, setLesson] = useState(data as commonLessonT)
  const [lessonVideo, setLessonVideo] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      setIsPublished(data.active)
    }
  }, [data])

  useEffect(() => {
    if (lesson && lesson.type !== 'test' && lesson.text_files) {
      setRenderFiles(lesson.text_files)
      setFiles([])
      setUrlFiles([])
    } else if (lesson && lesson.type !== 'test' && !lesson.text_files) {
      setRenderFiles([])
      setFiles([])
      setUrlFiles([])
    }

    if (lesson) {
      if ('description' in lesson && lesson.description) {
        setLessonDescription(lesson.description)
      } else {
        setLessonDescription('')
      }

      if (('video' in lesson && lesson.video) || ('url' in lesson && lesson.url)) {
        setLessonVideo(true)
      }
    }
  }, [lesson])

  const handleSaveChanges = async () => {
    if (files.length) {
      const formData1 = new FormData()

      formData1.append('base_lesson', `${data?.baselesson_ptr_id}`)
      files.forEach(file => formData1.append('files', file))
      await addTextFiles({formData: formData1, schoolName}).then(data => {
        setFiles([])
        setUrlFiles([])
      })
    }

    const formData = new FormData()
    formData.append('description', lessonDescription)
    formData.append('section', String(lesson.section))
    formData.append('order', String(lesson.order))
    formData.append('active', String(isPublished))
    await saveChanges({arg: { id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData }, schoolName})
  }

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

  useEffect(() => {
    setIsEditing(false)
    setLessonVideo(false)
  }, [lessonIdAndType])

  const showSettingsModal = () => {
    setType('setting' as keyof object)
  }

  const handleDeleteLesson = async () => {
    if ('id' in lessonIdAndType) {
      await deleteLesson({ id: lessonIdAndType.id, type: lessonIdAndType.type, schoolName })
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
      uploadedUrlFiles.push({ url, name: file.name })
    })

    setFiles(uploaded)
    setUrlFiles(uploadedUrlFiles)
  }

  const handleDeleteFile = (index: number) => {
    setFiles(files => files.filter((_, id) => id !== index))
    setUrlFiles(files => files.filter((_, id) => id !== index))
  }

  const handleDeleteVideo = async (video: string | undefined) => {
    if (video && video === lesson.url) {
      const formData = new FormData()
      formData.append('section', String(lesson.section))
      formData.append('order', String(lesson.order))
      formData.append('active', String(isPublished))
      formData.append('url', '')
      await saveChanges({arg: { id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData }, schoolName})
    }
    if (video && video === lesson.video) {
      const formData = new FormData()
      formData.append('section', String(lesson.section))
      formData.append('order', String(lesson.order))
      formData.append('active', String(isPublished))
      formData.append('video_use', String(true))
      await saveChanges({arg: { id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData }, schoolName})
    }
  }

  const handleDeleteAudioFile = async (index: number) => {
    if (lesson.type !== 'test') {
      const fileToDelete = lesson.audio_files[index]
      if (fileToDelete) {
        await deleteAudio({id: String(fileToDelete.id), schoolName})
      }
    }
  }

  const handleDeleteFileFromLesson = async (index: number) => {
    if (lesson.type !== 'test') {
      const fileToDelete = lesson.text_files[index]
      if (fileToDelete) {
        await deleteFile({id: String(fileToDelete.id), schoolName})
          .unwrap()
          .then(data => setRenderFiles(renderFiles.filter(file => file.id !== fileToDelete.id)))
      }
    }
  }

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files)

    handleUploadFiles(chosenFiles)
  }

  useEffect(() => {
    isSuccess && setLesson(data)
  }, [data])

  const publickButton = {
    width: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  useEffect(() => {
    if (isCompleted) {
      if (lessonDescription && lesson.type !== LESSON_TYPE.TEST) {
        setLesson({ ...lesson, description: lessonDescription, active: isPublished })
      } else {
        setLesson({ ...lesson, active: isPublished })
      }
      setIsEditing(!isEditing)
    }
  }, [isCompleted, isSaving])

  return (
    <section
      style={{ opacity: isFetching || isDeleting || isSaving ? 0.5 : 1, position: 'relative' }}
      className={styles.redactorCourse_rightSideWrapper}
    >
      <div style={{ position: 'relative' }} className={styles.redactorCourse_rightSideWrapper_rightSide}>
        <div className={styles.redactorCourse_rightSideWrapper_rightSide_header}>
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock}>
            {!isEditing ? (
              <div className={styles.coursePreviewHeader}>
                <button onClick={() => setIsEditing(true)} className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_setting}>
                  <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
                  Редактировать
                </button>
              </div>
            ) : (
              <div className={styles.coursePreviewHeaderRedactor}>
                <div style={{ display: 'flex' }}>
                  <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_edit} onClick={showSettingsModal}>
                    <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
                    Изменить название урока
                  </button>
                  
                  <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_save} onClick={handleSaveChanges}>
                    <IconSvg width={16} height={16} viewBoxSize="0 0 20 20" path={acceptedHwPath} />
                    Сохранить изменения
                  </button>

                  <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_delete}>
                    <IconSvg functionOnClick={handleDeleteLesson} width={16} height={16} viewBoxSize="0 0 19 19" path={deleteIconPath} />
                    Удалить
                  </button>
                </div>
                <div style={publickButton}>
                  <CheckboxBall isChecked={isPublished} toggleChecked={() => setIsPublished(!isPublished)} />
                  <PublishedMark isPublished={isPublished} />
                </div>
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
            <span className={styles.redactorCourse_rightSideWrapper_rightSide_nameSettings}>{lesson && 'name' in lesson && lesson.name}</span>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_content}>
              <></>
              <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
            </div>
            {lesson.type !== 'test' && (
              <>
                {lessonVideo &&
                  (lesson.url && lesson.video ? (
                    <div style={{ marginBottom: '20px' }}>
                      <VideoPlayer
                        videoSrc={lesson.video}
                        videoSrc2={lesson.url}
                        isEditing={isEditing}
                        handleDeleteVideo={handleDeleteVideo}
                        isDeleted={isCompleted}
                        lessonId={lesson.baselesson_ptr_id}
                      />
                    </div>
                  ) : !lesson.video && lesson.url ? (
                    <div style={{ marginBottom: '20px' }}>
                      <VideoPlayer
                        videoSrc={lesson.url}
                        videoSrc2={''}
                        isEditing={isEditing}
                        handleDeleteVideo={handleDeleteVideo}
                        isDeleted={isCompleted}
                        lessonId={lesson.baselesson_ptr_id}
                      />
                    </div>
                  ) : (
                    <div style={{ marginBottom: '20px' }}>
                      <VideoPlayer
                        videoSrc={lesson.video}
                        videoSrc2={''}
                        isEditing={isEditing}
                        handleDeleteVideo={handleDeleteVideo}
                        isDeleted={isCompleted}
                        lessonId={lesson.baselesson_ptr_id}
                      />
                    </div>
                  ))}
                {'description' in lesson && lesson.description ? (
                  <NewTextEditor text={lesson.description} setLessonDescription={setLessonDescription} />
                ) : (
                  <NewTextEditor text={lessonDescription} setLessonDescription={setLessonDescription} />
                )}
                <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_container}>
                  <AddPost lessonIdAndType={lessonIdAndType} lesson={lesson} deleteAudio={handleDeleteAudioFile} />
                </div>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_functional_form_title}>Прикреплённые файлы</span>

                {renderFiles?.map(({ file, id, size, file_url }, index: number) => (
                  <UploadedFile
                    key={id}
                    index={index}
                    file={file}
                    name={file_url}
                    size={Number(size)}
                    handleDeleteFile={index => handleDeleteFileFromLesson(index)}
                  />
                ))}

                <AddFileBtn handleChangeFiles={handleChangeFiles} />
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_desc}>Любые файлы размером не более 2 мегабайт</span>

                {urlFiles?.map(({ url, name }, index: number) => (
                  <UploadedFile
                    isHw={true}
                    key={index}
                    index={index}
                    file={url}
                    name={name}
                    size={files[index].size}
                    handleDeleteFile={handleDeleteFile}
                  />
                ))}
                {/*{urlFiles.length > 0 && (*/}
                {/*    <Button style={{marginTop: '20px'}} variant="primary" text="Загрузить" type="submit"*/}
                {/*            onClick={handleUploadFile}/>*/}
                {/*)}*/}
              </>
            )}
            {lessonIdAndType.type === 'test' && <AddQuestion testId={lessonIdAndType.id} />}
          </div>
        ) : (
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
            <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
            {renderUI()}
          </div>
        )}
        {(isFetching || isDeleting || isSaving) && (
          <div
            style={{
              position: 'absolute',
              zIndex: 20,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SimpleLoader style={{ width: '100px', height: '100px' }} />
          </div>
        )}
      </div>
    </section>
  )
})
