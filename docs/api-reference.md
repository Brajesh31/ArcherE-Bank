# 🔌 API reference

> [!CAUTION]
> This inventories routes declared in server/server.js. It is not a safe public API contract. Several routes accept client-supplied account codes. Do not use these endpoints for real accounts or money.

## 1. Local base URL

http://localhost:5555

The current Express CORS configuration allows http://localhost:3000. Port and origin are hard-coded.

## 2. HTTP endpoint catalogue

| Method | Path | Observed request fields | Purpose |
|---|---|---|---|
| GET | / | None | Backend liveness text |
| POST | /get_my_data | random_key | Reads account/card display fields |
| POST | /register | name, password, nationalID, phone_number, visa_type | Creates user and card-style rows |
| POST | /login | nationalID or nunationalID, password | Checks digest and sets cookie |
| POST | /transfer | random_key, transfer_to, amount | Attempts transfer and history insert |
| POST | /request | random_key, request_from, amount | Creates pending request |
| POST | /get_notification | random_key | Reads request records |
| POST | /accept_request | random_code, random_transfer_code | Attempts request acceptance |
| POST | /reject_request | random_code, random_transfer_code | Rejects request |

## 3. Synthetic request examples

~~~json
{
  "name": "Synthetic User",
  "password": "local-only-placeholder",
  "nationalID": "SYNTHETIC-001",
  "phone_number": "0000000000",
  "visa_type": "sample"
}
~~~

~~~json
{
  "random_key": "synthetic-account-code",
  "transfer_to": "0000000001",
  "amount": 25
}
~~~

These reflect current request fields. Caller-provided account codes must never be treated as secure authentication.

## 4. Response behavior

The code returns a mixture of JSON and plain text. Status codes observed include 200 for successful route responses, 400 for missing fields on some routes, 401 for invalid login or insufficient balance, 404 for missing records and 500 for database/server failure.

The response contract is inconsistent. Some error branches expose implementation details.

## 5. Socket.IO events

| Event | Direction | Purpose |
|---|---|---|
| get_trades | Client to server | Request activity and balance |
| trades_update | Server to client | Send transfer list and balance |
| request_notification | Server to client | Notify recipient of new request |
| rejected_notification | Server to client | Notify requester of rejection |

## 6. Contract gaps

Protected identity comes from browser-supplied identifiers. Socket handlers read account codes from event data or handshake auth. /get_my_data selects CVV-like data. Amount validation is incomplete. State-changing operations lack idempotency. Financial writes are not transactional. Error formats are inconsistent and rate limiting is not visible.

## 7. Recommended future contract

Authenticate with a verified session, derive identity server-side, validate request schemas, use integer minor units and explicit currency, require idempotency keys, standardize errors, redact sensitive fields, apply rate limits and authorize each socket event.

## 8. Test matrix

| Route | Invalid input | Unauthenticated | Cross-account | DB failure |
|---|---|---|---|---|
| /register | Reject | Public policy | N/A | No partial account |
| /login | Generic error | N/A | N/A | No secret leak |
| /get_my_data | Reject | Deny | Deny | No sensitive data |
| /transfer | Reject | Deny | Deny | Full rollback |
| /request | Reject | Deny | Deny | No partial request |
| /accept_request | Reject | Deny | Deny | Full rollback |
| /reject_request | Reject | Deny | Deny | No false transition |

These are target expectations, not current test results.
