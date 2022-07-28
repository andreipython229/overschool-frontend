import React, { FC } from "react";
import styles from "Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss";
import Lesson from "assets/img/createCourse/lesson.svg";
import { Button } from "components/common/Button/Button";

type LessonAddBlockPropsT = {
  setModalTypeClasses: () => void;
};

export const LessonAddBlock: FC<LessonAddBlockPropsT> = ({ setModalTypeClasses }) => {
  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        <span className={styles.redactorCourse_leftSide_desc_title}>Первый модуль</span>
        <span className={styles.redactorCourse_leftSide_desc_lesson}>
          <img src={Lesson} alt="Lessons" />
          Первый урок
        </span>
        <Button onClick={setModalTypeClasses} style={{ width: "236px" }} text={"+ Занятие"} />
        <div className={styles.hl} />
        <Button style={{ width: "236px" }} text={"+ Модуль"} variant={"primary"} />
      </div>
    </div>
  );
};
