import React, {FC, useState} from 'react';
import { Paper } from "@mui/material";
import styles from './newTextEditor.module.scss';
import { MyEditor } from "../MyEditor/MyEditor";

interface textEditorT {
    text: string
}

export const NewTextEditor: FC<textEditorT> = ({text}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // дополнительные действия после сохранения
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedText(text);
    };

    return (
        <div className={styles.textField}>
            <span className={styles.textField_description_text}>Текст урока:</span>
            <Paper elevation={3} style={{padding: '40px', maxWidth: '100%', marginTop: '10px'}}>
                {isEditing ? (
                    <>
                        {/*<textarea className={styles.textField_textarea} value={editedText}*/}
                        {/*          onChange={handleInputChange}/>*/}
                        <MyEditor setDescriptionLesson={setEditedText} text={editedText}/>
                        <button className={styles.textField_btnSave} onClick={handleSaveClick}>
                            Сохранить
                        </button>
                        <button className={styles.textField_btnCancel} onClick={handleCancelClick}>
                            Отмена
                        </button>
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
