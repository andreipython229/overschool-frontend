import React, { FC, useEffect } from 'react';
import { Button } from '../../../../components/common/Button/Button';
import styles from '../lesson.module.scss'
import {useFetchModuleLessonsQuery} from "../../../../api/modulesServices";
import {useNavigate} from "react-router-dom";
import {SimpleLoader} from '../../../../components/Loaders/SimpleLoader'

type NextSectionButtonProps = {
  sectionId: number;
  courseId: number;
};

export const NextOrPrevSectionButton: FC<NextSectionButtonProps> = ({ sectionId, courseId}) => {
    const navigate = useNavigate()
    const {data: nextSection, isSuccess} = useFetchModuleLessonsQuery(`${sectionId}`)
    const schoolName = window.location.href.split('/')[4]
    const nextSectionHandler = () => {
        if (nextSection && nextSection.lessons?.length > 0) {
            const lesson = nextSection.lessons?.[0];
            const newPath = `/school/${schoolName}/courses/student-course/${courseId}/module/${sectionId}/${lesson.type}/${lesson.id}`;
            navigate(newPath, { replace: true });
        }
    }

    if (isSuccess) {
        return (
            <Button
                onClick={nextSectionHandler}
                className={styles.lesson__btnNext}
                text="Следующий раздел"
            />
        )} else {
        return (
            <SimpleLoader />
        )
    }
}

export default NextOrPrevSectionButton;