import { ReactElement, ReactNode } from 'react';
import { PostOption, RequireAtLeastOne } from '../../common/types';

/**
 * Send email
 */
export type SendEmailPayload = {
  from: string;
  to: string;
  subject: string;
} & EmailBody;

export type EmailBody = RequireAtLeastOne<{
  text?: string;
  html?: string;
  react?: ReactElement | ReactNode | null;
  markdownFile?: string;
}>;

export type FinalEmailBody = Omit<
  EmailBody,
  'react' | 'markdown' | 'markdownPath' | 'markdownUrl'
> &
  Omit<SendEmailPayload, keyof EmailBody>;

export type SendEmailRequestOption = PostOption & {};

export type SendEmailResponse =
  | SendEmailResponseSuccess
  | SendEmailResponseError;

export type SendEmailResponseSuccess = {
  message: string;
  data: SendEmailResponseSuccessData;
};

export type SendEmailResponseSuccessData = {
  email_id: string;
};

export type SendEmailResponseError = {
  message: string;
};
