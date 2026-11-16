# 🔀 Data flow and trust boundaries

## 1. System flow

~~~mermaid
flowchart LR
    User([Browser user]) --> UI[Next.js UI]
    UI -->|JSON / cookies| API[Express API]
    API -->|SQL| DB[(MySQL)]
    UI <-->|Socket.IO| RT[Realtime channel]
    RT --> API
~~~

## 2. Data inventory

| Data | Current flow | Classification | Requirement |
|---|---|---|---|
| Name | Form to API to DB | Personal | Minimize |
| National ID | Form to users table | Highly sensitive | Synthetic only |
| Phone | Form to DB | Personal | Protect |
| Password | Form to backend | Secret | Never persist plaintext |
| Digest | Backend to users table | Credential verifier | Adaptive hash |
| Random code | DB, body, socket handshake | Sensitive identifier | Never use as authentication |
| Card-like number | Generated, DB, UI | Demo data | Synthetic only |
| CVV-like value | Generated, DB, API response | Card security data | Remove persistence/response |
| Balance | DB, dashboard, transfer | Financial state | Ledger and atomicity |
| History | API, DB, dashboard | Financial activity | Ownership and retention |
| Request state | API, DB, notifications | Workflow state | Authorized transitions |

## 3. DFD Level 0

~~~mermaid
flowchart TB
    User[External user]
    System((ArcherE-Bank prototype))
    DB[(MySQL)]
    User -->|Input and actions| System
    System -->|Responses and notifications| User
    System <-->|Account and activity records| DB
~~~

## 4. DFD Level 1

~~~mermaid
flowchart LR
    User[Browser user] --> UI[1.0 Frontend]
    UI -->|HTTP and cookies| API[2.0 Express routes]
    API --> Users[(Users)]
    API --> Cards[(Card-style data)]
    API --> Transfers[(Transfers)]
    API --> Requests[(Requests)]
    API -->|JSON| UI
    API --> Socket[3.0 Socket.IO]
    Socket --> User
~~~

## 5. Current transfer flow

~~~mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB
    Client->>API: POST /transfer with account key
    API->>DB: Find recipient
    DB-->>API: Recipient row
    API->>DB: Find source and balance
    DB-->>API: Source row
    API->>DB: Debit sender
    API->>DB: Credit recipient
    API->>DB: Insert history
    API-->>Client: Result
~~~

The writes are independent. A future design must authenticate the actor, validate the command, lock accounts, write balanced ledger entries in one transaction, commit and only then publish events.

## 6. Trust boundaries

Browser input is untrusted. Identity must come from a verified server session. Socket handshake/event payloads are untrusted. DB access requires least privilege, constraints and parameterized queries. Logs must redact credentials, identity and financial data. Deployment secrets remain server-side.

## 7. Recommended lifecycle

~~~mermaid
sequenceDiagram
    actor User
    participant UI as Browser
    participant Auth as Session middleware
    participant Service as Domain service
    participant DB as MySQL
    participant Events as Realtime outbox
    User->>UI: Submit command
    UI->>Auth: Request with session
    Auth->>Auth: Verify actor
    Auth->>Service: Authorized command
    Service->>DB: Begin transaction
    Service->>DB: Validate and write ledger
    Service->>DB: Commit
    Service->>Events: Publish after commit
    Events-->>UI: Authorized notification
~~~

This target flow is proposed, not implemented.
