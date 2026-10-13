# FAQ

## Is this a real bank?

No. It is a learning prototype and must not handle real money or personal financial data.

## Does the server store card information?

The current prototype stores generated card numbers, CVVs, and expiry data. This must be removed or replaced with compliant tokenization before production.

## What database is required?

MySQL is expected by `server/db.js`; use a disposable local database for development.

## Does it support real-time updates?

The backend includes Socket.IO for dashboard activity, but authentication, authorization, and delivery guarantees require further hardening.
