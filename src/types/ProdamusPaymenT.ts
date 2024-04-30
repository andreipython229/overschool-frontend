
export interface CreateProdamusPaymentLinkData {
    api_key?: string;
    school: number;
    school_payment_method: number;
    do: string; //   do принимает 2 значения 'link', 'pay'
    name: string;
    price: string;
    quantity: number;
    sys?: string;
    sku?: string;
    order_id?: string;
    customer_phone?: string;
    customer_email?: string;
    customer_extra?: string;
    tax_type?: number;
    tax_sum?: number;
    payment_method?: string;
    payment_object?: string;
    subscription?: number;
    subscription_date_start?: string;
    vk_user_id?: number;
    vk_user_name?: string;
    urlReturn?: string;
    urlSuccess?: string;
    urlNotification?: string;
    discount_value?: number;
    npd_income_type?: string;
    npd_income_inn?: number;
    npd_income_company?: string;
    link_expired?: string;
    paid_content?: string;
    ref?: string;
    type?: string;
    callbackType?: string;
    currency?: string;
    payments_limit?: number;
    acquiring?: string;
    signature?: string;
    created?: string;
    payment_link?: string;
}

export interface ProdamusPaymentlinkResponse {
    id: number;
    signature?: string;
}

export interface UpdateProdamusPaymentLinkData {
    id: number;
    do?: string;
    name?: string;
    price?: string;
    quantity?: number;
    sys?: string;
    sku?: string;
    order_id?: string;
    customer_phone?: string;
    customer_email?: string;
    customer_extra?: string;
    tax_type?: number;
    tax_sum?: number;
    payment_method?: string;
    payment_object?: string;
    subscription?: number;
    subscription_date_start?: string;
    vk_user_id?: number;
    vk_user_name?: string;
    urlReturn?: string;
    urlSuccess?: string;
    urlNotification?: string;
    discount_value?: number;
    npd_income_type?: string;
    npd_income_inn?: number;
    npd_income_company?: string;
    link_expired?: string;
    paid_content?: string;
    ref?: string;
    type?: string;
    callbackType?: string;
    currency?: string;
    payments_limit?: number;
    acquiring?: string;
    signature?: string;
    created?: string;
    payment_link?: string;
}

export interface ProdamusPaymentLinkList {
    paymentLinks: ProdamusPaymentLinkDetail[];
}

export interface ProdamusPaymentLinkDetail {
    order_id?: string;
    customer_phone?: string;
    customer_email?: string;
    name: string;
    price: string;
    quantity: number;
    currency?: string;
    created: string;
    signature?: string;
    payment_link?: string
}
