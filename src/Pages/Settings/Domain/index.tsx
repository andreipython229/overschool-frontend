import {ChangeEvent, FC, useEffect, useState} from 'react'
import {Button} from 'components/common/Button/Button'
import {Input} from 'components/common/Input/Input/Input'
import {Snackbar, Alert} from '@mui/material';
import styles from '../superAdmin.module.scss'
import {useCreateDomainMutation, useFetchDomainQuery, useUpdateDomainMutation} from "../../../api/DomainService";
import {Domain} from "../../../types/domainT";


export const DomainSettings: FC = () => {
    const schoolId = localStorage.getItem('school_id');
    const schoolName = window.location.href.split('/')[4];

    const [createDomain, {isLoading: domainIsLoading, error: domainError}] = useCreateDomainMutation();
    const [updateDomain, {isLoading: domainUpdateIsLoading, error: domainUpdateError}] = useUpdateDomainMutation();
    const {
        data: domains,
        isSuccess: domainSuccess,
        isLoading: domainLoading
    } = useFetchDomainQuery({schoolName: schoolName});

    const [domain, setDomain] = useState<string>('');
    const [isNewDomain, setIsNewDomain] = useState<boolean>(false);
    const [oldDomain, setOldDomain] = useState<string>('');
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [notificationSeverity, setNotificationSeverity] = useState<'success' | 'error'>('success');

    const handleChangeDomain = (event: ChangeEvent<HTMLInputElement>) => {
        setDomain(event.currentTarget.value);
        setIsNewDomain(true);
    };

    useEffect(() => {
        setIsNewDomain(domain !== oldDomain);
    }, [domain]);

    const onChangeDomain = async () => {
        try {
            if (domains && domains.length > 0) {
                // Если домен существует, обновляем его
                const existingDomain = domains[0] as Domain;
                await updateDomain({id: existingDomain.id, data: {domain_name: domain}, schoolName}).unwrap();
            } else {
                // Если домена нет, создаем новый
                await createDomain({data: {domain_name: domain}, schoolName}).unwrap();
            }
            setIsNewDomain(false);
            setNotificationMessage('Домен успешно обновлен!');
            setNotificationSeverity('success');
        } catch (error) {
            setNotificationMessage('Ошибка при обновлении домена.');
            setNotificationSeverity('error');
            console.error("Error updating/creating domain:", error);
        } finally {
            setShowNotification(true);
        }
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };


    return (
        <div className={styles.wrapper_actions}>
            <div className={styles.main}>
                <div className={styles.main_title}>Настройки пользовательского домена</div>
                <div className={styles.instructions}>
                    <div className={styles.instructionsTitle}>Что такое домен и зачем он нужен?</div>
                    <p className={styles.instructionsText}>
                        Доменное имя — это адрес, по которому пользователи могут получить доступ к вашему сайту.
                        Например,
                        www.myschool.com. Использование пользовательского домена делает ваш сайт уникальным и
                        легким для запоминания.
                    </p>
                    <div className={styles.instructionsTitle}>Как подключить свой домен?</div>
                    <ol className={styles.instructionsList}>
                        <li>Приобретите доменное имя у любого регистратора доменов (например, hoster.by, GoDaddy,
                            REG.RU, RU-CENTER, 2domains).
                        </li>
                        <li>
                            Добавьте A-запись в настройках DNS у вашего регистратора. A-запись должна указывать на
                            IP-адрес нашего сервера:
                            45.135.234.9
                        </li>
                        <li>Введите приобретенное доменное имя в поле ниже и нажмите кнопку &quot;Сохранить&quot;.</li>
                    </ol>
                </div>
                <div
                    className={styles.main_description}
                    style={{
                        color: 'red',
                        padding: '0px',
                        lineHeight: '1.5',
                        opacity: '0.6',
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }}
                >
                    Введите пользовательский домен для вашей платформы. Он будет использоваться в URL-адресах, по
                    которым пользователи будут получать доступ к вашей платформе.

                </div>
                <div className={styles.text}>
                    <Input name={'domain'} type={'text'} className={styles.main_input} value={domain}
                           onChange={handleChangeDomain}/>
                    <Button
                        onClick={onChangeDomain}
                        style={{width: '120px'}}
                        variant={isNewDomain ? 'primary' : 'disabled'}
                        text={'Сохранить'}
                        disabled={!isNewDomain}
                    />
                </div>
                <Snackbar open={showNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity={notificationSeverity} sx={{width: '100%'}}>
                        {notificationMessage}
                    </Alert>
                </Snackbar>
            </div>

        </div>
    );
};