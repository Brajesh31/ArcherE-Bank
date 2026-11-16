# 🛠️ Runbook: Local development

## Purpose

Start and stop frontend, backend and MySQL for isolated learning and testing.

## Startup

1. Confirm Node.js, npm and MySQL.
2. Start local MySQL.
3. Create disposable archerbank database.
4. Create least-privilege local DB user.
5. Configure server/.env.
6. Install root dependencies with npm ci.
7. Install backend dependencies with cd server && npm ci.
8. Start backend with npm start from server/.
9. Start frontend with npm run dev from root.
10. Open the local site and inspect logs.

~~~mermaid
flowchart LR
    DB[(MySQL)] --> API[Express :5555]
    API <--> UI[Next.js :3000]
    UI <--> User([Browser])
~~~

## Safe-data checklist

Use synthetic names and identifiers. Never use real passwords, identity values, phone numbers or card data. Do not expose port 5555 publicly. Do not reuse production credentials. Reset disposable records between experiments.

## Shutdown

Stop frontend and backend with Ctrl+C. Stop MySQL only if no other task needs it.

## Diagnostics

| Symptom | First check |
|---|---|
| Frontend fails | Root npm install and Next logs |
| API unavailable | Backend logs and port 5555 |
| DB refused | MySQL service and local env |
| CORS error | Exact origin, currently localhost:3000 |
| No socket update | Connection and event name |

See [Troubleshooting](../troubleshooting.md).
