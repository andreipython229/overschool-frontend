import { FC } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula'
import styles from './code.module.scss'

interface IRenderer {
  inputText: string
}

export const CodeRenderer: FC<IRenderer> = ({ inputText }) => {
  const renderTextWithCode = () => {
    const parts = inputText.split(/```(.*?)```/s)

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <SyntaxHighlighter key={index} style={dracula} language={part.trim().split('\n')[0]} wrapLines className={styles.code}>
            {part.trim()}
          </SyntaxHighlighter>
        )
      }
      return <p key={index}>{part}</p>
    })
  }

  return <div>{renderTextWithCode()}</div>
}
