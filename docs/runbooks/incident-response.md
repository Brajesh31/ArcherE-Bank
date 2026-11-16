# 🚨 Runbook: Incident response

This is a baseline for a learning repository, not a formal financial-service incident program.

## Exposed secret

Revoke or rotate the credential at its source immediately. Review access logs. Remove it from active configuration. Assess repository history and cached deployment artifacts. Record remediation without copying the secret into the report. Deleting the latest file does not invalidate an exposed credential.

## Exposed personal or payment data

1. Isolate or stop the affected service.
2. Preserve evidence in an access-controlled location.
3. Identify data types, affected records and exposure window.
4. Revoke sessions/credentials where appropriate.
5. Seek qualified privacy, legal and security advice.
6. Notify affected parties/authorities when required.
7. Document and verify corrective action.

## Inconsistent transfer state

Disable further state-changing operations. Preserve DB state and redacted logs. Identify incomplete writes. Reconcile using a trusted source of truth. Do not make ad hoc balance edits. Restore only after atomicity, authorization and idempotency are verified.

## Suspected unauthorized access

Restrict affected endpoints, revoke sessions, preserve redacted logs, review authorization and socket subscriptions, determine scope and add regression tests before restoring access.

## Communication

Never publish passwords, tokens, cookies, national IDs, card data, CVVs or raw database exports.
