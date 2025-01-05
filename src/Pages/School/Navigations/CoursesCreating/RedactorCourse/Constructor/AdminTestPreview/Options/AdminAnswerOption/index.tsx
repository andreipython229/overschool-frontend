import {FC, ReactNode} from 'react'

import styles from './adminAnswerOption.module.scss'
import {Avatar, Grid, Typography} from "@mui/material";

type AnswerOptionT = {
    children?: ReactNode
    id?: number
    answer?: {
        answer_id?: number
        body?: string
        is_correct?: boolean
        picture?: string
    }
}

export const AdminAnswerOption: FC<AnswerOptionT> = ({answer}) => {

    return (
        <div className={styles.wrapper} key={answer?.answer_id}>
            <div className={styles.answerOptionsBlock}>
                <div className={answer?.picture ? styles.answerOptionsBlock_inputWrapperWithPicture : styles.answerOptionsBlock_inputWrapperWithoutPicture}>
                    <Grid container spacing={2} className={styles.grid_container}>
                        <Grid item>
                            <Avatar className={styles.avatar} />
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