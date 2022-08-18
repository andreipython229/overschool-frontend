import React, { memo, MouseEvent, useEffect, useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { editorSvgLabel } from '../../constants/iconSvgConstants'
import 'draft-js/dist/Draft.css'

import styles from './editor.module.scss'
// import { useDebounce } from '../../customHooks/useDebounce'

export const MyEditor = memo(() => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  // const debounced = useDebounce(editorState.getCurrentContent().getPlainText('\u0001'), 1000)

  // console.log(debounced)

  const editor = React.useRef<Editor>(null)

  function focusEditor() {
    editor.current && editor?.current?.focus()
  }

  useEffect(() => {
    focusEditor()
  }, [])

  const StyleButton = (props: any) => {
    const onClickButton = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      props.onToggle(props.style)
    }
    return <button onMouseDown={onClickButton}>{props.label}</button>
  }

  const BLOCK_TYPES = [
    {
      label: (
        <IconSvg
          width={13}
          height={12}
          fill="#03053D"
          d={editorSvgLabel.labelHeaderOne}
          viewBoxSize="0 0 13 12"
        />
      ),
      style: 'header-one',
    },
    {
      label: (
        <IconSvg
          width={14}
          height={12}
          fill="#03053D"
          d={editorSvgLabel.labelHeaderTwo}
          viewBoxSize="0 0 14 12"
        />
      ),
      style: 'header-two',
    },
    {
      label: (
        <IconSvg
          width={14}
          height={12}
          fill="#03053D"
          d={editorSvgLabel.labelHeaderThree}
          viewBoxSize="0 0 14 12"
        />
      ),
      style: 'header-three',
    },
    {
      label: (
        <IconSvg
          width={12}
          height={10}
          fill="#03053D"
          d={editorSvgLabel.labelBlockquote}
          viewBoxSize="0 0 12 10"
        />
      ),
      style: 'blockquote',
    },
    {
      label: (
        <IconSvg
          width={12}
          height={12}
          fill="#03053D"
          d={editorSvgLabel.labelUnorderedListItem}
          viewBoxSize="0 0 12 12"
        />
      ),
      style: 'unordered-list-item',
    },
    {
      label: (
        <IconSvg
          width={12}
          height={12}
          fill="#03053D"
          d={editorSvgLabel.labelOrderedListItem}
          viewBoxSize="0 0 12 12"
        />
      ),
      style: 'ordered-list-item',
    },
    {
      label: (
        <IconSvg
          width={16}
          height={12}
          fill="#03053D"
          d={editorSvgLabel.labelCodeBlock}
          viewBoxSize="0 0 16 12"
        />
      ),
      style: 'code-block',
    },
    {
      label: (
        <IconSvg
          width={17}
          height={17}
          fill="#03053D"
          d={editorSvgLabel.labelImage}
          viewBoxSize="0 0 17 17"
        />
      ),
      style: 'IMAGE',
    },
  ]

  const Image = (props: any) => {
    return <img src={props.src} className={styles.media} alt={'content'} />
  }

  const Media = (props: any) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0))
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

  const BlockStyleControls = (props: any) => {
    return (
      <div>
        {BLOCK_TYPES.map(type => (
          <StyleButton
            key={type.style}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    )
  }

  // const INLINE_STYLES = [
  //     {label: "Bold", style: "BOLD"},
  //     {label: "Italic", style: "ITALIC"},
  //     {label: "Underline", style: "UNDERLINE"},
  //     {label: "Monospace", style: "CODE"}
  // ];

  // const InlineStyleControls = (props: any) => {
  //     return (
  //         <div>
  //             {INLINE_STYLES.map((type) => (
  //                 <StyleButton
  //                     key={type.label}
  //                     label={type.label}
  //                     onToggle={props.onToggle}
  //                     style={type.style}
  //                 />
  //             ))}
  //         </div>
  //     );
  // };

  // const onInlineClick = (e: string) => {
  //   const nextState = RichUtils.toggleInlineStyle(editorState, e)
  //   setEditorState(nextState)
  // }

  const onBlockClick = (e: string) => {
    const nextState = RichUtils.toggleBlockType(editorState, e)
    setEditorState(nextState)
  }
  return (
    <div className={styles.editor} onClick={focusEditor}>
      <div className={styles.editor_panel}>
        <BlockStyleControls onToggle={onBlockClick} />
        {/* <InlineStyleControls onToggle={onInlineClick}/>*/}
      </div>
      <div className={styles.editor_table}>
        <Editor
          placeholder={'Введите текст'}
          ref={editor}
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
        />
      </div>
    </div>
  )
})
