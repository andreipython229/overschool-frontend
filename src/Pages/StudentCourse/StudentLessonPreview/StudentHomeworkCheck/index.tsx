import {IHomework} from "../../../../types/sectionT";
import {FC, useEffect, useState} from "react";
import styles from "./studentHomeworkCheck.module.scss";
import {Button} from "@mui/material";
import {
    createTheme,
    ThemeProvider,
    alpha,
    getContrastRatio,
} from '@mui/material/styles';
import {useBoolean} from "../../../../customHooks";
import {Portal} from "../../../../components/Modal/Portal";
import {
    StudentModalCheckHomeWork
} from "../../../../components/Modal/StudentModalCheckHomeWork/StudentModalCheckHomeWork";

declare module '@mui/material/styles' {
    interface Palette {
        violet: Palette['primary'];
    }

    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        violet: true;
    }
}

const violetBase = '#ae6cf8';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

export interface CheckHw {
    audio_files: File[]
    author: number
    author_first_name: string
    author_last_name: string
    created_at: string
    mark: number
    profile_avatar: string
    status: string
    text: string
    text_files: File[]
    updated_at: string
    user_homework: number
    user_homework_check_id: number
}

type studentHomeworkCheckI = {
    homework: IHomework
    replyArray: CheckHw[]
}

export const StudentHomeworkCheck: FC<studentHomeworkCheckI> = ({homework, replyArray}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isModalOpen, {off: open, on: close}] = useBoolean()

    useEffect(() => {
        setIsChecked(replyArray.length > 0? (replyArray[0].status === 'Принято'): false)
    }, [replyArray])

    return (
        <div className={styles.wrapper}>
            <h5 className={styles.wrapper_title}>Домашнее задание отправлено.</h5>
            <h5 className={isChecked ? styles.wrapper_status_done : styles.wrapper_status_onReview}>Статус:
                <p>{`${replyArray.length > 0 ? replyArray[0].status: 'На рассмотрении у преподавателя'}`}</p>
            </h5>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="violet" onClick={open}>
                    Проверить ответ преподавателя
                </Button>
            </ThemeProvider>
            {isModalOpen && (
                <Portal closeModal={close}>
                    <StudentModalCheckHomeWork id={replyArray[0].user_homework} closeModal={close}
                                               hwStatus={isChecked}/>
                </Portal>
            )}
        </div>
    )
}