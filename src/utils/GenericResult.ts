class Result<T> {
    constructor(private data: T | null, private errorMessage: string | null) {}
  
    isSuccess(): boolean {
      return this.data !== null;
    }
  
    hasError(): boolean {
      return this.errorMessage !== null;
    }
  
    getData(): T | null {
      return this.data;
    }
  
    getErrorMessage(): string | null {
      return this.errorMessage;
    }
  }

export default Result