import {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {authSelector, selectUser} from "../../selectors";
import {useFetchSchoolHeaderQuery} from "../../api/schoolHeaderService";
import {useCreateMeetingMutation, useFetchAllMeetingsQuery, useDeleteMeetingMutation} from "../../api/meetingsService";
import {SchoolMeeting} from "../../types/schoolMeetingsT";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {useFetchStudentsGroupQuery} from "../../api/studentsGroupService";
import styles from './meetings.module.scss';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Button} from 'components/common/Button/Button'
import {useFetchCoursesQuery} from "../../api/coursesServices";
import MenuItem from "@mui/material/MenuItem";
import {CoursesDataT} from "../../types/CoursesT";
import {setTotalMeetingCount} from "../../store/redux/meetings/meetingSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux/store";
import Timer from "../Timer/Timer";

export const SchoolMeetings: FC = () => {
    const isLogin = useAppSelector(authSelector);
    const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount);
    const schoolName = window.location.href.split('/')[4];
    const headerId = localStorage.getItem('header_id');

    const {role: userRole} = useAppSelector(selectUser);
    // const {data, isSuccess} = useFetchSchoolHeaderQuery(Number(headerId));
    const {data: meetingsData, isSuccess: meetingsSuccess} = useFetchAllMeetingsQuery({schoolName: schoolName});
    const [showAddMeetingForm, setShowAddMeetingForm] = useState(false);
    const [createMeeting, {isLoading, error}] = useCreateMeetingMutation();
    const [deleteMeeting, {isLoading: isDeleting, error: deleteError}] = useDeleteMeetingMutation();
    const {data: studentsGroups, isSuccess: groupsSuccess} = useFetchStudentsGroupQuery(schoolName);
    const {data: Courses, isSuccess: coursesSuccess} = useFetchCoursesQuery(schoolName);
    const [selectedCourse, setSelectedCourse] = useState<CoursesDataT | null>(null);
    const [newMeetingData, setNewMeetingData] = useState<SchoolMeeting>({
        id: 0,
        students_groups: [],
        link: '',
        start_date: new Date(),
    });
    const dispatch = useDispatch();

    useEffect(() => {
  if (meetingsSuccess && meetingsData) {
    dispatch(setTotalMeetingCount(meetingsData.length));
  }
}, [meetingsData, meetingsSuccess, dispatch]);

    const handleAddMeeting = () => {
        createMeeting({
            data: newMeetingData,
            schoolName,
        });
        setShowAddMeetingForm(false);
         dispatch(setTotalMeetingCount(totalMeetingCount + 1));
    };

    const handleDeleteMeeting = (meetingId: number) => {
        deleteMeeting({id: meetingId, schoolName});
        dispatch(setTotalMeetingCount(totalMeetingCount - 1));
    };

    const handleAddMeetingFormOpen = () => {
    setNewMeetingData({
        ...newMeetingData,
        students_groups: [],
    });
    setShowAddMeetingForm(true);};

    const handleCourseChange = (courseId: number) => {
        setSelectedCourse(Courses?.results.find(course => course.course_id === courseId) || null)
    };

    const renderMeetingLinks = () => {
        const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        if (meetingsSuccess) {
            return (
                    <table className={styles.meetingTable}>
                        <thead>
                        <tr>
                            <th>Ссылка</th>
                            <th>Дата и время</th>
                            <th>Группы</th>
                            <th>Время до старта</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {meetingsData.map((meeting, index) => (
                            <tr key={meeting.id}>
                                <td><a href={meeting.link} target="_blank" rel="noopener noreferrer">{meeting.link}</a>
                                </td>
                                <td>{dateFormatter.format(new Date(meeting.start_date))}</td>
                                <td>{meeting.students_groups.map(groupId => {
                                    const group = studentsGroups?.results.find(g => g.group_id === groupId);
                                    return group ? group.name : '';
                                }).join(', ')}</td>
                                <td><Timer targetDate={new Date(meeting.start_date)} /></td>
                                <td>
                                    <Button onClick={() => handleDeleteMeeting(meeting.id)} text="Удалить"/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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
        <div className={styles.wrapper_actions}>
            {isLogin && (
                <>
                    <Button className={styles.generateMeetingButton} onClick={handleAddMeetingFormOpen} text="Добавить видеоконференцию"/>
                    <Dialog open={showAddMeetingForm} onClose={() => setShowAddMeetingForm(false)}
                            PaperProps={{style: {maxHeight: '100vh', maxWidth: '600px', width: '100%'},}}>
                        <DialogTitle>Добавить видеоконференцию</DialogTitle>
                        <DialogContent>
                            <div style={{marginBottom: '1rem', marginTop: '1rem'}}>
                                <TextField
                                    id="datetime-local"
                                    label="Выберите дату и время видеоконференции"
                                    type="datetime-local"
                                    defaultValue={new Date().toISOString().slice(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth={true}
                                    onChange={(e) =>
                                        setNewMeetingData({
                                            ...newMeetingData,
                                            start_date: new Date(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div style={{marginBottom: '1rem'}}>
                                <TextField
                                    id="link"
                                    label="Ссылка на видеоконференцию"
                                    value={newMeetingData.link}
                                    fullWidth={true}
                                    onChange={(e) =>
                                        setNewMeetingData({...newMeetingData, link: e.target.value})
                                    }
                                />
                            </div>
                            <div>
                                <TextField
                                    id="course"
                                    select
                                    label="Выберите курс"
                                    fullWidth={true}
                                    onChange={(e) => {
                                        const courseId = parseInt(e.target.value);
                                        handleCourseChange(courseId);
                                    }}
                                    value={selectedCourse?.course_id || ""}
                                >
                                    {Courses?.results.map(course => (
                                        <MenuItem key={course.course_id} value={course.course_id}>
                                            {course.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            {studentsGroups && selectedCourse && studentsGroups.results
                                .filter(group => group.course_id === selectedCourse.course_id)
                                .map(group => {
                                    if (group.course_id === selectedCourse.course_id) {
                                        return (
                                            <div key={group.group_id}>
                                                <Checkbox
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        if (isChecked) {
                                                            setNewMeetingData((prevData: SchoolMeeting) => ({
                                                                ...prevData,
                                                                students_groups: [...prevData.students_groups, group.group_id],
                                                            }) as SchoolMeeting);
                                                        } else {
                                                            setNewMeetingData((prevData: SchoolMeeting) => ({
                                                                ...prevData,
                                                                students_groups: prevData.students_groups.filter(
                                                                    (id) => id !== group.group_id
                                                                ),
                                                            }));
                                                        }
                                                    }}
                                                />
                                                {group.name}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleAddMeeting} text="Добавить"/>
                            <Button onClick={() => setShowAddMeetingForm(false)} text="Отмена"/>
                        </DialogActions>
                    </Dialog>
                    {renderMeetingLinks()}
                </>
            )}
        </div>
    );
};

export default SchoolMeetings;