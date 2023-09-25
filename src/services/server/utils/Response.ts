interface ApiResponse<T> {
    data: T;
}

class ApiResult<T> {
    constructor(private response: ApiResponse<T> | null, private error: Error | null) { }

    
    isSuccess(): boolean {
        return this.response !== null;
    }

    hasError(): boolean {
        return this.error !== null;
    }

    
    getData(): T | null {
        return this.isSuccess() ? this.response!.data : null;
    }

    getError(): Error | null {
        return this.hasError() ? this.error : null;
    }
}

export default ApiResult