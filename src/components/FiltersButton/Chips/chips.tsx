import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFilter} from 'store/redux/filters/slice';
import {filtersSelector} from 'selectors/index';

import styles from './chips.module.scss';


export const ChipsComponent = () => {
    const dispatch = useDispatch();
    const filters = useSelector(filtersSelector);
    const chips = Object.entries(filters.filters).filter(chip => chip[1]);

    const handleRemoveChip = (filterTerm: string) => {
        dispatch(removeFilter(filterTerm));
    };

    return (
        <>
            <div className={styles.chipsContainer}>
                {chips.map(([filterTerm, chipText]) => (
                    <div key={filterTerm} className={styles.chip}>
                        <span>{chipText}</span>
                        <button
                            className={styles.removeButton}
                            onClick={() => handleRemoveChip(filterTerm)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

