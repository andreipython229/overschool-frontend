import { useState, FC, ChangeEvent } from 'react'

import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { addVideoIconPath } from './config/svgIconsPath'
import { arrUpPath, arrDownPath, arrUpdatePath, deletePath } from '../../config/commonSvgIconsPath'
import { usePatchLessonsMutation } from 'api/LessonsServices'
import { AddPostT, setShowType } from '../componentsTypes'

import styles from './addVideo.module.scss'

export const AddVideo: FC<setShowType & AddPostT> = ({ lesson, setShow }) => {
  const [addFile] = usePatchLessonsMutation()

  const [addVideoLink, setAddVideoLink] = useState<string>('')

  const handleChangeInputLink = (event: ChangeEvent<HTMLInputElement>) => {
    setAddVideoLink(event.target.value)
  }

  const handleSaveVideoLink = () => {
    const id = lesson?.lesson_id
    const formdata = new FormData()
    formdata.append('video', addVideoLink)
    addFile({ formdata, id })
    setAddVideoLink('')
  }

  return (
    <div className={styles.redactorCourse_rightSide_functional_addContent}>
      <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={13} height={17} viewBoxSize="0 0 13 17" path={arrUpdatePath} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={setShow}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
        </div>
      </div>
      <IconSvg width={83} height={84} viewBoxSize="0 0 83 84" path={addVideoIconPath} />
      <span>Вставьте ссылку на видео </span>

      <input value={addVideoLink} onChange={handleChangeInputLink} type="text" />

      <Button variant={'primary'} onClick={handleSaveVideoLink} text={'Сохранить'} />
    </div>
  )
}
