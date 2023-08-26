import {FC, memo, ReactNode} from 'react'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import styles from './questionHeader.module.scss'
import {PropsQuestionBlockT} from "../../../../../../../../../components/AddQuestion";
import {arrowDownPath, arrowDownTimerIconPath} from "../../../../../../../../../components/Questions/config/svgIconPath";

type AdminQuestionHeaderT = {
    children?: ReactNode
}

export const AdminQuestionHeader: FC<AdminQuestionHeaderT & PropsQuestionBlockT> = memo(({title, id, isOpen, onToggle, children}) => {
    return (
        <div className={styles.header}>
            {children}
            <h4>{title}</h4>
            <div className={styles.header_controlIconWrapper}>
                <div onClick={onToggle} className={!isOpen ? styles.header_controlIconWrapper_togglerShowOption
                            : styles.header_controlIconWrapper_togglerShowOption + ' ' + styles.rotate_arrow}>
                    <IconSvg width={42} height={37} viewBoxSize="0 0 22 22" path={arrowDownTimerIconPath}/>
                </div>
            </div>
        </div>
    )
})
