import { FC, useState, PointerEvent } from 'react'
import Editor from '@monaco-editor/react'
import { coursesSelectLanguage } from 'constants/other'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT } from '../../types/componentsTypes'
import styles from './addCodeEditor.module.scss'
import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { IBlockCode } from 'types/sectionT'
import { Button } from 'components/common/Button/Button'
import { Reorder, useDragControls } from 'framer-motion'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'

export const AddCodeEditor: FC<AddPostT> = ({ lesson, isPreview, code, block, handleEditorChange, lessonBlocks, setLessonBlocks }) => {
  const [codeData, setCodeData] = useState<string | undefined>(code)
  const [selectedLang, setSelectedLang] = useState<string>()
  const schoolName = window.location.href.split('/')[4]
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const [saveChanges, { isLoading: isSaving }] = useUpdateBlockDataMutation()
  const controls = useDragControls()

  const handleDeleteCode = () => {
    if (lessonBlocks && setLessonBlocks && block) {
      deleteBlock({ id: block.id, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks.filter(item => item.id !== block.id)
          setLessonBlocks(updatedArray)
        })
    }
  }

  const handleSaveChanges = () => {
    if (codeData && lessonBlocks && setLessonBlocks && block) {
      const codeBlockData: IBlockCode = {
        id: block.id,
        type: block.type,
        order: block.order,
        code: codeData,
      }

      if (selectedLang) {
        codeBlockData.language = selectedLang
      }

      saveChanges({ data: codeBlockData, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks.map(item => {
            if (item.id === block.id) {
              return codeBlockData
            }
            return item
          })
          setLessonBlocks(updatedArray)
        })
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
  }

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.1,
        borderRadius: '7px',
      }}
      key={block ? block.id : lesson.baselesson_ptr_id}
    >
      {!isPreview ? (
        <div className={styles.editorWrapper_wrapper}>
          <div className={styles.editorWrapper}>
            <div className={styles.editorWrapper_editor}>
              <div className={styles.editorWrapper_editor_add}>
                <Editor height="100%" language={selectedLang} loading={''} theme="vs-dark" onChange={setCodeData} value={codeData} />
              </div>
            </div>
            <div className={styles.editorWrapper_selectWrapper}>
              <SelectInput setSelectedValue={setSelectedLang} optionsList={coursesSelectLanguage} />
            </div>
            {block && (('code' in block && block.code && codeData !== block.code) || (codeData && 'code' in block && !block.code)) && (
              <Button
                variant={'default'}
                text={isSaving ? <SimpleLoader style={{ height: '19px' }} loaderColor="white" /> : 'Сохранить код'}
                onClick={handleSaveChanges}
              />
            )}
          </div>
          <div className={styles.editorWrapper_navBlock}>
            <span className={styles.editorWrapper_navBlock_grabBtn} onPointerDown={onPointerDown}>
              <IconSvg width={11} height={15} className="zIndex: 20" viewBoxSize="0 0 12 18" path={doBlockIconPath} />
            </span>
            <div className={styles.editorWrapper_navBlock_delete} onClick={handleDeleteCode}>
              {isLoading ? <SimpleLoader /> : <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />}
            </div>
          </div>
        </div>
      ) : (
        <code>
          <pre>{code}</pre>
        </code>
      )}
    </Reorder.Item>
  )
}
