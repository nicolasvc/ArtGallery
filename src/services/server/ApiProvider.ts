import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { LogCustome } from '../../utils/Utils';
import Snackbar from 'react-native-snackbar';
import ApiResult, { ApiError } from './utils/Response';

class ApiProvider {
  private api: AxiosInstance;

  constructor(baseUrl: string) {
    this.api = axios.create({
      baseURL: baseUrl,
      responseType: 'json'
    });
    this.api.interceptors.response.use(
      (response) => {
        LogCustome.info('Response service', response.data);
        LogCustome.info('Status Service', response.status);
        return response;
      },
      (error) => {
        LogCustome.error('Error Service', error);
        return Promise.reject(error);
      }
    );
  }

  async getWithParams<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResult<T>> {
    try {
      const response: AxiosResponse = await this.api.get(endpoint, {
        params: params,
      });
      return new ApiResult({ data: response.data }, null);
    } catch (error: any) {
      Snackbar.show({
        text: "Something went wrong",
        duration: Snackbar.LENGTH_SHORT
      });
      let typeError: "network" | "general" | "http" = "network";
      let messageError = 'msgerrorrequest';
      if (error.response) {
        LogCustome.error("Error HTTP:", error.response.status, error.response.data);
        typeError = 'http';
        messageError = "msgerrorhttp";
      } else if (error.request) {
        LogCustome.error("Error de red:", error.request);
        typeError = 'network';
        messageError = "msgerrorrequest";
      } else {
        LogCustome.error("Error general:", error);
        typeError = 'general';
        messageError = "msgerrorgeneral";
      }
      const networkError: ApiError = {
        type: typeError,
        message: messageError,
      };
      return Promise.resolve(new ApiResult(null, networkError))
    }
  }
}

export default ApiProvider;