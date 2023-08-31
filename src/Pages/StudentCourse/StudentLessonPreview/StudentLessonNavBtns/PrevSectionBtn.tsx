import React, { FC, useEffect } from 'react';
import { Button } from '../../../../components/common/Button/Button';
import styles from '../lesson.module.scss'
import {useFetchModuleLessonsQuery} from "../../../../api/modulesServices";
import {generatePath, useNavigate} from "react-router-dom";
import {SimpleLoader} from '../../../../components/Loaders/SimpleLoader'

type PrevSectionButtonProps = {
  sectionId: number;
  courseId: number;
};

export const PrevSectionButton: FC<PrevSectionButtonProps> = ({ sectionId, courseId}) => {
    const navigate = useNavigate()
    const {data: prevSection, isSuccess} = useFetchModuleLessonsQuery(`${sectionId}`)
    const schoolName = window.location.href.split('/')[4]
    const prevSectionHandler = () => {
        if (prevSection && prevSection.lessons?.length > 0) {
            const lesson = prevSection.lessons?.[prevSection.lessons?.length - 1];
            const newPath = `/school/${schoolName}/courses/student-course/${courseId}/module/${sectionId}/${lesson.type}/${lesson.id}`;
            navigate(newPath, { replace: true });
        }
    }

    if (isSuccess) {
        return (
            <Button
                onClick={prevSectionHandler}
                className={styles.lesson__btnPrev}
                text="Предыдущий раздел"
            />
        )} else {
        return (
            <SimpleLoader />
        )
    }
}

export default PrevSectionButton;