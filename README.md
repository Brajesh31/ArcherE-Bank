# ArcherE-Bank

ArcherE-Bank is a banking-themed learning prototype with a Next.js frontend and a separate Express/MySQL/Socket.IO backend. It demonstrates account registration/login, generated card details, balances, transfers, requests, trades, and real-time dashboard updates.

## Stack

- Next.js 15, React 19, TypeScript, CSS Modules.
- Express, MySQL, Socket.IO, cookie-parser, CORS, and dotenv.
- Frontend under `app/`; backend under `server/`.

## Local development

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm start
```

The backend listens on port `5555` and the frontend expects local development on port `3000`.

## Important security status

This is not production banking software. The current server stores plaintext passwords, a SHA-256 password digest without a password-specific salt, generated card numbers/CVVs, and account identifiers. Replace these behaviors with a vetted password hash, tokenized payment-provider data, authorization middleware, TLS, validation, audit logging, and a migration-managed schema before handling real users or money.

See [`SECURITY.md`](./SECURITY.md) and [`docs/database.md`](./docs/database.md).

Last updated: 2026-10-21 19:47 UTC
