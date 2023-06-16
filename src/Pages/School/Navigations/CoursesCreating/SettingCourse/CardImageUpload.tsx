import {ChangeEvent, FC} from 'react'

import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {usePatchCoursesMutation} from 'api/coursesServices'
import {CoursesDataT} from 'types/CoursesT'
import {publishedIconPath, noPublishedIconPath} from '../../../config/svgIconsPath'
import {patchData} from 'utils/patchData'

import styles from './setting_course.module.scss'

type CardImageDownloadsT = {
    toggleCheckbox: boolean
    courseFind: CoursesDataT
}

export const CardImageUpload: FC<CardImageDownloadsT> = ({toggleCheckbox, courseFind}) => {
    const [updateImg] = usePatchCoursesMutation()

    const handleUploadFile = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            const files = event.target.files
            if (courseFind && courseFind.order && courseFind.school) {
                const formData = new FormData();
                formData.append('photo', files[0]);
                formData.append('order', courseFind.order.toString());
                formData.append('school', courseFind.school.toString());
                updateImg({formdata: formData, id: courseFind.course_id})
            }
        }
    }

    return (
        <div className={styles.card_image_downloads}>
            <label className={styles.block_download_image}>
                <img src={courseFind?.photo || ''} alt={courseFind?.name}/>
                <input className={styles.hide_input} type="file" onChange={handleUploadFile}/>
            </label>
            {toggleCheckbox ? (
                <p className={styles.text_block}>
                    <IconSvg width={18} height={16} path={publishedIconPath}/>
                    опубликовано
                </p>
            ) : (
                <p className={styles.text_block}>
                    <IconSvg width={18} height={16} path={noPublishedIconPath}/>
                    не опубликовано
                </p>
            )}
            <p className={styles.text_name}>{courseFind?.name}</p>
        </div>
    )
}
