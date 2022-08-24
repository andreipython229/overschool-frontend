import React, { useState } from 'react'
import styles from './modal_check_home_work.module.scss'
import { MyEditor } from '../../MyEditor/MyEditor'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import {arrowIcon, classesSettingSvgIcon, filterSvgIcon} from '../../../constants/iconSvgConstants'
import Avatar from "../../../assets/img/avatar.svg";

export const ModalCheckHomeWork = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleToggleHiddenBlocks = (): void => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_header}></div>
            <div className={styles.modal_visibility_block}>
                <h3 className={styles.answer_header}>Последний ответ преподавателя</h3>

                <div className={styles.teacher}>
                    <img className={styles.teacher_avatar} src={Avatar} alt="User Avatar" />
                    <div className={styles.teacher_teacherData}>
                        <span className={styles.teacher_teacherData_name}>Без имени</span>
                        <span className={styles.teacher_teacherData}>12.07.2022 в 19:50</span>
                    </div>
                </div>

                <div className={styles.speech_bubble} >
                    ok
                </div>

                <h3 className={styles.answer_header}>Введите ваш ответ:</h3>
                <MyEditor />
                <button
                    className={styles.add_file_button}
                >
                    <IconSvg
                        width={22}
                        height={18}
                        d={classesSettingSvgIcon.paperClip}
                        viewBoxSize="0 0 22 18"
                        fill={'#6B7280'}
                    />
                    Прикрепить файл
                </button>
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
