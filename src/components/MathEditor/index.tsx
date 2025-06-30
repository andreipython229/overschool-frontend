import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import { Reorder, useDragControls } from 'framer-motion'
import React, { useState, Dispatch, SetStateAction, PointerEvent } from 'react'
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'
import { BlockT, IBlockMath } from 'types/sectionT'
import styles from './mathEditor.module.scss'
import { SimpleLoader } from '@/components/Loaders/SimpleLoader'
import { IconSvg } from '@/components/common/IconSvg/IconSvg'
import { Button } from '@/components/common/Button/Button'
import { Popover, Typography } from '@mui/material'
import { DoBlockIconPath } from '@/Pages/School/config/svgIconsPath'

addStyles()

type MathEditorT = {
  edit: boolean
  latex: string
  block: BlockT
  setLessonBlocks?: Dispatch<SetStateAction<BlockT[]>>
  lessonBlocks?: BlockT[]
}

export const MathEditor: React.FC<MathEditorT> = ({ edit, lessonBlocks, setLessonBlocks, block, latex }) => {
  const [latexStr, setLatexStr] = useState(latex)
  const controls = useDragControls()
  const [deleteBlock, { isLoading: isBlockDeleting }] = useDeleteBlockMutation()
  const [saveChanges, { isLoading }] = useUpdateBlockDataMutation()
  const schoolName = window.location.href.split('/')[4]
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleHelp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleSaveChanges = () => {
    if (block.type === 'formula') {
      const updatedBlockData: IBlockMath = {
        id: block.id,
        type: block.type,
        order: block.order,
        formula: latexStr,
      }
      saveChanges({ data: updatedBlockData, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks?.map(item => {
            if (item.id === block.id) {
              return updatedBlockData
            }
            return item
          })
          if (updatedArray && setLessonBlocks) {
            setLessonBlocks(updatedArray)
          }
        })
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
  }

  const deleteLessonBlocks = async (id: number) => {
    if (lessonBlocks && setLessonBlocks) {
      const updatedArray = lessonBlocks.filter(item => item.id !== id)
      setLessonBlocks(updatedArray)
    }
  }

  const handleDelete = () => {
    deleteBlock({ id: block.id, schoolName })
      .unwrap()
      .then((data: any) => {
        deleteLessonBlocks(block.id)
      })
  }

  return edit ? (
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
      <div className={styles.inputWrapper}>
        <div className={styles.wrapper_navBlock}>
          <span className={styles.wrapper_navBlock_grabBtn} onPointerDown={onPointerDown}>
            <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={DoBlockIconPath} />
          </span>
          <Button
            variant="cancel"
            className={styles.wrapper_navBlock_delete}
            text={isLoading ? <SimpleLoader /> : 'Удалить'}
            onClick={handleDelete}
          />
        </div>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            fontFamily: '"SFPRORegular", sans-serif',
          }}
        >
          Математическая формула:
        </p>

        <EditableMathField
          className={`mq-math-mode ${styles.inputWrapper_mathBlock}`}
          latex={latexStr}
          onChange={mathField => {
            setLatexStr(mathField.latex())
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between' }}>
          <Button
            style={{ padding: '10px 30px', fontSize: '16px', fontWeight: 500, zIndex: '100' }}
            onClick={handleSaveChanges}
            variant={'newPrimary'}
            text={isLoading ? <SimpleLoader style={{ height: '19px', maxWidth: '100px' }} loaderColor="white" /> : 'Сохранить'}
          />
          <Button
            variant="cancel"
            style={{ fontSize: '16px', fontWeight: 500, padding: '10px 30px' }}
            text={'Помощь в написании формул'}
            aria-describedby={id}
            onClick={handleHelp}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <p>{`Ввод формул осуществляется с клавиатуры:`}</p>
              <p>{`/ : деление; \n`}</p>
              <p>{`* : умножение; \n`}</p>
              <p>{`+ или - : сложение и вычитание; \n`}</p>
              <p>{`^ : возведение в степень; \n`}</p>
              <p>{`Для ввода квадратного корня, необходимо ввести \\sqrt; `}</p>
              <p>{`Несколько формул в один блок поместить нельзя, 1 блок - 1 формула;`}</p>
              <p>
                {`В случае возникновения вопросов по написанию формул, просьба связаться с нами по `}
                <a style={{ fontWeight: 'bold' }} href="https://t.me/over_school" rel="noreferrer" target="_blank">
                  ссылке
                </a>
              </p>
            </Typography>
          </Popover>
        </div>
      </div>
    </Reorder.Item>
  ) : (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
      <StaticMathField>{latex}</StaticMathField>
    </div>
  )
}
