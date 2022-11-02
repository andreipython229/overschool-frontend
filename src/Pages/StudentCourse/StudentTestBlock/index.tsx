import styles from './studentTestBlock.module.scss';
import { FC,useState } from 'react';
import { Button } from 'components/common/Button/Button';
import { setShowType } from '../../../types/componentsTypes';
import { StudentQuestion } from './StudentQuestion';
import { useFetchQuestionsListQuery } from '../../../api/questionsAndAnswersService';

const test = {
        questions: [{                
            question: 'string question 1',
            answers: [
                {
                    answer:'string answer 1',
                    right: true,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 2',
                    right: false,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 3',
                    right: false,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 4',
                    right: false,
                    file: 'URL or false'
                    }
            ],
            wholeNumbers: 'false or true',
            numberRange: 'number',
            AllAnswersRight: 'false or true',
            description: 'string or false',
            timer: 'time',
            file: 'URL or false' 
        },
        {                
            question: 'string question 2',
            answers: [
                {
                    answer:'string answer 1',
                    right: true,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 2',
                    right: false,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 3',
                    right: false,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 4',
                    right: false,
                    file: 'URL or false'
                    }
            ],
            wholeNumbers: 'false or true',
            numberRange: 'number',
            AllAnswersRight: 'false or true',
            description: 'string or false',
            timer: 'time',
            file: 'URL or false' 
        },{                
            question: 'string question 3',
            answers: [
                {
                    answer:'string answer 1',
                    right: true,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 2',
                    right: false,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 3',
                    right: false,
                    file: 'URL or false'
                    },
                {
                    answer:'string answer 4',
                    right: false,
                    file: 'URL or false'
                    }
            ],
            wholeNumbers: 'false or true',
            numberRange: 'number',
            AllAnswersRight: 'false or true',
            description: 'string or false',
            timer: 'time',
            file: 'URL or false' 
        }]
}

export const StudentTestBlock = () => {
    const { data: questionsList } = useFetchQuestionsListQuery(6);
    console.log(questionsList);
    const [numberTest, setNumberTest] = useState<number>(0);
    return (
       <StudentQuestion questions={test.questions[numberTest]} length = {test.questions} numberTest = {numberTest} setNumberTest = {setNumberTest}/>
    )
}