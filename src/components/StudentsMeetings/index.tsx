import {useFetchAllMeetingsQuery} from "../../api/meetingsService";
import { useFetchCoursesQuery } from '../../api/coursesServices';
import {FC, useEffect, useState} from "react";
import styles from "./studentMeeting.module.scss";
import {setTotalMeetingCount} from "../../store/redux/meetings/meetingSlice";
import {useDispatch} from "react-redux";
import Timer from "../Timer/Timer";
import cardBg from "../../assets/img/meetings/cardBg.png";
import cardAvatar from "../../assets/img/meetings/cardAvatar.png";
import { Pagination } from 'components/Pagination/Pagination'
import {AddMeetingModal} from '../Modal/AddMeetingModal'
import { CoursesDataT } from '../../types/CoursesT';
import { useNavigate } from 'react-router-dom';


const ITEMS_ON_PAGE_COUNT = 3

export const StudentSchoolMeeting: FC = () => {
    const navigate = useNavigate();
    const schoolName = window.location.href.split('/')[4];
    const {data: meetingsData, isSuccess: meetingsSuccess} = useFetchAllMeetingsQuery({schoolName});
    const { data: coursesData, isSuccess: coursesSuccess } = useFetchCoursesQuery({ schoolName, page: 1 });
    const [show, setShow] = useState<number>(0)
    const [showMore, setShowMore] = useState<number>(ITEMS_ON_PAGE_COUNT)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [totalPageArr, setTotalPageArr] = useState<number[]>([])
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [meetingsCount, setMeetingsCount] = useState<number>(0);
    const [selectedCourse, setSelectedCourse] = useState<CoursesDataT | null>(null);

    useEffect(() => {
        if (coursesSuccess && coursesData?.results?.length > 0) {
            setSelectedCourse(coursesData.results[0]);
        }
    }, [coursesSuccess, coursesData]);

    const handleClickPagination = (val: number) => {
      setShow(ITEMS_ON_PAGE_COUNT * val - ITEMS_ON_PAGE_COUNT)
      setShowMore(ITEMS_ON_PAGE_COUNT * val)
      setPageNumber(val)
    }

    const handleOpenModal = () => {
      setShowModal(true);
    };

    const handleDateChange = (date: Date | null): void => {
      setSelectedDate(date);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleGoToMain = () => {
        navigate(`/school/${schoolName}/courses/`);
    };

    const renderMeetingLinks = () => {
        const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        const dispatch = useDispatch();
        useEffect(() => {
            if (meetingsSuccess && meetingsData) {
                dispatch(setTotalMeetingCount(meetingsData.length));
                setMeetingsCount(meetingsData.length);
              }
            totalPageArr.splice(0)
              const num: number = Math.ceil(meetingsCount/ ITEMS_ON_PAGE_COUNT)
              let i: number
              for (i = 1; i <= num; i += 1) {
                totalPageArr.push(i)
          }
        }, [meetingsData, meetingsSuccess, dispatch, meetingsCount]);


        if (meetingsSuccess) {
            return (
                <div className={styles.wrapper}>
                  <div className={styles.wrapper_title}>Видеоконференции</div>
                  <div className={styles.wrapper_goBack}>
                    <button onClick={handleGoToMain}>На главную</button>
                  </div>
                  <div className={styles.wrapper_addConf}>
                    <button onClick={handleOpenModal}>Добавить видеоконференцию</button>
                  </div>
                    <table className={styles.meetingTable}>
                        <tbody>
                        {meetingsData.slice(show, showMore).map((meeting, index) => (
                            <tr key={meeting.id}  className={styles.meetingTable_container}>
                              <img className={styles.meetingTable_container_img}src={cardBg} alt="main"/>
                                <td className={styles.meetingTable_deisign}>
                                  <img className={styles.meetingTable_deisign_img} src={cardAvatar} alt="deisign"/></td>
                                <td className={styles.meetingTable_ref}>
                                  <div className={styles.meetingTable_ref_name}>{selectedCourse?.name || 'No course selected'}</div>
                                  <div className={styles.meetingTable_ref_title}>{meeting.title}</div>
                                  <div className={styles.meetingTable_ref_description}>{meeting.description}</div>
                                  <a className={styles.meetingTable_ref_link} href={meeting.link} target="_blank" rel="noopener noreferrer">{meeting.link}</a>
                                </td>
                                <td className={styles.meetingTable_prop}>
                                  <tr>
                                    <button onClick={handleOpenModal}></button>
                                  </tr>
                                  <tr className={styles.meetingTable_prop_time}><Timer targetDate={new Date(meeting.start_date)} /></tr>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                      <Pagination
                        className={styles.paginationTable}
                        currentPage={pageNumber}
                        paginationRange={totalPageArr}
                        onPageChange={handleClickPagination}
                      />
                      <AddMeetingModal show={showModal} handleClose={handleCloseModal} handleDateChange={handleDateChange} schoolName={schoolName}/>
                </div>
            );
        }
        return <table className={styles.meetingTable}>
            <tbody>
            <tr className={styles.table_no_results}>
                <td>Ничего не найдено</td>
            </tr>
            </tbody>
        </table>;
    };

    return (
        <div>
            {renderMeetingLinks()}
        </div>
    );
};

export default StudentSchoolMeeting;