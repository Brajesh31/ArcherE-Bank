# 🚀 Future scope and technical evolution

Prioritize security and correctness before adding more banking-themed screens.

## Phase 1 🔴 Security baseline

- Remove plaintext password storage.
- Adopt Argon2id/bcrypt and safe migration/reset.
- Introduce verified server-side sessions.
- Enforce ownership checks on protected routes.
- Remove CVV-like persistence and response fields.
- Authenticate Socket.IO and authorize events.
- Add schema validation, rate limits and secure cookie settings.

Exit evidence: credential audit, authorization tests, sensitive-response tests and session/socket tests.

## Phase 2 🟠 Financial correctness

- Define currency and minor units.
- Introduce a double-entry ledger.
- Make transfers atomic with row locking.
- Add idempotency keys.
- Protect request state transitions.
- Add rollback and concurrency tests.
- Publish events only after commit.

Exit evidence: transaction, concurrent-spend, retry and ledger-balance tests.

## Phase 3 🟡 Maintainable backend

Separate routes, controllers, services, repositories and socket handlers. Add versioned migrations, standardized API errors, validation, synthetic fixtures, structured redacted logs, request IDs and unit/integration tests.

## Phase 4 🟢 Product quality

Improve responsive layout, dashboard states, keyboard/screen-reader support, paginated history and empty/loading/error states. Add genuine screenshots only when captured.

## Phase 5 🔵 Operations

Add environment-based deployment, monitoring, encrypted backup/restore, incident response, rollback, dependency maintenance and independent security review.

Security and integrity outrank visual polish. Evidence outranks claims. Tests outrank assumptions. See [ROADMAP](../ROADMAP.md).
