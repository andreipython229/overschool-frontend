import React, { FC } from 'react'
import { coursesSelectLanguage } from 'constants/other'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import Editor from '@monaco-editor/react'
import { setShowType } from '../componentsTypes'

import styles from './addCodeEditor.module.scss'

export const AddCodeEditor: FC<setShowType> = ({ setShow }) => {
  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorWrapper_editor}>
        <div className={styles.editorWrapper_editor_add}>
          <Editor height="100%" language="javascript" theme="vs-dark" defaultValue="// HI, Anton !!!" />
        </div>
      </div>
      <div className={styles.editorWrapper_selectWrapper}>
        <SelectInput optionsList={coursesSelectLanguage} />
      </div>
      <div className={styles.editorWrapper_navBlock}>
        <div className={styles.editorWrapper_navBlock_div}>
          <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowUp} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
        </div>
        <div className={styles.editorWrapper_navBlock_div}>
          <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowDown} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
        </div>
        <div className={styles.editorWrapper_navBlock_delete} onClick={setShow}>
          <IconSvg width={19} height={19} d={classesSettingSvgIcon.deleteIcon} viewBoxSize="0 0 19 19" fill={'#EF4444'} />
        </div>
      </div>
    </div>
  )
}
