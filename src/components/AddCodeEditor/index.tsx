import { FC, useState } from 'react'
import Editor from '@monaco-editor/react'

import { coursesSelectLanguage } from 'constants/other'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT, setShowType } from '../../types/componentsTypes'

import styles from './addCodeEditor.module.scss'
import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { IBlockCode } from 'types/sectionT'
import { Button } from 'components/common/Button/Button'

export const AddCodeEditor: FC<AddPostT> = ({ lesson, isPreview, code, block, handleEditorChange, lessonBlocks, setLessonBlocks }) => {
  const [codeData, setCodeData] = useState<string | undefined>(code)
  const [selectedLang, setSelectedLang] = useState<string>()
  const schoolName = window.location.href.split('/')[4]
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const [saveChanges, { isLoading: isSaving }] = useUpdateBlockDataMutation()

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

  return (
    <>
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
            {block && 'code' in block && block.code && codeData !== block.code && (
              <Button
                variant={'default'}
                text={isSaving ? <SimpleLoader style={{ height: '19px' }} loaderColor="white" /> : 'Сохранить код'}
                onClick={handleSaveChanges}
              />
            )}
          </div>
          <div className={styles.editorWrapper_navBlock}>
            <div className={styles.editorWrapper_navBlock_div}>
              <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
            </div>
            <div className={styles.editorWrapper_navBlock_div}>
              <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
            </div>
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
    </>
  )
}
