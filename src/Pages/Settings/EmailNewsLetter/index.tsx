import { memo, useState, useEffect } from 'react';
import { Button } from 'components/common/Button/Button';
import { useFetchNewsletterTemplatesQuery, useLazyFetchNewsletterTemplatesQuery } from "../../../api/schoolService";
import AddTemplate from 'components/Modal/EmailTemplates/AddTemplate';
import styles from './emailNewsLetter.module.scss';
import TemplateDetail from 'components/Modal/EmailTemplates/TemplateDetail';

export interface Template {
    id: number;
    template_name: string;
    text: string;
    delay_days: number;
    is_public: boolean;
    template_created_at: string;
}

export const EmailNewsLetter = memo(() => {
    const schoolName = window.location.href.split('/')[4]
    const [isModalLinkOpen, setIsModalLinkOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const { data: templates, error: fetchError } = useFetchNewsletterTemplatesQuery({ schoolName: schoolName });
    const [fetchNewsletterTemplates, newsletterTemplates] = useLazyFetchNewsletterTemplatesQuery();

    const openDetailModal = (template: Template) => {
        setSelectedTemplate(template);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = async () => {
        setIsDetailModalOpen(false);
        setSelectedTemplate(null);
        await fetchNewsletterTemplates({ schoolName: schoolName });
    };

    const toggleModalLink = async () => {
        setIsModalLinkOpen(prevState => !prevState);
        await fetchNewsletterTemplates({ schoolName: schoolName });
    };

    return (
        <div className={styles.wrapper_actions}>
            <div style={{color: 'slategrey', fontSize: '20px', marginBlockEnd: '20px'}}>
                Настройка рассылки на аккаунты владельцев школ
                <Button className={styles.generateLinkButton} onClick={toggleModalLink} text="Добавить шаблон для рассылки" />
            </div>
            <div>
                <table className={styles.paymentTable}>
                    <thead>
                        <tr>
                            <th style={{color: 'slategrey'}}>Название шаблона</th>
                            <th style={{color: 'slategrey'}}>Рассылка через</th>
                            <th style={{color: 'slategrey'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates?.map((template, index) => (
                            <tr key={template.id}>
                                <td>{template.template_name}</td>
                                <td>{template.delay_days} дней</td>
                                <td style={{textAlign: "right"}}>
                                    <Button
                                        className={styles.detailButton}
                                        onClick={() => openDetailModal(template as Template)}
                                        text="Подробнее"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {fetchError && <p className={styles.error}>Ошибка при получении шаблонов</p>}
            </div>
            <AddTemplate isOpen={isModalLinkOpen} onClose={toggleModalLink} />
            <TemplateDetail isOpen={isDetailModalOpen} onClose={closeDetailModal} template={selectedTemplate} />
        </div>
    );
});