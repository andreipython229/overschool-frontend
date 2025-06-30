import { FC, ReactNode, useState } from 'react'
import styles from "./addMeeting.module.scss";
import cam from "../../../assets/img/common/cam.png";
import close from "../../../assets/img/common/close.svg";
import { Backdrop } from '../Backdrop'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateMeetingMutation } from '../../../api/meetingsService';
import { useFetchCoursesQuery } from '../../../api/coursesServices';
import { SchoolMeeting } from '../../../types/schoolMeetingsT';
import { CoursesDataT } from '../../../types/CoursesT';

interface IAddMeetingModal {
  handleClose: () => void
  handleDateChange: (date: Date | null) => void
  show: boolean
  schoolName: string
}

interface IMeetingForm {
  title: string;
  description: string;
  link: string;
  date: Date | null;
  courseId: number | null;
}

export const AddMeetingModal: FC<IAddMeetingModal> = ({ handleClose, show, handleDateChange, schoolName }) => {
  if (!show) {
    return null
  }

  const [formData, setFormData] = useState<IMeetingForm>({
    title: '',
    description: '',
    link: '',
    date: null,
    courseId: null
  });
  const [error, setError] = useState<string>('');

  const { data: coursesData } = useFetchCoursesQuery({ schoolName, page: 1 });
  const [createMeeting] = useCreateMeetingMutation();

  const handleDateSelect = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date }));
    handleDateChange(date);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'courseId' ? Number(value) : value }));
    setError('');
  };

  const onClose = () => {
    setFormData({
      title: '',
      description: '',
      link: '',
      date: null,
      courseId: null
    });
    setError('');
    handleClose();
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Пожалуйста, введите тему видеоконференции');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Пожалуйста, введите описание видеоконференции');
      return false;
    }
    if (!formData.link.trim()) {
      setError('Пожалуйста, введите ссылку на видеоконференцию');
      return false;
    }
    if (!formData.date) {
      setError('Пожалуйста, выберите дату и время');
      return false;
    }
    if (!formData.courseId) {
      setError('Пожалуйста, выберите курс');
      return false;
    }
    return true;
  };

  const addMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const meetingData: Partial<SchoolMeeting> = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        start_date: formData.date || new Date(),
        students_groups: []
      };

      await createMeeting({
        data: meetingData as SchoolMeeting,
        schoolName: schoolName
      }).unwrap();
      onClose();
    } catch (err) {
      setError('Произошла ошибка при создании видеоконференции. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <Backdrop onClose={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.close_button}
          onClick={onClose}
          aria-label="Close modal"
        >
        </button>
        <h2 className={styles.modal_content_title}>
          <div className={styles.title_container}>
            <img src={cam} alt='camera'/>
            <span>Добавить видеоконференцию</span>
          </div>
        </h2>
        <div className={styles.modal_content_choosingTitle}>Выберите дату и время видеоконференции</div>
        <form className={styles.form_container} onSubmit={addMeeting}>
          {error && <div className={styles.error_message}>{error}</div>}
          <div className={styles.datepicker_container}>
            <DatePicker
              selected={formData.date}
              onChange={handleDateSelect}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd.MM.yyyy HH:mm"
              placeholderText="Выберите дату и время"
              isClearable
              minDate={new Date()}
              className={styles.datepicker_field}
              required
            />
          </div>
          <div className={styles.input_container}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Тема видеоконференции"
              className={styles.input_field}
              required
            />
          </div>
          <div className={styles.input_container}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Описание видеоконференции"
              className={`${styles.input_field} ${styles.textarea_field}`}
              required
            />
          </div>
          <div className={styles.input_container}>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Ссылка на видеоконференцию"
              className={styles.input_field}
              required
            />
          </div>
          <div className={styles.input_container}>
            <select
              style={{background:'rgba(207, 226, 255, 1)'}}
              name="courseId"
              value={formData.courseId || ''}
              onChange={handleInputChange}
              className={`${styles.input_field} ${styles.input_course}`}
              required
            >
              <option value="">Выберите курс</option>
              {coursesData?.results.map((course: CoursesDataT) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.button_container}>
            <button type="submit" className={styles.submit_button}>
              Добавить
            </button>
            <button type="button" onClick={onClose} className={styles.cancel_button}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  )
}
