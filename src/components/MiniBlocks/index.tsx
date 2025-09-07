import { FC, memo } from 'react'
import styles from './miniblocks.module.scss'
interface MiniBlockProps {
  title: string
  text: string
  image: string
}
export const MiniBlock: FC<MiniBlockProps> = memo(({ title, text, image }) => {
  return (
    <div className={styles.block}>
      <img src={image} alt={title} className={styles.block_image} />
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
})

export default MiniBlock
