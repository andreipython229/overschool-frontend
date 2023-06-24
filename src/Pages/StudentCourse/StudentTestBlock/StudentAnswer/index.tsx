import {FC, memo} from 'react';
import {Radio} from 'components/common/Radio/Radio';
import styles from './studentAnswer.module.scss';

type StudentAnswerProps = {
    id: string;
    title: string;
    name: string;
    onSelect: (answerCorrect: boolean | string) => void;
};

export const StudentAnswer: FC<StudentAnswerProps> = ({id, title, name, onSelect}) => {
    const handleClick = () => {
        onSelect(id);
    };

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <Radio title={title} id={id} name={name}/>
        </div>
    );
};
