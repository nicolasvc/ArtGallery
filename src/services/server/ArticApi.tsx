import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { logger } from "react-native-logs";

const log = logger.createLogger({
    transportOptions: {
      colors: {
        info: "blueBright",
        warn: "yellowBright",
        error: "redBright",
        debug: "white",
      },
    },
  });


class ArticApi {
    private api: AxiosInstance;
  
    constructor(baseUrl: string) {
      this.api = axios.create({
        baseURL: baseUrl,
        responseType:'json'
      });
      this.api.interceptors.response.use(
        (response) => {
          log.info('Response service', response.data);
          log.info('Status Service', response.status);
          return response;
        },
        (error) => {
          log.error('Error Service', error);
          return Promise.reject(error);
        }
      );
      
    }

    async getWithParams<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        try {
          const response: AxiosResponse = await this.api.get(endpoint, {
            params: params,
          });
          return response.data as T; // Realiza el parseo al tipo genérico T
        } catch (error) {
          throw error;
        }
      }
  }
  
  export default ArticApi;