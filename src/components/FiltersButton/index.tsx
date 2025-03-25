import React, { FC, useState } from 'react'

import { FilterItem } from './FilterItem'

import styles from './filters_btn.module.scss'
import { ComponentFilter } from '../../constants/filtersMaper'
import { useMissClickMenu } from '../../customHooks/useMissClickMenu'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import zIndex from '@mui/material/styles/zIndex'
import { useAppDispatch } from 'store/hooks'
import { clearFilters, removeAllFilters } from 'store/redux/filters/slice'

interface FiltersButtonProps {
  filteringCategoriesList: { id: string | number; title: string }[]
  startMark?: string | number
  endMark?: string | number
  startDate?: string | number
  endDate?: string | number
  startAvg?: string | number
  endAvg?: string | number
  search_value?: string
  clearFilters: () => void
  handleAddAvgFilter?: (start_avg: string, end_avg: string) => void
  removeLastActiveStartFilter?: () => void
  removeLastActiveEndFilter?: () => void
  addLastActiveFilter?: (data1: string, data2: string) => void
  addMarkFilter?: (start_mark: string, end_mark: string) => void
  onChangeStatus?: (status: string) => void
}

export const FiltersButton: FC<FiltersButtonProps> = ({
  filteringCategoriesList,
  addLastActiveFilter,
  addMarkFilter,
  handleAddAvgFilter,
  removeLastActiveStartFilter,
  removeLastActiveEndFilter,
  onChangeStatus,
  clearFilters,
  ...filters
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | number | null>(null)
  const { menuRef, isOpen, onToggle } = useMissClickMenu()

  const isNotEmptyObject = (obj: {
    startMark?: string | number
    endMark?: string | number
    startDate?: string | number
    endDate?: string | number
    startAvg?: string | number
    endAvg?: string | number
    search_value?: string
  }) => {
    if (Object.keys(obj).length > 1) return Object.keys(obj).length > 1
    else if (obj.search_value !== '' && Object.keys(obj).length === 1) return obj.search_value !== '' && Object.keys(obj).length === 1
    else return false
  }

  const handleToggleDropDownBlock = () => {
    onToggle()
    setSelectedFilter(null)
  }

  return (
    <div className={styles.wrapper}>
      {isNotEmptyObject(filters) && (
        <button className={styles.resetButton} onClick={clearFilters}>
          Сбросить фильтры
        </button>
      )}
      <button
        title="Настройка фильтра"
        style={{ zIndex: 20, cursor: 'pointer', position: 'relative', background: 'transparent', border: 'none' }}
        onClick={handleToggleDropDownBlock}
      >
        <IconSvg
          viewBoxSize="0 0 50 44"
          width={30}
          height={30}
          path={[
            {
              d: 'M29.6045 2.80826C30.995 1.45191 32.8839 0.6875 34.8564 0.6875C35.8328 0.6875 36.7993 0.8751 37.7006 1.23925C38.6019 1.60339 39.4199 2.13676 40.1084 2.80826C40.7968 3.47973 41.3421 4.27616 41.714 5.15175C41.8282 5.42069 41.9253 5.69553 42.0052 5.9747H48C49.1046 5.9747 50 6.84215 50 7.9122C50 8.98225 49.1046 9.8497 48 9.8497H42.0052C41.9253 10.1289 41.8282 10.4037 41.714 10.6726C41.3421 11.5482 40.7968 12.3447 40.1084 13.0161C39.4199 13.6876 38.6019 14.221 37.7006 14.5851C36.7993 14.9493 35.8328 15.1369 34.8564 15.1369C32.8839 15.1369 30.995 14.3725 29.6045 13.0161C28.6946 12.1286 28.0467 11.0353 27.7077 9.8497H2C0.89543 9.8497 0 8.98225 0 7.9122C0 6.84215 0.89543 5.9747 2 5.9747H27.7077C28.0467 4.78909 28.6946 3.69578 29.6045 2.80826ZM34.8564 4.5625C33.9537 4.5625 33.0851 4.91217 32.4426 5.53891C31.7996 6.16609 31.4359 7.01954 31.4359 7.9122C31.4359 8.80485 31.7996 9.6583 32.4426 10.2855C33.0851 10.9122 33.9537 11.2619 34.8564 11.2619C35.3037 11.2619 35.7469 11.176 36.1609 11.0087C36.575 10.8414 36.952 10.5959 37.2703 10.2855C37.5886 9.97503 37.8418 9.60575 38.0148 9.19839C38.1878 8.79102 38.277 8.35393 38.277 7.9122C38.277 7.47047 38.1878 7.03338 38.0148 6.626C37.8418 6.21864 37.5886 5.84936 37.2703 5.53891C36.952 5.22849 36.575 4.98295 36.1609 4.81568C35.7469 4.64842 35.3037 4.5625 34.8564 4.5625ZM6.60449 16.8948C7.99504 15.5385 9.88395 14.7741 11.8564 14.7741C13.8289 14.7741 15.7178 15.5385 17.1084 16.8948C18.0183 17.7824 18.6661 18.8757 19.0052 20.0613H48C49.1046 20.0613 50 20.9287 50 21.9988C50 23.0688 49.1046 23.9363 48 23.9363H19.0052C18.6661 25.1219 18.0183 26.2152 17.1084 27.1027C15.7178 28.4591 13.8289 29.2235 11.8564 29.2235C9.88395 29.2235 7.99504 28.4591 6.60449 27.1027C5.69458 26.2152 5.04672 25.1219 4.7077 23.9363H2C0.89543 23.9363 0 23.0688 0 21.9988C0 20.9287 0.89543 20.0613 2 20.0613H4.7077C5.04672 18.8757 5.69458 17.7824 6.60449 16.8948ZM11.8564 18.6491C10.9537 18.6491 10.0851 18.9988 9.44257 19.6255C8.79957 20.2527 8.43589 21.1061 8.43589 21.9988C8.43589 22.8914 8.79957 23.7449 9.44257 24.3721C10.0851 24.9988 10.9537 25.3485 11.8564 25.3485C12.7592 25.3485 13.6277 24.9988 14.2703 24.3721C14.9133 23.7449 15.277 22.8914 15.277 21.9988C15.277 21.1061 14.9133 20.2527 14.2703 19.6255C13.6277 18.9988 12.7592 18.6491 11.8564 18.6491ZM23.0327 30.9814C24.4233 29.6251 26.3122 28.8607 28.2846 28.8607C30.2575 28.8607 32.1467 29.6252 33.5375 30.9818C34.447 31.869 35.0959 32.9618 35.4355 34.1479H48C49.1046 34.1479 50 35.0153 50 36.0854C50 37.1554 49.1046 38.0229 48 38.0229H35.4357C35.0962 39.2095 34.4475 40.3038 33.5375 41.1914C32.1467 42.548 30.2575 43.3125 28.2846 43.3125C26.3098 43.3125 24.4216 42.544 23.0327 41.1893C22.1228 40.3018 21.4749 39.2085 21.1359 38.0229H2C0.89543 38.0229 0 37.1554 0 36.0854C0 35.0153 0.89543 34.1479 2 34.1479H21.1359C21.4749 32.9623 22.1228 31.869 23.0327 30.9814ZM28.2846 32.7357C27.3819 32.7357 26.5133 33.0853 25.8708 33.7121C25.2278 34.3393 24.8641 35.1927 24.8641 36.0854C24.8641 36.978 25.2278 37.8315 25.8708 38.4587C26.515 39.087 27.3843 39.4375 28.2846 39.4375C29.1877 39.4375 30.0566 39.0877 30.6994 38.4607C31.3431 37.8328 31.7077 36.9777 31.7077 36.0854C31.7077 35.194 31.3438 34.341 30.6994 33.7124C30.0566 33.0855 29.1877 32.7357 28.2846 32.7357Z',
              fill: '#332F36',
            },
          ]}
        />
      </button>
      {/* <Button variant="newPrimary" text={'Настройка фильтра'} className={styles.container_btn} onClick={handleToggleDropDownBlock} /> */}
      {isOpen && (
        <div className={styles.filter_container}>
          {!selectedFilter ? (
            <>
              <svg className={styles.filterPointer} width="12" height="18.54" viewBox="0 0 12 18.542" fill="none">
                <path
                  d="M0 9.45C0 9.45 4.95 10.83 7.29 13.66C8.13 14.67 8.96 16.27 9.7 17.91C10.16 18.95 12 18.62 12 17.48L12 1.05C12 -0.08 10.2 -0.42 9.73 0.61C8.99 2.2 8.14 3.77 7.29 4.79C4.95 7.63 0 9.45 0 9.45Z"
                  fill="#CFE2FF"
                  fillOpacity="1"
                />
              </svg>
              {filteringCategoriesList.map(({ id, title }) => (
                <FilterItem id={id} key={id} title={title} setSelectedFilter={setSelectedFilter} />
              ))}
            </>
          ) : (
            <div ref={menuRef}>
              {selectedFilter && (
                <>
                  <svg className={styles.filterPointer} width="12" height="18.54" viewBox="0 0 12 18.542" fill="none">
                    <path
                      d="M0 9.45C0 9.45 4.95 10.83 7.29 13.66C8.13 14.67 8.96 16.27 9.7 17.91C10.16 18.95 12 18.62 12 17.48L12 1.05C12 -0.08 10.2 -0.42 9.73 0.61C8.99 2.2 8.14 3.77 7.29 4.79C4.95 7.63 0 9.45 0 9.45Z"
                      fill="#CFE2FF"
                      fillOpacity="1"
                    />
                  </svg>
                  <ComponentFilter
                    id={selectedFilter}
                    onChangeStatus={onChangeStatus}
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
