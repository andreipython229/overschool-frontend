import React, { useState, FormEvent } from 'react';
import { TimedComment } from './../types/comment';
import styles from './userComments.module.scss';

interface UserCommentsProps {
  onAddComment: (text: string) => void;
}

export const UserComments: React.FC<UserCommentsProps> = ({
  onAddComment,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <input
        type="text"
        placeholder="Введите сообщение..."
        className={styles.commentForm_inputArea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};
