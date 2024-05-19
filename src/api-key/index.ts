import { Maildiver } from '../maildiver';
import {
  CreateApiKeyPayload,
  CreateApiKeyRequestOption,
  CreateApiKeyResponse,
  CreateApiKeyResponseSuccess,
  DeleteApiKeyResponse,
  DeleteApiKeyResponseSuccess,
  GetApiKeyResponse,
  GetApiKeyResponseSuccess,
  ListApiKeysResponse,
  ListApiKeysResponseSuccess,
  UpdateApiKeyPayload,
  UpdateApiKeyRequestOption,
  UpdateApiKeyResponse,
  UpdateApiKeyResponseSuccess,
} from './types';

const API_KEY_PATH = '/api-keys';

export class ApiKey {
  constructor(private readonly maildiver: Maildiver) {}

  async list(): Promise<ListApiKeysResponse> {
    return await this.maildiver.get<ListApiKeysResponseSuccess>(API_KEY_PATH);
  }

  async create(
    payload: CreateApiKeyPayload,
    options: CreateApiKeyRequestOption = {},
  ): Promise<CreateApiKeyResponse> {
    return await this.maildiver.post<CreateApiKeyResponseSuccess>(
      API_KEY_PATH,
      payload,
      options,
    );
  }

  async delete(id: string): Promise<DeleteApiKeyResponse> {
    return await this.maildiver.delete<DeleteApiKeyResponseSuccess>(
      `${API_KEY_PATH}/${id}`,
    );
  }

  async update(
    id: string,
    payload: UpdateApiKeyPayload,
    options: UpdateApiKeyRequestOption = {},
  ): Promise<UpdateApiKeyResponse> {
    return await this.maildiver.patch<UpdateApiKeyResponseSuccess>(
      `/${API_KEY_PATH}/${id}`,
      payload,
      options,
    );
  }

  async get(id: string): Promise<GetApiKeyResponse> {
    return await this.maildiver.get<GetApiKeyResponseSuccess>(
      `/${API_KEY_PATH}/${id}`,
    );
  }
}
