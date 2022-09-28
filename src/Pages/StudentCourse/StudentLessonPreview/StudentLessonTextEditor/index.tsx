
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { MyEditor } from 'components/MyEditor/MyEditor';
import styles from './studentLessonTextEditor.module.scss';
import { paperClipIconPath } from '../../../School/config/svgIconsPath'

export const StudentLessonTextEditor = () => {
    return (
        <div className={styles.wrapper}>
            <h5 className={styles.wrapper_title}>Введите ответ на задание:</h5>
            <MyEditor />
            <form acceptCharset="utf-8" className={styles.wrapper_form}>
                <label className={styles.wrapper_form_addFiles}>
                    <IconSvg width={18} height={15} viewBoxSize="0 0 20 18" path={paperClipIconPath} />
                    <input type="file" />
                    Прикрепить файлы
                </label>
                <span className={styles.wrapper_form_help}>Добавьте файл(-ы) с решением задания</span>
            </form>
        </div>
    )
}