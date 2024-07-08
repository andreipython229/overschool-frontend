import React, { useState, useEffect, useRef } from 'react';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { Button } from 'components/common/Button/Button';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { useCreateNewsletterTemplateMutation } from 'api/schoolService';
import styles from './addTemplate.module.scss';
import { Checkbox } from 'components/common/Checkbox/Checkbox';

interface AddTemplateProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddTemplate: React.FC<AddTemplateProps> = ({ isOpen, onClose }) => {
    const schoolName = window.location.href.split('/')[4]

    const [templateName, setTemplateName] = useState('');
    const [templateText, setTemplateText] = useState('');
    const [delayDays, setDelayDays] = useState('');
    const [sendNewsletter, setSendNewsletter] = useState(false);
    const [error, setError] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [ createNewsletterTemplateMutation ] = useCreateNewsletterTemplateMutation();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (error) {
            timer = setTimeout(() => {
                setError('');
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [error]);

    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleTemplateTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTemplateText(e.target.value);
        autoResizeTextarea();
    };

    const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemplateName(e.target.value);
    };

    const handleDelayDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDelayDays(e.target.value);
    };

    const handleSendNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendNewsletter(e.target.checked);
    };

    const handleGenerateTemplate = async () => {
        if (!templateName.trim() || !templateText.trim() || !delayDays.trim()) {
            setError('Please fill in all fields');
            return;
        }

        const delayDaysNumber = parseInt(delayDays, 10);
        if (isNaN(delayDaysNumber) || delayDaysNumber <= 0) {
            setError('Please enter a valid number of days');
            return;
        }

        try {
            await createNewsletterTemplateMutation({
                schoolName: schoolName,
                template_name: templateName,
                text: templateText,
                delay_days: delayDaysNumber,
                is_public: sendNewsletter,
            });
            onClose();
        } catch (error) {
            console.error('Error saving template:', error);
            setError('Error saving template');
        }
    };

    const handleCloseButtonClick = () => {
        onClose();
    };

    return (
        <div className={styles['modal-wrapper']} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={styles['modal-content']}>
                <button className={styles.closeButton} onClick={handleCloseButtonClick}>
                    <IconSvg width={15} height={15} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
                </button>
                <h2 style={{ marginBlockStart: '15px' }}>Добавление шаблона для рассылки</h2>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles['label-container']}>
                    <label htmlFor="templateName">Название шаблона:</label>
                </div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        id="templateName"
                        value={templateName}
                        onChange={handleTemplateNameChange}
                    />
                </div>
                <div className={styles['label-container']}>
                    <label htmlFor="templateText">Текст шаблона:</label>
                </div>
                <div className={styles['input-container']}>
                    <textarea
                        id="templateText"
                        ref={textareaRef}
                        value={templateText}
                        onChange={handleTemplateTextChange}
                        className={styles.fullWidthTextarea}
                        style={{ overflow: 'hidden', resize: 'none' }}
                    />
                </div>
                <div className={styles['label-container']}>
                    <label htmlFor="delayDays">Укажите, через сколько дней после регистрации будет рассылка:</label>
                </div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        id="delayDays"
                        value={delayDays}
                        onChange={handleDelayDaysChange}
                    />
                </div>
                <div className={styles['checkbox-container']}>
                    Рассылать шаблон &nbsp;
                    <Checkbox
                        name={'isPublic'}
                        checked={sendNewsletter}
                        onChange={handleSendNewsletterChange}
                        className={styles['custom-checkbox']}
                    />
                </div>
                <div>
                    <Button className={styles.btn} text={'Создать шаблон'} onClick={handleGenerateTemplate} />
                </div>
            </div>
        </div>
    );
};

export default AddTemplate;