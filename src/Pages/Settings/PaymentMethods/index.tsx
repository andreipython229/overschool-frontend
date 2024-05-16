import {memo, useState, useEffect} from 'react'
import {Button} from 'components/common/Button/Button'
import {useLazyFetchPaymentLinksQuery, useLazyFetchProdamusPaymentLinksQuery} from "../../../api/schoolService";
import {SchoolPaymentLinkList, SchoolPaymentLink} from 'types/paymentT';
import AddPaymentMethods from "../../../components/Modal/AddPaymentMethods/AddPaymentMethods"
import LinkGenerating from "../../../components/Modal/LinkGenerating/LinkGenerating"
import LinkDetail from 'components/Modal/PaymentLinkDetail/LinkDetail';
import ProdamusLinkDetail from 'components/Modal/ProdamusPaymentLinkDetail/ProdamusLinkDetail';
import styles from './paymentMethods.module.scss'
import {ProdamusPaymentLinkDetail, ProdamusPaymentLinkList} from "../../../types/ProdamusPaymenT";


export const PaymentMethods = memo(() => {
    const [paymentLink, setPaymentLink] = useState<SchoolPaymentLink | ProdamusPaymentLinkDetail>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLinkOpen, setIsModalLinkOpen] = useState(false);
    const [isModalDetailLinkOpen, setIsModalDetailLinkOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string | null>(null);

    const [paymentLinks, setPaymentLinks] = useState<SchoolPaymentLinkList>({} as SchoolPaymentLinkList);
    const [prodamusPaymentLinks, setProdamusPaymentLinks] = useState<ProdamusPaymentLinkList>({} as ProdamusPaymentLinkList);
    const schoolIdString = localStorage.getItem('school_id');
    const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;

    const [fetchLinks, paymentLinksResponse] = useLazyFetchPaymentLinksQuery();
    const [fetchProdamusLinks, prodamusPaymentLinksResponse] = useLazyFetchProdamusPaymentLinksQuery();

    const handleNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    useEffect(() => {
        if (!isModalLinkOpen) {
            const fetchData = async () => {
                const response = await fetchLinks({school_id: schoolId});
                if (response.error) {
                    console.log('Ошибка при получении способов оплаты');
                    return;
                } else if (response.data) {
                    setPaymentLinks(response.data);
                }
            };
            fetchData();
        }

        const fetchProdamusPaymentLinksData = async () => {
            const response = await fetchProdamusLinks({school_id: schoolId});
            if (response.error) {
                console.log('Ошибка при получении ссылок из API');
                return;
            } else if (response.data) {
                setProdamusPaymentLinks(response.data);
            }
        };
        fetchProdamusPaymentLinksData();
    }, [isModalLinkOpen]);

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    }

    const toggleModalLink = () => {
        setIsModalLinkOpen(prevState => !prevState);
    }

    const toggleLinkDetail = () => {
        setIsModalDetailLinkOpen(prevState => !prevState);
    }

    const toggleModalDetailLink = (paymentLink: SchoolPaymentLink | ProdamusPaymentLinkDetail) => {
        setPaymentLink(paymentLink);
        toggleLinkDetail();
    }


    const handleCopyLink = (paymentLink: string) => {
        const tempInput = document.createElement('input');
        tempInput.value = paymentLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        handleNotification("Ссылка скопирована")
    }

    const filteredPaymentLinks = filterType ? (
        filterType === 'ProdamusPaymentLink' ? Object.values(prodamusPaymentLinks) : Object.values(paymentLinks)
    ) : [...Object.values(paymentLinks), ...Object.values(prodamusPaymentLinks)];

    return (
        <div className={styles.wrapper_actions}>
            <div style={{color: 'slategrey', fontSize: '20px', marginBlockEnd: '20px'}}>
                Оплата
                <button
                    style={{
                        marginLeft: '10px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        verticalAlign: 'middle'
                    }}
                    onClick={toggleModal}
                >
                    <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{color: 'slategrey'}} id="0"
                              d="M13.229 2.12484C13.229 1.18135 13.9939 0.416504 14.9373 0.416504H20.0623C21.0058 0.416504 21.7707 1.18135 21.7707 2.12484V4.51422C22.4243 4.72907 23.056 4.99179 23.6616 5.29818L25.3517 3.60814C26.0188 2.94099 27.1005 2.94099 27.7676 3.60814L31.3915 7.23206C31.7119 7.55243 31.8919 7.98695 31.8919 8.44003C31.8919 8.89311 31.7119 9.32763 31.3915 9.64801L29.7015 11.338C30.0079 11.9437 30.2706 12.5754 30.4855 13.229H32.8748C33.8183 13.229 34.5832 13.9939 34.5832 14.9373V20.0623C34.5832 21.0058 33.8183 21.7707 32.8748 21.7707H30.4855C30.2706 22.4243 30.0079 23.056 29.7015 23.6616L31.3915 25.3517C32.0587 26.0188 32.0587 27.1005 31.3915 27.7676L27.7676 31.3915C27.1005 32.0587 26.0188 32.0587 25.3517 31.3915L23.6616 29.7015C23.056 30.0079 22.4243 30.2706 21.7707 30.4855V32.8748C21.7707 33.8183 21.0058 34.5832 20.0623 34.5832H14.9373C13.9939 34.5832 13.229 33.8183 13.229 32.8748V30.4855C12.5754 30.2706 11.9437 30.0079 11.338 29.7015L9.64801 31.3915C9.32763 31.7119 8.89311 31.8919 8.44003 31.8919C7.98695 31.8919 7.55243 31.7119 7.23206 31.3915L3.60814 27.7676C2.94099 27.1005 2.94099 26.0188 3.60814 25.3517L5.29818 23.6616C4.99179 23.056 4.72907 22.4243 4.51422 21.7707H2.12484C1.18135 21.7707 0.416504 21.0058 0.416504 20.0623V14.9373C0.416504 13.9939 1.18135 13.229 2.12484 13.229H4.51422C4.72907 12.5754 4.99179 11.9437 5.29818 11.338L3.60814 9.64801C2.94099 8.98086 2.94099 7.8992 3.60814 7.23206L7.23206 3.60814C7.8992 2.94099 8.98086 2.94099 9.64801 3.60814L11.338 5.29818C11.9437 4.99179 12.5754 4.72907 13.229 4.51422V2.12484ZM16.6457 3.83317V5.8167C16.6457 6.61977 16.0863 7.31442 15.3017 7.48572C14.1007 7.74793 12.978 8.22107 11.9738 8.86528C11.2979 9.29891 10.4112 9.20323 9.84336 8.63539L8.44003 7.23206L7.23206 8.44003L8.63539 9.84336C9.20323 10.4112 9.29891 11.2979 8.86528 11.9738C8.22107 12.978 7.74793 14.1007 7.48572 15.3017C7.31442 16.0863 6.61977 16.6457 5.8167 16.6457H3.83317V18.354H5.8167C6.61977 18.354 7.31442 18.9134 7.48572 19.698C7.74793 20.899 8.22107 22.0217 8.86528 23.0259C9.29891 23.7018 9.20323 24.5885 8.63539 25.1563L7.23206 26.5596L8.44003 27.7676L9.84336 26.3643C10.4112 25.7964 11.2979 25.7008 11.9738 26.1344C12.978 26.7786 14.1007 27.2517 15.3017 27.514C16.0863 27.6853 16.6457 28.3799 16.6457 29.183V31.1665H18.354V29.183C18.354 28.3799 18.9134 27.6853 19.698 27.514C20.899 27.2517 22.0217 26.7786 23.0259 26.1344C23.7018 25.7008 24.5885 25.7964 25.1563 26.3643L26.5596 27.7676L27.7676 26.5596L26.3643 25.1563C25.7964 24.5885 25.7008 23.7018 26.1344 23.0259C26.7786 22.0217 27.2517 20.899 27.514 19.698C27.6853 18.9134 28.3799 18.354 29.183 18.354H31.1665V16.6457H29.183C28.3799 16.6457 27.6853 16.0863 27.514 15.3017C27.2517 14.1007 26.7786 12.978 26.1344 11.9738C25.7008 11.2979 25.7964 10.4112 26.3643 9.84336L27.7676 8.44003L26.5596 7.23206L25.1563 8.63539C24.5885 9.20323 23.7018 9.29891 23.0259 8.86528C22.0217 8.22107 20.899 7.74793 19.698 7.48572C18.9134 7.31442 18.354 6.61977 18.354 5.8167V3.83317H16.6457Z"
                              fill="currentColor" strokeWidth=".1" fillRule="evenodd" clipRule="evenodd"></path>
                        <path style={{color: 'slategrey'}} id="1"
                              d="M17.4998 14.0832C15.6129 14.0832 14.0832 15.6129 14.0832 17.4998C14.0832 19.3868 15.6129 20.9165 17.4998 20.9165C19.3868 20.9165 20.9165 19.3868 20.9165 17.4998C20.9165 15.6129 19.3868 14.0832 17.4998 14.0832ZM10.6665 17.4998C10.6665 13.7259 13.7259 10.6665 17.4998 10.6665C21.2738 10.6665 24.3332 13.7259 24.3332 17.4998C24.3332 21.2738 21.2738 24.3332 17.4998 24.3332C13.7259 24.3332 10.6665 21.2738 10.6665 17.4998Z"
                              fill="currentColor" strokeWidth=".1" fillRule="evenodd" clipRule="evenodd"/>
                    </svg>
                </button>
                <Button className={styles.generateLinkButton} onClick={toggleModalLink} text="Сгенерировать ссылку"/>
                <div className={styles.selectContainer}>
                    <select
                        value={filterType || ''}
                        onChange={(e) => setFilterType(e.target.value || null)}
                    >
                        <option value="">Все ссылки</option>
                        <option value="ProdamusPaymentLink">Prodamus</option>
                        <option value="ExpressPayLink">ExpressPay</option>
                    </select>
                </div>

            </div>
            <div>
                <table className={styles.paymentTable}>
                    <thead>
                    <tr>
                        <th style={{color: 'slategrey'}}>Дата создания ссылки</th>
                        <th style={{color: 'slategrey'}}>Ссылка для оплаты</th>
                        <th style={{color: 'slategrey'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPaymentLinks.map((paymentLink, index) => (
                        <tr key={index + 1}>
                            <td>
                                {new Date(paymentLink.created).toLocaleString()}
                            </td>
                            <td>
                                <a
                                    href={paymentLink.payment_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCopyLink(paymentLink.payment_link);
                                    }}
                                >
                                    {paymentLink.payment_link}
                                </a>
                            </td>
                            <td style={{textAlign: "right"}}>
                                <Button
                                    className={styles.detailButton}
                                    onClick={() => toggleModalDetailLink(paymentLink)}
                                    text="Подробнее"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {notification && (
                    <div className={styles.notificationContainer}>
                        {notification}
                    </div>
                )}
            </div>

            <AddPaymentMethods isOpen={isModalOpen} onClose={toggleModal}/>
            <LinkGenerating isOpen={isModalLinkOpen} onClose={toggleModalLink}/>
            {paymentLink && (
                'signature' in paymentLink ? (
                    <ProdamusLinkDetail isOpen={isModalDetailLinkOpen} onClose={toggleLinkDetail}
                                        paymentLink={paymentLink as ProdamusPaymentLinkDetail}/>
                ) : (
                    <LinkDetail isOpen={isModalDetailLinkOpen} onClose={toggleLinkDetail}
                                paymentLink={paymentLink as SchoolPaymentLink}/>
                )
            )}
        </div>
    )
})