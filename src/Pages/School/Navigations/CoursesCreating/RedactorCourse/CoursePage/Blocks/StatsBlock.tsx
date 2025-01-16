import React, {FC} from 'react';
import styles from './styles/statsBlock.module.scss'
import {StarBorder} from "@mui/icons-material";
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import {useAppDispatch, useAppSelector} from "store/hooks";
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { PeopleIconPath } from 'assets/Icons/svgIconPath';

type StatsBlockT = {
  // countOfLessons: any
}

export const StatsBlock:FC<StatsBlockT> = () => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  return (
      <div className={styles.courseStats}>
        <div className={styles.courseStats_stat_all}>
          <SlowMotionVideoIcon fontSize="large"/>
          <div className={styles.courseStats_stat_all_text}>
            <span>Занятий:</span>
            <span>{landing.stats.lessonCount}</span>
          </div>
        </div>
        <div className={styles.courseStats_stat}>
          <div className={styles.courseStats_stat_all}>
          <IconSvg width={48} height={48} path={PeopleIconPath} />
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