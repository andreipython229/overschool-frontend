import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { completedIconPath, arrowDown } from '../config/svgIconPath';
import styles from './accardionItem.module.scss';
import { SelectDropDown } from 'components/SelectDropDown/SelectDropDown';
import { ExerciseItem } from '../ExerciseItem/ExerciseItem';

export const AccardionItem = () => {
  return (
      <div className={styles.accardionWrapper_component}>
        <div className={styles.accardionWrapper_component_header}>
            <span className={styles.accardionWrapper_component_header_completedIcon}>
                <IconSvg width={16} height={13} viewBoxSize="0 0 16 13" path={completedIconPath} />
            </span>
            <div className={styles.accardionWrapper_component_header_lessonName}>
                <h4 className={styles.accardionWrapper_component_header_lessonName_title}>The Way
                    <span></span>
                </h4>
                <span className={styles.accardionWrapper_component_header_lessonName_exerciseSum}>1
                    <span>Занятие</span>
                </span>
            </div>
            <span className={styles.accardionWrapper_component_header_showBtnWrapper}>
                <IconSvg  width={21} height={12} viewBoxSize="0 0 21 12" path={arrowDown} />
            </span>
        </div>
        <div className={styles.accardionWrapper_component_exerciseWrapper}>
            <ExerciseItem />
        </div>
      </div>
  )
};