import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LogCustome } from '../../utils/Utils';
import Snackbar from 'react-native-snackbar';
import ApiResult from './utils/Response';

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
    } catch (error) {
      Snackbar.show({
        text: "Something went wrong ",
        duration: Snackbar.LENGTH_SHORT
      });
      return Promise.reject(null)
    }
  }
}

export default ApiProvider;