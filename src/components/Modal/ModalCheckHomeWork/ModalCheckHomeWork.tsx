import { useState } from 'react'
import styles from './modal_check_home_work.module.scss'
import { MyEditor } from '../../MyEditor/MyEditor'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import {
  arrowIcon,
  humanSvgIcon,
  taskSvgIcon,
  waitSvgIcon,
  lastAnswerSvgIcon,
  classesSettingSvgIcon,
  starSvgIcon,
  sendSvgIcon,
  doneFilledSvgIcon,
  doneNotFilledSvgIcon,
} from '../../../constants/iconSvgConstants'
import Avatar from '../../../assets/img/avatar.svg'

export const ModalCheckHomeWork = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_header}></div>
      <div className={styles.modal_visibility_block}>
        <div className={styles.header_info}>
          <h3 className={styles.answer_header}>Проверочное задание</h3>
          <p className={styles.task_status}> - Проверка работы</p>
          <button className={styles.btn_grey}>
            <IconSvg width={19} height={20} viewBoxSize="0 0 19 20" fill={'#6B7280'} d={taskSvgIcon} />
            <span>Посмотреть задание</span>
          </button>
        </div>
        <div className={styles.task_info}>
          <div className={styles.task_info_item}>
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" fill={'#717985'} d={waitSvgIcon} />
            <span>Ждет проверки</span>
          </div>

          <div className={styles.task_info_item}>
            <IconSvg width={18} height={18} viewBoxSize="0 0 18 18" fill={'#BA75FF'} d={lastAnswerSvgIcon} />
            <span>Последний ответ: 12.07.2022 в 19:50</span>
          </div>

          <div className={styles.task_info_item}>
            <IconSvg width={16} height={18} viewBoxSize="0 0 16 18" fill={'#BA75FF'} d={humanSvgIcon} />
            <span>Проверяющий:</span>
          </div>
        </div>
        <h3 className={styles.answer_header}>Последний ответ преподавателя</h3>

        <div className={styles.teacher}>
          <img className={styles.teacher_avatar} src={Avatar} alt="User Avatar" />
          <div className={styles.teacher_teacherData}>
            <span className={styles.teacher_teacherData_name}>Без имени</span>
            <span className={styles.teacher_teacherData_date}>12.07.2022 в 19:50</span>
          </div>
        </div>

        <div className={styles.speech_bubble}>ok</div>

        <h3 className={styles.answer_header}>Введите ваш ответ:</h3>
        <MyEditor />
        <div className={styles.bottomButtons}>
          <button className={styles.bottomButtons_btn_addFile}>
            <IconSvg width={22} height={18} d={classesSettingSvgIcon.paperClip} viewBoxSize="0 0 22 18" fill={'#6B7280'} />
            <span>Прикрепить файл</span>
          </button>
          <button className={styles.bottomButtons_btn_mark}>
            <IconSvg
              width={17}
              height={17}
              d={starSvgIcon}
              viewBoxSize="0 0 17 17"
              fill={'#E5E7EB'}
              stroke="#E0DCED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <span>0</span>
          </button>
          <button className={styles.bottomButtons_btn_done}>
            <IconSvg width={19} height={19} d={doneNotFilledSvgIcon} viewBoxSize="0 0 19 19" fill={'#17B198'} />

            <span>Выполнено</span>
            {/*<IconSvg width={20} height={20} d={doneFilledSvgIcon} viewBoxSize="0 0 20 20" fill={"#A2E0D6"} />*/}

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#A2E0D6" />
              <path
                d="M6.08687 8.42085C6.31468 8.19305 6.68402 8.19305 6.91183 8.42085L9.99935 11.5084L13.0869 8.42085C13.3147 8.19305 13.684 8.19305 13.9118 8.42085C14.1396 8.64866 14.1396 9.01801 13.9118 9.24581L10.4118 12.7458C10.184 12.9736 9.81468 12.9736 9.58687 12.7458L6.08687 9.24581C5.85906 9.01801 5.85906 8.64866 6.08687 8.42085Z"
                fill="#4BC3AF"
              />
            </svg>
          </button>
          <button className={styles.bottomButtons_btn_send}>
            <IconSvg
              width={20}
              height={20}
              d={sendSvgIcon}
              viewBoxSize="0 0 20 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <span>Отправить ответ</span>
          </button>
        </div>
      </div>
      <button className={styles.modal_btn_is_toggle} onClick={handleToggleHiddenBlocks}>
        <span className={isOpen ? styles.arrow_rotate : ''}>
          <IconSvg width={25} height={25} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 21 21" />
        </span>
        {isOpen ? 'Скрыть историю проверки' : 'Показать историю проверки'}
      </button>
      {isOpen && (
        <div className={styles.modal_hidden_block}>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
        </div>
      )}
    </div>
  )
}
;<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M18.4621 2.57573C17.7748 1.82597 16.5337 1.77977 15.7063 2.60711L7.60633 10.7071C7.39685 10.9166 7.39685 11.1834 7.60633 11.3929C7.8158 11.6024 8.08264 11.6024 8.29211 11.3929L14.9921 4.6929C15.3826 4.30238 16.0158 4.30238 16.4063 4.6929C16.7969 5.08342 16.7969 5.71659 16.4063 6.10711L9.70633 12.8071C8.7158 13.7976 7.18264 13.7976 6.19211 12.8071C5.20159 11.8166 5.20159 10.2834 6.19211 9.2929L14.2921 1.1929C15.8596 -0.374632 18.407 -0.425638 19.9216 1.20821C21.4738 2.77662 21.5195 5.31157 19.8921 6.82133L10.4063 16.3071C8.2158 18.4976 4.78264 18.4976 2.59211 16.3071C0.401588 14.1166 0.401588 10.6834 2.59211 8.4929L10.6921 0.3929C11.0826 0.00237539 11.7158 0.00237539 12.1063 0.3929C12.4969 0.783424 12.4969 1.41659 12.1063 1.80711L4.00633 9.90711C2.59685 11.3166 2.59685 13.4834 4.00633 14.8929C5.4158 16.3024 7.58264 16.3024 8.99211 14.8929L18.4921 5.3929C18.5024 5.38266 18.5128 5.37264 18.5235 5.36285C19.2733 4.67557 19.3195 3.43446 18.4921 2.60711C18.4819 2.59687 18.4719 2.58641 18.4621 2.57573Z"
    fill="#6B7280"
  />
</svg>
