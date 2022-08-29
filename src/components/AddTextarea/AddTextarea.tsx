import React, { FC } from 'react';
import styles from './addTextarea.module.scss';
import { programLanguage } from 'constants/other';
import { SelectInput } from 'components/common/SelectInput/SelectInput';
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants';
import { IconSvg } from 'components/common/IconSvg/IconSvg';


type setShowType = {
  setShow: (value: boolean) => void
}

export const AddTextarea: FC<setShowType> = ({setShow}) => {
    const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent;
    const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent;

    return (
        <div className={styles.redactorCourse_rightSide_functional_blackBlock}>
          <div className={styles.redactorCourse_rightSide_functional_blackBlock_select}>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
          <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
            <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowUp} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
          </div>
          <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
            <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowDown} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
          </div>
          <div className={styles.redactorCourse_rightSide_header_btnBlock_delete} onClick={() => {setShow(false)}}>
              <IconSvg width={19} height={19} d={classesSettingSvgIcon.deleteIcon} viewBoxSize="0 0 19 19" fill={'#EF4444'} />
          </div>
        </div>
            <SelectInput optionsList={programLanguage} />
          </div>
        </div>

    )
}