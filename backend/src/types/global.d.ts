
//Global Send Response Type
declare type ApiResponse<T = any> = {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}

//Gift Voucher Data Type
declare type VoucherApiData = {
    recipient: string;
    amount: number;
    message?: string;
}