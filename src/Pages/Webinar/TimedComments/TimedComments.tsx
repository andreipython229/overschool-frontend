import React, { useEffect, useState, useRef, useMemo } from 'react'
import { TimedComment } from './../types/comment'
import styles from './timedComments.module.scss'

interface TimedCommentsProps {
  currentTime: number
  predefinedComments: TimedComment[]
  userComments: TimedComment[]
}

export const TimedComments: React.FC<TimedCommentsProps> = ({ currentTime, predefinedComments, userComments }) => {
  const visibleComments = useMemo(() => {
    return [...predefinedComments, ...userComments].filter(comment => comment.time <= currentTime).sort((a, b) => a.time - b.time)
  }, [predefinedComments, userComments, currentTime])

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleComments.length])

  return (
    <div className={styles.timedComments} ref={containerRef}>
      {visibleComments.map(comment => (
        <div key={comment.id} className={styles.timedComments_comment}>
          <div className={styles.timedComments_comment_header}>
            <span className={styles.timedComments_comment_header_username}>{comment.username}</span>
            <span className={styles.timedComments_comment_header_role}>{comment.role}</span>
          </div>
          <div className={styles.timedComments_comment_text}>{comment.text}</div>
        </div>
      ))}
    </div>
  )
}
