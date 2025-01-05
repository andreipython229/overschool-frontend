import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import styles1 from '../../../../../../components/Modal/Modal.module.scss'
import { UploadedFile } from 'components/UploadedFile'
import { AddFileBtn } from 'components/common/AddFileBtn/index'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddPost } from 'components/AddPost'
import { deleteIconPath, settingsIconPath } from '../../../../config/svgIconsPath'
import { useFetchLessonQuery, useLazyFetchPreviousTestsQuery, usePatchLessonsMutation } from 'api/modulesServices'
import { ClassesSettingsPropsT } from 'types/navigationTypes'
import { BlockT, commonLessonT, TestT, checkedTestT } from 'types/sectionT'
import { AddQuestion, QuestionT } from 'components/AddQuestion'
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
import { BLOCK_TYPE } from 'enum/blockTypeE'
import { AddCodeEditor } from 'components/AddCodeEditor'
import { AddVideo } from 'components/AddVideo'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { useDeleteBlockMutation, useOrderUpdateMutation } from 'api/blocksService'
import { useDebounceFunc, useBoolean } from 'customHooks'
import { AnimatePresence, Reorder } from 'framer-motion'
import { Checkbox } from '../../../../../../components/common/Checkbox/Checkbox'
import { AddPicture } from 'components/AddPicture'
import { AddAudio } from 'components/AddAudio'
import { MathEditor } from 'components/MathEditor'
import { BlockButtons } from 'components/BlockButtons'

import { Portal } from 'components/Modal/Portal'
import { WarningModal } from 'components/Modal/Warning'
import { useParams } from 'react-router-dom'
import { NewAudioPlayer } from 'components/NewAudioPlayer'
import { convertSecondsToTime } from 'utils/convertDate'
import { Toast } from 'primereact/toast'
import { Button } from 'components/common/Button/Button'
import { InputBlock } from 'components/common/Input/InputBlock'
import { useLazyFetchQuestionsListQuery } from 'api/questionsAndAnswersService'

export const LessonSettings: FC<ClassesSettingsPropsT> = memo(({ deleteLesson, lessonIdAndType, setType }) => {
  const toast = useRef<Toast>(null)
  const [testHasTimer, setTestHasTimer] = useState(false)
  const [timeValue, setTimeValue] = useState<{ minutes: string; seconds: string }>({ minutes: '00', seconds: '00' })
  const { course_id: courseId } = useParams()
  const [changeOrder, { isLoading: changingOrder }] = useOrderUpdateMutation()
  const [lessonBlocks, setLessonBlocks] = useState<BlockT[]>([])
  const [files, setFiles] = useState<File[]>([])
  const schoolName = window.location.href.split('/')[4]
  const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
  const [renderFiles, setRenderFiles] = useState<IFile[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const debounceBlockOrder = useDebounceFunc(changeOrder, 2000)
  const [newBlocksOrders, setNewBlocksOrders] = useState<BlockT[]>([])

  const { data, isFetching, isSuccess, refetch } = useFetchLessonQuery({
    id: +lessonIdAndType.id,
    type: lessonIdAndType.type,
    schoolName,
    courseId: courseId,
  })
  const [addTextFiles] = usePostTextFilesMutation()
  const [saveChanges, { isLoading: isSaving, isSuccess: isCompleted, isError, error: saveError }] = usePatchLessonsMutation()
  const [deleteFile, { isLoading: isDeleting }] = useDeleteTextFilesMutation()
  const [deleteAudio, { isLoading: isAudioDeleting }] = useDeleteAudioFilesMutation()
  const [deleteBlock, { isLoading: isBlockDeleting }] = useDeleteBlockMutation()
  const [lesson, setLesson] = useState(data as commonLessonT)
  const [numQuestions, setNumQuestions] = useState<number>()
  const [getPreviousTests, { data: gettedTests }] = useLazyFetchPreviousTestsQuery()
  const [previousTests, setPreviousTests] = useState<checkedTestT[]>()
  const [autogeneration, setAutogeneration] = useState(false)
  const [error, setError] = useState('')
  const [fileError, setFileError] = useState('')
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [isAddAudioClicked, setIsAddAudioClicked] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
  const [testName, setTestName] = useState<string>((lesson && 'name' in lesson && lesson?.name) ? lesson?.name : '')
  
  const [fetchQuestionsList, { data: questionsList, isLoading, isSuccess: isSuccessful }] = useLazyFetchQuestionsListQuery();
  const [questions, setQuestions] = useState<QuestionT[]>([])

  useEffect(() => {
    if (lessonIdAndType.id && schoolName && courseId) {
      fetchQuestionsList({ id: String(lessonIdAndType.id), schoolName, course_id: courseId });
    }
  }, [lessonIdAndType.id, schoolName, courseId]);

  useEffect(() => {
    if (questionsList) {
      setQuestions(questionsList?.questions)
    }
  }, [questionsList])

  const handleChangeTestName = (event: ChangeEvent<HTMLInputElement>) => {
    setTestName(event.target.value)
  }

  useEffect(() => {
    if (lesson && 'name' in lesson && lesson?.name) {
      setTestName(lesson?.name)
    }
  }, [lesson?.name]);

  useEffect(() => {
    switch (lesson?.type) {
      case LESSON_TYPE.TEST:
        setTitle('Содержание теста:')
        break
      case LESSON_TYPE.LESSON:
        setTitle('Содержание урока:')
        break
      case  LESSON_TYPE.HOMEWORK:
        setTitle('Содержание домашней работы:')
        break
    }
  }, [lesson?.type])

  useEffect(() => {
    if (data) {
      setIsPublished(data.active)
      if (data.type === 'test') {
        setAutogeneration(data.random_test_generator)
        setNumQuestions(data.num_questions)
      }
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
    if (lesson && lesson.type !== 'test') {
      setLessonBlocks(lesson.blocks)
    } else if (lesson && lesson.type === 'test') {
      getPreviousTests({ id: lessonIdAndType.id, schoolName: schoolName })
      setTestHasTimer(lesson.has_timer)
      if (lesson.has_timer && lesson.time_limit) {
        const minutes = lesson.time_limit.split(':')[1]
        const seconds = lesson.time_limit.split(':')[2]
        setTimeValue({ minutes: minutes, seconds: seconds })
      }
    }
  }, [lesson])

  const updateLesson = (newLesson: commonLessonT) => {
    setLesson(newLesson)
  }

  useEffect(() => {
    if (gettedTests && gettedTests?.length) {
      const checkedTests: checkedTestT[] | undefined = gettedTests?.map((test: TestT) => ({
        ...test,
        checked: false,
      }))
      setPreviousTests(checkedTests)
    }
  }, [gettedTests])

  const renderBlocks = () => {
    return lessonBlocks.map(block => {
      switch (block.type) {
        case BLOCK_TYPE.TEXT:
          if ('description' in block && block.description) {
            return (
              <NewTextEditor key={block.id} text={block.description} block={block} setLessonBlocks={setLessonBlocks} lessonBlocks={lessonBlocks} />
            )
          } else {
            return <NewTextEditor key={block.id} text="" block={block} setLessonBlocks={setLessonBlocks} lessonBlocks={lessonBlocks} />
          }
        case BLOCK_TYPE.CODE:
          if ('code' in block && block.code) {
            return (
              <AddCodeEditor
                key={block.id}
                isPreview={!isEditing}
                lesson={lesson}
                code={block.code}
                block={block}
                deleteBlock={deleteBlock}
                setLessonBlocks={setLessonBlocks}
                lessonBlocks={lessonBlocks}
              />
            )
          } else {
            return (
              <AddCodeEditor
                key={block.id}
                isPreview={!isEditing}
                lesson={lesson}
                code={''}
                block={block}
                deleteBlock={deleteBlock}
                setLessonBlocks={setLessonBlocks}
                lessonBlocks={lessonBlocks}
              />
            )
          }
        case BLOCK_TYPE.VIDEO:
          if ('video' in block && block.video) {
            return (
              <VideoPlayer
                key={block.id}
                isEditing={isEditing}
                lessonId={lesson.baselesson_ptr_id}
                block={block}
                videoSrc={block.video}
                deleteBlock={deleteBlock}
                setLessonBlocks={setLessonBlocks}
                lessonBlocks={lessonBlocks}
              />
            )
          } else if ('url' in block && block.url) {
            return (
              <VideoPlayer
                key={block.id}
                isEditing={isEditing}
                block={block}
                lessonId={lesson.baselesson_ptr_id}
                videoSrc={block.url}
                deleteBlock={deleteBlock}
                setLessonBlocks={setLessonBlocks}
                lessonBlocks={lessonBlocks}
              />
            )
          } else {
            return (
              <AddVideo
                key={block.id}
                lesson={lesson}
                block={block}
                deleteBlock={deleteBlock}
                setLessonBlocks={setLessonBlocks}
                lessonBlocks={lessonBlocks}
              />
            )
          }
        case BLOCK_TYPE.PICTURE:
          if ('picture_url' in block && block.picture_url) {
            return (
              <AddPicture
                key={block.id}
                lesson={lesson}
                block={block}
                deleteBlock={deleteBlock}
                setLessonBlocks={setLessonBlocks}
                lessonBlocks={lessonBlocks}
                pictureUrl={block.picture_url}
              />
            )
          }
          return (
            <AddPicture
              key={block.id}
              lesson={lesson}
              block={block}
              deleteBlock={deleteBlock}
              setLessonBlocks={setLessonBlocks}
              lessonBlocks={lessonBlocks}
            />
          )
        case BLOCK_TYPE.MATH:
          if ('formula' in block && block.formula) {
            return (
              <MathEditor
                key={block.id}
                edit={true}
                block={block}
                lessonBlocks={lessonBlocks}
                setLessonBlocks={setLessonBlocks}
                latex={block.formula}
              />
            )
          } else {
            return <MathEditor key={block.id} edit={true} block={block} lessonBlocks={lessonBlocks} setLessonBlocks={setLessonBlocks} latex={''} />
          }
        case BLOCK_TYPE.BUTTONS:
          return <BlockButtons key={block.id} block={block} lessonBlocks={lessonBlocks} setLessonBlocks={setLessonBlocks} />
      }
    })
  }

  const handleSaveChanges = async () => {
    setError('')
    setFileError('')
    let tmpError = ''
    if (files.length) {
      const formData1 = new FormData()
      formData1.append('base_lesson', `${data?.baselesson_ptr_id}`)
      files.forEach(file => formData1.append('files', file))
      await addTextFiles({ formData: formData1, schoolName }).then(async data => {
        setFiles([])
        setUrlFiles([])
        const formData = new FormData()
        // formData.append('description', lessonDescription)
        formData.append('section', String(lesson.section))
        formData.append('order', String(lesson.order))
        formData.append('active', String(isPublished))

        if (lesson.type === 'test') {
          formData.append('random_test_generator', String(autogeneration))
          formData.append('has_timer', String(testHasTimer))
          formData.append('name', testName)
          if (testHasTimer) {
            formData.append('time_limit', `${timeValue.minutes}:${timeValue.seconds}`)
          } else {
            formData.append('time_limit', '00:00')
          }
          if (autogeneration) {
            const selectedTests = previousTests?.filter((test: checkedTestT) => test.checked)
            if (numQuestions && selectedTests?.length) {
              formData.append('num_questions', String(numQuestions))
              selectedTests.map((test: checkedTestT) => formData.append('tests_ids', String(test.test_id)))
            } else {
              tmpError = 'Необходимо выбрать количество вопросов и тесты для генерации списка вопросов'
              setError(tmpError)
            }
          }
        }
        !tmpError &&
          (await saveChanges({
            arg: {
              id: +lessonIdAndType.id,
              type: lessonIdAndType.type,
              formdata: formData,
            },
            schoolName,
          })
            .unwrap()
            .then(data => {
              console.log(data)
              refetch()
            }))
      })
    } else {
      const formData = new FormData()
      // formData.append('description', lessonDescription)
      formData.append('section', String(lesson.section))
      formData.append('order', String(lesson.order))
      formData.append('active', String(isPublished))

      if (lesson.type === 'test') {
        formData.append('random_test_generator', String(autogeneration))
        formData.append('has_timer', String(testHasTimer))
        formData.append('name', testName)
        if (testHasTimer) {
          formData.append('time_limit', `${timeValue.minutes}:${timeValue.seconds}`)
        } else {
          formData.append('time_limit', '00:00')
        }
        if (autogeneration) {
          const selectedTests = previousTests?.filter((test: checkedTestT) => test.checked)
          if (numQuestions && selectedTests?.length) {
            formData.append('num_questions', String(numQuestions))
            selectedTests.map((test: checkedTestT) => formData.append('tests_ids', String(test.test_id)))
          } else {
            tmpError = 'Необходимо выбрать количество вопросов и тесты для генерации списка вопросов'
            setError(tmpError)
          }
        }
      }
      !tmpError &&
        (await saveChanges({
          arg: {
            id: +lessonIdAndType.id,
            type: lessonIdAndType.type,
            formdata: formData,
          },
          schoolName,
        })
          .unwrap()
          .then(data => {
            console.log(data)
            refetch()
          }))
    }
  }

  const renderUI = () => {
    if (isSuccess) {
      switch (lesson?.type) {
        case LESSON_TYPE.LESSON:
          return <AdminLesson lesson={lesson} />
        case LESSON_TYPE.HOMEWORK:
          return <AdminHomework lesson={lesson} />
        case LESSON_TYPE.TEST:
          return <AdminTest testId={lessonIdAndType.id as number} isLoading={isLoading} isSuccess={isSuccessful} questions={questions} />
      }
    }
  }

  useEffect(() => {
    if (isError && saveError) {
      toast.current?.show({
        severity: 'error',
        summary: 'Ошибка сохранения',
        detail: `Возникла проблема с сохранением урока. Проверьте правильность введенных данных. Текст ошибки: ${
          'data' in saveError ? JSON.stringify(saveError.data) : ''
        }`,
      })
    }
  }, [isError])

  useEffect(() => {
    setIsEditing(false)
  }, [lessonIdAndType])

  const showSettingsModal = () => {
    setType('setting' as keyof object)
    setFileError('')
  }

  const handleDeleteLesson = async () => {
    if ('id' in lessonIdAndType) {
      await deleteLesson({ id: lessonIdAndType.id, type: lessonIdAndType.type, schoolName })
    }
  }

  const handleUploadFiles = (chosenFiles: File[]) => {
    setFileError('')
    const uploaded = [...files]
    const uploadedUrlFiles = [...urlFiles]
    let tmpError = ''
    chosenFiles.some(file => {
      if (uploaded.findIndex(f => f.name === file.name) === -1) {
        if (file.size < 201 * 1024 * 1024) {
          uploaded.push(file)
        } else {
          console.log('error')
          tmpError = 'Превышен допустимый размер файла'
          setFileError(tmpError)
        }
      }
    })
    if (!tmpError) {
      chosenFiles.forEach(file => {
        const url = URL.createObjectURL(file)
        uploadedUrlFiles.push({ url, name: file.name })
      })

      setFiles(uploaded)
      // setUrlFiles(uploadedUrlFiles)
    }
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
      await saveChanges({
        arg: { id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData },
        schoolName,
      })
    }
    if (video && video === lesson.video) {
      const formData = new FormData()
      formData.append('section', String(lesson.section))
      formData.append('order', String(lesson.order))
      formData.append('active', String(isPublished))
      formData.append('video_use', String(true))
      await saveChanges({
        arg: { id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData },
        schoolName,
      })
    }
  }

  const handleDeleteAudioFile = async (index: number) => {
    if (lesson.type !== 'test') {
      const fileToDelete = lesson.audio_files[index]
      if (fileToDelete) {
        await deleteAudio({ id: String(fileToDelete.id), schoolName })
        const updatedAudioFiles = lesson.audio_files.filter(file => file.id !== fileToDelete.id)
        setLesson(prevLesson => ({
          ...prevLesson,
          audio_files: updatedAudioFiles,
        }))
      }
    }
  }

  const handleDeleteFileFromLesson = async (index: number) => {
    if (lesson.type !== 'test') {
      const fileToDelete = lesson.text_files[index]
      if (fileToDelete) {
        await deleteFile({ id: String(fileToDelete.id), schoolName })
          .unwrap()
          .then(data => {
            setRenderFiles(renderFiles.filter(file => file.id !== fileToDelete.id))
            // Обновление lesson.text_files после удаления файла
            setLesson(prevLesson => ({
              ...prevLesson,
              text_files: lesson.text_files.filter(file => file.id !== fileToDelete.id),
            }))
          })
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
      setLesson({ ...lesson, active: isPublished })
      setIsEditing(!isEditing)
    }
  }, [isCompleted, isSaving])

  const handleOrderUpdate = (blocksWithNewOrders: BlockT[]) => {
    setLessonBlocks(blocksWithNewOrders)
    setNewBlocksOrders(blocksWithNewOrders)
  }

  useEffect(() => {
    const updatedBlockOrder = newBlocksOrders.map(({ id, order }, index) => ({
      block_id: id,
      order: index + 1,
    }))
    if (updatedBlockOrder.length > 0 && updatedBlockOrder.length > 0) {
      debounceBlockOrder({ data: updatedBlockOrder, schoolName })
    }
  }, [newBlocksOrders])

  const handleTestCheck = (e: any) => {
    previousTests &&
      previousTests.length &&
      setPreviousTests(
        previousTests.map(test => ({
          ...test,
          checked: test.test_id === Number(e.target.id) ? !test.checked : test.checked,
        })),
      )
  }

  const handleChangeNum = (event: ChangeEvent<HTMLInputElement>) => {
    setNumQuestions(Number(event.target.value))
  }

  return (
    <section
      style={{ opacity: isFetching || isDeleting || isSaving ? 0.5 : 1, position: 'relative' }}
      className={styles.redactorCourse_rightSideWrapper}
    >
      <div className={styles.redactorCourse_rightSideWrapper_rightSide}>
        <div className={styles.redactorCourse_rightSideWrapper_rightSide_header}>
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock}>
            {!isEditing ? <div className={styles.coursePreviewHeader}></div> : <div></div>}
          </div>
        </div>
        {isEditing ? (
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_blockAll}>
              <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>
                  {lesson && 'name' in lesson && lesson.name}
                </span>
                {/* <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_edit} onClick={showSettingsModal}>Редактировать</span> */}
              </div>
              <div className={styles.coursePreviewHeaderRedactor}>
                <div className={styles.publicBlockEdit}>
                  <AnimatePresence>
                    <div className={styles.publickButton}>
                      <div className={styles.publicBlockEdit_mark}>
                        <PublishedMark isPublished={isPublished}/>
                      </div>
                      <div className={styles.publicBlockEdit_publish_switch}>
                        <CheckboxBall isChecked={isPublished} toggleChecked={() => setIsPublished(!isPublished)} />
                      </div>
                    </div>
                  </AnimatePresence>
                  <Button onClick={handleSaveChanges} variant={'newPrimary'} text={'Сохранить'} style={{padding: '13px 40px'}} />
              </div>
              </div>
            </div>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_content}>
              <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>{title}</span>
            </div>
            {lesson.type !== 'test' && (
              <>
                <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_container}>
                  <Reorder.Group className={styles1.settings_list} style={{ gap: '2em' }} values={lessonBlocks} onReorder={handleOrderUpdate} as="ul">
                    {renderBlocks()}
                  </Reorder.Group>

                  {lessonBlocks.length < 10 && (
                    <AddPost lessonIdAndType={lessonIdAndType} lesson={lesson} setLessonBlocks={setLessonBlocks} lessonBlocks={lessonBlocks} />
                  )}
                </div>

                <AddAudio
                  lessonIdAndType={lessonIdAndType}
                  isPreview={isPreview}
                  lesson={lesson}
                  addAudio={setFiles}
                  setShow={() => setIsAddAudioClicked(true)}
                  updateLesson={updateLesson}
                />

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2rem', paddingInline: '3em', marginTop: '2rem' }}>
                  <AddFileBtn handleChangeFiles={handleChangeFiles} />
                </div>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_desc}>Любые файлы размером не более 200 мегабайт</span>
                {fileError && <span className={styles.redactorCourse_rightSideWrapper_rightSide_error}>{fileError}</span>}
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_functional_form_title}>Прикреплённые файлы</span>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2rem', paddingInline: '3em', marginTop: '2rem' }}>
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

                  {files?.map((file: File, index: number) => (
                    <UploadedFile
                      key={index}
                      index={index}
                      file={file.name}
                      size={file.size}
                      handleDeleteFile={index => handleDeleteFileFromLesson(index)}
                    />
                  ))}
                </div>

                {lesson.audio_files && (
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2rem', paddingInline: '3em', marginTop: '2rem' }}>
                    {lesson.audio_files &&
                      lesson.audio_files.map((audio, index) => (
                        <NewAudioPlayer key={index} music={audio.file} delete={() => handleDeleteAudioFile(index)} index={index} />
                      ))}
                  </div>
                )}

                {/*{urlFiles.length > 0 && (*/}
                {/*    <Button style={{marginTop: '20px'}} variant="primary" text="Загрузить" type="submit"*/}
                {/*            onClick={handleUploadFile}/>*/}
                {/*)}*/}
              </>
            )}
            {lessonIdAndType.type === 'test' && (
              <>
                <div className={styles.wrapper_preview}>
                {showModal && (
                  <Portal closeModal={close}>
                    <WarningModal setShowModal={setShow} task={handleDeleteLesson} textModal={`Вы действительно хотите удалить?`} />
                  </Portal>
                  )}
                  <Button onClick={open} variant={'cancel'} text={'Удалить'} style={{ fontSize: '16px', alignSelf: 'flex-end', padding: '6px 21px' }} />
                  <h4 className={styles.wrapper_preview_title}>Превью</h4>
                  <div className={styles.wrapper_preview_test}>
                    <div className={styles.wrapper_preview_test_leftSide}>
                    <div className={styles.check_autotest}>
                      <div className={styles.publicBlockEdit_publish_switch}>
                        <CheckboxBall isChecked={autogeneration} toggleChecked={() => setAutogeneration(!autogeneration)} />
                      </div>
                      <span>Автогенерация теста</span>
                    </div>
                    <div className={styles.check_autotest}>
                      <div className={styles.publicBlockEdit_publish_switch}>
                        <CheckboxBall isChecked={testHasTimer} toggleChecked={() => setTestHasTimer(!testHasTimer)} />
                      </div>
                      <span>Таймер для прохождения теста:</span>
                      </div>
                      <div className={styles.wrapper_preview_test_inputWrapper}>
                        <InputBlock
                          onChange={handleChangeTestName}
                          name={'name'}
                          type={'text'}
                          value={testName}
                          placeholder='Название темы для теста'
                        />
                      </div>
                {testHasTimer && timeValue && (
                  <div className={styles.timeLimit}>
                    <label htmlFor="timer">Время выполнения:</label>
                    <div className={styles.timeLimit_input} id="timer">
                      <input
                        value={timeValue.minutes}
                        onChange={e => setTimeValue({ ...timeValue, minutes: e.target.value })}
                        type="tel"
                        min={0}
                        max={99}
                        id="timer-minutes"
                        name="timer-minutes"
                        inputMode="numeric"
                        maxLength={2}
                        onKeyDown={e => {
                          return /[0-9]/i.test(e.key)
                        }}
                      />
                      <span style={{paddingBottom: '5px'}}>:</span>
                      <input
                        value={timeValue.seconds}
                        onChange={e => setTimeValue({ ...timeValue, seconds: e.target.value })}
                        type="tel"
                        min={0}
                        inputMode="numeric"
                        maxLength={2}
                        max={59}
                        pattern="[0-9]{2}"
                        id="timer-seconds"
                        name="timer-seconds"
                      />
                    </div>
                  </div>
                    )}
                    </div>
                  </div>
                </div>
                {autogeneration ? (
                  previousTests?.length ? (
                    <div className={styles.autogeneration}>
                      {error && (
                        <div className={styles.autogeneration_error}>
                          <span>{error}</span>
                        </div>
                      )}
                      <div className={styles.autogeneration_num}>
                        <label htmlFor="num">Количество вопросов:</label>
                        <input value={numQuestions} onChange={handleChangeNum} type="number" />
                      </div>
                      <p className={styles.autogeneration_select}>Выбор тестов</p>
                      <div className={styles.autogeneration_tests_block}>
                        {previousTests?.map(
                          (
                            {
                              test_id,
                              // order,
                              type,
                              name,
                              active,
                              checked,
                            },
                            index: number,
                          ) =>
                            active && (
                              <div key={index} className={styles.autogeneration_test}>
                                <p className={styles.autogeneration_test_name}>{name}</p>
                                <Checkbox id={`${test_id}`} name={'check'} checked={checked} onChange={handleTestCheck} />
                                <div></div>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.no_autogeneration}>Доступных тестов для генерации списка вопросов нет</div>
                  )
                ) : (
                  <AddQuestion testId={lessonIdAndType.id} />
                )}
              </>
            )}
          </div>
        ) : (
          <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_nameBlock}>
              <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>
                  {lesson && 'name' in lesson && lesson.name}
                </span>
              </div>
              <div className={styles.publicBlockEdit}>
                  <AnimatePresence>
                    <div className={styles.publickButton}>
                      <div className={isPublished ? styles.publicBlockEdit_mark : `${styles.publicBlockEdit_mark} ${styles.unpublished}`}>
                        <PublishedMark isPublished={isPublished}/>
                      </div>
                      <div className={styles.publicBlockEdit_publish_switch}>
                        <CheckboxBall isChecked={isPublished} toggleChecked={() => setIsPublished(!isPublished)} />
                      </div>
                    </div>
                  </AnimatePresence>
                <Button onClick={() => setIsEditing(true)} variant={'newPrimary'} text={'Редактировать'}/>
              </div>
            </div>
              <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>{title}</span>
              {lessonIdAndType.type === 'test' && (
                <div className={styles.admin_preview}>
                <div className={styles.admin_preview_container}>
                  <span>Тест</span>
                  <div className={styles.admin_preview_container_title}>
                    {lesson && 'name' in lesson && lesson.name}
                  </div>
                    <div className={styles.admin_preview_container_wrapper}>
                      <span>Количество вопросов:</span>
                      <span className={styles.admin_preview_container_wrapper_value}>-</span>
                      {questions?.length ? <span className={styles.admin_preview_container_wrapper_value}>{questions?.length}</span> : <span className={styles.admin_preview_container_wrapper_value}>0</span>}
                    </div>
                    <div className={styles.admin_preview_container_wrapper} style={{marginTop: '23px'}}>
                      <span>Время выполнения:</span>
                      {(testHasTimer && timeValue) ? <span className={styles.admin_preview_container_wrapper_value}>{`${timeValue.minutes}`} : {`${timeValue.seconds}`}</span> : (
                        <span className={styles.admin_preview_container_wrapper_value}>00 : 00</span>
                      )}
                    </div>
                </div>
              </div>
              )}
              {renderUI()}
          </div>
        )}
        {(isFetching || isDeleting || isSaving || isBlockDeleting) && (
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
      <Toast ref={toast} position="bottom-right" />
    </section>
  )
})
