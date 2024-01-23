import React, { Dispatch, FC, SetStateAction, PointerEvent, useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import styles from './newTextEditor.module.scss'
import { MyEditor } from '../MyEditor/MyEditor'
import { BlockT, IBlockDesc } from 'types/sectionT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrDownPath, arrUpPath, deletePath } from 'config/commonSvgIconsPath'
import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { Reorder, useDragControls } from 'framer-motion'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'

interface textEditorT {
  text: string
  setLessonDescription?: any
  block: BlockT
  setLessonBlocks: Dispatch<SetStateAction<BlockT[]>>
  lessonBlocks: BlockT[]
}

export const NewTextEditor: FC<textEditorT> = ({ text, setLessonDescription, block, setLessonBlocks, lessonBlocks }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedText, setEditedText] = useState<string>(text)
  const controls = useDragControls()
  const [deleteBlock, { isLoading: isBlockDeleting }] = useDeleteBlockMutation()
  const [saveChanges, { isLoading }] = useUpdateBlockDataMutation()
  const schoolName = window.location.href.split('/')[4]

  const handleSaveChanges = (newText: string) => {
    if (block.type === 'description') {
      const updatedBlockData: IBlockDesc = {
        id: block.id,
        type: block.type,
        order: block.order,
        description: newText,
      }
      saveChanges({ data: updatedBlockData, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks.map(item => {
            if (item.id === block.id) {
              return updatedBlockData
            }
            return item
          })
          if (updatedArray) {
            setLessonBlocks(updatedArray)
          }
        })
    }
  }

  const deleteLessonBlocks = async (id: number) => {
    const updatedArray = lessonBlocks.filter(item => item.id !== id)
    setLessonBlocks(updatedArray)
  }

  const handleDelete = () => {
    deleteBlock({ id: block.id, schoolName })
      .unwrap()
      .then((data: any) => {
        deleteLessonBlocks(block.id)
      })
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    setLessonDescription && setLessonDescription(editedText)
  }, [editedText])

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
      key={block.id}
    >
      <div className={styles.wrapper}>
        <div className={styles.textField}>
          <span className={styles.textField_description_text}>Текст урока:</span>
          <Paper elevation={3} style={{ padding: '40px', maxWidth: '100%', marginTop: '10px' }}>
            {isEditing ? (
              <>
                <MyEditor save={handleSaveChanges} setDescriptionLesson={setEditedText} editedText={editedText} setIsEditing={setIsEditing} />
              </>
            ) : (
              <>
                <div dangerouslySetInnerHTML={{ __html: editedText }}></div>
                <button className={styles.textField_btnEditText_setting} onClick={handleEditClick}>
                  Изменить
                </button>
              </>
            )}
          </Paper>
        </div>
        <div className={styles.wrapper_navBlock}>
          <span className={styles.wrapper_navBlock_grabBtn} onPointerDown={onPointerDown}>
            <IconSvg width={11} height={15} className='zIndex: 20' viewBoxSize="0 0 12 18" path={doBlockIconPath} />
          </span>
          <div className={styles.wrapper_navBlock_delete} onClick={handleDelete}>
            {isBlockDeleting ? <SimpleLoader /> : <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />}
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}
