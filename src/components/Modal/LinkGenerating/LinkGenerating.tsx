import React, {useState, useEffect} from 'react';
import {IconSvg} from 'components/common/IconSvg/IconSvg';
import {Button} from 'components/common/Button/Button'
import {closeHwModalPath} from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import {
    useLazyFetchPaymentMethodsQuery,
    useCreatePaymentLinkMutation,
    useCreateProdamusPaymentLinkMutation, useUpdateProdamusPaymentLinkMutation
} from 'api/schoolService';
import {useCreateNewLinkMutation, useCreateTestNewLinkMutation} from 'api/paymentModules';
import {ResponsePaymentMethod} from '../../../types/paymentT'
import {CreateProdamusPaymentLinkData} from '../../../types/ProdamusPaymenT'
import styles from './linkGenerating.module.scss';
import {PaymentData, useGetLinkMutation, buildUrlParams, transformData} from 'api/prodamusService'
import { log } from 'console';
import useIsClickOut from '../../../Pages/Settings/PaymentMethods/useIsClickOut'

interface LinkGeneratingProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LinkGenerating: React.FC<LinkGeneratingProps> = ({isOpen, onClose}) => {
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [error, setError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<ResponsePaymentMethod | null>(null);
    const [fetchPaymentMethods, paymentMethodsResponse] = useLazyFetchPaymentMethodsQuery();
    const [createPaymentLinkMutationFunction] = useCreatePaymentLinkMutation();
    const [createProdamusPaymentLinkMutationFunction] = useCreateProdamusPaymentLinkMutation();
    const [createNewLink, newLinkData] = useCreateNewLinkMutation();
    const [createProdamusNewLink, prodamusNewLinkData] = useGetLinkMutation();
    const [updateProdamusNewLink, updateProdamusNewLinkData] = useUpdateProdamusPaymentLinkMutation()

    const [createTestNewLink, newTestLinkData] = useCreateTestNewLinkMutation();
    const [showProdamusFields, setShowProdamusFields] = useState(false);
    const [showExpressPayFields, setShowExpressPayFields] = useState(false);

    // Стейты и обработчики для формы Продамуса
    const [orderId, setOrderId] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCurrency, setProductCurrency] = useState('');
    const [productQuantity, setProductQuantity] = useState('');

    const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderId(e.target.value);
    };
    const handleCustomerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPhone(e.target.value);
    };
    const handleCustomerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerEmail(e.target.value);
    };
    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };
    const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(e.target.value);
    };
    const handleProductCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCurrency = e.target.value;
        if (selectedCurrency !== "") {
            setProductCurrency(selectedCurrency);
        }
    };
    const handleProductQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(e.target.value);
    };


    const schoolIdString = localStorage.getItem('school_id');
    const schoolId = schoolIdString ? parseInt(schoolIdString, 10) : 0;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (error) {
            timer = setTimeout(() => {
                setError('');
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [error]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    };

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMethodId = parseInt(e.target.value, 10);
        const methodsArray = paymentMethodsResponse.data ? Object.values(paymentMethodsResponse.data) : [];
        const selectedMethod = methodsArray.find((method: ResponsePaymentMethod) => method.id === selectedMethodId);
        setPaymentMethod(selectedMethod || null);
        setShowProdamusFields(selectedMethod?.payment_method === 'Prodamus');
        setShowExpressPayFields(selectedMethod?.payment_method === 'ExpressPay');
    };

    const handleGenerateLink = async () => {
            if (paymentMethod?.payment_method === 'Prodamus') {
                const ProdamusRequestData: CreateProdamusPaymentLinkData = {
                    school: schoolId,
                    school_payment_method: paymentMethod?.id || 0,
                    order_id: orderId,
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                    name: productName,
                    price: productPrice,
                    currency: productCurrency,
                    quantity: parseInt(productQuantity),
                    do: 'link',
                    api_key: paymentMethod.api_key,
                    type: 'json',
                    callbackType: 'json'
                }
                try {
                    const ProdamusDataSignature = await createProdamusPaymentLinkMutationFunction(ProdamusRequestData); //Сохранение данных для ссылки в БД и получение подписи данных в ответе. Подпись создается на бекэнде
                    if ('data' in ProdamusDataSignature && ProdamusDataSignature.data) {
                        const signature = ProdamusDataSignature.data.signature;
                        const transformedData = transformData(ProdamusRequestData); //Преобразования данных требуемый формат для формирования ссылки для запроса к Prodamus
                        transformedData.signature = signature;
                        const ProdamusUrl = buildUrlParams(paymentMethod.payment_url, transformedData);
                        try {
                            const ProdamusPaymentLinkResponse = await createProdamusNewLink(ProdamusUrl) // Получение платежной ссылки от Продамуса
                            if ('data' in ProdamusPaymentLinkResponse) {
                                const ProdamusPaymentLink = ProdamusPaymentLinkResponse.data.payment_link;
                                if (ProdamusPaymentLink) {
                                    await updateProdamusNewLink({id: ProdamusDataSignature.data.id, payment_link: ProdamusPaymentLink}) //Сохранение ссылки в БД
                                    onClose()
                                } else {
                                    console.error('Ответ не содержит данных:', ProdamusPaymentLinkResponse);
                                    setError('Не удалось получить ссылку для оплаты');
                                }
                            } else {
                                console.error('Ответ не содержит данных:', ProdamusPaymentLinkResponse);
                                setError('Не удалось получить ссылку для оплаты');
                            }
                        } catch (error) {
                            console.error('Ошибка при получении данных:', error);
                            setError('Ошибка при создании ссылки');
                        }
                    } else {
                        console.error('Ошибка при получении ссылки от Prodamus');
                        setError('Не удалось добавить информацию о ссылке для оплаты в базу данных');

                    }


                } catch (error) {
                    console.log(error);
                }
            } else if (paymentMethod?.payment_method === 'ExpressPay') {
                const requestData = {
                    Token: paymentMethod.api_key,
                    AccountNo: parseInt(paymentMethod.account_no),
                    Amount: parseFloat(price),
                    Surname: "",
                    FirstName: "",
                    Patronymic: "",
                    Currency: currency === 'BYN' ? 933 : currency === 'RUB' ? 643 : 840,
                    IsNameEditable: 1,
                    ReturnInvoiceUrl: 1
                };
                // const requestTestData = {
                //   Token: 'a75b74cbcfe446509e8ee874f421bd64',
                //   AccountNo: 10,
                //   Amount: parseFloat(price),
                //   Surname: "",
                //   FirstName: "",
                //   Patronymic: "",
                //   Currency: currency === 'BYN' ? 933 : currency === 'RUB' ? 643 : 840,
                //   IsNameEditable: 1,
                //   ReturnInvoiceUrl: 1
                // };
                try {
                    const response = await createNewLink(requestData);
                    // const response = await createTestNewLink(requestTestData)
                    if ('data' in response && response.data && 'InvoiceNo' in response.data && 'InvoiceUrl' in response.data) {
                        console.log(response.data.InvoiceNo);

                        const invoiceNo: string | number = response.data.InvoiceNo || '';
                        const invoiceUrl: string = response.data.InvoiceUrl || '';

                        const createPaymentLinkResponse = await createPaymentLinkMutationFunction({
                            invoice_no: typeof invoiceNo === 'string' ? parseInt(invoiceNo) : invoiceNo,
                            school_id: schoolId,
                            payment_method: paymentMethod?.id || 0,
                            payment_link: invoiceUrl,
                            amount: requestData.Amount,
                            api_key: paymentMethod.api_key,
                            currency: currency === 'BYN' ? '933' : currency === 'RUB' ? '643' : '840'
                        });

                        // const createTestPaymentLinkResponse = await createPaymentLinkMutationFunction({
                        //     invoice_no: typeof invoiceNo === 'string' ? parseInt(invoiceNo) : invoiceNo,
                        //     school_id: schoolId,
                        //     payment_method: paymentMethod?.id || 0,
                        //     payment_link: invoiceUrl,
                        //     amount: requestData.Amount,
                        //     api_key: paymentMethod.api_key,
                        //     currency: currency === 'BYN' ? '933' : currency === 'RUB' ? '643' : '840'
                        // });

                        // if ('data' in createTestPaymentLinkResponse && 'response' in createTestPaymentLinkResponse.data && typeof createTestPaymentLinkResponse.data.response === 'string' && createTestPaymentLinkResponse.data.response === 'success') {
                        //   onClose();
                        // } else {
                        //   setError('Не удалось добавить информацию о ссылке для оплаты в базу данных');
                        // }

                        if ('data' in createPaymentLinkResponse && 'response' in createPaymentLinkResponse.data && typeof createPaymentLinkResponse.data.response === 'string' && createPaymentLinkResponse.data.response === 'success') {
                            onClose();
                        } else {
                            setError('Не удалось добавить информацию о ссылке для оплаты в базу данных');
                        }
                    } else {
                        setError('Не удалось получить ссылку для оплаты');
                    }
                } catch (error) {
                    console.error('Произошла ошибка:', error);
                    setError('Ошибка при создании ссылки');
                }
            }
        }
    ;

    const handleCloseButtonClick = () => {
        onClose();
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPaymentMethods({school_id: schoolId});
            if (response.error) {
                setError('Ошибка при получении способов оплаты');
                return;
            }
        };
        fetchData();
    }, [isOpen]);


    return (
    <div className={styles['modal-wrapper']} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={styles['modal-content']}>
            <h2>Генерация ссылки для оплаты</h2>
            {error && <p>{error}</p>}
{/*             {Array.isArray(paymentMethodsResponse.data) && paymentMethodsResponse.data.length > 0 ? ( */}
               {Array.isArray(paymentMethodsResponse.data) && paymentMethodsResponse.data.length === 0 ? (
                <>
                    <div className={styles['label-container']}>
                        <label htmlFor="paymentMethod">Cпособ оплаты:</label>
                    </div>
                    <div className={styles.currencyContainer}>
                        <select id="paymentMethod" value={paymentMethod?.id.toString() || ''} onChange={handlePaymentMethodChange}>
                            <option value="">Выбор способа оплаты</option>
                            {paymentMethodsResponse.data.map((method: ResponsePaymentMethod) => (
                                <option key={method.id} value={method.id.toString()}>{method.payment_method}</option>
                            ))}
                        </select>
                    </div>

                    {showExpressPayFields && (
                        <>
                            <div className={styles['label-container']}>
                                <label htmlFor="price">Сумма оплаты:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="price" value={price} onChange={handlePriceChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="currency">Валюта:</label>
                            </div>
                            <div className={styles.currencyContainer}>
                                <select id="currency" value={currency} onChange={handleCurrencyChange}>
                                    <option value="">Выбор валюты</option>
                                    <option value="BYN">BYN</option>
                                    <option value="RUB">RUB</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </>
                    )}

                    {showProdamusFields && (
                        <>
                            <div className={styles['label-container']}>
                                <label htmlFor="order_id">Номер заказа:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="order_id" value={orderId} onChange={handleOrderIdChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="customer_phone">Мобильный телефон клиента:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="customer_phone" value={customerPhone} onChange={handleCustomerPhoneChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="customer_email">Email клиента:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="customer_email" value={customerEmail} onChange={handleCustomerEmailChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="name">Наименование товара:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="name" value={productName} onChange={handleProductNameChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="price">Цена товара:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="price" value={productPrice} onChange={handleProductPriceChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="quantity">Количество товара:</label>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="text" id="quantity" value={productQuantity} onChange={handleProductQuantityChange} />
                            </div>
                            <div className={styles['label-container']}>
                                <label htmlFor="currency">Валюта:</label>
                            </div>
                            <div className={styles.currencyContainer}>
                                <select id="currency" value={productCurrency} onChange={handleProductCurrencyChange}>
                                    <option value="">Выбор валюты</option>
                                    <option value="eur">EUR</option>
                                    <option value="rub">RUB</option>
                                    <option value="usd">USD</option>
                                    <option value="kzt">KZT</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <button className={styles.btn} onClick={handleGenerateLink}>
                          Сгенерировать
                        </button>
                    </div>
                </>
            ) : (<>
                    <p>Сперва вам необходимо подключить и добавить метод оплаты.</p>
                <p>Подключить Express Pay платежи вы можете перейдя по <a href="https://express-pay.by/?ref_code=d0cb09950976">ссылке</a></p>
            </>


            )}
        </div>
    </div>
);}

export default LinkGenerating;
