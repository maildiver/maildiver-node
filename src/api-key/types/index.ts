import { PostOption } from '../../common/types';

/**
 * Create API Key
 */
export type CreateApiKeyPayload = {
  name: string;
  domain_name: string;
  permission: 'full_access' | 'read_only' | 'send_only';
};

export type CreateApiKeyRequestOption = PostOption & {};

export type CreateApiKeyResponse =
  | CreateApiKeyResponseSuccess
  | CreateApiKeyResponseError;

export type CreateApiKeyResponseSuccess = {
  message: string;
  data: CreateApiKeyResponseSuccessData;
};

export type CreateApiKeyResponseSuccessData = {
  api_key: string;
  api_id: string;
};

export type CreateApiKeyResponseError = {
  message: string;
};

/**
 * List API Keys
 */
export type ListApiKeysResponse =
  | ListApiKeysResponseSuccess
  | ListApiKeysResponseError;

export type ListApiKeysResponseSuccess = {
  message: string;
  data: ListApiKeysResponseData[];
};

export type ListApiKeysResponseData = Pick<
  CreateApiKeyPayload,
  'name' | 'domain_name' | 'permission'
>;

export type ListApiKeysResponseError = {
  message: string;
};

/**
 * Get API key
 */
export type GetApiKeyResponse =
  | GetApiKeyResponseSuccess
  | GetApiKeyResponseError;

export type GetApiKeyResponseSuccess = {
  message: string;
  data: ListApiKeysResponseData;
};

export type GetApiKeyResponseError = {
  message: string;
};

/**
 * Update API Key
 */
export type UpdateApiKeyResponse =
  | UpdateApiKeyResponseSuccess
  | UpdateApiKeyResponseError;

export type UpdateApiKeyRequestOption = PostOption & {};

export type UpdateApiKeyPayload = Pick<
  CreateApiKeyPayload,
  'name' | 'permission'
>;

export type UpdateApiKeyResponseSuccess = {
  message: string;
};

export type UpdateApiKeyResponseError = {
  message: string;
};

/**
 * Delete API Key
 */
export type DeleteApiKeyResponse =
  | DeleteApiKeyResponseSuccess
  | DeleteApiKeyResponseError;

export type DeleteApiKeyResponseSuccess = {
  message: string;
};

export type DeleteApiKeyResponseError = {
  message: string;
};
