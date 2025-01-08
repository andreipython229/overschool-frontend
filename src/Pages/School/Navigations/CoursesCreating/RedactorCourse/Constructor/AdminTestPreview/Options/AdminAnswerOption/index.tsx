import {FC, ReactNode} from 'react'

import styles from './adminAnswerOption.module.scss'
import {Avatar, Grid, Typography} from "@mui/material";
import { QuestionT } from 'components/AddQuestion';

type AnswerOptionT = {
    children?: ReactNode
    id?: number
    answer?: {
        answer_id?: number
        body?: string
        is_correct?: boolean
        picture?: string
    }
    multiple_answer: boolean
}

export const AdminAnswerOption: FC<AnswerOptionT> = ({answer, multiple_answer}) => {

    return (
        <div className={styles.wrapper} key={answer?.answer_id}>
            <div className={styles.answerOptionsBlock}>
                <div className={answer?.picture ? styles.answerOptionsBlock_inputWrapperWithPicture : styles.answerOptionsBlock_inputWrapperWithoutPicture}>
                    <Grid container spacing={2} className={styles.grid_container}>
                        <Grid item>
                            { multiple_answer ? <Avatar className={styles.avatar_square} variant="square"/> : <Avatar className={styles.avatar_rounded} />}
                        </Grid>
                        <Grid item>
                            <Typography className={styles.answer_body} variant="h6">{answer?.body}</Typography>
                        </Grid>
                    </Grid>
                    {answer?.picture && (
                        <Grid item>
                            <img src={answer.picture} alt="Answer" className={styles.answerImage} />
                        </Grid>
                    )}
                </div>
            </div>
        </div>
    )
}