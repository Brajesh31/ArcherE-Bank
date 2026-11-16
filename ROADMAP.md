# 🗺️ ArcherE-Bank roadmap

Prioritize risk reduction before banking-themed functionality. Checkboxes are plans and should be updated only when implementation and evidence exist.

## 🔴 P0: Security and correctness
- [ ] Remove plaintext password persistence.
- [ ] Replace unsalted SHA-256 with Argon2id/bcrypt and safe migration/reset.
- [ ] Remove CVV-like persistence and sensitive response fields.
- [ ] Implement verified server-side sessions.
- [ ] Enforce ownership on every protected route.
- [ ] Authenticate Socket.IO and authorize account events.
- [ ] Make transfers and request acceptance atomic.
- [ ] Add idempotency and concurrency controls.
- [ ] Define currency and minor-unit semantics.
- [ ] Add ledger invariants and rollback tests.

## 🟠 P1: Engineering foundations
- [ ] Add versioned schema migrations.
- [ ] Separate controllers, services, repositories and socket handlers.
- [ ] Add unit, integration and concurrency tests.
- [ ] Standardize API validation and errors.
- [ ] Add rate limiting and redacted structured logs.
- [ ] Add deterministic synthetic fixtures.
- [ ] Add schema constraints and indexes after data review.

## 🟡 P2: Product quality
- [ ] Improve responsive layouts and dashboard states.
- [ ] Complete keyboard and screen-reader review.
- [ ] Add paginated activity history.
- [ ] Provide synthetic local demo walkthrough.
- [ ] Add genuine desktop/mobile screenshots when captured.

## 🟢 P3: Operations
- [ ] Add deployment runbooks after P0 completion.
- [ ] Test encrypted backup and restoration.
- [ ] Add monitoring and alerting.
- [ ] Automate releases and dependency maintenance.
- [ ] Obtain independent security review.

## Definition of done

A feature is complete only when implementation, tests, failure behavior, authorization, documentation and diagrams agree. A green build alone does not close security gates.
