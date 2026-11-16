# 🚀 Future scope

Potential future work should be prioritized by risk reduction and learning value, not by adding features before core correctness is established.

## Phase 1: Security baseline

- Replace credential storage with adaptive password hashing.
- Introduce authenticated server-side sessions.
- Add authorization middleware and ownership checks.
- Remove CVV persistence and sensitive card fields.
- Restrict and authenticate Socket.IO connections.
- Introduce rate limiting, schema validation and secure cookie configuration.

## Phase 2: Financial consistency

- Model currency and minor units explicitly.
- Add a double-entry ledger.
- Implement ACID transfer transactions with row locking.
- Add idempotency and request state-transition constraints.
- Add concurrency and rollback integration tests.

## Phase 3: Maintainable backend

- Separate routes, controllers, services and repositories.
- Add migrations and seed fixtures for disposable environments.
- Introduce a consistent API response/error contract.
- Add structured, redacted observability and audit events.

## Phase 4: Product and experience

- Improve responsive dashboard behavior.
- Add accessible status announcements and validation.
- Add paginated activity history and clear loading/error states.
- Add controlled demo data and documented walkthroughs.

## Phase 5: Operations

- Reproducible CI and dependency maintenance.
- Deployment runbook, secrets management and TLS.
- Backup/restore drills, monitoring and incident response.
- Independent security and accessibility review.

All items above are proposals. Track implementation status in [ROADMAP.md](../ROADMAP.md).
