# ⚠️ Known limitations

This list reflects repository inspection and should be updated as implementation changes.

## Security limitations

- Plaintext password column is populated during registration.
- Password verifier is unsalted SHA-256.
- CVV-like values are stored in the database and selected by an account-data route.
- Account-specific routes rely on caller-supplied random codes.
- Socket identity is based on client-provided handshake data.
- Cookie hardening and session lifecycle are incomplete.

## Financial correctness limitations

- Transfer debit, credit and history insertion are not one transaction.
- Request acceptance performs multiple independent writes.
- No idempotency protection is visible.
- Concurrent balance modifications are not guarded with a ledger/locking strategy.
- Currency and minor-unit semantics are not explicit in the schema.

## Engineering limitations

- Backend routes and business logic are concentrated in `server/server.js`.
- Tables are created at startup; no migration framework is present.
- No test suite was present in the inspected tree.
- The root lint script should be validated with the installed Next.js version.
- No verified production deployment configuration was identified.

## Documentation limitations

Static inspection cannot confirm that every frontend interaction works at runtime. Screenshots, browser behavior, deployed URL, performance measurements and accessibility conformance remain unverified until tested.
