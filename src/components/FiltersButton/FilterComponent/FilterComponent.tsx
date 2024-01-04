import React, { FC, useState, useCallback } from 'react';
import { Button } from 'components/common/Button/Button';
import { useAppDispatch } from 'store/hooks';
import { addFilters } from 'store/redux/filters/slice';
import {useBoolean} from "../../../customHooks";
import styles from '../FilterComponent/filter_component.module.scss'

interface ShowDeletedFilterProps {
  filterKey: string;
}

export const ShowDeletedFilter: FC<ShowDeletedFilterProps> = ({ filterKey }) => {
  const dispatch = useAppDispatch();
  const [hideDeleted, setHideDeleted] = useState<boolean>(false);

  const [isFilterClosed, { off }] = useBoolean()

  const toggleShowDeleted = useCallback(() => {
    setHideDeleted(prevState => !prevState);
    handleApplyFilter()
  }, []);

  const handleApplyFilter = useCallback(() => {
    const filtersObj: { [key: string]: string } = {};

    if (hideDeleted) {
      filtersObj['hide_deleted'] = 'true';
    } else {
      delete filtersObj['hide_deleted'];
    }

    dispatch(addFilters({ key: filterKey, filters: {'hide_deleted': 'true' } }));
    off()
  }, [dispatch, filterKey, hideDeleted]);

  if (isFilterClosed) return null

  return (
      <>
        {/*<p>Скрыть или показать удалённых студентов</p>*/}
        <div className={styles.filterButtonContainer}>
          <Button className={styles.filterButton}
            text={hideDeleted ? 'Показать удаленные' : 'Скрыть удаленные'}
            variant="primary"
            onClick={toggleShowDeleted}
          />
          {/*<Button text="Применить" variant="primary" onClick={handleApplyFilter} />*/}
        </div>
      </>
  );
};
