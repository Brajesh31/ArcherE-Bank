# 🧩 System design and engineering decisions

## Design goals

The prototype demonstrates frontend/backend separation and stateful workflows. A future design must make identity, authorization, data minimization, financial consistency, testability and operations explicit.

## Current versus target

| Concern | Current | Target |
|---|---|---|
| UI | Next.js, React, CSS Modules | Keep presentation separate |
| API | Express routes in one file | Controllers, validators, services, repositories |
| Authentication | Random-code cookie | Verified server-side session |
| Passwords | Plaintext plus unsalted SHA-256 | Argon2id/bcrypt with unique salts |
| Card data | Number-like and CVV-like values persisted | No CVV storage; tokenized reference if needed |
| Balance | Mutable integer field | Explicit currency and ledger |
| Transfer | Independent writes | ACID transaction, locking, idempotency |
| Realtime | Client handshake code | Authenticated socket and authorized rooms |
| Schema | Startup DDL | Versioned migrations |
| Quality | No test suite found | Unit, integration, concurrency and E2E |

## Domain concepts

User: profile/login row in users. Card-style record: visual/account metadata in visa_info. Transfer: activity row in transfer. Request: pending/accepted/rejected row in request. These are prototype concepts, not a complete banking domain model.

## Transfer invariants

1. Actor is authenticated.
2. Source belongs to actor.
3. Recipient is valid.
4. Amount is positive and uses a defined minor currency unit.
5. Currency compatibility is checked.
6. Funds are checked under row locks.
7. Idempotency prevents duplicate execution.
8. Debit and credit ledger entries balance.
9. Transfer and ledger records commit together.
10. Any failure rolls back all writes.
11. Audit metadata excludes secrets.
12. Notifications publish only after commit.

## Request lifecycle

~~~mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Accepted: authorized accept
    Pending --> Rejected: authorized reject
    Pending --> Expired: expiry policy
    Accepted --> [*]
    Rejected --> [*]
    Expired --> [*]
~~~

The current implementation uses pending, accepted and rejected strings. Expiry and transition locking are not visible.

## Failure model

Design for malformed input, unauthenticated calls, cross-account access, unknown recipients, invalid amounts, insufficient funds, duplicate submissions, concurrent spending, DB failure, deadlocks, client timeout after commit, socket disconnect and duplicate events.

## Recommended API error envelope

~~~json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be processed.",
    "requestId": "synthetic-request-id"
  }
}
~~~

Never return raw DB errors, stack traces, password hashes, session identifiers or card security values.

## Non-functional requirements

| Attribute | Requirement |
|---|---|
| Security | Authentication, authorization, validation and secret hygiene |
| Integrity | Atomic writes and explicit invariants |
| Reliability | Predictable rollback/retry |
| Maintainability | Small modules and documented contracts |
| Accessibility | Keyboard and assistive-technology support |
| Performance | Measured query and UI performance |
| Observability | Redacted logs and actionable metrics |
| Portability | Reproducible installs and environment config |

See [ADRs](adr/README.md). Proposed controls are not implemented until code and tests exist.
