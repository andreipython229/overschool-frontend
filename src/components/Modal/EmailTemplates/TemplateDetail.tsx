import React, { useState, useEffect, useRef } from 'react';
import styles from './templateDetail.module.scss';
import { Button } from 'components/common/Button/Button';
import { Template } from 'Pages/Settings/EmailNewsLetter';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { useDeleteNewsletterTemplateMutation, useUpdateNewsletterTemplateMutation } from 'api/schoolService';

interface TemplateDetailProps {
    isOpen: boolean;
    onClose: () => void;
    template: Template | null;
}

const TemplateDetail: React.FC<TemplateDetailProps> = ({ isOpen, onClose, template }) => {
    const schoolName = window.location.href.split('/')[4]
    const [deleteNewsletterTemplate] = useDeleteNewsletterTemplateMutation();
    const [updateNewsletterTemplate] = useUpdateNewsletterTemplateMutation();
    const [editedTemplate, setEditedTemplate] = useState<Template | null>(template);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setEditedTemplate(template);
    }, [template]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [editedTemplate?.text]);

    const handleInputChange = (field: string, value: string | number | boolean) => {
        if (editedTemplate) {
            setEditedTemplate((prevTemplate) => ({
                ...(prevTemplate as Template),
                [field]: value,
            }));
        }
    };

    const handleSaveButtonClick = async () => {
        if (editedTemplate && template) {
            try {
                await updateNewsletterTemplate({
                    schoolName: schoolName,
                    id: template.id,
                    is_public: editedTemplate.is_public,
                    template_name: editedTemplate.template_name,
                    text: editedTemplate.text,
                    delay_days: editedTemplate.delay_days
                }).unwrap();
                onClose();
            } catch (error) {
                console.error('Failed to update the template:', error);
            }
        }
    };

    const handleDeleteButtonClick = async () => {
        if (template) {
            try {
                await deleteNewsletterTemplate({ schoolName: schoolName, id: template.id }).unwrap();
                onClose();
            } catch (error) {
                console.error('Failed to delete the template:', error);
            }
        }
    };

    if (!template) return null;

    return (
        <div className={styles['modal-wrapper']} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={styles['modal-content']}>
                <button className={styles.closeButton} onClick={onClose}>
                    <IconSvg width={15} height={15} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
                </button>
                <h2>Детали шаблона</h2>
                <div className={styles.detailItem}>
                    <strong>Название шаблона:</strong><br />
                    <input
                        type="text"
                        style={{ borderRadius: '8px', borderColor: '#ccc' }}
                        value={editedTemplate?.template_name || ''}
                        onChange={(e) => handleInputChange('template_name', e.target.value)}
                    />
                </div>
                <div className={styles.detailItem}>
                    <strong>Текст шаблона:</strong><br />
                    <textarea
                        ref={textAreaRef}
                        rows={2}
                        cols={30}
                        className={styles.roundedTextarea}
                        value={editedTemplate?.text || ''}
                        onChange={(e) => handleInputChange('text', e.target.value)}
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className={styles.detailItem}>
                    <strong>Рассылка через:</strong>
                    <input
                        type="number"
                        style={{ borderRadius: '8px', borderColor: '#ccc', marginLeft: '10px', width: '70px' }}
                        value={editedTemplate?.delay_days || ''}
                        onChange={(e) => handleInputChange('delay_days', Number(e.target.value))}
                    />
                    &nbsp;дней
                </div>
                <div className={styles.detailItem}>
                    <strong>Рассылать шаблон:</strong>
                    <select
                        value={editedTemplate?.is_public ? 'true' : 'false'}
                        className={styles.select}
                        onChange={(e) => handleInputChange('is_public', e.target.value === 'true')}
                    >
                        <option value="true">Да</option>
                        <option value="false">Нет</option>
                    </select>
                </div>
                <div className={styles.detailItem}>
                    <strong>Дата создания:</strong><br />
                    <div style={{ color: 'black' }}>{new Date(template.template_created_at).toLocaleString()}</div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button className={styles.btn} text={'Сохранить изменения'} onClick={handleSaveButtonClick} /> 
                    <Button className={styles.btn} text={'Удалить шаблон'} onClick={handleDeleteButtonClick} />
                </div>
            </div>
        </div>
    );
};

export default TemplateDetail;