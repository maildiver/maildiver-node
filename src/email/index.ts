import { renderAsync } from '@react-email/render';
import { ReactElement } from 'react';

import { readFileSync } from 'node:fs';

import { marked } from 'marked';
import { Maildiver } from '../maildiver';
import {
  FinalEmailBody,
  SendEmailPayload,
  SendEmailRequestOption,
  SendEmailResponseSuccess,
} from './types';

const EMAIL_PATH = 'emails';

export class Email {
  constructor(private readonly maildiver: Maildiver) {}

  async send(payload: SendEmailPayload, options: SendEmailRequestOption = {}) {
    const finalPayload = await this.parseHTML(payload);

    return await this.maildiver.post<SendEmailResponseSuccess>(
      EMAIL_PATH,
      finalPayload,
      options,
    );
  }

  async parseHTML(payload: SendEmailPayload): Promise<FinalEmailBody> {
    if (payload.html) {
      return payload;
    }
    if (payload.react && payload.markdownFile) {
      throw new Error('You can only use react or markdownFile, not both');
    }

    if (payload.react) {
      return await this.parseHtmlFromReactEmail(payload);
    }

    if (payload.markdownFile) {
      return await this.parseHtmlFromMarkdown(payload);
    }

    return payload;
  }

  async parseHtmlFromReactEmail(
    payload: SendEmailPayload,
  ): Promise<FinalEmailBody> {
    const html = await renderAsync(payload.react as ReactElement);
    return this.appendHtmlToPayload(payload, html);
  }

  async parseHtmlFromMarkdown(
    payload: SendEmailPayload,
  ): Promise<FinalEmailBody> {
    const markdownFile = readFileSync(payload.markdownFile!, 'utf-8');

    if (!markdownFile) {
      throw new Error('Markdown file is not found');
    }

    const html = await marked(markdownFile);
    return this.appendHtmlToPayload(payload, html);
  }

  appendHtmlToPayload(payload: SendEmailPayload, html: string): FinalEmailBody {
    const { react, markdownFile, ...rest } = payload;
    return { ...rest, html };
  }
}
