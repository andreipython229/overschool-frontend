import React, { memo, MouseEvent, useEffect, useState, useRef, FC } from 'react'
import { ContentState, convertFromHTML, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'
import { BLOCK_TYPES, INLINE_STYLES } from './config/blockTypes'
import { IEditor } from 'types/componentsTypes'
import { stateToHTML } from 'draft-js-export-html'
import 'draft-js/dist/Draft.css'
import styles from './editor.module.scss'

type MyEditorT = {
  setDescriptionLesson?: (arg: string) => void
  editedText?: string
  setIsEditing?: any
  save?: (arg: string) => void
}

export const MyEditor: FC<MyEditorT> = memo(({ setDescriptionLesson, editedText, setIsEditing, save }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [editorContent, setEditorContent] = useState<string>('')
  const [text, setText] = useState('')

  const handleChange = (value: React.SetStateAction<string>) => {
    setText(value)
  }

  useEffect(() => {
    if (editedText) {
      const contentState = ContentState.createFromText(editedText)
      const newEditorState = EditorState.push(editorState, contentState, 'insert-characters')
      setEditorState(newEditorState)
    }
  }, [editedText])

  useEffect(() => {
    if (editedText) {
      const blocksFromHTML = convertFromHTML(editedText)
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
      setEditorContent(editedText)
    }
  }, [editedText])

  const handleSaveClick = async () => {
    const contentState = editorState.getCurrentContent()
    const html = stateToHTML(contentState)
    await (setDescriptionLesson && setDescriptionLesson(html))
    save && (await save(html))
    setIsEditing && setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing && setIsEditing(false)
  }

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState)
    const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
    setEditorContent(content)
  }

  const editor = useRef<Editor>(null)

  const StyleButton = ({ isActive, style, onToggle, label }: IEditor) => {
    const active = isActive && isActive(style as string)

    const onClickButton = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      style && onToggle && onToggle(style)
    }

    return (
      <button className={active ? styles.editor_panel_button_active : ''} onMouseDown={onClickButton}>
        {label}
      </button>
    )
  }

  const Image = (props: any) => {
    return <img src={props?.src} className={styles.media} alt={'content'} />
  }

  const Media = (props: any) => {
    const entity = props?.contentState.getEntity(props?.block.getEntityAt(0))
    const { src } = entity.getData()
    const type = entity.getType()

    let media
    if (type === 'image') {
      media = <Image src={src} />
    }

    return media
  }

  function mediaBlockRenderer(block: any) {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      }
    }
    return null
  }

  const onBlockClick = (e: string) => {
    const nextState = RichUtils.toggleBlockType(editorState, e)
    setEditorState(nextState)
  }

  const onInlineClick = (e: string) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, e)
    setEditorState(nextState)
  }

  const isActive = (style: string) => {
    const currentStyle = RichUtils.getCurrentBlockType(editorState)
    return currentStyle.includes(style)
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editor_panel}>
        {BLOCK_TYPES.map(({ label, style }, index: number) => (
          <StyleButton key={index} style={style} label={label} isActive={() => isActive(style)} onToggle={onBlockClick} />
        ))}
        {INLINE_STYLES.map(({ label, style }, index: number) => (
          <StyleButton key={label + style} style={style} label={label} isActive={() => isActive(style)} onToggle={onInlineClick} />
        ))}
      </div>
      <div className={styles.editor_table}>
        <Editor
          placeholder={'Введите сообщение...'}
          ref={editor}
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          onChange={handleEditorChange}
        />
      </div>
      <div style={{ display: 'flex', margin: '1em' }}>
        <button className={styles.textField_btnSave} onClick={handleSaveClick}>
          Сохранить
        </button>
        <button className={styles.textField_btnCancel} onClick={handleCancelClick}>
          Отмена
        </button>
      </div>
    </div>
  )
})
