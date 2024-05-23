import {useFetchAllMeetingsQuery} from "../../api/meetingsService";
import {FC, useEffect} from "react";
import styles from "./studentMeeting.module.scss";
import {setTotalMeetingCount} from "../../store/redux/meetings/meetingSlice";
import {useDispatch} from "react-redux";
import Timer from "../Timer/Timer";


export const StudentSchoolMeeting: FC = () => {
    const schoolName = window.location.href.split('/')[4];
    const {data: meetingsData, isSuccess: meetingsSuccess} = useFetchAllMeetingsQuery({schoolName});

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
            }
        }, [meetingsData, meetingsSuccess, dispatch]);
        if (meetingsSuccess) {
            return (
                <div className={styles.wrapper_actions}>
                    <table className={styles.meetingTable}>
                        <thead>
                        <tr>
                            <th>Ссылка</th>
                            <th>Время до старта</th>
                        </tr>
                        </thead>
                        <tbody>
                        {meetingsData.map((meeting, index) => (
                            <tr key={meeting.id}>
                                <td><a href={meeting.link} target="_blank" rel="noopener noreferrer">{meeting.link}</a>
                                </td>
                                <td><Timer targetDate={new Date(meeting.start_date)} /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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