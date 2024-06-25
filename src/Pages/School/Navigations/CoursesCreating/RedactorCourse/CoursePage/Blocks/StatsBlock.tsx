import React, {FC, ReactNode} from 'react';
import styles from './styles/statsBlock.module.scss'
import {CollectionsBookmark, Person, StarBorder} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "store/hooks";

type StatsBlockT = {
  // countOfLessons: any
}

export const StatsBlock:FC<StatsBlockT> = () => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  return (
      <div className={styles.courseStats}>
        <div className={styles.courseStats_stat_all}>
          <CollectionsBookmark fontSize="large"/>
          <div className={styles.courseStats_stat_all_text}>
            <span>Занятий:</span>
            <span>{landing.stats.lessonCount}</span>
          </div>
        </div>
        <div className={styles.courseStats_stat}>
          <div className={styles.courseStats_stat_all}>
            <Person fontSize="large"/>
            <div className={styles.courseStats_stat_all_text}>
              <span>Учеников:</span>
              <span>100+</span>
            </div>
          </div>
        </div>
        <div className={styles.courseStats_stat}>
          <div className={styles.courseStats_stat_all}>
            <StarBorder fontSize="large"/>
            <div className={styles.courseStats_stat_all_text}>
              <span>Рейтинг:</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
  );
};