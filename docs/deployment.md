# 🚢 Deployment and release readiness

## Current status

No complete verified production deployment configuration was identified in the inspected tree. This is readiness guidance, not a deployment claim.

**Do not deploy the current implementation to handle real users, identity records, card data or money.**

## Local runtime

| Process | Command | Current port |
|---|---|---:|
| Next.js | npm run dev | 3000 default |
| Express/Socket.IO | cd server && npm start | 5555 |
| MySQL | Local DB service | Local configuration |

## Production blockers

Replace plaintext password persistence; replace unsalted SHA-256; remove CVV persistence and API exposure; implement verified server sessions; enforce ownership; authenticate Socket.IO; make balance changes atomic/idempotent; add ledger and currency semantics; add migrations and rollback tests; configure HTTPS, secure cookies, CSRF and strict CORS; add rate limits, redacted logs, monitoring, backup recovery and independent security review.

## Proposed topology

~~~mermaid
flowchart TB
    User([User]) --> Edge[HTTPS reverse proxy]
    Edge --> Frontend[Next.js hosting]
    Edge --> API[Express API]
    API -->|Private network| DB[(Managed MySQL)]
    API --> Socket[Authenticated Socket.IO]
    API --> Logs[Redacted logs and metrics]
    DB --> Backup[Encrypted backups]
~~~

This is a target design, not deployed infrastructure.

## Release checklist

- [ ] Review exact commit and changelog.
- [ ] Install from lockfiles in clean environment.
- [ ] Run lint, build and automated tests.
- [ ] Review dependency vulnerabilities.
- [ ] Apply reviewed schema migrations.
- [ ] Inject secrets server-side only.
- [ ] Verify TLS and cookie attributes.
- [ ] Verify CORS and CSRF controls.
- [ ] Verify authorization and socket identity.
- [ ] Verify rollback and idempotency.
- [ ] Verify backup restoration.
- [ ] Run smoke tests and monitor errors.
- [ ] Keep application/schema rollback plan.

A code rollback may not reverse a schema migration. Use forward-compatible migrations and tested recovery. Never repair financial state through ad hoc balance edits.
