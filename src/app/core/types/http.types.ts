import { HttpParams } from "@angular/common/http";

export interface RequestOptions {
    params: HttpParams;
    headers: {
        'Authorization': string;
        'Content-Type': string;
    };
}
