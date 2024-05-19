import { deepStrictEqual } from 'node:assert';
import { after, before, describe, it, mock } from 'node:test';

import {
  SendEmailPayload,
  SendEmailResponseSuccess,
} from '../../src/email/types';
import { maildiverClient } from './util';

before(() => {
  mock.method(global, 'fetch');
});

after(() => {
  mock.reset();
  mock.restoreAll();
});

describe('Email', () => {
  it('should send email', async () => {
    const mockedFetchRes: SendEmailResponseSuccess = {
      message: 'Email sent',
      data: {
        email_id: 'email_id',
      },
    };

    mock.method(global, 'fetch', () => {
      return {
        ok: true,
        json: async () => mockedFetchRes,
      };
    });

    const emailPayload: SendEmailPayload = {
      from: 'sudo@maildiver.com',
      to: 'user@maildiver.com',
      subject: 'Sudo',
      html: '<h1> Sudo is the best cat </h1>',
      text: 'Sudo is the best cat',
    };

    const res = await maildiverClient.email.send(emailPayload);
    deepStrictEqual(res, mockedFetchRes);
  });

  it('should throw error if both react and markdownFile are provided', async () => {
    const emailPayload: SendEmailPayload = {
      from: 'sudo@maildiver.com',
      to: 'user@maildiver.com',
      subject: 'Sudo',
      react: '<h1> Sudo is the best cat </h1>',
      markdownFile: 'path/to/file',
    };

    const error = await maildiverClient.email
      .send(emailPayload)
      .catch((e) => e);

    deepStrictEqual(
      error.message,
      'You can only use react or markdownFile, not both',
    );
  });

  it('should throw error if markdown file is not found', async () => {
    const emailPayload: SendEmailPayload = {
      from: 'sudo@maildiver.com',
      to: 'user@maildiver.com',
      subject: 'Sudo',
      markdownFile: 'path/to/file',
    };

    const error = await maildiverClient.email
      .send(emailPayload)
      .catch((e) => e);

    deepStrictEqual(
      error.message,
      "ENOENT: no such file or directory, open 'path/to/file'",
    );
  });

  it('should parse html from react', async () => {
    const emailPayload: SendEmailPayload = {
      from: 'sudo@maildiver.com',
      to: 'user@maildiver.com',
      subject: 'Sudo',
      react: '<h1> Sudo is the best cat </h1>',
    };

    const { html } = await maildiverClient.email.parseHTML(emailPayload);
    deepStrictEqual((html?.length ?? 0) > 0, true);
  });
});
