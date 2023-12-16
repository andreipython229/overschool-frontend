import React, { FC, useState, useCallback } from 'react';
import { Button } from 'components/common/Button/Button';
import { useAppDispatch } from 'store/hooks';
import { addFilters } from 'store/redux/filters/slice';
import {useBoolean} from "../../../customHooks";

interface ShowDeletedFilterProps {
  filterKey: string;
}

export const ShowDeletedFilter: FC<ShowDeletedFilterProps> = ({ filterKey }) => {
  const dispatch = useAppDispatch();
  const [showDeleted, setShowDeleted] = useState<boolean>(false);

  const [isFilterClosed, { off }] = useBoolean()

  const toggleShowDeleted = useCallback(() => {
    setShowDeleted(prevState => !prevState);
    handleApplyFilter()
  }, []);

  const handleApplyFilter = useCallback(() => {
    const filtersObj: { [key: string]: string } = {};

    if (showDeleted) {
      filtersObj['show_deleted'] = 'true';
    } else {
      delete filtersObj['show_deleted'];
    }

    dispatch(addFilters({ key: filterKey, filters: {'show_deleted': 'true' } }));
    off()
  }, [dispatch, filterKey, showDeleted]);

  if (isFilterClosed) return null

  return (
    <div>
      <Button
        text={showDeleted ? 'Показать удаленные' : 'Скрыть удаленные'}
        variant="primary"
        onClick={toggleShowDeleted}
      />
      {/*<Button text="Применить" variant="primary" onClick={handleApplyFilter} />*/}
    </div>
  );
};
