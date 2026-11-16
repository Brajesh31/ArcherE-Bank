# 🗄️ Database architecture and data dictionary

## 1. Connection

server/db.js creates a MySQL connection using DB_HOST, DB_USER, DB_PASSWORD and DB_NAME. Fallback values are local defaults and must not be used as production credentials.

## 2. Schema lifecycle

server/server.js executes CREATE TABLE IF NOT EXISTS statements when it loads. This is not a migration framework. It does not provide schema versions, controlled upgrades, rollback scripts or migration history.

## 3. Current tables

### users

| Column | Type | Meaning | Concern |
|---|---|---|---|
| id | INT auto increment PK | Row ID | Internal identifier |
| name | VARCHAR(255) | Display name | Personal data |
| password | VARCHAR(255) | Submitted password | Plaintext persistence is critical |
| hash_password | VARCHAR(255) | SHA-256 digest | Unsalted, unsuitable for passwords |
| nationalID | VARCHAR(255) | Login identifier | Highly sensitive |
| phone_number | VARCHAR(255) | Contact value | Personal data |
| created_at | TIMESTAMP | Creation time | Audit metadata |
| status | VARCHAR(255) | Account status | Needs constrained values |
| random_code | VARCHAR(255) | Shared lookup key | Not proof of identity |

### visa_info

| Column | Type | Meaning | Concern |
|---|---|---|---|
| id | INT auto increment PK | Row ID | Internal identifier |
| name | VARCHAR(255) | Display name | Duplicated profile data |
| phone_number | VARCHAR(255) | Contact value | Personal data |
| visa_number | VARCHAR(255) | Generated card-like number | Demo only |
| visa_type | VARCHAR(255) | Visual/type choice | Presentation metadata |
| visa_expiry_date | VARCHAR(255) | Expiry string | Needs format constraints |
| visa_cvv | VARCHAR(255) | CVV-like value | Never store for real cards |
| balance | INT | Prototype balance | No explicit currency/ledger |
| created_at | TIMESTAMP | Creation time | Audit metadata |
| random_code | VARCHAR(255) | Account lookup key | Must not authorize access |

### transfer

Contains integer ID, sender/recipient display names, integer amount, transfer reference, sender/recipient account codes and creation timestamp.

### request

Contains integer ID, requester name and phone, source/target account codes, integer amount, transfer reference, status and creation timestamp.

## 4. Entity relationship

~~~mermaid
erDiagram
    USERS ||--|| VISA_INFO : shared_random_code
    VISA_INFO ||--o{ TRANSFER : sender
    VISA_INFO ||--o{ TRANSFER : recipient
    VISA_INFO ||--o{ REQUEST : participant
~~~

This is conceptual. Current DDL does not declare the depicted foreign keys.

## 5. Data classification

| Category | Examples | Handling |
|---|---|---|
| Credentials | Passwords, hashes, session tokens | Never log; adaptive hashing and secure session |
| Identity | National ID, phone, name | Minimize and protect |
| Card security | CVV-like values | Do not store or return |
| Card reference | Generated number-like value | Synthetic only; tokenize real provider data |
| Financial state | Balance and amount | Atomic operations and explicit currency |
| Activity | Transfer/request history | Ownership, retention and audit controls |

## 6. Integrity gaps

No visible foreign keys or unique account-code constraint; no migration system; direct mutable balance; no explicit currency; non-atomic transfer writes; unprotected request transitions; sensitive fields selected by API.

## 7. Recommended evolution

Add versioned migrations and rollback, remove plaintext password use, remove CVV persistence, use opaque IDs and uniqueness constraints, add foreign keys/indexes after cleanup, define currency/minor units, use a double-entry ledger, apply transactions/locking/idempotency, create synthetic fixtures and document backup/restore.

See [Backup/recovery runbook](runbooks/backup-recovery.md).
