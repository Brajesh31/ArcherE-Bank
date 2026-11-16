# 🔐 Security policy

## Project status

ArcherE-Bank is an educational prototype and is **not safe for real banking, payments, production identity records or customer accounts**. Static inspection identified plaintext password persistence, unsalted SHA-256 verification, persisted CVV-like values, client-controlled account identifiers and non-transactional balance updates.

Do not deploy the current implementation to a public environment handling real user data or money.

## Reporting

Report suspected vulnerabilities privately to the repository maintainer [@Brajesh31](https://github.com/Brajesh31), rather than publishing exploit details in public issues. Include a concise description, affected component, safe reproduction with synthetic values, impact and mitigation idea.

Never attach credentials, cookies, national IDs, phone numbers, card numbers, CVVs or database dumps.

## Response expectations

Reports are reviewed as availability permits. No formal response-time SLA is promised. Do not test systems/data you do not own or have authorization to assess.

## Critical remediation

1. Remove plaintext password storage.
2. Replace unsalted SHA-256 with adaptive password hashing.
3. Remove CVV persistence and avoid raw payment-card credential storage.
4. Authenticate protected routes and derive identity server-side.
5. Make balance movements transactional and idempotent.
6. Authenticate and authorize Socket.IO connections/events.
7. Harden cookies, CSRF, CORS, validation, rate limits and secrets.

See [detailed security review](docs/security.md).
