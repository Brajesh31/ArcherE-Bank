# ⚙️ Configuration

## Backend environment

The database connection in `server/db.js` reads these environment variables:

| Name | Required for non-default setup | Description |
|---|---:|---|
| `DB_HOST` | Yes | MySQL hostname |
| `DB_USER` | Yes | Database login |
| `DB_PASSWORD` | Yes | Database password |
| `DB_NAME` | Yes | Database name |

The current fallback values are `localhost`, `root`, an empty password and `archerbank`. These defaults are only appropriate for a disposable local environment. Do not rely on them in shared infrastructure.

## Frontend API URL

The root `.env.example` contains `NEXT_PUBLIC_API_BASE_URL=http://localhost:5555`. In Next.js, variables prefixed with `NEXT_PUBLIC_` are intended for browser exposure. Never put secrets, database credentials, signing keys or private tokens in such variables.

The exact frontend consumption should be checked in the UI code before changing the name or assuming the setting is wired into every request.

## CORS and ports

The backend currently hard-codes:

- HTTP server port: `5555`.
- CORS origin: `http://localhost:3000`.
- Socket.IO CORS origin: `http://localhost:3000`.

A future configuration change should use an explicit comma-separated allowlist, validate it at startup, and reject wildcard origins when credentialed requests are enabled.

## Local setup example

Create `server/.env` with local-only values:

```dotenv
DB_HOST=127.0.0.1
DB_USER=archer_dev
DB_PASSWORD=replace_with_local_secret
DB_NAME=archerbank
```

Keep actual `.env` files out of Git. Rotate any credential that has ever been committed or shared.
