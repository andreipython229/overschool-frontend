import { FC } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styles from './previewCodeBlock.module.scss'
import { IBlockCode } from 'types/sectionT'

type CodeBlockT = {
  block: IBlockCode
}

export const PreviewCodeBlock: FC<CodeBlockT> = ({ block }) => {
  return (
    <div className={styles.lesson__codeWraper} key={block.id}>
      <pre className={styles.lesson__code_text}>
        <SyntaxHighlighter language={block.language ? block.language : 'javascript'} wrapLongLines showLineNumbers style={darcula} className={styles.block_code}>
          {block.code}
        </SyntaxHighlighter>
      </pre>
    </div>
  )
}
