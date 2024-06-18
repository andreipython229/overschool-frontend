import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import styles1 from '../../../../../../components/Modal/Modal.module.scss'
import { UploadedFile } from 'components/UploadedFile'
import { AddFileBtn } from 'components/common/AddFileBtn/index'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddPost } from 'components/AddPost'
import { deleteIconPath, settingsIconPath } from '../../../../config/svgIconsPath'
import { useFetchLessonQuery, useLazyFetchPreviousTestsQuery, usePatchLessonsMutation } from 'api/modulesServices'
import { ClassesSettingsPropsT } from 'types/navigationTypes'
import { BlockT, commonLessonT, TestT, checkedTestT } from 'types/sectionT'
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
import { BLOCK_TYPE } from 'enum/blockTypeE'
import { AddCodeEditor } from 'components/AddCodeEditor'
import { AddVideo } from 'components/AddVideo'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { useDeleteBlockMutation, useOrderUpdateMutation } from 'api/blocksService'
import { useDebounceFunc } from 'customHooks'
import { AnimatePresence, Reorder } from 'framer-motion'
import { Checkbox } from '../../../../../../components/common/Checkbox/Checkbox'
import { AddPicture } from 'components/AddPicture'
import { AddAudio } from 'components/AddAudio'
import { MathEditor } from 'components/MathEditor'
import { BlockButtons } from 'components/BlockButtons'

export const LessonSettings: FC<ClassesSettingsPropsT> = memo(({ deleteLesson, lessonIdAndType, setType }) => {
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
  })
  const [addTextFiles] = usePostTextFilesMutation()
  const [saveChanges, { isLoading: isSaving, isSuccess: isCompleted }] = usePatchLessonsMutation()
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
      console.log(checkedTests)
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
      await addTextFiles({ formData: formData1, schoolName }).then(data => {
        setFiles([])
        setUrlFiles([])
      })
    }

    const formData = new FormData()
    // formData.append('description', lessonDescription)
    formData.append('section', String(lesson.section))
    formData.append('order', String(lesson.order))
    formData.append('active', String(isPublished))

    if (lesson.type === 'test') {
      formData.append('random_test_generator', String(autogeneration))
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
          // console.log(data)
          refetch()
        }))
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
      <div  className={styles.redactorCourse_rightSideWrapper_rightSide}>
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
              </div>
              <div className={styles.coursePreviewHeaderRedactor}>
                <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_edit} onClick={showSettingsModal}>
                  <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
                  Изменить название урока
                </button>

                <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_save} onClick={handleSaveChanges}>
                  <IconSvg width={16} height={16} viewBoxSize="0 0 20 20" path={acceptedHwPath} />
                  Сохранить и вернуться к превью
                </button>

                <button className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_delete}>
                  <IconSvg functionOnClick={handleDeleteLesson} width={16} height={16} viewBoxSize="0 0 19 19" path={deleteIconPath} />
                </button>
              </div>
            </div>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional_content}>
              <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
              <AnimatePresence>
                <div className={styles.publickButton}>
                  <CheckboxBall isChecked={isPublished} toggleChecked={() => setIsPublished(!isPublished)} />
                  <PublishedMark isPublished={isPublished} />
                </div>
              </AnimatePresence>
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

                <AddFileBtn handleChangeFiles={handleChangeFiles} />
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_desc}>Любые файлы размером не более 200 мегабайт</span>
                {fileError && <span className={styles.redactorCourse_rightSideWrapper_rightSide_error}>{fileError}</span>}
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

                {lesson.audio_files && (
                  <div>
                    {lesson.audio_files &&
                      lesson.audio_files.map((audio, index) => (
                        <AudioPlayer key={index} audioUrls={[audio]} delete={() => handleDeleteAudioFile(index)} />
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
                <div className={styles.check_autotest}>
                  <CheckboxBall isChecked={autogeneration} toggleChecked={() => setAutogeneration(!autogeneration)} />
                  <span>Автогенерация теста</span>
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
              <button onClick={() => setIsEditing(true)} className={styles.redactorCourse_rightSideWrapper_rightSide_header_btnBlock_setting}>
                <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
                Редактировать
              </button>
            </div>
            <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
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
    </section>
  )
})
