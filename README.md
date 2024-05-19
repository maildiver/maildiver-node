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

```typescript
import { maildiver } from './maildiver';

await maildiver.email.send({
  to: 'sudo@example.com',
  from: 'you@example.com',
  subject: 'Email from the Maildiver Node.js SDK',
  html: '<p>Maildiver Node.js SDK is awesome!</p>',
});
```
