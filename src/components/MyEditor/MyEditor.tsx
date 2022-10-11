import { memo, MouseEvent, useEffect, useState, useRef, FC } from 'react'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import { BLOCK_TYPES } from './config/blockTypes'
import { IEditor } from 'components/componentsTypes'

import 'draft-js/dist/Draft.css'
import styles from './editor.module.scss'

type MyEditorT = {
  setDescriptionLesson?: (arg: string) => void
}

export const MyEditor: FC<MyEditorT> = memo(({ setDescriptionLesson }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const [editorContent, setEditorContent] = useState<string>('')

  useEffect(() => {
    setEditorContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setDescriptionLesson && setDescriptionLesson(editorContent)
  }, [editorContent, editorState])

  const editor = useRef<Editor>(null)

  const StyleButton = (props: IEditor) => {
    const active = props?.isActive && props?.isActive(props.style as string)
    const onClickButton = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      props?.style && props?.onToggle(props?.style)
    }
    return (
      <button className={active ? styles.editor_panel_button_active : ''} onMouseDown={onClickButton}>
        {props?.label}
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

  const isActive = (style: string) => {
    const currentStyle = RichUtils.getCurrentBlockType(editorState)
    return currentStyle.includes(style)
  }

  // const handlePastedFiles = (e) => {
  //   const url = URL.createObjectURL(e.target.files[0])
  //   setEditorState(insertImage(url))
  // }

  // const insertImage = (url: string) => {
  //   const contentState = editorState.getCurrentContent()
  //   const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url })
  //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  //   const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
  //   return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '')
  // }

  return (
    <div className={styles.editor}>
      <div className={styles.editor_panel}>
        {BLOCK_TYPES.map(({ label, style }, index: number) => (
          <StyleButton key={index} style={style} label={label} isActive={() => isActive(style)} onToggle={onBlockClick} />
        ))}
      </div>
      <div className={styles.editor_table}>
        <Editor
          placeholder={'Введите сообщение...'}
          ref={editor}
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
      <div></div>
    </div>
  )
})
