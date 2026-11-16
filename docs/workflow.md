# 🔄 Application workflows

This document describes sequences visible in server/server.js. It does not claim the flows are secure or production-ready.

## Local startup

~~~mermaid
flowchart TD
    A([Start local stack]) --> B[Start MySQL]
    B --> C[Start Express backend]
    C --> D[Load DB environment]
    D --> E[Connect to MySQL]
    E --> F[Create/check prototype tables]
    F --> G[Listen on port 5555]
    G --> H[Start Next.js]
    H --> I[Open browser on port 3000]
~~~

## Registration

1. User opens registration route.
2. Form collects name, password, national ID, phone and card type.
3. Browser sends POST /register.
4. Backend generates a random account code and card-like number, expiry and CVV-like value.
5. Backend inserts user row.
6. Backend inserts card-style row with shared random code.
7. API responds after both callbacks complete.

~~~mermaid
sequenceDiagram
    actor User
    participant Form as Registration UI
    participant API as Express
    participant DB as MySQL
    User->>Form: Enter synthetic details
    Form->>API: POST /register
    API->>API: Generate demo values
    API->>DB: INSERT users
    DB-->>API: Insert result
    API->>DB: INSERT visa_info
    DB-->>API: Insert result
    API-->>Form: Response
~~~

Risk: inserts are not transactional, and plaintext password is persisted.

## Login

The form submits national ID and password. Backend computes SHA-256, searches for matching ID/digest and sets a user_key cookie on success. SHA-256 is not a password storage algorithm; the cookie is not a complete secure session.

## Transfer

The route resolves recipient, resolves source using caller-supplied key, checks balance, debits, credits and inserts history.

~~~mermaid
flowchart TD
    A([Transfer form]) --> B[POST /transfer]
    B --> C[Resolve recipient]
    C --> D[Resolve source by supplied key]
    D --> E{Enough balance?}
    E -->|No| F[Return error]
    E -->|Yes| G[Debit source]
    G --> H[Credit recipient]
    H --> I[Insert history]
    I --> J[Emit updates]
~~~

Risk: writes are independent; no idempotency/row-lock strategy is visible.

## Payment request

Client submits requester key, target lookup value and amount. Backend resolves target by phone/card-like value, loads requester details, inserts pending request and sends socket notification to matching handshake code.

## Accept/reject

~~~mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Accepted: accept_request
    Pending --> Rejected: reject_request
    Accepted --> [*]
    Rejected --> [*]
~~~

Acceptance performs separate balance, request-status and history writes. Rejection changes status and attempts notification. Both need server-derived identity, authorized transitions and atomicity.

## Activity updates

Client emits get_trades. Server reads transfer rows and balance, then emits trades_update. The current handler reads account code from event payload or handshake data, which is not a safe identity mechanism.

## Safe failure expectations

| Failure | Required future behavior |
|---|---|
| Missing input | Validate before DB writes |
| Unknown recipient | Generic not-found response |
| Insufficient funds | No financial mutation |
| DB failure | Full transaction rollback |
| Duplicate retry | Return prior idempotent result |
| Unauthorized actor | Deny without leaking account data |
| Unauthenticated socket | Reject protected event |

See [API](api-reference.md), [Security](security.md) and [Testing](testing.md).
