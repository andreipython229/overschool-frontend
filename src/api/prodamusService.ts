import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CreateProdamusPaymentLinkData} from "../types/ProdamusPaymenT";

export interface Product {
    price: string;
    quantity: string;
    name: string;
    sku?: string;
    tax?: Tax[];
    payment_method?: string;
    payment_object?: string;
}

export interface Tax {
    tax_type?: number;
    tax_sum?: number;

}

export interface PaymentData {
    order_id?: string;
    customer_phone?: string;
    customer_email?: string;
    products: Product[];
    subscription?: number;
    subscription_date_start?: string;
    vk_user_id?: number;
    vk_user_name?: string;
    customer_extra?: string;
    do: string;
    urlReturn?: string;
    urlSuccess?: string;
    urlNotification?: string;
    sys?: string;
    discount_value?: number;
    npd_income_type?: string;
    npd_income_inn?: number;
    npd_income_company?: string;
    link_expired?: string;
    ref?: string;
    type?: string;
    callbackType?: string;
    currency?: string;
    payments_limit?: number;
    paid_content?: string;
    acquiring?: string;
    signature?: string;
}


export function transformData(createProdamusPaymentLinkData: CreateProdamusPaymentLinkData): PaymentData {
    const product: Product = {
        price: createProdamusPaymentLinkData.price,
        quantity: createProdamusPaymentLinkData.quantity.toString(),
        name: createProdamusPaymentLinkData.name,
        sku: createProdamusPaymentLinkData.sku,
        tax: createProdamusPaymentLinkData.tax_type && createProdamusPaymentLinkData.tax_sum ? [{
            tax_type: createProdamusPaymentLinkData.tax_type,
            tax_sum: createProdamusPaymentLinkData.tax_sum,
        }] : undefined,
        payment_method: createProdamusPaymentLinkData.payment_method,
        payment_object: createProdamusPaymentLinkData.payment_object,
    };
    return {
        order_id: createProdamusPaymentLinkData.order_id,
        customer_phone: createProdamusPaymentLinkData.customer_phone,
        customer_email: createProdamusPaymentLinkData.customer_email,
        products: [product],
        subscription: createProdamusPaymentLinkData.subscription,
        subscription_date_start: createProdamusPaymentLinkData.subscription_date_start,
        vk_user_id: createProdamusPaymentLinkData.vk_user_id,
        vk_user_name: createProdamusPaymentLinkData.vk_user_name,
        customer_extra: createProdamusPaymentLinkData.customer_extra,
        do: createProdamusPaymentLinkData.do,
        urlReturn: createProdamusPaymentLinkData.urlReturn,
        urlSuccess: createProdamusPaymentLinkData.urlSuccess,
        urlNotification: createProdamusPaymentLinkData.urlNotification,
        sys: createProdamusPaymentLinkData.sys,
        discount_value: createProdamusPaymentLinkData.discount_value,
        npd_income_type: createProdamusPaymentLinkData.npd_income_type,
        npd_income_inn: createProdamusPaymentLinkData.npd_income_inn,
        npd_income_company: createProdamusPaymentLinkData.npd_income_company,
        link_expired: createProdamusPaymentLinkData.link_expired,
        ref: createProdamusPaymentLinkData.ref,
        type: createProdamusPaymentLinkData.type,
        callbackType: createProdamusPaymentLinkData.callbackType,
        currency: createProdamusPaymentLinkData.currency,
        payments_limit: createProdamusPaymentLinkData.payments_limit,
        acquiring: createProdamusPaymentLinkData.acquiring,
        signature: createProdamusPaymentLinkData.signature,
    };
}

export function buildUrlParams(baseUrl: string, transformedData: PaymentData): string {
    const urlParams = new URLSearchParams();
    urlParams.append('order_id', transformedData.order_id || '');
    urlParams.append('customer_phone', transformedData.customer_phone || '');
    urlParams.append('customer_email', transformedData.customer_email || '');
    transformedData.products.forEach((product, index) => {
        urlParams.append(`products[${index}][price]`, product.price);
        urlParams.append(`products[${index}][quantity]`, product.quantity);
        urlParams.append(`products[${index}][name]`, product.name);
        if (product.sku) {
            urlParams.append(`products[${index}][sku]`, product.sku);
        }
        if (product.tax) {
            product.tax.forEach((tax, taxIndex) => {
                if (tax.tax_type && tax.tax_sum) {
                    urlParams.append(`products[${index}][tax][${taxIndex}][tax_type]`, tax.tax_type.toString());
                    urlParams.append(`products[${index}][tax][${taxIndex}][tax_sum]`, tax.tax_sum.toString());
                }
            });
        }
        if (product.payment_method) {
            urlParams.append(`products[${index}][payment_method]`, product.payment_method);
        }
        if (product.payment_object) {
            urlParams.append(`products[${index}][payment_object]`, product.payment_object);
        }
    });
    if (transformedData.customer_extra) {
        urlParams.append('customer_extra', transformedData.customer_extra);
    }
    urlParams.append('do', transformedData.do);
    if (transformedData.urlReturn) {
        urlParams.append('urlReturn', transformedData.urlReturn);
    }
    if (transformedData.urlSuccess) {
        urlParams.append('urlSuccess', transformedData.urlSuccess);
    }
    if (transformedData.urlNotification) {
        urlParams.append('urlNotification', transformedData.urlNotification);
    }
    if (transformedData.sys) {
        urlParams.append('sys', transformedData.sys);
    }
    if (transformedData.discount_value) {
        urlParams.append('discount_value', transformedData.discount_value.toString());
    }
    if (transformedData.npd_income_type) {
        urlParams.append('npd_income_type', transformedData.npd_income_type);
    }
    if (transformedData.npd_income_inn) {
        urlParams.append('npd_income_inn', transformedData.npd_income_inn.toString());
    }
    if (transformedData.npd_income_company) {
        urlParams.append('npd_income_company', transformedData.npd_income_company);
    }
    if (transformedData.link_expired) {
        urlParams.append('link_expired', transformedData.link_expired);
    }
    if (transformedData.ref) {
        urlParams.append('ref', transformedData.ref);
    }
    if (transformedData.type) {
        urlParams.append('type', transformedData.type);
    }
    if (transformedData.callbackType) {
        urlParams.append('callbackType', transformedData.callbackType);
    }
    if (transformedData.currency) {
        urlParams.append('currency', transformedData.currency);
    }
    if (transformedData.payments_limit) {
        urlParams.append('payments_limit', transformedData.payments_limit.toString());
    }
    if (transformedData.paid_content) {
        urlParams.append('paid_content', transformedData.paid_content);
    }
    if (transformedData.acquiring) {
        urlParams.append('acquiring', transformedData.acquiring);
    }
    if (transformedData.signature) {
        urlParams.append('signature', transformedData.signature);
    }

    return `${baseUrl}?${urlParams.toString()}`;
}

export const prodamusService = createApi({
    reducerPath: 'prodamusApi',
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: (builder) => ({
        getLink: builder.mutation<any, string>({
            query: (url: string) => ({
                url: url,
                method: 'GET',
            }),
        }),
    }),
});

export const {useGetLinkMutation} = prodamusService;


