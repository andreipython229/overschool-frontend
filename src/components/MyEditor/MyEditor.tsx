import React, { memo, MouseEvent, useEffect, useState, useRef, FC, ChangeEvent } from 'react'
import { ContentBlock, ContentState, convertFromHTML, convertToRaw, Editor, EditorState, Modifier, RichUtils } from 'draft-js'
import { BLOCK_TYPES, LIST_TYPES, DROPDOWN_STYLES, INLINE_STYLES, LINK, DIVIDER } from './config/blockTypes'
import { IEditor } from 'types/componentsTypes'
import { stateToHTML } from 'draft-js-export-html'
import 'draft-js/dist/Draft.css'
import styles from './editor.module.scss'
import { Button } from 'components/common/Button/Button'
import { Select, MenuItem } from '@mui/material'
import { decorator } from './Link/Link'
import { Input } from 'components/common/Input/Input/Input'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

type MyEditorT = {
  setDescriptionLesson?: (arg: string) => void
  editedText?: string
  setIsEditing?: any
  save?: (arg: string) => void
  setBannerDescription?: (arg: string) => void
  banner?: boolean
  html?: string
}

export const MyEditor: FC<MyEditorT> = memo(({ setDescriptionLesson, editedText, setIsEditing, save, banner, setBannerDescription, html }) => {
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false)
  const [urlValue, setUrlValue] = useState<string>('')
  const blocksFromHTML = convertFromHTML(urlValue || '')

  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  const [editorState, setEditorState] = useState(() =>
    html
      ? EditorState.createWithContent(state, decorator)
      : EditorState.createEmpty(decorator))

  const [editorContent, setEditorContent] = useState<string>('')
  const [selectedStyle, setSelectedStyle] = React.useState('left')

  useEffect(() => {
    if (editedText) {
      const contentState = ContentState.createFromText(editedText)
      const newEditorState = EditorState.push(editorState, contentState, 'insert-characters')
      setEditorState(newEditorState)
      console.log(editorState.getCurrentContent())
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
    if (editedText) {
      const blocksFromHTML = convertFromHTML(editedText)
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
      setEditorContent(editedText)
    }
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
      <button className={active ? `${styles.editor_panel_button} ${styles.editor_panel_button_active}` : styles.editor_panel_button} onMouseDown={onClickButton}>
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
    if (block.getType() === 'blockquote') { 
      return 'RichEditor-blockquote';
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

  const getTextAlignStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'left':
        return styles.align_left;
      case 'center':
        return styles.align_center;
      case 'right':
        return styles.align_right;
      default:
        return '';
    }
  }
    
  const onAddLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setShowUrlInput(true);
      setUrlValue(url);
    }
  };

  const confirmLink = () => {
    const currentContent = editorState.getCurrentContent();
    const createEntity = currentContent.createEntity("LINK", "MUTABLE", {
      url: urlValue,
    });
    const entityKey = currentContent.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const textWithEntity = Modifier.applyEntity(
      currentContent,
      selection,
      entityKey
    );
    const newState = EditorState.createWithContent(textWithEntity, decorator);

    setEditorState(newState);
    setShowUrlInput(false);
    setUrlValue('');
  }

  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editor_panel}>
        <div className={styles.editor_select}>
        <Select 
          value={selectedStyle}
          onChange={e => {
            handleEditorChange(RichUtils.toggleBlockType(editorState, String(e.target.value)))
            setSelectedStyle(String(e.target.value))
            setTimeout(() => {
              focus()
            }, 50)
          }}
            sx={{
              '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                height: '24px'
              },
              '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                paddingRight: '26px'
              },
          }}
        >
        {DROPDOWN_STYLES.map(({ label, style }, index: number) => (
          <MenuItem key={label + style + index} value={style}>{label}</MenuItem>
        ))}
        </Select>
        </div>
        {INLINE_STYLES.map(({ label, style }, index: number) => (
          <StyleButton key={label + style + index} style={style} label={label} isActive={() => isActive(style)} onToggle={onInlineClick} />
        ))}
        {LIST_TYPES.map(({ label, style }, index: number) => (
          <StyleButton key={index} style={style} label={label} isActive={() => isActive(style)} onToggle={onBlockClick} />
        ))}
        {LINK.map(({ label, style }) => (
          <StyleButton key={label + style} style={style} label={label} isActive={() => isActive(style)} onToggle={onAddLink} />
         ))}
        {BLOCK_TYPES.map(({ label, style }, index: number) => (
          <StyleButton key={index + style} style={style} label={label} isActive={() => isActive(style)} onToggle={onBlockClick} />
        ))}
        {DIVIDER.map(({ label, style }, index: number) => (
          <StyleButton key={index + style} style={style} label={label} isActive={() => isActive(style)} onToggle={onBlockClick} />
        ))}
      </div>
      <div className={styles.editor_table}>
        <Editor
          placeholder={'Введите текст...'}
          ref={editor}
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          onChange={handleEditorChange}
          blockStyleFn={getTextAlignStyle}
        />
      </div>
      {stateToHTML(editorState.getCurrentContent()) !== editedText && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant={'cancel'}
            type='button'
            onClick={handleCancelClick}
            text={'Отменить'}
            className={styles.textField_btn}
          />
          <Button
            variant={'newPrimary'}
            type='button'
            text={'Сохранить'}
            onClick={handleSaveClick}
            className={styles.textField_btn}
          />
        </div>
      )}
      {showUrlInput && ( 
        <div className={styles.url_container}>
          <div className={styles.url_container_input}>
            <Input
              onChange={onUrlChange}
              type="text"
              value={urlValue}
              name={'LINK'}
            />
          </div>
          <Button onMouseDown={confirmLink} text={''} variant='newPrimary' style={{padding: '4px'}}>
            <TrendingFlatIcon />
          </Button> 
        </div>
  )
  }
    </div>
  )
})
