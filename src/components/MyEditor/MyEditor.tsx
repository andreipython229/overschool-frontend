import { memo, MouseEvent, useEffect, useState, useRef, FC } from 'react'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { BLOCK_TYPES, INLINE_STYLES } from './config/blockTypes'

import { IEditor } from 'components/componentsTypes'

import { useDebounce } from '../../customHooks/useDebounce'

import 'draft-js/dist/Draft.css'

import styles from './editor.module.scss'

type MyEditorT = {
  setDescriptionLesson?: (arg: string) => void
}

export const MyEditor: FC<MyEditorT> = memo(({ setDescriptionLesson }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const [editorContent, setEditorContent] = useState<string>('')

  const debounced = useDebounce(editorContent, 500)

  useEffect(() => {
    setEditorContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setDescriptionLesson && setDescriptionLesson(debounced.toString())
  }, [editorContent, debounced])

  const editor = useRef<Editor>(null)

  const StyleButton = (props: IEditor) => {
    const onClickButton = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      props?.style && props?.onToggle(props?.style)
    }
    return <button onMouseDown={onClickButton}>{props?.label}</button>
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

  const BlockStyleControls = (props: IEditor) => {
    return (
      <div>
        {BLOCK_TYPES.map(type => (
          <StyleButton key={type.style} label={type?.label} onToggle={props.onToggle} style={type?.style} />
        ))}
      </div>
    )
  }

  const InlineStyleControls = (props: any) => {
    return (
      <div>
        {INLINE_STYLES.map(type => (
          <StyleButton key={type.label} label={type.label} onToggle={props.onToggle} style={type.style} />
        ))}
      </div>
    )
  }

  const onInlineClick = (e: string) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, e)
    setEditorState(nextState)
  }

  const onBlockClick = (e: string) => {
    const nextState = RichUtils.toggleBlockType(editorState, e)
    setEditorState(nextState)
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editor_panel}>
        <BlockStyleControls onToggle={onBlockClick} />
        <InlineStyleControls onToggle={onInlineClick} />
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
    </div>
  )
})
