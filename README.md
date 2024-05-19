# Maildiver Node.js SDK

Maildiver Node.js SDK is a Node.js library for interacting with the Maildiver API.

## Install

### NPM

```bash
npm install maildiver
```

### Yarn

```bash
yarn add maildiver
```

## Usage

1. Create a Maildiver client.

```typescript
import { Maildiver } from 'maildiver';

const config = {
  apiKey: <your-api-key>;
};

const maildiver = new Maildiver(config);
```

2. Import the client and use the methods.

### Send an email with the HTML content

```typescript
import { maildiver } from './maildiver';

await maildiver.email.send({
  to: 'sudo@example.com',
  from: 'you@example.com',
  subject: 'Email from the Maildiver Node.js SDK',
  html: '<p>Maildiver Node.js SDK is awesome!</p>',
});
```

### Send an email with the dynamic variables in the HTML content

```typescript
import { maildiver } from './maildiver';

await maildiver.email.send({
  to: 'sudo@example.com',
  from: 'you@example.com',
  subject: 'Email from the Maildiver Node.js SDK',
  html: '<p>Hi, {{ name }}! Maildiver Node.js SDK is awesome!</p>',
  variables: {
    values: {
      name: 'Developer Name',
    },
    default_values: {
      name: 'Developer',
    },
  },
});
```

It's highly recommended to use the `default_values` in the `variables` object to avoid low-quality emails.

### Send an email with the markdown content

```typescript
import { maildiver } from './maildiver';

await maildiver.email.send({
  to: 'sudo@example.com',
  from: 'you@example.com',
  subject: 'Email from the Maildiver Node.js SDK',
  markdownFile: 'path/to/markdown.md',
});
```

If you include the dynamic variables in the markdown file, you can use the `variables` object as well.
