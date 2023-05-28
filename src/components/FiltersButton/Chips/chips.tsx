import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeChip, removeFilter } from 'store/redux/filters/slice';
import { chipsSelector } from 'selectors/index';

import styles from './chips.module.scss';

const ChipsComponent = () => {
  const dispatch = useDispatch();
  const chips = useSelector(chipsSelector);

  const handleRemoveChip = (filterTerm: string) => {
    dispatch(removeChip(filterTerm));
    dispatch(removeFilter(filterTerm));
  };

  return (
    <div className={styles.chipsContainer}>
      {Object.entries(chips).map(([filterTerm, chipText]) => (
        <div key={filterTerm} className={styles.chip}>
          <span>{chipText}</span>
          <button className={styles.removeButton} onClick={() => handleRemoveChip(filterTerm)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default ChipsComponent;
