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
import settings_icon from './icons/settings-icon.png'
import vector from './icons/vector.png'
import useIsClickOut from './useIsClickOut'



export const PaymentMethods = memo(() => {
    const [paymentLink, setPaymentLink] = useState<SchoolPaymentLink | ProdamusPaymentLinkDetail>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLinkOpen, setIsModalLinkOpen] = useState(false);
    const [isModalDetailLinkOpen, setIsModalDetailLinkOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string | null>(null);
    const [filteredPaymentLinks, setFilteredPaymentLinks] = useState<(SchoolPaymentLink | ProdamusPaymentLinkDetail)[]>([]);
    const [paymentLinks, setPaymentLinks] = useState<SchoolPaymentLinkList>({} as SchoolPaymentLinkList);
    const [prodamusPaymentLinks, setProdamusPaymentLinks] = useState<ProdamusPaymentLinkList>({} as ProdamusPaymentLinkList);
    const schoolIdString = localStorage.getItem('school_id');
    const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;

    const [fetchLinks, paymentLinksResponse] = useLazyFetchPaymentLinksQuery();
    const [fetchProdamusLinks, prodamusPaymentLinksResponse] = useLazyFetchProdamusPaymentLinksQuery();
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [isShown, setIsShown] = useState(false);
    const [eleCallBack] = useIsClickOut(setIsShown);
    const [eleCallBackModal] = useIsClickOut(setIsModalLinkOpen)

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


    useEffect(() => {
        const updateFilteredLinks = () => {
            const allPaymentLinks = [...Object.values(paymentLinks), ...Object.values(prodamusPaymentLinks)];
            const filteredLinks = filterType ? (
                filterType === 'ProdamusPaymentLink' ? Object.values(prodamusPaymentLinks) : Object.values(paymentLinks)
            ) : allPaymentLinks;

            const sortedLinks = [...filteredLinks].sort((a, b) => {
                if (sortDirection === 'asc') {
                    return new Date(a.created).getTime() - new Date(b.created).getTime();
                } else {
                    return new Date(b.created).getTime() - new Date(a.created).getTime();
                }
            });

            setFilteredPaymentLinks(sortedLinks);
        };

        updateFilteredLinks();
    }, [paymentLinks, prodamusPaymentLinks, filterType, sortDirection]);
    const sortLinksByDate = () => {
        setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    };


    return !open ? null : (
      <div className={styles.main}>
          <div className={styles.main_payment}>
              Оплата
          </div>
          <div className={styles.wrapper}>
            <div className={styles.actions}>
              <div className={styles.block}>
                  <button
                      style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          height: '32px',
                          width: '32px',
                          top: '25%',
                          position: 'relative'

                      }}
//                       onClick={toggleModal}
                        onClick={()=>setIsShown(current => !current)}
                  >
                    <img width="32" height="32" src = {settings_icon} alt='settings'/>

                  </button>
                    <button className={styles.generateLinkButton} onClick={toggleModalLink}>
                        Сгенерировать ссылку
                  </button>
                      <div className={styles.dropdown}>
                        <button className={styles.menuButton} onClick={()=>setIsShown(current => !current)}>Все ссылки
                          <img src = {vector} alt='vector'/>
                        </button>
                            <div ref={eleCallBack} style={{display: isShown ? 'block' : 'none'} } className={styles.dropdownContentMenu}>
                                <button onClick={()=>setFilterType('' || null)}>Все ссылки</button>
                                <button onClick={()=>setFilterType('ProdamusPaymentLink' || null)}>Prodamus</button>
                                <button onClick={()=>setFilterType('ExpressPayLink' || null)}>ExpressPay</button>
                            </div>
        </div>
              </div>
            {filteredPaymentLinks.length > 0 ? (
                <div>
                    <table className={styles.paymentTable}>
                        <thead>
                            <tr>
                                <th
                            onClick={() => {
                                setFilterType(null);
                                sortLinksByDate();
                            }}
                            style={{
                                color: 'slategrey',
                                cursor: 'pointer',
                                width: '0%',
                                textAlign: 'left'
                            }}
                        >
                            Дата создания ссылки
                        </th>
                                <th style={{ color: 'slategrey' }}>Ссылка для оплаты</th>
                                <th style={{ color: 'slategrey' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPaymentLinks.map((paymentLink, index) => (
                                <tr key={index + 1}>
                                    <td>{new Date(paymentLink.created).toLocaleString()}</td>
                                    <td>
                                        <a
                                    href={paymentLink?.payment_link || ''}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (paymentLink?.payment_link) {
                                            handleCopyLink(paymentLink.payment_link);
                                        } else {
                                            console.error('Payment link is undefined or null');
                                        }
                                    }}
                                >
                                    {paymentLink?.payment_link || 'No Payment Link'}
                                </a>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
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
                        <div className={styles.notificationContainer}>{notification}</div>
                    )}
                </div>
            ) : (
                <div className={styles.noLinksMessage}>Ссылок пока нет</div>
            )}
            <AddPaymentMethods isOpen={isModalOpen} onClose={toggleModal} />
            <div ref={eleCallBackModal} >
              <LinkGenerating isOpen={isModalLinkOpen} onClose={toggleModalLink}/>
            </div>
            {paymentLink && 'signature' in paymentLink ? (
                <ProdamusLinkDetail
                    isOpen={isModalDetailLinkOpen}
                    onClose={toggleLinkDetail}
                    paymentLink={paymentLink as ProdamusPaymentLinkDetail}
                />
            ) : (
                <LinkDetail
                    isOpen={isModalDetailLinkOpen}
                    onClose={toggleLinkDetail}
                    paymentLink={paymentLink as SchoolPaymentLink}
                />
            )}

            </div>
          </div>
        </div>
    )
})