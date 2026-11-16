# 🔐 Security review and remediation register

> [!CAUTION]
> ArcherE-Bank is an educational prototype. Do not use it for real users, identity records, card data or money. This is static inspection, not a penetration test, compliance audit or certification.

## Executive assessment

The implementation has serious credential, authorization, card-data and financial-integrity weaknesses. These affect account privacy and whether failed operations can leave balances inconsistent.

## Findings

| Severity | Finding | Source evidence | Required remediation |
|---|---|---|---|
| Critical | Plaintext password storage | Registration inserts password into users.password | Stop plaintext writes; safe reset/migration |
| High | Unsalted SHA-256 | crypto.createHash('sha256') | Argon2id/bcrypt with unique salts |
| Critical | CVV-like data stored/returned | visa_info.visa_cvv; account route selects it | Remove persistence and response |
| Critical | Client-supplied account identity | random_key/random_code request fields | Verified server-side session |
| High | Socket trusts handshake | socket.handshake.auth.code | Authenticate socket and authorize rooms |
| Critical | Non-atomic transfer | Debit, credit and history are separate queries | Transaction, locking, idempotency and ledger |
| High | Non-atomic request acceptance | Balance/status/history writes separate | Atomic authorized transition |
| High | Weak amount validation | No comprehensive positive bounded validation | Strict schema/domain validation |
| High | Session hardening incomplete | Cookie lacks explicit security attributes | Secure session, rotation and CSRF |
| Medium | Hard-coded CORS/port | Local origin and port constants | Validated environment config |
| Medium | Startup DDL | Schema creation in server process | Versioned migrations |
| Medium | Monolithic backend | SQL and domain logic combined | Modular services/repositories |

Severity is engineering triage, not formal CVSS.

## Credential remediation

Stop writing plaintext passwords. Adopt Argon2id or bcrypt through a maintained library, use unique salts, add safe password length and abuse controls, migrate via reset or controlled rehash, never return/log hashes and rotate sessions after authentication changes.

## Card-data minimization

The prototype generates and stores card-like number and CVV-like fields. Real card handling requires a specialist provider and applicable standards. CVV must not be stored after authorization. Use synthetic masked values and remove CVV persistence.

## Authentication and authorization

Authenticate every protected request. Derive account identity from a verified session. Never authorize by possession of a random DB key. Check ownership for account, transfer and request resources. Use secure HttpOnly/SameSite cookies, HTTPS, CSRF controls, rate limits and generic authentication errors.

## Financial integrity

A future transfer validates actor, recipient, amount and currency; locks accounts; checks funds; writes balanced ledger entries and transfer metadata; records idempotency; commits; then publishes notifications. Any failure before commit rolls back every financial write.

## Realtime security

Authenticate Socket.IO from the same verified session. Assign server-controlled identity to a private room. Authorize each event; never accept account code in event payload as proof of identity.

## Operational safeguards

Use least-privilege DB accounts, secret injection, HTTPS, strict CORS, schema validation, rate limits, redacted logs, audit events, encrypted backups and tested recovery.

## Dependency audit baseline\n\nGitHub Actions dependency scans on 2026-11-16 reported 13 vulnerabilities in the root production dependency tree (including 2 critical) and 22 in the backend production dependency tree (including 2 critical). The findings include transitive packages used by the existing locked dependencies. This audit was performed without changing package manifests or lockfiles. Do not run npm audit fix --force blindly: the backend audit reports that its suggested forced remediation would change sqlite3 to a new major version, and the frontend audit proposes a Next.js version outside the currently declared dependency range. Review the advisory paths, update dependencies in a separately tested change, regenerate the appropriate lockfile and rerun build/integration checks.\n\n## Release gate

The application remains educational until critical findings are fixed and independently verified. Evidence must include authorization, sensitive-response, concurrent transfer, rollback, session/socket and migration tests.

## References

[OWASP Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) · [Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) · [Transaction Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) · [PCI Security Standards Council](https://www.pcisecuritystandards.org/)
