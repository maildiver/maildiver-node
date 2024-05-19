export type MaildiverConfig = {
  apiKey: string;
};

export type PostOption = {
  query?: { [key: string]: string | number | boolean };
};

export type GetOption = {
  query?: Record<string, string | number | boolean>;
};

export type PatchOption = {
  query?: Record<string, string | number | boolean>;
};

export type DeleteOpion = {
  query?: Record<string, string | number | boolean>;
};

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export const ErrorCodes = {
  api_key_missing: 401,
  api_key_invalid: 403,
  required_field_missing: 400,
  bad_request: 400,
  rate_limit_exceeded: 429,
  method_not_allowed: 405,
  not_found: 404,
  internal_server_error: 500,
} as const;

export type ErrorCodesType = keyof typeof ErrorCodes;

export type ErrorResponse = {
  message: string;
  code: ErrorCodesType;
};

export type GenericResponse<T> = {
  message: string;
  data?: T;
};
