export interface BaseApiResponse<T> {
    data: T[];
    errors: any[];
    isSuccess: boolean;
}