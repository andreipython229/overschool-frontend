import { useState, FC } from 'react';
import { MyEditor } from 'components/MyEditor/MyEditor';
import { ContentBtn } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/ContentBtn/ContentBtn';
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants';
import { IconSvg } from 'components/common/IconSvg/IconSvg';

import styles from './addTextEditor.module.scss';

type setShowType = {
    setShow: (value: boolean) => void
  }

export const AddTextEditor: FC<setShowType> = ({setShow}) => {

  return (
    <div className={styles.textEditorWrapper} >
        <div className={styles.textEditorWrapper_navBlock}>
            <div className={styles.textEditorWrapper_navBlock_div}>
              <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowUp} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
            </div>
            <div className={styles.textEditorWrapper_navBlock_div}>
              <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowDown} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
            </div>
            <div className={styles.textEditorWrapper_navBlock_div}>
              <IconSvg width={13} height={17} d={classesSettingSvgIcon.arrowUpdate} viewBoxSize="0 0 13 17" fill={'#BA75FF'} />
            </div>
            <div className={styles.textEditorWrapper_navBlock_delete} onClick={() => {setShow(false)}}>
              <IconSvg width={19} height={19} d={classesSettingSvgIcon.deleteIcon} viewBoxSize="0 0 19 19" fill={'#EF4444'} />
            </div>
        </div>
        <MyEditor />
    </div>
        
  )
}
