# 🏗️ Architecture and runtime boundaries

## System context

~~~mermaid
flowchart TB
    User([👤 User]) --> Browser[Browser]
    Browser --> Next[Next.js App Router<br/>React + TypeScript]
    Next -->|HTTP / cookies| Express[Express API]
    Browser <-->|Socket.IO| Socket[Realtime server]
    Express --> MySQL[(MySQL)]
    Socket --> Express
~~~

## Runtime inventory

| Component | Location | Responsibility | Current limitation |
|---|---|---|---|
| Next.js app | Root app/ | Pages/layouts | Frontend only |
| Shared UI | app/components/ | Header/footer/about/card | CSS Modules |
| Account UI | app/account/ | Login/registration | Session unsafe |
| Dashboard | app/dashboard/ | Account/activity UI | Needs runtime verification |
| HTTP API | server/server.js | Routes | SQL and domain logic combined |
| DB connector | server/db.js | MySQL connection | Single shared connection |
| Realtime | server/server.js | Socket events | Client-asserted identity |

## Frontend lifecycle

~~~mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Next as Next.js
    participant API as Express
    participant DB as MySQL
    User->>Browser: Navigate
    Browser->>Next: Request page
    Next-->>Browser: Rendered application
    User->>Browser: Submit action
    Browser->>API: JSON request
    API->>DB: SQL query
    DB-->>API: Result
    API-->>Browser: JSON response
    Browser-->>User: Updated UI
~~~

## Backend lifecycle

~~~mermaid
flowchart TD
    A([HTTP request]) --> B[CORS middleware]
    B --> C[JSON parser]
    C --> D[Route handler]
    D --> E{Input valid?}
    E -->|No| F[Error response]
    E -->|Yes| G[Parameterized SQL]
    G --> H{DB result}
    H -->|Error| I[Server error]
    H -->|Success| J[JSON response]
~~~

Validation differs by route. This is a conceptual summary, not proof all endpoints behave identically.

## Trust boundaries

| Boundary | Untrusted input | Required control |
|---|---|---|
| Browser to API | Body, headers, cookies | Schema validation, authentication, authorization |
| Browser to Socket.IO | Handshake/event payload | Verified session and event authorization |
| API to MySQL | Application values | Parameterized SQL, least privilege, constraints |
| Runtime to logs | Errors/metadata | Redaction |
| Build to deployment | Dependencies/config | Locked installs and secret injection |

A random account code supplied by a browser is not proof of identity.

## Current limitations

Routes, SQL and business logic are concentrated in one server file. One MySQL connection is shared by callbacks. Schema creation is embedded in startup. Transfer writes are not atomic. Socket identity uses client-controlled handshake data. No service/repository or migration framework was found.

## Proposed target architecture

~~~mermaid
flowchart TB
    UI[Next.js UI] --> Gateway[HTTP / Socket Gateway]
    Gateway --> Auth[Session authentication]
    Auth --> Validate[Schema validation]
    Validate --> Account[Account service]
    Validate --> Transfer[Transfer / ledger service]
    Validate --> Request[Request service]
    Account --> Repo[Repository layer]
    Transfer --> Repo
    Request --> Repo
    Repo --> DB[(MySQL)]
    Transfer --> Outbox[Transactional outbox]
    Outbox --> Events[Realtime notifications]
~~~

This is proposed, not implemented. Financial state changes should be atomic and auditable, with notifications after commit.

See [System design](system-design.md), [Data flow](data-flow.md), [API](api-reference.md) and [Database](database.md).
