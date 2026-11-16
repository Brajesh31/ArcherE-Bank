# ❓ Frequently asked questions

## Is ArcherE-Bank a real bank?
No. It is a banking-themed learning prototype, not a financial institution, licensed bank, card issuer or payment processor.

## Can I use real account information?
No. Use synthetic names and identifiers. Never enter real passwords, national IDs, phone numbers, card data or CVVs.

## Does it transfer real money?
No. Transfer logic changes prototype database values only and is not connected to a payment network.

## Which technologies are used?
Next.js, React, TypeScript and CSS Modules on the frontend; Node.js, Express, MySQL and Socket.IO on the backend.

## Why are there two package files?
The root package describes the frontend. The server package describes the backend. Install dependencies in both directories.

## Which database is required?
MySQL through server/db.js. Use a disposable local database.

## Which port does the backend use?
The source listens on port 5555. Next.js development normally uses port 3000.

## Does it support realtime updates?
Socket.IO handlers exist for activity and notifications. Their identity/authorization design is not production-safe.

## Are passwords stored securely?
No. Registration writes plaintext passwords and login uses unsalted SHA-256. See [Security](security.md).

## Is there a test suite?
No automated test suite was found in the original source tree. See [Testing](testing.md).

## Can I deploy it publicly?
Do not deploy it to handle real user data or money. Security and transaction-integrity blockers must be fixed first.

## How do I report a vulnerability?
Follow [SECURITY.md](../SECURITY.md). Do not publish exploit details or sensitive data.

## Where do I start contributing?
Read [CONTRIBUTING.md](../CONTRIBUTING.md), then [Development](development.md) and [Roadmap](../ROADMAP.md).
