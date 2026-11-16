# 🔌 API documentation

This file is retained as the original API documentation entry point. The complete endpoint inventory, request examples, socket events, response behavior, security gaps and future contract recommendations are maintained in [API reference](api-reference.md).

## Current server

- Runtime: Express on Node.js.
- Local port: 5555.
- Database: MySQL through server/db.js.
- Realtime: Socket.IO.

## Endpoint summary

| Method | Path | Current purpose |
|---|---|---|
| GET | / | Liveness text |
| POST | /get_my_data | Account/card display lookup |
| POST | /register | Create user and card-style rows |
| POST | /login | Credential check and cookie |
| POST | /transfer | Prototype balance/history operation |
| POST | /request | Create payment request |
| POST | /get_notification | List requests |
| POST | /accept_request | Accept request |
| POST | /reject_request | Reject request |

## Safety warning

Protected routes currently accept client-supplied account identifiers, the account data route selects CVV-like information, and financial writes are not atomic. Do not expose this API for real accounts, identity data, card data or money.

For complete detail, see [API reference](api-reference.md), [Database](database.md), [Data flow](data-flow.md) and [Security review](security.md).
