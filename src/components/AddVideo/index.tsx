import {useState, FC, DragEvent, ChangeEvent} from 'react'

import {Button} from 'components/common/Button/Button'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {addVideoIconPath} from './config/svgIconsPath'
import {arrUpPath, arrDownPath, deletePath} from '../../config/commonSvgIconsPath'
import {AddPostT, setShowType} from '../../types/componentsTypes'

import styles from './addVideo.module.scss'
import {usePatchLessonsMutation} from "../../api/modulesServices";
import {SimpleLoader} from "../Loaders/SimpleLoader";
import {VideoPlayer} from "../VideoPlayer/player";

export const AddVideo: FC<setShowType & AddPostT> = ({lessonIdAndType, isPreview, addFile, lesson, setShow}) => {

    const [dragVideo, setDragVideo] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])
    const [addVideoFile] = usePatchLessonsMutation()
    const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false);

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragVideo(true)
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragVideo(false)
    }

    const onDropHandler = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
        e.preventDefault()
        const videoFiles = [...e.dataTransfer.files]

        setFiles(prev => [...prev, ...videoFiles])
        setDragVideo(false)
    }

    const handleVideoUpload = async (lessonIdAndType: any, video: File) => {
        setIsLoadingVideo(true);
        const formData = new FormData();
        formData.append('video', video);
        formData.append('section', String(lesson.section))
        formData.append('order', String(lesson.order))

        try {
            await addVideoFile({
                id: lessonIdAndType.id,
                type: lessonIdAndType.type,
                formdata: formData,
            });
            setIsLoadingVideo(false)
            setShow()
        } catch (error) {
            setIsLoadingVideo(false)
        }
    }

    const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
    const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

    return (
        <>
            {!isPreview ? (
                <div className={styles.redactorCourse_wrapper}>
                    {isLoadingVideo ? (
                        <div className={styles.redactorCourse_loader}>
                            <SimpleLoader/>
                        </div>
                    ) : (
                        <>
                            <div
                                onDragStart={dragStartHandler}
                                onDragLeave={dragEndHandler}
                                onDragOver={dragStartHandler}
                                onDrop={onDropHandler}
                                className={dragVideo ? stylesOnDrop : stylesNoDrop}
                            >
                                <input
                                    // disabled={isLoading}
                                    className={styles.redactorCourse_rightSide_functional_addContent_input}
                                    onChange={(e) => handleVideoUpload(lessonIdAndType, e.target.files![0])}
                                    type="file"
                                    multiple/>
                                <IconSvg width={83} height={84} viewBoxSize="0 0 83 84" path={addVideoIconPath}/>
                                <span>Перетащите .mp4 видеофайл или нажмите для загрузки</span>
                                <Button
                                    type={'button'}
                                    // disabled={isLoading}
                                    variant={'primary'}
                                    text={'Выбрать файл'}/>
                            </div>
                            <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
                                <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                                    <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath}/>
                                </div>
                                <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                                    <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath}/>
                                </div>
                                <div
                                    className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete}
                                    onClick={setShow}>
                                    <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath}/>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <>
                    {files.length > 0 && !isLoadingVideo && (
                        <div className={styles.redactorCourse_video_container}>
                            {files.map((video, index) => (
                                <video key={index} controls>
                                    <source src={URL.createObjectURL(video)} type="video/mp4"/>
                                </video>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}
