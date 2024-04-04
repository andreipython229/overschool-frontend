import React, { useState, useRef, useEffect } from 'react'
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'
// import './styles.css' // assuming you have a stylesheet

addStyles()

type MathEditorT = {
  edit: boolean
  content: string
}

export const MathEditor: React.FC<MathEditorT> = ({ edit, content }) => {
  const [latex, setLatex] = useState('')

  return (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div>
        <p>Поле ввода:</p>
        <EditableMathField
          latex={latex}
          onChange={mathField => {
            setLatex(mathField.latex())
          }}
        />
      </div>

      <div>
        <p>Как отрисовываю юзеру:</p>
        <StaticMathField>{latex}</StaticMathField>
      </div>
    </div>
  )
}
