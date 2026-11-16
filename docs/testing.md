# 🧪 Testing and verification strategy

## Current test status

No test files or test runner were present in the inspected repository tree. This document is a testing plan, not a claim that tests have passed.

## Verification layers

| Layer | What to verify | Suggested tooling |
|---|---|---|
| Static checks | TypeScript and lint feedback | TypeScript compiler, ESLint |
| Frontend unit | Form validation and component states | Vitest/Jest and React Testing Library, if introduced |
| API integration | Routes, schemas, errors and session behavior | Supertest with disposable database |
| Database integration | Migrations, rollback, constraints and transaction behavior | Isolated MySQL test database |
| Realtime | Authenticated socket access and event isolation | Socket.IO client test harness |
| End-to-end | Login, onboarding and dashboard navigation | Playwright, if introduced |
| Security | Authorization, injection, abuse and sensitive-data exposure | Code review and appropriate scanners |

## Critical test catalogue

| ID | Scenario | Expected safe behavior |
|---|---|---|
| AUTH-01 | Missing login fields | Reject with a structured validation response |
| AUTH-02 | Wrong password | Reject without leaking which credential was wrong |
| AUTH-03 | Account A requests Account B data | Deny access |
| AUTH-04 | Expired/revoked session | Deny access |
| XFER-01 | Zero or negative amount | Reject before database mutation |
| XFER-02 | Non-numeric amount | Reject before database mutation |
| XFER-03 | Insufficient funds | No ledger or balance changes |
| XFER-04 | Database failure after debit stage | Roll back all transfer writes |
| XFER-05 | Duplicate idempotency key | Do not execute transfer twice |
| XFER-06 | Concurrent transfers over available funds | Never permit overspending |
| REQ-01 | Accept a request twice | At most one successful state transition |
| REQ-02 | Unrelated user accepts request | Deny access |
| SOCK-01 | Socket claims another account code | Deny or ignore untrusted identity |
| DATA-01 | Account data response | Never include password or CVV |
| DATA-02 | Error logging | Redact credentials and personal data |

## Local checks

Frontend dependencies:

```bash
npm ci
npm run build
npx eslint .
```

Backend dependencies:

```bash
cd server
npm ci
node --check server.js
node --check db.js
```

These commands check installation, build/lint and JavaScript syntax. They do not validate transfer correctness or security.

## Test data rules

- Use synthetic names and reserved test values.
- Never use a real national ID, phone number, card, CVV, password or account balance.
- Reset disposable databases between test runs.
- Do not upload database dumps to public CI artifacts.
- Ensure failure-path tests verify that no partial write remains.
