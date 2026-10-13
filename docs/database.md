# Database

`server/server.js` creates `users`, `visa_info`, `transfer`, and `request` tables at startup. The current schema stores passwords, password digests, national IDs, phone numbers, card numbers, CVVs, expiry dates, balances, and random identifiers.

This is unsafe for real banking use. Replace with migrations, least-privileged access, encrypted/tokenized payment data, password-specific hashing, retention controls, and auditable transactional transfers.
