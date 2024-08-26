export interface IErrorResponse<T>{
    statusCode: number;
    error: string
    message: T
}