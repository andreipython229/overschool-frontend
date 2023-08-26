import React, {FC, useEffect, useState} from 'react';
import {Paper} from "@mui/material";
import styles from './newTextEditor.module.scss';
import {MyEditor} from "../MyEditor/MyEditor";

interface textEditorT {
    text: string
    setLessonDescription?: any
}

export const NewTextEditor: FC<textEditorT> = ({text, setLessonDescription}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        setLessonDescription && setLessonDescription(editedText)
    }, [editedText])

    return (
        <div className={styles.textField}>
            <span className={styles.textField_description_text}>Текст урока:</span>
            <Paper elevation={3} style={{padding: '40px', maxWidth: '100%', marginTop: '10px'}}>
                {isEditing ? (
                    <>
                        <MyEditor setDescriptionLesson={setEditedText} editedText={editedText}
                                  setIsEditing={setIsEditing}/>
                    </>
                ) : (
                    <>
                        <div dangerouslySetInnerHTML={{__html: editedText}}></div>
                        <button className={styles.textField_btnEditText_setting}
                                onClick={handleEditClick}>
                            Изменить
                        </button>
                    </>
                )}
            </Paper>
        </div>
    );
};
