# 🧪 Testing strategy and quality plan

## Current status

No automated test runner or test suite was present in the inspected original tree. This document defines a plan and does not claim tests have passed.

## Verification layers

| Layer | Scope | Suggested tooling |
|---|---|---|
| Static | Syntax, TypeScript, lint | ESLint, TypeScript, Node syntax |
| Component | Form states/rendering | Vitest/Jest, React Testing Library |
| API | HTTP status/payload | Supertest |
| Database | Constraints/transactions | Disposable MySQL |
| Realtime | Socket identity/event isolation | Socket.IO test client |
| E2E | Login/dashboard | Playwright |
| Security | Dependencies/code review | npm audit and manual review |

## Existing checks

~~~bash
npm ci
npm run build
npx eslint .
~~~

Backend:

~~~bash
cd server
npm ci
node --check server.js
node --check db.js
~~~

These checks do not prove financial correctness or security.

## Critical test catalogue

| ID | Scenario | Required result |
|---|---|---|
| AUTH-001 | Missing login values | Structured validation error |
| AUTH-002 | Wrong password | Generic failure |
| AUTH-003 | Expired session | Denied |
| AUTH-004 | Account A reads Account B | Denied |
| AUTH-005 | Password persistence | No plaintext |
| DATA-001 | Account response | No CVV/password/hash |
| XFER-001 | Zero/negative/fractional amount | Rejected |
| XFER-002 | Insufficient funds | No writes |
| XFER-003 | Failure after debit | Full rollback |
| XFER-004 | Duplicate idempotency key | At most one transfer |
| XFER-005 | Concurrent spending | No overspending |
| REQ-001 | Accept same request twice | One transition |
| REQ-002 | Unauthorized acceptance | Denied |
| SOCK-001 | Socket claims another account | Denied |
| OPS-001 | DB unavailable | Safe failure/no secret leak |

## Transfer invariant matrix

| Starting state | Command | Required outcome |
|---|---|---|
| 500 units | Transfer 100 | Sender 400, recipient +100, balanced ledger |
| 500 units | Transfer 0 | Rejected, no write |
| 500 units | Transfer -1 | Rejected, no write |
| 500 units | Transfer 501 | Rejected, no write |
| 500 units | Same idempotency key twice | One operation |
| 500 units | Concurrent 300 + 300 | At most one succeeds |
| Any | DB error mid-transaction | Full rollback |

These are target tests, not current results.

## Test data policy

Use synthetic values, deterministic fixtures and disposable schemas. Never use real passwords, identity values, phone numbers, card data or CVVs. Redact logs and reset fixtures between runs.

## CI and definition of done

CI should install from lockfiles, build/lint frontend, check backend syntax, validate docs and audit dependencies. Add test commands when a test runner exists. A change is complete when behavior, tests, authorization, rollback, documentation and diagrams agree.
