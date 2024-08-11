import React, {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {authSelector, selectUser, userIdSelector} from "../../selectors";
import styles from './rating.module.scss';
import {Button} from 'components/common/Button/Button'
import {useLazyFetchAllStudentRatingQuery} from "../../api/ratingService";
import {CoursesDataT} from "../../types/CoursesT";
import {setTotalMeetingCount} from "../../store/redux/meetings/meetingSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux/store";
import {useDebounceFunc, usePagination} from "../../customHooks";
import {ratingPaginatorT, studentRatingT} from "../../types/ratingT";
import {addFilters} from "../../store/redux/filters/slice";
import {Pagination} from "../../components/Pagination/Pagination";
import {IconSvg} from "../../components/common/IconSvg/IconSvg";
import {
    tableBallsStarPath
} from "../../config/commonSvgIconsPath";
import {SimpleLoader} from "../../components/Loaders/SimpleLoader";
import {Radio} from "../../components/common/Radio/Radio";

export const Rating: FC = () => {
    const schoolName = window.location.href.split('/')[4];
    const {role: userRole} = useAppSelector(selectUser);
    const userId = useAppSelector(userIdSelector);
    const [flag, setFlag] = useState<string>('lessons');
    const [getRating, {data: rating, isSuccess, isFetching}] = useLazyFetchAllStudentRatingQuery();
    const [ratingData, setRatingData] = useState<ratingPaginatorT>()
    const { page, onPageChange, paginationRange } = usePagination({ totalCount: rating?.count as number })


    useEffect(() => {
      getRating({ schoolName, flag, page, size: 20 })
    }, [page, flag])

    useEffect(() => {
      if (isSuccess) {
        setRatingData(rating)
      }
    }, [rating]);

    const handleChangeFlag = (flag: string) => {
       setFlag(flag);
    }


    return (
        <>
        <p>Рейтинг учеников</p>
        <div className={styles.rating_param}>
          <label className={styles.rating_param_label} htmlFor="flag">Критерий рейтинга:</label>
            <br />
            <div className={styles.rating_param_radio}>
              <Radio title="По количеству пройденных занятий" id={'lessons'} name="flag" func={handleChangeFlag} width={'fit-content'}/>
              <Radio title="По количеству доступных курсов" id={'courses'} name="flag" func={handleChangeFlag} width={'fit-content'}/>
            </div>
        </div>
          <table className={styles.table} style={{ minHeight: !ratingData?.results.length ? '295px' : 'unset' }}>
          {isFetching && (
            <tbody>
              <tr className={styles.loader_wrapper}>
              <td>
                <SimpleLoader style={{ width: '40px', height: '40px', zIndex: 1000 }} />
              </td>
              </tr>
            </tbody>
          )}
          {ratingData?.results.length ? (
            <>
            <thead className={styles.table_head}>
              <tr>
              <th style={{ width: '25%' }}><span style={{ margin: '0 7px 0 34px' }}>Ранг</span></th>
              <th style={{ width: '50%' }}><span style={{ margin: '0 7px 0 0' }}>Фамилия и имя</span></th>
              <th>
                <span style={{ margin: '0 7px 0 34px' }}>{flag === 'lessons' ? 'Пройденные занятия' : 'Доступные курсы'}</span>
              </th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {ratingData?.results.map((rating: studentRatingT, index) => (
                <tr key={rating.id} role="row" style={ userId === rating.id ? { backgroundColor: 'rgba(211,175,207,0.53)' } : {}}>
                  <td style={{ width: '25%', padding: '0 0 0 34px' }}>
                    <IconSvg width={16} height={15} viewBoxSize={'0 0 16 15'} path={tableBallsStarPath} />
                    <span style={{ margin: '0 0 0 10px' }}>{index+1}</span>
                  </td>
                  <td style={{ width: '50%' }}>
                    <span style={{ color: '#424345' }}>{(!rating.last_name && !rating.first_name) ? 'Без имени' :
                            `${rating.last_name} ${rating.first_name}`}
                    </span>
                  </td>
                  <td>
                    <span style={{ margin: '0 0 0 34px' }}>{flag === 'lessons' ? rating.completed_lessons : rating.available_courses}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
          ) : (
            <tbody>
              <tr className={styles.table_no_results}>
                <td>Ничего не найдено</td>
              </tr>
            </tbody>
          )}
          </table>
          <Pagination className={styles.pagination} paginationRange={paginationRange} currentPage={page} onPageChange={onPageChange} />

      </>
    );
};

export default Rating;