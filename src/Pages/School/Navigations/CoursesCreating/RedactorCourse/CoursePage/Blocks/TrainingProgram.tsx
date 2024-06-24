import React, {FC, forwardRef, useState} from 'react';
import styles from "./styles/trainingProgram.module.scss";
import {CatalogCourseModules} from "Pages/CourseCatalog/CoursePreview/courseModules";
import {TrainingProgramT} from "../types/blocksControllerT";
import {useAppDispatch, useAppSelector} from "store/hooks";

export const TrainingProgram:FC<TrainingProgramT> = () => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)
  const [openIndex, setOpenIndex] = useState<number>(-1)

  const handleToggleOpen = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2>Список модулей и уроков внутри курса:</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%' }}>
        {landing.trainingProgram.sections.map((module, index: number) => (
          <CatalogCourseModules
            section={module}
            sectionIndex={index}
            key={module.section_id}
            handleToggleOpen={handleToggleOpen}
            openIndex={openIndex}
          />
        ))}
      </div>
    </div>
  );
};