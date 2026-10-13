# API

The backend exposes routes for registration, login, account data, transfers, requests, and dashboard activity; Socket.IO broadcasts updated transfer/balance information.

Before publishing the API, document every route's method, request schema, authentication, authorization, status codes, idempotency, validation, and data classification. Every account-specific route must derive identity from a verified session rather than an untrusted client key.
