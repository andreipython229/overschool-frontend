import { Dispatch, FC, PointerEvent, SetStateAction, useEffect, useState } from 'react'
import { BlockT, IButton } from 'types/sectionT'
import styles from './blockButtons.module.scss'
import { Reorder, useDragControls } from 'framer-motion'
import { Paper } from '@mui/material'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useCreateButtonsMutation, useDeleteBlockMutation } from 'api/blocksService'
import { deletePath } from 'config/commonSvgIconsPath'
import { AddBox } from '@mui/icons-material'
import { ButtonRedactor } from 'components/ButtonRedactor'

export interface IBlockButtonsProps {
  block: BlockT
  setLessonBlocks: Dispatch<SetStateAction<BlockT[]>>
  lessonBlocks: BlockT[]
}

export const BlockButtons: FC<IBlockButtonsProps> = ({ block, lessonBlocks, setLessonBlocks }) => {
  const [deleteBlock, { isLoading: isBlockDeleting }] = useDeleteBlockMutation()
  const [createButton, { isLoading: isButtonCreating }] = useCreateButtonsMutation()
  const [blockData, setBlockData] = useState<IButton[]>()
  const controls = useDragControls()
  const schoolName = window.location.href.split('/')[4]

  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
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

  const addButtonToBlock = async (blockId: number, newButtonData: any) => {
    const currentBlockButtons = lessonBlocks.find(object => object.id === blockId)
    if (currentBlockButtons && 'buttons' in currentBlockButtons) {
      const updatedButtonsArray = currentBlockButtons.buttons.slice()
      updatedButtonsArray.push(newButtonData)

      const updatedBlock = { ...currentBlockButtons, buttons: updatedButtonsArray }

      const updatedArray = lessonBlocks.map(item => (item.id === blockId ? updatedBlock : item))
      if (updatedArray) {
        setLessonBlocks(updatedArray)
      }
    }
  }

  useEffect(() => {
    if (lessonBlocks) {
      const currentBlock = findButtonById(lessonBlocks, block.id)
      if (currentBlock && 'buttons' in currentBlock && currentBlock.buttons) {
        setBlockData(currentBlock.buttons)
      }
    }
  }, [lessonBlocks, setLessonBlocks])

  const handleCreateButton = () => {
    createButton({ data: { block: block.id, name: 'Новая кнопка', color: '#ba75ff', link: 'https://overschool.by' }, schoolName })
      .unwrap()
      .then(data => addButtonToBlock(block.id, data))
  }

  function findButtonById<T extends { id: number }>(array: T[], id: number): T | undefined {
    return array.find(obj => obj.id === id)
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
        <div className={styles.wrapper_redactorField}>
          <Paper elevation={3} className={styles.wrapper_redactorField_paper} sx={{ borderRadius: '8px' }}>
            <span className={styles.wrapper_redactorField_paper_title}>Блок ссылок:</span>
            {blockData?.map((button, index) => (
              <ButtonRedactor key={index} button={button} block={block} lessonBlocks={lessonBlocks} setLessonBlocks={setLessonBlocks} />
            ))}
            {(!blockData || blockData?.length < 4) && (
              <div className={styles.createButton} style={{}} onClick={handleCreateButton}>
                {isButtonCreating ? <SimpleLoader style={{ height: '15px', width: '15px' }} /> : <AddBox sx={{ color: '#BA75FF' }} />}
                <p>добавить новую кнопку</p>
              </div>
            )}
          </Paper>
        </div>
        <div className={styles.wrapper_navBlock}>
          <span className={styles.wrapper_navBlock_grabBtn} onPointerDown={onPointerDown}>
            <IconSvg width={11} height={15} className="zIndex: 20" viewBoxSize="0 0 12 18" path={doBlockIconPath} />
          </span>
          <div className={styles.wrapper_navBlock_delete} onClick={handleDelete}>
            {isBlockDeleting ? <SimpleLoader /> : <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />}
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}
