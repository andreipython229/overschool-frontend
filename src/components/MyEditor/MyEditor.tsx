import React, { memo, useEffect, useState, FC } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

//import { useDebounce } from '../../customHooks/useDebounce'

import styles from './editor.module.scss'

// type MyEditorT = {
//   setDescriptionLesson?: (arg: string) => void
// }

export const MyEditor = memo(() => {
  //const debounced = useDebounce(), 1000)

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const [editorContent, setEditorContent] = useState<string>('')

  useEffect(() => {
    setEditorContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, [editorState])

  return (
    <div
      style={{
        padding: '2px',
        minHeight: '400px',
      }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={styles.wrapper_class}
        editorClassName={styles.editor_class}
        toolbarClassName={styles.toolbar_class}
      />
    </div>
  )
})
