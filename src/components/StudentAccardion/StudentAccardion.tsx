import { AccardionItem } from './AccardionItem/AccardionItem';
import styles from './studentAccardion.module.scss';

export const StudentAccardion = () => {
  return (
    <div className={styles.accardionWrapper}>
      <AccardionItem />
    </div>
  )
};