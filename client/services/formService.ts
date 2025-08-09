import axios, { AxiosError, AxiosResponse } from 'axios';

const getBaseURL = (): string => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL || 'https://informed-bluebird-right.ngrok-free.app';
  }
  return import.meta.env.VITE_API_BASE_URL || 'https://api.intellidelve.com';
};

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  service_interest: string;
  message: string;
  recaptcha_token: string;
}

export interface PartnershipFormData {
  company_name: string;
  partnership_type: 'background_screening' | 'ai_data_intelligence' | 'business_tech_solutions' | 'others';
  email: string;
  goals: string;
  recaptcha_token: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  interests?: string[];
  recaptcha_token: string;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface FormError {
  field?: string;
  message: string;
  code?: string;
}

export class FormService {
  private static instance: FormService;
  private baseURL: string;
  private timeout: number = 10000;

  constructor() {
    this.baseURL = getBaseURL();
  }

  static getInstance(): FormService {
    if (!FormService.instance) {
      FormService.instance = new FormService();
    }
    return FormService.instance;
  }

  private async submitForm<T>(
    endpoint: string,
    data: T,
    options: {
      timeout?: number;
      retries?: number;
    } =
  ): Promise<FormSubmissionResponse> {
    const { timeout = this.timeout, retries = 2 } = options;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response: AxiosResponse<FormSubmissionResponse> = await axios.post(
          `${this.baseURL}${endpoint}`,
          data,
          {
            timeout,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );

        return response.data;
      } catch (error) {

        if (attempt === retries) {
          throw this.handleFormError(error as AxiosError);
        }

        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw new Error('Maximum retries exceeded');
  }

  private handleFormError(error: AxiosError): FormError {
    if (error.response) {

      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 400:
          return {
            message: data?.message || 'Please check your input and try again.',
            code: 'VALIDATION_ERROR',
            field: data?.field,
          };
        case 429:
          return {
            message: 'Too many requests. Please wait a moment and try again.',
            code: 'RATE_LIMIT_ERROR',
          };
        case 500:
          return {
            message: 'Server error. Please try again later.',
            code: 'SERVER_ERROR',
          };
        default:
          return {
            message: data?.message || 'An unexpected error occurred. Please try again.',
            code: 'UNKNOWN_ERROR',
          };
      }
    } else if (error.request) {

      return {
        message: 'Network error. Please check your connection and try again.',
        code: 'NETWORK_ERROR',
      };
    } else {

      return {
        message: 'An unexpected error occurred. Please try again.',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  async submitContactForm(data: ContactFormData): Promise<FormSubmissionResponse> {

    this.validateContactForm(data);

    return this.submitForm('/contact', data, {
      timeout: 15000,
    });
  }

  async submitPartnershipForm(data: PartnershipFormData): Promise<FormSubmissionResponse> {

    this.validatePartnershipForm(data);

    return this.submitForm('/partnership', data);
  }

  async submitNewsletterForm(data: NewsletterFormData): Promise<FormSubmissionResponse> {

    this.validateNewsletterForm(data);

    return this.submitForm('/newsletter', data);
  }

  private validateContactForm(data: ContactFormData): void {
    const errors: string[] = [];

    if (!data.first_name?.trim()) errors.push('First name is required');
    if (!data.last_name?.trim()) errors.push('Last name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!this.isValidEmail(data.email)) errors.push('Please enter a valid email address');
    if (!data.message?.trim()) errors.push('Message is required');
    if (!data.recaptcha_token) errors.push('Please complete the CAPTCHA verification');

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  private validatePartnershipForm(data: PartnershipFormData): void {
    const errors: string[] = [];

    if (!data.company_name?.trim()) errors.push('Company name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!this.isValidEmail(data.email)) errors.push('Please enter a valid email address');
    if (!data.goals?.trim()) errors.push('Partnership goals are required');
    if (!data.recaptcha_token) errors.push('Please complete the CAPTCHA verification');

    const validPartnershipTypes = ['background_screening', 'ai_data_intelligence', 'business_tech_solutions', 'others'];
    if (!validPartnershipTypes.includes(data.partnership_type)) {
      errors.push('Please select a valid partnership type');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  private validateNewsletterForm(data: NewsletterFormData): void {
    const errors: string[] = [];

    if (!data.email?.trim()) errors.push('Email is required');
    if (!this.isValidEmail(data.email)) errors.push('Please enter a valid email address');
    if (!data.recaptcha_token) errors.push('Please complete the CAPTCHA verification');

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {

      return false;
    }
  }

  getServiceInfo(): {
    baseURL: string;
    environment: string;
    timeout: number;
  } {
    return {
      baseURL: this.baseURL,
      environment: import.meta.env.MODE || 'development',
      timeout: this.timeout,
    };
  }

  updateConfig(config: {
    baseURL?: string;
    timeout?: number;
  }): void {
    if (config.baseURL) {
      this.baseURL = config.baseURL;
    }
    if (config.timeout) {
      this.timeout = config.timeout;
    }
  }
}

export const formService = FormService.getInstance();

export const submitContactForm = (data: ContactFormData) => formService.submitContactForm(data);
export const submitPartnershipForm = (data: PartnershipFormData) => formService.submitPartnershipForm(data);
export const submitNewsletterForm = (data: NewsletterFormData) => formService.submitNewsletterForm(data);

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value?.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`;
  }
  return null;
};

export default formService;
