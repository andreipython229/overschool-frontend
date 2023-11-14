import {FC} from 'react'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {crossIconPath} from '../../../config/commonSvgIconsPath'
import {LimitModalPropsT} from '../ModalTypes'

import styles from '../Modal.module.scss'

export const LimitModal: FC<LimitModalPropsT> = ({message, setShowLimitModal, setShowMainModal}) => {

    const handlerModal = () => {
        setShowLimitModal()
        setShowMainModal && setShowMainModal()
    }

    return (
        <div className={styles.mainCourse}>
            <div className={styles.mainCourse_container}>
                <div className={styles.mainCourse_closed} onClick={handlerModal}>
                    <IconSvg width={25} height={25} path={crossIconPath}/>
                </div>
                <div className={styles.mainCourse_title}>{message}</div>
            </div>
        </div>
    )
}
