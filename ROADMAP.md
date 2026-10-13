# Roadmap

- Replace plaintext and unsalted password storage with Argon2id or bcrypt and a migration.
- Remove CVV/card storage and use a compliant payment/tokenization provider.
- Add authentication/authorization middleware to every account and transfer route.
- Add transactional transfers, idempotency, validation, audit logs, and rate limiting.
- Add automated tests and secure environment-based deployment.
