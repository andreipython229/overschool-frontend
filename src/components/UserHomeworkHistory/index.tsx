import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import parse from 'html-react-parser'

import { UserHomeworkCheck } from 'types/homeworkT'
import { convertDate } from 'utils/convertDate'
import { AudioFile } from 'components/AudioFile/index'
import { UploadedFile } from 'components/UploadedFile'

import styles from './userHomeworkHistory.module.scss'
import modalStyles from '../Modal/ModalCheckHomeWork/modal_check_home_work.module.scss'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'

type userHomeworkHistoryT = {
  homework: UserHomeworkCheck
  today: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const UserHomeworkHistory: FC<userHomeworkHistoryT> = ({ homework, today, ...restProps }) => {
  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(homework?.updated_at || ''))
  const currentDate = convertDate(new Date())
  const { userId } = useAppSelector(selectUser)

  return (
    <>
      {today && (
        <div className={styles.today}>
          <span className={styles.today_line} />
          <div className={styles.today_bubble}>
            <p className={styles.today_bubble_text}>Сегодня</p>
          </div>
          <span className={styles.today_line} />
        </div>
      )}
      <div className={`${styles.history} ${homework.author === userId ? styles.reversed : styles.normal}`}>
        <div className={styles.history_avatar}>
          {homework?.profile_avatar ? (
            <img src={homework.profile_avatar} alt="avatar" />
          ) : (
            `${homework?.author_last_name.charAt(0) || 'б'}${homework?.author_first_name.charAt(0) || 'и'}`
          )}
        </div>
        <div className={homework.author === userId ? styles.speech_bubble_right : styles.speech_bubble_left}>
          <p className={styles.username}>
            {homework?.author_pseudonym || `${homework?.author_last_name || 'Без'} ${homework?.author_first_name || 'имени'}`}
          </p>
          <div style={{ display: 'flex' }}>
            <p>{parse(homework?.text || '')}</p>
            <span>{currentDate.mmddyyyy === mmddyyyy ? hoursAndMinutes : `${mmddyyyy} ${hoursAndMinutes}`}</span>
          </div>
          <div style={{ maxWidth: '500px' }}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {homework?.text_files.map((file, index) => (
                <UploadedFile key={file.id} index={index} name={file.file_url} file={`${file.file}`} size={file.size} isHw />
              ))}
            </div>
            <div className={modalStyles.task_modal_audio}>
              {homework?.audio_files.map(file => (
                <AudioFile key={file.id} audioUrl={`${file.file_url}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
