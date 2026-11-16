# ⚙️ Configuration reference

## 1. Configuration sources

The backend loads dotenv in server/db.js and reads MySQL values from process environment. Express and Socket.IO CORS origins and backend port are hard-coded in server/server.js.

## 2. Backend environment variables

| Variable | Meaning | Current fallback |
|---|---|---|
| DB_HOST | MySQL hostname | localhost |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | Empty string |
| DB_NAME | Database/schema | archerbank |

The root/empty-password fallback is not suitable for production. Use a dedicated account and strong local-only password.

## 3. Frontend environment

The root .env.example documents NEXT_PUBLIC_API_BASE_URL as a local API URL convention. Check actual frontend call sites before assuming every request uses it.

NEXT_PUBLIC variables may be embedded in browser assets. Never put DB passwords, signing keys, session secrets or private tokens in them.

## 4. Ports and CORS

| Service | Current value |
|---|---|
| Next.js development | 3000 by default |
| Express and Socket.IO | 5555, hard-coded |
| MySQL | Local DB configuration |

Express and Socket.IO currently allow http://localhost:3000. A future deployment should use a validated server-only allowlist. Avoid wildcard origins with credentialed requests.

## 5. Local example

Create server/.env:

~~~dotenv
DB_HOST=127.0.0.1
DB_USER=archer_dev
DB_PASSWORD=replace_with_local_secret
DB_NAME=archerbank
~~~

## 6. Recommended startup validation

A hardened server should validate required variables, reject weak production defaults, parse ports as bounded integers, validate origins, fail fast with redacted errors and never log secrets.

## 7. Secret rotation

If a credential is committed or shared, revoke it at the provider, review access logs, remove it from active configuration and assess repository history. Deleting the latest file does not invalidate an exposed credential.
