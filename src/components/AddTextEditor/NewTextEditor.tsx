import React, { Dispatch, FC, SetStateAction, PointerEvent, useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import styles from './newTextEditor.module.scss'
import { MyEditor } from '../MyEditor/MyEditor'
import { BlockT, IBlockDesc } from 'types/sectionT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deletePath } from 'config/commonSvgIconsPath'
import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { Reorder, useDragControls } from 'framer-motion'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import { Button } from 'components/common/Button/Button'
import { DoBlockIconPath } from 'Pages/School/config/svgIconsPath'

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
          <Paper elevation={3} className={styles.textField_paper} sx={{ borderRadius: '20px', boxShadow: '0px 0px 8px 0px #3241954D' }}>
            {isEditing ? (
              <>
                <div className={styles.wrapper_navBlock}>
                  <span className={styles.wrapper_navBlock_grabBtn} onPointerDown={onPointerDown}>
                    <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={DoBlockIconPath} />
                  </span>
                  {isBlockDeleting ? (
                    <SimpleLoader />
                  ) : (
                    <Button variant={'cancel'} type="button" onClick={handleDelete} text={'Удалить'} className={styles.wrapper_navBlock_delete} />
                  )}
                </div>
                <span className={styles.textField_description_text}>Текст урока:</span>
                <MyEditor save={handleSaveChanges} setDescriptionLesson={setEditedText} editedText={editedText} setIsEditing={setIsEditing} />
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className={styles.textField_description_text}>Текст урока:</span>
                <div dangerouslySetInnerHTML={{ __html: editedText }}></div>
                <Button
                  variant={'newPrimary'}
                  type="button"
                  text={'Изменить'}
                  onClick={handleEditClick}
                  className={styles.textField_btnEditText_setting}
                />
              </div>
            )}
          </Paper>
        </div>
      </div>
    </Reorder.Item>
  )
}
