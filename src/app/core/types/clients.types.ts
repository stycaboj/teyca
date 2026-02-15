export interface ClientData {
    user_id: number;
    template: string;
    barcode: string;
    first_name: string;
    last_name: string;
    phone: string;
    discount: string;
    bonus: string;
    visits_all: string;
    summ_all: string;
    link: string;
    created_at: string;
}

export interface ClientsResponse {
    passes: ClientData[];
    meta: {
        size: number;
        limit: number;
        offset: number;
    };
}

export interface ClientsParams {
    limit?: number;
    offset?: number;
    search?: string;
}
