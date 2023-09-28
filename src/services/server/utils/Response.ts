interface ApiResponse<T> {
    data: T | null;
}

export interface ApiError {
    type: 'network' | 'general' | 'http';
    message: string;
}

class ApiResult<T> {
    constructor(private response: ApiResponse<T> | null, private apiError: ApiError | null) { }

    isSuccess(): boolean {
        return this.response !== null;
    }

    hasError(): boolean {
        return this.apiError !== null;
    }

    getData(): T | null {
        return this.isSuccess() ? this.response!.data : null;
    }

    getError(): ApiError | null {
        return this.hasError() ? this.apiError : null;
    }
}

export default ApiResult