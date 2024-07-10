import { FC, useState, useEffect, useRef } from 'react';
import { Checkbox } from 'components/common/Checkbox/Checkbox'; // Измените на ваш компонент чекбокса
import styles from './studentAnswer.module.scss';
import { AnswersT } from '../../../../components/AddQuestion';

type StudentAnswerProps = {
    id: string;
    title: string;
    name: string;
    onSelect: (answerCorrect: boolean, answer_id: string, title: string) => void;
    isCorrect: boolean;
    picture?: string;
    resetSelection: boolean; // Добавляем проп для сброса выбора
};

export const StudentAnswer: FC<StudentAnswerProps> = ({ id, title, name, onSelect, isCorrect, picture, resetSelection }) => {
    const [selected, setSelected] = useState<boolean>(false); // Состояние для отслеживания выбранности ответа
    const prevResetSelection = useRef<boolean>(false); // Ссылка на предыдущее значение resetSelection

    useEffect(() => {
        if (prevResetSelection.current !== resetSelection) {
            setSelected(false); // Сбрасываем выбор при изменении resetSelection
            prevResetSelection.current = resetSelection; // Обновляем предыдущее значение
        }
    }, [resetSelection]);

    const handleSelect = () => {
        setSelected(!selected); // Инвертируем состояние выбранности
        onSelect(isCorrect, id, title); // Вызываем колбэк onSelect с информацией о выборе
    };

    return (
        <div className={styles.wrapper} onClick={handleSelect}>
            <div className={styles.answer}>
                <Checkbox checked={selected} /> {/* Используйте компонент чекбокса или другого типа элемента для отображения выбора */}
                <span className={styles.answerTitle}>{title}</span>
            </div>
            {picture && (
                <img src={picture} alt={title} className={styles.image} />
            )}
        </div>
    );
};