import { FC, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

import { coursesSelectLanguage } from 'constants/other'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT, setShowType } from '../componentsTypes'
import { useDebounce } from '../../customHooks/useDebounce'
import { usePatchLessonsMutation } from '../../api/LessonsServices'
import { patchData } from '../../utils/patchData'

import styles from './addCodeEditor.module.scss'

export const AddCodeEditor: FC<setShowType & AddPostT> = ({ lesson, setShow }) => {
  const [code, setCode] = useState<string>('')

  const [addCode] = usePatchLessonsMutation()

  const [debounced] = useDebounce(code, 1000)

  useEffect(() => {
    patchData(lesson, 'lesson_id', 'code', debounced.toString(), addCode)
  }, [debounced.toString()])

  const handleEditorChange = (code: any) => {
    setCode(code)
  }

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorWrapper_editor}>
        <div className={styles.editorWrapper_editor_add}>
          <Editor height="100%" language="javascript" theme="vs-dark" onChange={handleEditorChange} value={code} />
        </div>
      </div>
      <div className={styles.editorWrapper_selectWrapper}>
        <SelectInput optionsList={coursesSelectLanguage} />
      </div>
      <div className={styles.editorWrapper_navBlock}>
        <div className={styles.editorWrapper_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
        </div>
        <div className={styles.editorWrapper_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
        </div>
        <div className={styles.editorWrapper_navBlock_delete} onClick={setShow}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
        </div>
      </div>
    </div>
  )
}
