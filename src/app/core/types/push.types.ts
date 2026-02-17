export interface PushResponse {
    users_count: number;
    message_id: number;
}

export interface PushBody {
    user_id: string;
    date_start?: string;
    push_message: string;
}

export interface PushData {
    message: string;
    user_ids: number[];
    scheduled_at?: string;
}
