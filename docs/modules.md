# 🧱 Module guide

## Current boundaries

The frontend is organized by route and component areas. The backend combines transport, SQL and business logic in one file.

## Frontend modules

| Module | Location | Responsibility |
|---|---|---|
| Landing | app/page.tsx | Public home |
| Shell | app/layout.tsx | Root layout |
| Header | app/components/header.tsx | Navigation |
| Footer | app/components/footer.tsx | Footer |
| About | app/components/about.tsx | Project introduction |
| Card visual | app/components/visa.tsx | Card-themed UI |
| Account | app/account/ | Login |
| Registration | app/account/register/ | Registration |
| Dashboard | app/dashboard/ | Account workspace |
| Transfer | dashboard/components/transfer.tsx | Transfer UI |
| Request | dashboard/components/request.tsx | Request UI |
| Trades | dashboard/components/trades.tsx | Activity |
| Card art | dashboard/components/visaart.tsx | Card presentation |

## Backend modules

| Module | Location | Responsibility |
|---|---|---|
| Express app | server/server.js | Middleware and routes |
| Account operations | Inline handlers | Registration, login, account lookup |
| Transfer operations | Inline handlers | Balance/history changes |
| Request operations | Inline handlers | Create, accept, reject |
| Realtime | Inline Socket.IO handlers | Activity and request events |
| DB connector | server/db.js | MySQL connection |

## Current dependency direction

~~~mermaid
flowchart TB
    Pages[Next.js pages] --> Components[React components]
    Components --> HTTP[HTTP requests]
    Components --> ClientSocket[Socket.IO client]
    HTTP --> Routes[Express route handlers]
    ClientSocket --> Socket[Socket.IO server]
    Routes --> DB[MySQL connection]
    Socket --> DB
~~~

## Recommended backend separation

~~~text
server/src/
├── config/
├── middleware/
├── routes/
├── controllers/
├── validators/
├── services/
├── repositories/
├── sockets/
└── utils/
server/migrations/
server/tests/
~~~

This is a proposal, not current source. Introduce incrementally with tests.

## Module contracts

Components render state and delegate domain operations. Controllers translate HTTP input/output. Services enforce business invariants. Repositories own SQL. Middleware establishes identity and access policy. Socket handlers reuse authorization rules.

When changing a module, identify callers, API contracts, DB dependencies, socket events, tests and docs. Update diagrams when responsibilities change.
