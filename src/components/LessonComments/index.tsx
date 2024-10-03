import { ChangeEvent, FC, FormEvent } from 'react'
import styles from './lessonComments.module.scss'
import { CommentList, Comment } from 'types/comments'
import { Button } from 'components/common/Button/Button'
import userImage from './image.png'

interface ICommentBlock {
  commentsList: CommentList | undefined
  handleSubmitNewComment: (e: FormEvent<HTMLFormElement>) => void
  handleNewCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  newCommentContent: string
}

export const LessonComments: FC<ICommentBlock> = ({ commentsList, handleNewCommentChange, handleSubmitNewComment, newCommentContent }) => {
  return (
    <div className={styles.commentContainer}>
      <h3>Комментарии к уроку</h3>
      <form onSubmit={handleSubmitNewComment} className={styles.commentForm}>
        <textarea value={newCommentContent} onChange={handleNewCommentChange} placeholder="Введите ваш комментарий..." />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <span></span>
          <Button variant="newPrimary" text="Отправить" type="submit" />
        </div>
      </form>
      {commentsList && Array.isArray(commentsList?.comments) && commentsList.comments.length > 0 ? (
        commentsList.comments.map((comment: Comment) => (
          <div style={{ width: '100%' }} key={comment.id}>
            <div className={styles.commentBox}>
              {/* <p>
              <b>
                {comment.author_first_name} {comment.author_last_name}
              </b>
            </p>
            <p>Опубликован: {new Date(comment.created_at).toLocaleString()}</p>
            <p>Комментарий: {comment.content}</p> */}
              <div className={styles.commentBox_commentCloud} />
              <div className={styles.commentBox_commentText}>{comment.content}</div>
              <div className={styles.commentBox_avatar} style={{ backgroundImage: `url(${userImage})` }} />
              <div className={styles.commentBox_username}>
                {comment.author_first_name} {comment.author_last_name}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ marginBlockStart: '10px' }}>
          <b>Комментариев пока нет</b>
        </p>
      )}
    </div>
  )
}
