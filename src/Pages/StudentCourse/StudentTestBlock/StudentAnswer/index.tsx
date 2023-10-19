import {FC, memo} from 'react';
import {Radio} from 'components/common/Radio/Radio';
import styles from './studentAnswer.module.scss';
import {AnswersT} from "../../../../components/AddQuestion";

type StudentAnswerProps = {
    id: string;
    title: string;
    name: string;
    onSelect: (answerCorrect: boolean, answewr_id: string, title: string) => void;
    isCorrect: boolean;
};

export const StudentAnswer: FC<StudentAnswerProps> = ({id, title, name, onSelect, isCorrect}) => {
    return (
        <div className={styles.wrapper} onClick={() => onSelect(isCorrect, id, title)}>
            <Radio title={title} id={id} name={name} key={`${id}`}/>
        </div>
    );
};
