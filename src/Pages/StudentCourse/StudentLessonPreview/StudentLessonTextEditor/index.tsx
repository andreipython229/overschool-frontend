import {FC, ChangeEvent, useState, MouseEvent, useEffect} from 'react'

import {AddFileBtn} from 'components/common/AddFileBtn/index'
import {Button} from 'components/common/Button/Button'
import {usePostUserHomeworkMutation} from 'api/userHomeworkService'
import {UploadedFile} from 'components/UploadedFile'
import {usePostTextFilesMutation} from 'api/filesService'
import {TextareaAutosize} from "@mui/material";
import {IHomework} from "../../../../types/sectionT";
import {StudentHomeworkCheck} from "../StudentHomeworkCheck";

import styles from './studentLessonTextEditor.module.scss'

type textEditorT = {
    homeworkId: number
    homework: IHomework
}

export const StudentLessonTextEditor: FC<textEditorT> = ({homeworkId, homework}) => {
    const [files, setFiles] = useState<File[]>([])
    const [urlFiles, setUrlFiles] = useState<{ [key: string]: string }[]>([])
    const [text, setText] = useState<string>('')
    const [hwStatus, setHwStatus] = useState<boolean>(!!homework?.user_homework_checks)
    const [replyArray, setReplyArray] = useState(homework?.user_homework_checks)

    const [postHomework] = usePostUserHomeworkMutation()
    const [postFiles] = usePostTextFilesMutation()

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

    const handleSendHomework = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const formDataHw = new FormData()
        formDataHw.append('homework', String(homeworkId))
        formDataHw.append('text', String(text))

        await postHomework(formDataHw)
            .unwrap()
            .then((data) => {
                const formDataFile = new FormData()

                formDataFile.append('file', files[0])
                formDataFile.append('user_homework', `${data.user_homework_check_id}`)

                postFiles(formDataFile)
                setHwStatus(true)
                window.location.reload()
            })
    }

    useEffect(() => {
        setReplyArray(homework.user_homework_checks)
        setHwStatus(!!homework.user_homework_checks)
    }, [hwStatus, homeworkId])

    return (
        !hwStatus ? (<div className={styles.wrapper}>
                <h5 className={styles.wrapper_title}>Введите ответ на задание:</h5>
                <TextareaAutosize aria-label="Введите ответ на домашнее задание..."
                                  placeholder="Введите ответ на домашнее задание..."
                                  style={{width: '100%', borderRadius: '5px', border: '1px solid rgba(0, 0, 0, 0.3)', padding: '10px'}}
                                  minRows={5} value={text}
                                  onChange={(event) => setText(event.target.value)}/>
                <AddFileBtn handleChangeFiles={handleChangeFiles}/>
                <span className={styles.wrapper_form_help}>Добавьте файл(-ы) с решением задания</span>
                {urlFiles?.map(({url, name}, index: number) => (
                    <UploadedFile key={index} file={url} index={index} name={name} size={files[index].size} isHw={true}
                                  handleDeleteFile={handleDeleteFile}/>
                ))}
                {text &&
                    <Button style={{marginTop: '20px'}} variant="primary" text="Отправить" type="submit"
                            onClick={handleSendHomework}/>}
            </div>
        ) : (
            <StudentHomeworkCheck homework={homework} replyArray={replyArray ? replyArray : []}/>
        )
    )
}
