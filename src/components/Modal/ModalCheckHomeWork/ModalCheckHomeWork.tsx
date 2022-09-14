import { useState } from 'react'

import { MyEditor } from '../../MyEditor/MyEditor'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import {
  taskIconPath,
  waitIconPath,
  lastAnswIconPath,
  humanIconPath,
  paperClipIconPath,
  starIconPath,
  doneNotFilledIconPath,
  doneFilledIconPath,
  sendIconPath,
  arrIconPath,
} from './config/svgIconsPsth'

import Avatar from '../../../assets/img/avatar.svg'

import styles from './modal_check_home_work.module.scss'

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
            <IconSvg width={19} height={20} viewBoxSize="0 0 19 20" path={taskIconPath} />
            <span>Посмотреть задание</span>
          </button>
        </div>
        <div className={styles.task_info}>
          <div className={styles.task_info_item}>
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={waitIconPath} />
            <span>Ждет проверки</span>
          </div>

          <div className={styles.task_info_item}>
            <IconSvg width={18} height={18} viewBoxSize="0 0 18 18" path={lastAnswIconPath} />
            <span>Последний ответ: 12.07.2022 в 19:50</span>
          </div>

          <div className={styles.task_info_item}>
            <IconSvg width={16} height={18} viewBoxSize="0 0 16 18" path={humanIconPath} />
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
            <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={paperClipIconPath} />
            <span>Прикрепить файл</span>
          </button>
          <button className={styles.bottomButtons_btn_mark}>
            <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={starIconPath} />
            <span>0</span>
          </button>
          <button className={styles.bottomButtons_btn_done}>
            <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={doneNotFilledIconPath} />

            <span>Выполнено</span>
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={doneFilledIconPath}>
              <circle cx="10" cy="10" r="10" fill="#A2E0D6" />
            </IconSvg>
          </button>
          <button className={styles.bottomButtons_btn_send}>
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={sendIconPath} />

            <span>Отправить ответ</span>
          </button>
        </div>
      </div>
      <button className={styles.modal_btn_is_toggle} onClick={handleToggleHiddenBlocks}>
        <span className={isOpen ? styles.arrow_rotate : ''}>
          <IconSvg width={25} height={25} viewBoxSize="0 0 21 21" path={arrIconPath} />
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
