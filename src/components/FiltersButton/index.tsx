import React, {FC, useState} from 'react'

import {FilterItem} from './FilterItem'

import styles from './filters_btn.module.scss'
import {ComponentFilter} from '../../constants/filtersMaper'
import {useMissClickMenu} from '../../customHooks/useMissClickMenu'


interface FiltersButtonProps {
    filteringCategoriesList: { id: string | number; title: string }[]
    startMark?: string | number
    endMark?: string | number
    startDate?: string | number
    endDate?: string | number
    startAvg?: string | number
    endAvg?: string | number
    handleAddAvgFilter?: (start_avg: string, end_avg: string) => void
    removeLastActiveStartFilter?: () => void
    removeLastActiveEndFilter?: () => void
    addLastActiveFilter?: (data1: string, data2: string) => void
    addMarkFilter?: (start_mark: string, end_mark: string) => void
}

export const FiltersButton: FC<FiltersButtonProps> = ({
                                                          filteringCategoriesList,
                                                          addLastActiveFilter,
                                                          addMarkFilter,
                                                          handleAddAvgFilter,
                                                          removeLastActiveStartFilter,
                                                          removeLastActiveEndFilter,

                                                          ...filters
                                                      }) => {
    const [selectedFilter, setSelectedFilter] = useState<string | number | null>(null)
    const {menuRef, isOpen, onToggle} = useMissClickMenu()

    const handleToggleDropDownBlock = () => {
        onToggle()
        setSelectedFilter(null)
    }

    return (
        <div className={styles.wrapper}>
            <button
                className={`${styles.container_btn} ${isOpen ? styles.active : ''}`}
                onClick={handleToggleDropDownBlock}
            >
                Настройка фильтра
            </button>
            {isOpen && (
                <div className={styles.filter_container}>
                    {!selectedFilter ? (
                        <>
                            <svg
                                className={styles.filterPointer}
                                width="12"
                                height="18.54"
                                viewBox="0 0 12 18.542"
                                fill="none"
                            >
                                <path
                                    d="M0 9.45C0 9.45 4.95 10.83 7.29 13.66C8.13 14.67 8.96 16.27 9.7 17.91C10.16 18.95 12 18.62 12 17.48L12 1.05C12 -0.08 10.2 -0.42 9.73 0.61C8.99 2.2 8.14 3.77 7.29 4.79C4.95 7.63 0 9.45 0 9.45Z"
                                    fill="#CFE2FF"
                                    fillOpacity="1"
                                />
                            </svg>
                            {filteringCategoriesList.map(({id, title}) => (
                                <FilterItem
                                    id={id}
                                    key={id}
                                    title={title}
                                    setSelectedFilter={setSelectedFilter}
                                />
                            ))}
                        </>
                    ) : (
                        <div ref={menuRef}>
                            {selectedFilter && (
                                <>
                                    <svg
                                        className={styles.filterPointer}
                                        width="12"
                                        height="18.54"
                                        viewBox="0 0 12 18.542"
                                        fill="none"
                                    >
                                        <path
                                            d="M0 9.45C0 9.45 4.95 10.83 7.29 13.66C8.13 14.67 8.96 16.27 9.7 17.91C10.16 18.95 12 18.62 12 17.48L12 1.05C12 -0.08 10.2 -0.42 9.73 0.61C8.99 2.2 8.14 3.77 7.29 4.79C4.95 7.63 0 9.45 0 9.45Z"
                                            fill="#CFE2FF"
                                            fillOpacity="1"
                                        />
                                    </svg>
                                    <ComponentFilter
                                        id={selectedFilter}
                                        addLastActiveFilter={addLastActiveFilter}
                                        addMarkFilter={addMarkFilter}
                                        handleAddAvgFilter={handleAddAvgFilter}
                                        removeLastActiveStartFilter={removeLastActiveStartFilter}
                                        removeLastActiveEndFilter={removeLastActiveEndFilter}
                                        {...filters}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
