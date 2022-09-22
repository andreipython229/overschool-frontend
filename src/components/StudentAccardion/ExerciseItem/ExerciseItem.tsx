import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { listIconSvg } from '../config/svgIconPath';
import styles from './exerciseItem.module.scss';
import { SelectDropDown } from 'components/SelectDropDown/SelectDropDown';

export const ExerciseItem = () => {
  return (
    <div className={styles.accardionWrapper_component_exerciseWrapper_exercise}>
        <IconSvg width={16} height={20} viewBoxSize="0 0 16 20" path={listIconSvg} />
        <div className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper}>
            <h5 className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper_title}>Урок 0. Установка среды разработки</h5>
            <span className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper_status}>Пройдено</span>
        </div>
    </div>
  )
};