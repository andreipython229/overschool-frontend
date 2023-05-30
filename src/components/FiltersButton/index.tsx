import React, { FC, useState } from 'react';
import { IconSvg } from '../common/IconSvg/IconSvg';
import { FilterItem } from './FilterItem';

import styles from './filters_btn.module.scss';
import {ComponentFilter} from "../../constants/filtersMaper";
import {filterIconPath} from "./config/svgIconsPath";
import {useMissClickMenu} from "../../customHooks/useMissClickMenu";

interface FiltersButtonProps {
  filteringCategoriesList: { id: string | number; title: string }[];
}

export const FiltersButton: FC<FiltersButtonProps> = ({ filteringCategoriesList }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | number | null>(null);
  const { menuRef, isOpen, onToggle } = useMissClickMenu()

  const handleToggleDropDownBlock = () => {
    onToggle();
    setSelectedFilter(null);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.container_btn} onClick={handleToggleDropDownBlock}>
        <IconSvg width={15} height={17} viewBoxSize="0 0 15 17" path={filterIconPath} />
        Добавить фильтры
      </button>
      {isOpen && (
        <div className={styles.drop_down_block}>
          {!selectedFilter ? (
            <>
              <p className={styles.header_dropdown_menu}>ВЫБЕРИТЕ КРИТЕРИЙ ФИЛЬТРАЦИИ</p>
              {filteringCategoriesList.map(({ id, title }) => (
                <FilterItem id={id} key={id} title={title} setSelectedFilter={setSelectedFilter}/>
              ))}
            </>
          ) : (
            <div ref={menuRef}>{selectedFilter && <ComponentFilter id={selectedFilter} />}</div>
          )}
        </div>
      )}
    </div>
  );
};
