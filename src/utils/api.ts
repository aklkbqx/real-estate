import axios, { AxiosError, isAxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
// import { useAuthStore } from '../stores/authStore';

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ToastFunction {
  (type: 'success' | 'error' | 'info', title: string, message: string): void;
}

/**
 * Interface for custom token storage implementation
 * Allows using different storage mechanisms (localStorage, cookies, secure storage, etc.)
 */
export interface TokenStorage {
  getToken(): Promise<string | null>;
  saveToken(token: string): Promise<void>;
  removeToken(): Promise<void>;
}

/**
 * Customizable error messages for different error scenarios
 * Supports localization/i18n
 */
export interface ErrorMessages {
  networkError?: string;
  unauthorized?: string;
  forbidden?: string;
  validationError?: string;
  serverError?: string;
  unknownError?: string;
  rateLimited?: string;
  timeout?: string;
}

/**
 * Enhanced API Configuration with full customization support
 */
export interface APIConfig {
  /** Base URL for API requests */
  baseURL?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Maximum number of retry attempts */
  maxRetries?: number;
  /** Base delay between retries in milliseconds */
  retryDelay?: number;
  /** Token key for storage (default: 'token') */
  tokenKey?: string;
  /** Custom token storage implementation */
  tokenStorage?: TokenStorage;
  /** Handler called when user is unauthorized (401) */
  unauthorizedHandler?: () => Promise<void> | void;
  /** Paths that should not include authentication headers */
  excludeAuthPaths?: string[];
  /** Custom error messages for localization */
  errorMessages?: ErrorMessages;
  /** Custom function to resolve base URL (e.g., from env vars) */
  baseURLResolver?: () => string;
  /** Custom authorization header format (default: 'Bearer {token}') */
  authHeaderFormatter?: (token: string) => string;
}

export interface ApiErrorDetail {
  type?: string;
  value?: string;
  msg: string;
  path?: string;
  param?: string;
  location?: string;
}

export interface ApiErrorResponse {
  status: string;
  data: {
    message?: string;
    errors?: ApiErrorDetail[];
  } | ApiErrorDetail[];
}

export interface ApiResponseWithMeta<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

/**
 * Default token storage implementation using localStorage/sessionStorage
 */
class DefaultTokenStorage implements TokenStorage {
  private tokenKey: string;

  constructor(tokenKey: string = 'token') {
    this.tokenKey = tokenKey;
  }

  async getToken(): Promise<string | null> {
    try {
      return localStorage.getItem(this.tokenKey) ?? sessionStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async saveToken(token: string): Promise<void> {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw new Error('Failed to save token');
    }
  }

  async removeToken(): Promise<void> {
    try {
      localStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.tokenKey);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }
}

/**
 * Default error messages in English
 */
const DEFAULT_ERROR_MESSAGES: Required<ErrorMessages> = {
  networkError: 'No internet connection',
  unauthorized: 'Unauthorized. Please login again.',
  forbidden: 'Access forbidden',
  validationError: 'Please check your input',
  serverError: 'Server error. Please try again later.',
  unknownError: 'An unknown error occurred. Please try again.',
  rateLimited: 'Too many requests. Please try again later.',
  timeout: 'Request timeout. Please try again.',
};

/**
 * Resolved API configuration with all defaults applied (internal use only)
 */
interface ResolvedAPIConfig {
  baseURL: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
  tokenKey: string;
  tokenStorage?: TokenStorage;
  unauthorizedHandler?: () => Promise<void> | void;
  excludeAuthPaths: string[];
  errorMessages: ErrorMessages;
  baseURLResolver?: () => string;
  authHeaderFormatter: (token: string) => string;
}

class API_UTILS {
  private static instances: Map<string, API_UTILS> = new Map();
  private static unauthorizedAlertShown = false;
  private axiosInstance: AxiosInstance;
  private config: ResolvedAPIConfig;
  private tokenStorage: TokenStorage;
  private errorMessages: Required<ErrorMessages>;

  public static readonly apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  public static readonly wsUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000';

  /**
   * Convert relative URL to absolute URL with API base
   * @param path - Relative path like "/uploads/settings/logo.png" or full URL
   * @returns Full URL like "https://lot-api.nexoracore.info/uploads/settings/logo.png"
   */
  public static getImageUrl(path: string | null | undefined): string {
    if (!path) return '';
    // If already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // If it's a data URL, return as is
    if (path.startsWith('data:')) {
      return path;
    }
    // Otherwise, prepend the API base URL
    const baseUrl = API_UTILS.apiUrl.replace(/\/$/, ''); // Remove trailing slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  /**
   * Get friendly error message from API error
   * Uses configurable error messages for localization
   */
  public getFriendlyErrorMessage(error: unknown): { message: string; fieldErrors?: Record<string, string> } {
    let message = this.errorMessages.unknownError;
    let fieldErrors: Record<string, string> | undefined;

    if (isAxiosError(error) && error.response?.data) {
      const rawData = error.response.data as any;

      // Simple error format: { message: string } or plain string
      if (typeof rawData === 'string' && rawData.trim()) {
        return { message: rawData };
      }
      if (rawData && typeof rawData === 'object' && typeof rawData.message === 'string') {
        return { message: rawData.message };
      }

      // Backend fail format: { status: 'fail', data: '...' }
      if (
        rawData &&
        typeof rawData === 'object' &&
        typeof (rawData as any).data === 'string' &&
        (rawData as any).data.trim()
      ) {
        return { message: (rawData as any).data };
      }

      const data = rawData as ApiErrorResponse;

      // Handle 400 Validation Errors - Array format (New)
      if (error.response.status === 400 && Array.isArray(data.data)) {
        const msgs = data.data
          .map((err) => (typeof err?.msg === 'string' ? err.msg.trim() : ''))
          .filter(Boolean);

        message = msgs.length > 0 ? Array.from(new Set(msgs)).join(' / ') : this.errorMessages.validationError;
        fieldErrors = {};
        data.data.forEach((err) => {
          const field = err.param || err.path;
          if (field) {
            fieldErrors![field] = err.msg;
          }
        });
        // If there's only one error and it's not field specific or we want to show it as main message
        if (data.data.length === 1 && !Object.keys(fieldErrors).length) {
          message = data.data[0].msg;
        }
      }
      // Handle 400 Validation Errors - Object with errors array format (Legacy/Previous)
      else if (error.response.status === 400 && !Array.isArray(data.data) && data.data?.errors) {
        message = this.errorMessages.validationError;
        fieldErrors = {};
        data.data.errors.forEach((err) => {
          const field = err.param || err.path;
          if (field) {
            fieldErrors![field] = err.msg;
          }
        });
        // If there's only one error and it's not field specific or we want to show it as main message
        if (data.data.errors.length > 0 && !Object.keys(fieldErrors).length) {
          message = data.data.errors[0].msg;
        }
      }
      // Handle 409/500 or other errors with message
      else if (!Array.isArray(data.data) && data.data?.message) {
        message = data.data.message;
      }
      // Fallback to top level message if exists (legacy support)
      else if ((data as any).message) {
        message = (data as any).message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { message, fieldErrors };
  }

  /**
   * Handle API error with optional error handler and toast
   * @deprecated Use instance method getFriendlyErrorMessage instead
   */
  public static handleApiError(
    error: unknown,
    handleErrorMessage?: (
      message: string,
      errorPage?: boolean,
      showToast?: ToastFunction
    ) => void,
    showToast?: ToastFunction
  ): string {
    // Create a temporary instance to get error messages
    const tempInstance = API_UTILS.getInstance('temp');
    const { message: errorMessage } = tempInstance.getFriendlyErrorMessage(error);

    handleErrorMessage?.(errorMessage, false, showToast);
    showToast?.('error', 'Error', errorMessage);

    return errorMessage;
  }

  private constructor(config?: Partial<APIConfig>) {
    // Resolve baseURL
    const resolvedBaseURL = config?.baseURLResolver?.() ??
      config?.baseURL ??
      API_UTILS.apiUrl;

    // Build complete config with defaults
    this.config = {
      baseURL: resolvedBaseURL,
      timeout: config?.timeout ?? 15000,
      maxRetries: config?.maxRetries ?? 3,
      retryDelay: config?.retryDelay ?? 1000,
      tokenKey: config?.tokenKey ?? 'token',
      tokenStorage: config?.tokenStorage,
      unauthorizedHandler: config?.unauthorizedHandler,
      excludeAuthPaths: config?.excludeAuthPaths ?? [],
      errorMessages: config?.errorMessages ?? {},
      baseURLResolver: config?.baseURLResolver,
      authHeaderFormatter: config?.authHeaderFormatter ?? ((token: string) => `Bearer ${token}`),
    };

    // Initialize token storage
    this.tokenStorage = this.config.tokenStorage ?? new DefaultTokenStorage(this.config.tokenKey);

    // Merge error messages with defaults
    this.errorMessages = {
      ...DEFAULT_ERROR_MESSAGES,
      ...this.config.errorMessages,
    };

    this.axiosInstance = this.createAxiosInstance();
    this.setupRetryLogic();
    this.setupInterceptors();
  }

  public static getInstance(name: string = 'default', config?: Partial<APIConfig>): API_UTILS {
    if (!API_UTILS.instances.has(name)) {
      API_UTILS.instances.set(name, new API_UTILS(config));
    }
    const instance = API_UTILS.instances.get(name)!;
    if (config && typeof config === 'object') {
      instance.updateConfig(config);
    }
    return instance;
  }

  private updateConfig(config?: Partial<APIConfig>): void {
    if (!config) return;

    // Update config
    if (config.baseURL) this.config.baseURL = config.baseURL;
    if (config.timeout) this.config.timeout = config.timeout;
    if (config.maxRetries) this.config.maxRetries = config.maxRetries;
    if (config.retryDelay) this.config.retryDelay = config.retryDelay;
    if (config.tokenKey) this.config.tokenKey = config.tokenKey;
    if (config.tokenStorage) {
      this.tokenStorage = config.tokenStorage;
      this.config.tokenStorage = config.tokenStorage;
    }
    if (config.unauthorizedHandler) this.config.unauthorizedHandler = config.unauthorizedHandler;
    if (config.excludeAuthPaths) this.config.excludeAuthPaths = config.excludeAuthPaths;
    if (config.authHeaderFormatter) this.config.authHeaderFormatter = config.authHeaderFormatter;
    if (config.errorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...config.errorMessages,
      };
      this.config.errorMessages = config.errorMessages;
    }
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private setupRetryLogic(): void {
    axiosRetry(this.axiosInstance, {
      retries: this.config.maxRetries,
      retryDelay: (retryCount) => {
        const delay = Math.min(
          this.config.retryDelay * Math.pow(2, retryCount - 1),
          30000
        );
        const jitter = Math.random() * 0.1 * delay;
        return delay + jitter;
      },
      retryCondition: (error: AxiosError) => {
        const method = (error.config?.method || 'get').toLowerCase();
        const isSafeMethod = method === 'get' || method === 'head';

        const isNetworkError = !error.response;
        const isTimeout = error.code === 'ECONNABORTED';
        const isServerError =
          error.response?.status && error.response.status >= 500;
        const isRateLimited = error.response?.status === 429;

        // Avoid retrying non-idempotent requests (e.g., POST uploads / financial actions)
        if (!isSafeMethod) {
          return Boolean(isRateLimited);
        }

        return Boolean(isNetworkError || isTimeout || isServerError || isRateLimited);
      },
      onRetry: (retryCount, _error, requestConfig) => {
        console.log(
          `🔄 Retrying request (${retryCount}/${this.config.maxRetries}):`,
          requestConfig.url
        );
      },
    });
  }

  private async handleUnauthorized(): Promise<void> {
    // Prevent multiple alerts
    if (API_UTILS.unauthorizedAlertShown) return;
    API_UTILS.unauthorizedAlertShown = true;

    // Clear token
    await this.tokenStorage.removeToken();

    // Call custom handler if provided
    if (this.config.unauthorizedHandler) {
      await this.config.unauthorizedHandler();
    }
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      async config => {
        if (!navigator.onLine) {
          return Promise.reject(new Error(this.errorMessages.networkError));
        }

        try {
          const url = config.url || '';
          // Check if this path should exclude authentication
          const shouldExcludeAuth = this.config.excludeAuthPaths.some(path =>
            url === path || url.endsWith(path)
          );

          if (!shouldExcludeAuth) {
            const token = await this.tokenStorage.getToken();
            if (token) {
              config.headers = config.headers || {};
              config.headers.Authorization = this.config.authHeaderFormatter(token);
            }
          }
        } catch (error) {
          console.warn('⚠️ Failed to get auth token:', error);
        }

        // Some backends treat GET/HEAD requests with Content-Type as a bad request.
        // Ensure we don't send Content-Type unless we actually have a body.
        const method = (config.method || 'get').toLowerCase();
        if (method === 'get' || method === 'head') {
          if (config.headers) {
            delete (config.headers as any)['Content-Type'];
            delete (config.headers as any)['content-type'];
          }
        }

        if (config.data instanceof FormData) {
          delete (config.headers as any)['Content-Type'];
          delete (config.headers as any)['content-type'];
        }

        (config as any).metadata = { startTime: Date.now() };

        return config;
      },
      error => {
        console.error('🔴 Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const status = error.response?.status;
        const url = error.config?.url;
        const skipUnauthorized = Boolean((error.config as any)?.skipUnauthorized);
        const suppressErrorLog = Boolean((error.config as any)?.suppressErrorLog);

        const responseData = error.response?.data;
        const responsePreview = (() => {
          try {
            if (typeof responseData === 'string') return responseData.slice(0, 500);
            if (responseData && typeof responseData === 'object') return JSON.stringify(responseData).slice(0, 500);
            return undefined;
          } catch {
            return undefined;
          }
        })();

        // Check if this is an excluded auth path (e.g., login endpoint)
        const shouldExcludeAuth = this.config.excludeAuthPaths.some(path =>
          url === path || (typeof url === 'string' && url.endsWith(path))
        );

        if (!suppressErrorLog) {
          if (status === 401) {
            console.warn(`🔴 API Error ${status}:`, url, error.message, responsePreview);
          } else {
            console.error(`🔴 API Error ${status}:`, url, error.message, responsePreview);
          }
        }

        switch (status) {
          case 401:
            // Login failure should not trigger global logout/redirect
            if (!shouldExcludeAuth && !skipUnauthorized) {
              await this.handleUnauthorized();
            }
            break;
          case 403:
            console.warn('🚫 Forbidden access attempt:', url);
            break;
          case 429:
            {
              const retryAfter = error.response?.headers['retry-after'];
              if (retryAfter) {
                console.warn(`⏰ Rate limited. Retry after: ${retryAfter}s`);
              }
              break;
            }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Save token for API authentication
   */
  public async saveTokenAndLogin(token: string): Promise<void> {
    await this.tokenStorage.saveToken(token);
    API_UTILS.unauthorizedAlertShown = false;
  }

  /**
   * Get token for API authentication
   */
  public async getToken(): Promise<string | null> {
    return await this.tokenStorage.getToken();
  }

  /**
   * Remove token (logout)
   */
  public async removeToken(): Promise<void> {
    await this.tokenStorage.removeToken();
  }

  /**
   * Check if user is authenticated
   */
  public async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return Boolean(token);
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseWithMeta<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseWithMeta<T>> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseWithMeta<T>> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseWithMeta<T>> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseWithMeta<T>> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public async uploadFile<T = any>(
    url: string,
    file: File | Blob,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponseWithMeta<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.axiosInstance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress?.(progress);
        }
      },
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default API_UTILS;