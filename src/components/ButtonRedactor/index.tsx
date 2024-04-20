import { Dispatch, FC, SetStateAction, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { BlockT, IButton } from 'types/sectionT'
import styles from './buttonRedactor.module.scss'
import { BlockLinkButton } from 'components/BlockButtons/BlockLinkButton'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { useDeleteButtonMutation, useUpdateButtonsDataMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

interface IProps {
  button: IButton
  block: BlockT
  setLessonBlocks: Dispatch<SetStateAction<BlockT[]>>
  lessonBlocks: BlockT[]
}

export const ButtonRedactor: FC<IProps> = ({ button, block, lessonBlocks, setLessonBlocks }) => {
  const [buttonName, setButtonName] = useState<string>(button.name)
  const [buttonLink, setButtonLink] = useState<string>(button.link)
  const [colorPalette, setColorPalette] = useState<string>(button.color)
  const [removeButton, { isLoading: isDeleting }] = useDeleteButtonMutation()
  const [updateData, { isLoading: isUpdating }] = useUpdateButtonsDataMutation()
  const schoolName = window.location.href.split('/')[4]

  const deleteButtonFromBlock = async (id: number) => {
    const currentBlockButtons = lessonBlocks.find(object => object.id === block.id)
    if (currentBlockButtons && 'buttons' in currentBlockButtons && currentBlockButtons.buttons.length) {
      const updatedButtonsArray = currentBlockButtons.buttons.filter(item => item.id !== id)
      const updatedBlock = { ...currentBlockButtons, buttons: updatedButtonsArray }

      const updatedArray = lessonBlocks.map(item => (item.id === block.id ? updatedBlock : item))
      if (updatedArray) {
        setLessonBlocks(updatedArray)
      }
    }
  }

  const updateButtonInBlock = async (blockId: number, buttonId: number, updatedButtonData: any) => {
    const currentBlockButtons = lessonBlocks.find(object => object.id === blockId)
    if (currentBlockButtons && 'buttons' in currentBlockButtons && currentBlockButtons.buttons.length) {
      const updatedButtonsArray = currentBlockButtons.buttons.map(button => {
        if (button.id === buttonId) {
          return { ...button, ...updatedButtonData }
        }
        return button
      })

      const updatedBlock = { ...currentBlockButtons, buttons: updatedButtonsArray }

      const updatedArray = lessonBlocks.map(item => (item.id === blockId ? updatedBlock : item))
      if (updatedArray) {
        setLessonBlocks(updatedArray)
      }
    }
  }

  const updateButtonData = () => {
    if (button && buttonLink && buttonName) {
      updateData({
        data: {
          block: block.id,
          id: button.id,
          color: colorPalette,
          name: buttonName,
          link: buttonLink,
        },
        schoolName,
      })
        .unwrap()
        .then(data => updateButtonInBlock(block.id, button.id, { color: colorPalette, name: buttonName, link: buttonLink }))
    }
  }

  const deleteButton = async () => {
    if (button && button.id) {
      await removeButton({ id: button.id, schoolName })
        .unwrap()
        .then(data => deleteButtonFromBlock(button.id))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className={styles.text}>Превью вашей кнопки:</p>
        <BlockLinkButton color={colorPalette} button={button} link={buttonLink} text={buttonName} />
        <span />
      </div>
      <span style={{ border: '1px solid #ba75ff', height: '100%', width: '0.2px', opacity: '0.4' }} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', gap: '20px' }}>
        <p className={styles.text}>Цвет фона:</p>
        <HexColorPicker color={colorPalette} onChange={setColorPalette} />
        <span />
      </div>
      <span style={{ border: '1px solid #ba75ff', height: '100%', width: '0.2px', opacity: '0.4' }} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', gap: '10px' }}>
          <p className={styles.text}>Текст кнопки:</p>
          <Input
            value={buttonName}
            name=""
            onChange={e => {
              setButtonName(e.target.value)
            }}
            required
            type="text"
            placeholder="Введите текст"
            width={'100%'}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', gap: '10px' }}>
          <p className={styles.text}>Ссылка:</p>
          <Input
            value={buttonLink}
            onChange={e => {
              setButtonLink(e.target.value)
            }}
            name=""
            required
            type="text"
            placeholder="Вставьте ссылку"
            width={'100%'}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant={!buttonName || !buttonLink ? 'disabled' : 'primary'}
            disabled={!buttonName || !buttonLink}
            text={isUpdating ? <SimpleLoader style={{ height: '15px', width: '100%' }} /> : 'Сохранить'}
            onClick={updateButtonData}
          />
          <Button
            variant="delete"
            text={isDeleting ? <SimpleLoader style={{ height: '15px', width: '100%' }} /> : 'Удалить'}
            onClick={deleteButton}
          />
        </div>
      </div>
    </div>
  )
}
