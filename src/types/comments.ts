export interface Comment {
    id: number;
    author: number;
    author_first_name: string;
    author_last_name: string;
    content: string;
    created_at: Date;
    lesson: number;
    public: boolean;
  }

export interface CommentList {
    comments: Comment[];
  }