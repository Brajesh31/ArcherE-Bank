# ⚠️ Known limitations and verification gaps

Based on static inspection of the current repository.

## Security

- Plaintext password is written to the database.
- Login uses unsalted SHA-256.
- CVV-like values are persisted and selected by an endpoint.
- Protected routes accept caller-supplied random account codes.
- Socket identity relies on client-controlled handshake values.
- Cookie/session hardening is incomplete.
- Comprehensive rate limiting and validation are not visible.

## Financial integrity

- Sender debit, recipient credit and history insert are separate writes.
- Request acceptance updates balances and status separately.
- No clear idempotency mechanism is present.
- Concurrent balance changes lack ledger/locking guarantees.
- Currency/minor-unit semantics are not explicit.
- Realtime events do not use a transactional outbox.

## Engineering

- Backend route logic and SQL are concentrated in server/server.js.
- Schema is created at startup rather than through migrations.
- One connection object is shared by callbacks.
- No automated test suite was found in the original tree.
- Root lint command should be checked against installed versions.
- No verified production deployment topology was found.

A component existing in source does not prove its workflow works. Static inspection does not confirm browser rendering, deployed behavior, performance, accessibility conformance or security under attack.

## Release restriction

Do not use this code for real users, identity records, payment credentials or money until critical findings are remediated and independently tested.

To close a limitation, create a scoped issue, define safe behavior, implement tests, verify failure/concurrency paths, update docs and diagrams, and record evidence.
