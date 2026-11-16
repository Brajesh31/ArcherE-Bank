# 🛠️ Troubleshooting guide

Use this guide for local development with synthetic data. Never paste passwords, cookies, connection strings, identity values or card data into reports.

## Frontend does not start

Check node/npm versions, run npm ci from root, check port 3000, run npm run dev and inspect the first meaningful error. Review TypeScript and Next.js configuration.

## Backend does not start

Run npm ci inside server/, confirm server/.env exists locally, verify MySQL is running, check DB host/user/password/schema, check port 5555 and run node --check server.js.

## MySQL connection fails

Possible causes: stopped service, missing database, insufficient user privileges, misspelled environment variables or non-default host/port. Test with a disposable local account. Never print the password.

## Browser reports CORS error

Current backend permits http://localhost:3000. Check exact origin including protocol and port. Do not fix by allowing every origin with credentials.

## Frontend cannot reach API

Confirm backend listens on port 5555, inspect Network panel, check API URL used by component, inspect backend logs and verify CORS.

## Login or dashboard behaves unexpectedly

Use synthetic accounts only. Current session/account lookup has security weaknesses. Do not work around authorization errors by exposing or reusing random account codes.

## Socket.IO does not update dashboard

Check backend process, socket errors, exact event names and WebSocket activity. Do not treat handshake codes as secure identity.

## Build or lint fails

~~~bash
npm ci
npm run build
npx eslint .
~~~

The package lint script currently calls next lint. Verify installed versions before changing scripts.

## Reporting an issue

Include OS, Node/npm version, browser, command, route, sanitized error and reproduction steps. Remove credentials, personal information, cookies, tokens and DB records.
