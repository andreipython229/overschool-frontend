import {ChangeEvent, FC, useEffect, useState} from 'react'
import {Button} from 'components/common/Button/Button'
import {Input} from 'components/common/Input/Input/Input'

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
                await updateDomain({id: existingDomain.id, data: {domain_name: domain}, schoolName: schoolName});
            } else {
                // Если домена нет, создаем новый
                await createDomain({data: {domain_name: domain}, schoolName: schoolName});
            }
            setIsNewDomain(false);
        } catch (error) {
            console.error("Error updating/creating domain:", error);
        }
    };

    return (
        <div className={styles.wrapper_actions}>
            <div className={styles.main}>
                <div className={styles.main_title}>Настройки пользовательского домена</div>
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
                <div>
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
            </div>
        </div>
    );
};