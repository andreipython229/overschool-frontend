import {FC, ReactNode, useState} from 'react'

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

export const AdminAnswerOption: FC<AnswerOptionT> = ({id, answer}) => {

    return (
        <div className={styles.wrapper} key={answer?.answer_id}>
            <div className={styles.answerOptionsBlock}>
                <div className={answer?.picture ? styles.answerOptionsBlock_inputWrapperWithPicture : styles.answerOptionsBlock_inputWrapperWithoutPicture}>
                    <Grid container alignItems="left" spacing={2}>
                        <Grid item>
                            <Avatar className={styles.avatar}>{id! + 1}</Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{answer?.body}</Typography>
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