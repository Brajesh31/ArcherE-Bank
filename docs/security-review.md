# 🔐 Security review and remediation register

## Scope and method

This review is based on static inspection of the checked-in `server/server.js`, `server/db.js`, package manifests and environment example. It is not a penetration test, runtime test, compliance audit or certification.

## Executive assessment

**Do not use this codebase for real users, real identity data, payment-card data or real money.** The current design has critical credential, authorization, sensitive-data and transaction-integrity issues.

## Findings

| Severity | Finding | Evidence in current source | Required direction |
|---|---|---|---|
| Critical | Plaintext password persistence | Registration inserts `password` into `users.password` | Remove plaintext column usage; force credential reset if real data ever existed |
| High | Unsalted SHA-256 password digest | `hash_user_password` uses `crypto.createHash('sha256')` | Use Argon2id or bcrypt with per-password salts and safe parameters |
| Critical | CVV-like value persisted and returned | `visa_info.visa_cvv`; `/get_my_data` selects it | Remove CVV storage and never return it |
| Critical | Client-supplied account key used as identity | Several routes accept `random_key` / `random_code` | Bind account identity to authenticated server session |
| High | Socket identity trusts handshake code | Socket handlers check `socket.handshake.auth.code` | Authenticate socket and authorize per-account rooms server-side |
| Critical | Transfer writes are not atomic | Debit, credit and history insert are separate queries | Transaction, row locks, idempotency and immutable ledger |
| High | Request acceptance has partial-write risk | Balance updates and status update occur as separate queries | Atomic state transition and ledger transaction |
| High | Weak amount validation | Transfer route does not comprehensively validate positive bounded integer amounts | Strict schema validation and domain invariants |
| High | Cookie hardening incomplete | Cookie sets path and maxAge but no explicit httpOnly/secure/sameSite | Use secure session cookie configuration and CSRF strategy |
| Medium | CORS is hard-coded | Local origin embedded in source | Environment allowlist with safe production defaults |
| Medium | Schema lacks visible relational constraints | Startup DDL omits foreign keys and unique constraints for lookup codes | Versioned migrations, constraints and indexes |
| Medium | Single connection and callback-heavy server | One exported MySQL connection and monolithic routes | Connection pool, services and repository boundaries |

Severity is a conservative engineering assessment, not a formal CVSS score.

## Recommended remediation order

### P0: Stop unsafe data handling
1. Keep the project isolated and use synthetic fixtures only.
2. Remove the plaintext password column from all application reads/writes after a safe migration plan.
3. Replace SHA-256 with Argon2id or bcrypt and implement credential migration/reset.
4. Stop generating, persisting and returning CVV values.
5. Do not treat a random identifier as proof of identity.

### P0: Establish identity and authorization
1. Implement a well-reviewed session system.
2. Make protected routes require authenticated sessions.
3. Derive the account ID on the server from the session.
4. Verify resource ownership on every read and write.
5. Add rate limiting, request size limits, CSRF protection where applicable and safe error messages.
6. Authenticate Socket.IO connections using the same verified identity.

### P0: Protect financial state
1. Use integer minor units and explicit currency.
2. Execute sender debit, recipient credit, transfer record and ledger entries in one SQL transaction.
3. Lock relevant account rows during balance checks.
4. Add idempotency keys and unique constraints.
5. Use a ledger model with balanced debit/credit entries.
6. Publish real-time updates only after commit.

### P1: Operational controls
- Add schema migrations and rollback guidance.
- Create a least-privilege database account.
- Configure TLS and secure secret management.
- Redact logs and add security event audit trails.
- Back up and test restoration.
- Add dependency, static-analysis and integration tests.

## Sensitive data rules

Never place real passwords, national IDs, phone numbers, card details, CVVs, production database exports or session cookies in the repository, screenshots, issues, pull requests or logs.

## Verification required before reconsidering deployment

- Independent security review.
- Authentication and authorization integration tests.
- Transaction concurrency and rollback tests.
- Sensitive-data response inspection.
- Session and socket identity tests.
- Database migration and restoration tests.
- Operational monitoring and incident response readiness.

A green build alone is not evidence that these requirements have been met.
