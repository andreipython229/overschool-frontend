import { FC, memo } from 'react';
import { Radio } from 'components/common/Radio/Radio';
import styles from './studentAnswer.module.scss';

type StudentAnswerT = {
    id?: string,
    title: string
    name: string
}

export const StudentAnswer: FC<StudentAnswerT> = ({id, title, name}) => {
    return (
        <div className={styles.wrapper}>
            <Radio title={title} id={id} name={name}/>
        </div>
    )
}