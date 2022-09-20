import { FC, useEffect, useState } from 'react'
//import parse from 'html-react-parser'
import { usePatchLessonsMutation } from '../../api/LessonsServices'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, arrUpdatePath, deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT, setShowType } from '../componentsTypes'
import { patchData } from '../../utils/patchData'

import styles from './addTextEditor.module.scss'

export const AddTextEditor: FC<setShowType & AddPostT> = ({ lesson, setShow }) => {
  const [addDescription] = usePatchLessonsMutation()

  const [descriptionLesson, setDescriptionLesson] = useState<string>('')

  useEffect(() => {
    patchData(lesson, 'description', descriptionLesson, addDescription)
  }, [descriptionLesson])

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
        <div className={styles.textEditorWrapper_navBlock_delete} onClick={setShow}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
        </div>
      </div>
      <MyEditor setDescriptionLesson={setDescriptionLesson} />
    </div>
  )
}
