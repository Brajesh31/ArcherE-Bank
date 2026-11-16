# ✨ Feature catalogue and implementation status

**Present** means source exists. **Needs verification** means runtime behavior was not tested. **Unsafe/incomplete** means a known security or integrity gap exists. **Proposed** means not currently implemented.

## Frontend

| Feature | Source | Description | Status |
|---|---|---|---|
| Landing | app/page.tsx | Entry page and presentation | Present |
| Header/footer | app/components/ | Shared site shell | Present |
| About | app/components/about.tsx | Project information | Present |
| Card visual | app/components/visa.tsx | Card-style presentation | Present |
| Login | app/account/ | Login route/form | Session unsafe |
| Registration | app/account/register/ | Registration UI | Credential unsafe |
| Dashboard | app/dashboard/page.tsx | Dashboard composition | Needs verification |
| Transfer UI | dashboard/components/transfer.tsx | Transfer interaction | Backend unsafe |
| Request UI | dashboard/components/request.tsx | Request interaction | Backend unsafe |
| Activity | dashboard/components/trades.tsx | History display | Present |
| Card artwork | dashboard/components/visaart.tsx | Card visuals | Present |

## Backend inventory

| Route/event | Current behavior | Caveat |
|---|---|---|
| GET / | Liveness text | Not readiness |
| POST /register | Inserts user/card rows | Plaintext password; non-atomic |
| POST /login | SHA-256 and cookie | Weak verifier/session |
| POST /get_my_data | Reads account fields | CVV-like value returned |
| POST /transfer | Balance/history writes | Non-atomic |
| POST /request | Creates pending request | Client-key identity |
| POST /get_notification | Reads requests | Client-key identity |
| POST /accept_request | Accepts and moves amount | Non-atomic |
| POST /reject_request | Marks rejected | State/identity gaps |
| get_trades | Requests activity/balance | Client supplies code |
| trades_update | Sends activity/balance | Socket authorization weak |
| request_notification | Notifies target | Handshake matching |
| rejected_notification | Notifies requester | Handshake matching |

## User journey

~~~mermaid
flowchart TD
    A([Visitor]) --> B[Landing page]
    B --> C{Choose action}
    C -->|Register| D[Registration form]
    C -->|Login| E[Login form]
    D --> F[Prototype account creation]
    E --> G[Prototype login]
    F --> H[Dashboard]
    G --> H
    H --> I[Account/card UI]
    H --> J[Transfer/request UI]
    H --> K[Activity UI]
~~~

## Realtime

Socket.IO supports activity refreshes and request/rejection notifications. Current socket matching uses client-provided handshake values. Future code must authenticate sockets and authorize each account-specific event.

## Recommended sequence

Prioritize secure sessions, authorization, card-data minimization, atomic ledger-backed transfers, idempotency, migrations and tests before adding more banking-themed functionality.
