export interface ResponsePaymentMethod {
    id: number;
    payment_method: string;
    payment_method_name: string;
    account_no: string;
    api_key: string;
    school: number;
    currency: string;
  }
  
  export interface PaymentMethod {
    payment_method: string;
    payment_method_name: string;
    account_no: string;
    api_key: string;
    school: number;
  }
  
  export interface PaymentMethodListResponse {
    results: ResponsePaymentMethod[];
  }
  
  export interface PaymentLinkCreatePayload {
    invoice_no: number;
    school_id: number;
    payment_method: number;
    payment_link: string;
    amount: number;
    api_key: string;
    currency: string;
  }

  export interface CreatePaymentLinkResponse {
    response: string;
  }
  
  export interface SchoolPaymentLink {
    id: number;
    school: number;
    payment_method: number;
    invoice_no: number;
    payment_link: string;
    status: string;
    created: string;
    amount: number;
    currency: string;
    first_name: string;
    last_name: string;
    patronymic: string;
    api_key: string;
  }

  export interface SchoolPaymentLinkList {
    paymentLinks: SchoolPaymentLink[];
  }

  export interface UpdatePaymentLinkPayload {
    id: number;
    payment_link: string;
    status?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    patronymic?: string | null;
  }

  export interface CreatePaymentRequestData {
    Token: string;
    AccountNo: number;
    Amount: number;
    Surname: string;
    FirstName: string;
    Patronymic: string;
    Currency: number;
    IsNameEditable: number;
    ReturnInvoiceUrl: number;
  }
  
  export interface FetchInvoiceDetailsRequestData {
    Token: string;
  }

  export interface ResponseData {
    InvoiceNo?: string;
    InvoiceUrl?: string;
  }