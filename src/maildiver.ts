import { isKnownError } from './common/guards/generic__guards';
import {
  DeleteOpion,
  ErrorResponse,
  GenericResponse,
  GetOption,
  MaildiverConfig,
  PatchOption,
  PostOption,
} from './common/types';
import { Email } from './email';

const HOST = 'https://api.maildiver.com';
const VERSION = 'v1';
const BASE_URL = `${HOST}/${VERSION}`;

export class Maildiver {
  private readonly headers: Headers;

  // private readonly apiKey = new ApiKey(this); // it's ready, but will be used in the future
  readonly email = new Email(this);

  constructor(private readonly config: MaildiverConfig) {
    if (!config.apiKey || !this.config?.apiKey) {
      // TODO add how to pass the API key in the error message
      throw new Error(`API key is required`);
    }

    this.headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.config.apiKey}`,
    });
  }

  async request<T>(path: string, options = {}): Promise<GenericResponse<T>> {
    const res = await fetch(`${BASE_URL}/${path}`, options);

    if (!res.ok) {
      let error: ErrorResponse = {
        message: 'Unknown error',
        code: 'bad_request',
      };

      try {
        const errorData = await res.json();
        const errorMessage =
          errorData.Message || errorData.message || 'Unknown error';

        if (isKnownError(error)) {
          return { message: errorMessage };
        }

        // TODO: improve the unknown error message
        return {
          message: errorMessage,
        };
      } catch (err) {
        if (err instanceof Error) {
          return {
            message: err.message,
          };
        }

        return {
          message: 'Unknown error',
        };
      }
    }

    const body = await res.json();
    const successMessage = body.message ?? 'OK';
    return { data: body?.data, message: successMessage };
  }

  async get<T>(path: string, getOptions: GetOption = {}) {
    const options = {
      ...getOptions,
      methd: 'GET',
      headers: this.headers,
    };

    return this.request<T>(path, options);
  }

  async post<T>(path: string, body: unknown, postOptions: PostOption = {}) {
    const options = {
      ...postOptions,
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers,
    };

    return this.request<T>(path, options);
  }

  async patch<T>(path: string, body: unknown, patchOptions: PatchOption = {}) {
    const options = {
      ...patchOptions,
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    };

    return this.request<T>(path, options);
  }

  async delete<T>(path: string, deleteOptions: DeleteOpion = {}) {
    const options = {
      ...deleteOptions,
      method: 'DELETE',
      headers: this.headers,
    };

    return this.request<T>(path, options);
  }
}
