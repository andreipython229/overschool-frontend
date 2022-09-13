import { useState, FC } from 'react'

import { MyEditor } from 'components/MyEditor/MyEditor'
import { ContentBtn } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/ContentBtn/ContentBtn'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, arrUpdatePath, deletePath } from '../../config/commonSvgIconsPath'

import styles from './addTextEditor.module.scss'

type setShowType = {
  setShow: (value: boolean) => void
}

export const AddTextEditor: FC<setShowType> = ({ setShow }) => {
  return (
    <div className={styles.textEditorWrapper}>
      <div className={styles.textEditorWrapper_navBlock}>
        <div className={styles.textEditorWrapper_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
        </div>
        <div className={styles.textEditorWrapper_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
        </div>
        <div className={styles.textEditorWrapper_navBlock_div}>
          <IconSvg width={13} height={17} viewBoxSize="0 0 13 17" path={arrUpdatePath} />
        </div>
        <div
          className={styles.textEditorWrapper_navBlock_delete}
          onClick={() => {
            setShow(false)
          }}
        >
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
        </div>
      </div>
      <MyEditor />
    </div>
  )
}
