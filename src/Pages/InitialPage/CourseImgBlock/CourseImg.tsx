import React, { FC, memo } from "react";
import styles from "../initialPage.module.scss";

type CourseImgPropsT = {
  currentCourse: string;
  changeCurrentCourse: (id: string) => void;
  id: string;
  alt: string;
  img: string;
  title: string;
};
export const CourseImg: FC<CourseImgPropsT> = memo(
  ({ currentCourse, changeCurrentCourse, id, alt, img, title }) => {
    return (
      <section className={styles.init_main_course}>
        <div
          className={
            currentCourse === id
              ? styles.init_main_course_block
              : styles.init_main_course_block + " " + styles.smallImg
          }
          onMouseEnter={() => changeCurrentCourse(id)}
          onMouseLeave={() => changeCurrentCourse('')}
        >
          <img className={
            currentCourse === id
              ? styles.init_main_course_block_img
              : styles.init_main_course_block_img + " " + styles.smallImg
            } src={img} alt={alt} />
          <span className={styles.init_main_course_block_blur} />
          <h2
            className={
              currentCourse === id
                ? styles.init_main_course_block_title
                : styles.init_main_course_block_title + " " + styles.title_rotate
            }
          >
            {title}
          </h2>
        </div>
      </section>
    );
  },
);
