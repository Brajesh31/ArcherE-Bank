# 🧩 System design

## Design goals

The current system demonstrates a split frontend/backend architecture. A sound next iteration should make identity, financial state, and failure recovery explicit.

| Concern | Current approach | Recommended design direction |
|---|---|---|
| UI composition | Next.js App Router, React components, CSS Modules | Keep UI concerns isolated from financial rules |
| API | Express routes in one file | Route/controller, validation, service and repository layers |
| Identity | Login query returns a random account code in a cookie | Verified server-side session with rotation, expiry and revocation |
| Passwords | Plaintext plus unsalted SHA-256 digest | Argon2id or bcrypt with unique salts and migration |
| Card data | Generated PAN-like number and CVV persisted | Never persist CVV; use a compliant tokenization provider for real cards |
| Balance | Integer field in card-like table | Ledger-backed account balance with currency and exact minor units |
| Transfer | Multiple independent SQL writes | ACID transaction, idempotency key, locked rows and double-entry ledger |
| Realtime | Socket.IO handshake code | Authenticate socket using server session and authorize rooms |
| Schema | Startup CREATE TABLE statements | Versioned migrations and tested rollback |
| Observability | Console messages | Structured redacted logs, metrics and audit events |

## Core domain concepts

- **User:** a person represented by a row in the `users` table.
- **Card-like record:** a row in `visa_info`, containing card-style display data and a balance.
- **Transfer:** a record in `transfer` after the current code attempts to debit and credit accounts.
- **Payment request:** a row in `request` with a pending/accepted/rejected status.

These names describe the prototype's database. They should not be interpreted as a compliant banking domain model.

## Transfer invariants for a future safe design

A transfer service should enforce all of the following in one transaction:

1. The authenticated actor owns the source account.
2. The recipient is eligible to receive the transfer.
3. The amount is a positive integer in the smallest supported currency unit.
4. The sender has sufficient available funds.
5. A request idempotency key has not already been processed.
6. Debit and credit ledger entries balance exactly.
7. The transfer record and ledger entries commit together.
8. Failure at any intermediate step rolls back all writes.
9. An audit record is written without exposing secrets.
10. Notifications are published only after commit, preferably through an outbox.

## Failure model

Expected failures include invalid input, unknown recipient, unauthenticated caller, authorization denial, insufficient balance, duplicate submission, database outage, deadlock, socket disconnect, and client timeout after a successful commit. The client must not blindly retry a monetary operation without an idempotency key.

## Non-functional requirements for future work

- Security: least privilege, server-side identity, secret hygiene and data minimization.
- Reliability: atomic transfer operations and tested recovery.
- Maintainability: small modules, migrations and contract tests.
- Accessibility: semantic controls, keyboard navigation and understandable errors.
- Observability: correlation identifiers and redacted structured logs.
- Performance: indexed lookups and bounded history queries.
