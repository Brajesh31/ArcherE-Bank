# ✨ Feature catalogue

The following catalogue is based on the checked-in frontend structure and backend route/event names.

## Public experience

### Landing page
The root App Router page is `app/page.tsx`. Shared visual sections are under `app/components/`, with CSS modules under `app/css/`. The repository includes existing banner and logo assets under `public/`.

### Account login
The login route and form are under `app/account/`. The backend route is `POST /login`. The current server accepts `nationalID` or a legacy `nunationalID` request property and returns a cookie on a successful match.

### Account registration
The registration route and form are under `app/account/register/`. The backend generates a random code and card-like data, then attempts to persist user and card records.

## Dashboard

The dashboard page is `app/dashboard/page.tsx`. Its feature components include:

- `content.tsx`: dashboard content.
- `transfer.tsx`: transfer interaction.
- `request.tsx`: payment request interaction.
- `trades.tsx`: transfer/activity presentation.
- `visaart.tsx`: card artwork.

## Backend capabilities

| Capability | Route/event | Current behavior |
|---|---|---|
| Health text | `GET /` | Returns a short backend-running message |
| Account details | `POST /get_my_data` | Selects card-like fields using supplied account key |
| Registration | `POST /register` | Inserts user and card-like records |
| Login | `POST /login` | Compares national ID and SHA-256 digest, sets cookie |
| Transfer | `POST /transfer` | Attempts debit, credit and transfer-history insertion |
| Payment request | `POST /request` | Creates pending request |
| Notifications | `POST /get_notification` | Returns pending incoming/outgoing request data |
| Accept request | `POST /accept_request` | Attempts balance movement and marks request accepted |
| Reject request | `POST /reject_request` | Marks request rejected |
| Trades | `get_trades` / `trades_update` | Sends transfer history and balance |
| Request alert | `request_notification` | Pushes incoming request notification |
| Rejection alert | `rejected_notification` | Pushes rejection notification |

## Feature status vocabulary

- **Present in source:** a route or component exists.
- **Needs local verification:** the source exists, but runtime/browser behavior has not been tested in this documentation pass.
- **Not production-ready:** security or consistency requirements are not met.
- **Planned:** not implemented; see [ROADMAP.md](../ROADMAP.md).
