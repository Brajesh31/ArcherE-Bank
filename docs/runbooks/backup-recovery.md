# 💾 Runbook: Backup and recovery

## Purpose and limitation

The repository does not include a verified automated backup system. This guide describes a future operational procedure for a disposable MySQL environment. It is not evidence that backups are configured.

## Backup policy

Document data owner, approval, frequency, retention, encryption, storage access, recovery point objective, recovery time objective, deletion policy and restore-test cadence.

## Local synthetic database backup

~~~bash
mysqldump --single-transaction --routines --triggers archerbank > archerbank-local.sql
~~~

This is a local example only. Never upload dumps to public repositories or attach them to issues. Sensitive deployments require approved encrypted backup and credential management.

## Restore target

~~~sql
CREATE DATABASE archerbank_restore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
~~~

Restore into an isolated database using an authorized local account. Verify schema, records and application connectivity.

## Recovery test

~~~mermaid
flowchart TD
    A([Select backup]) --> B[Verify integrity/access]
    B --> C[Create isolated restore target]
    C --> D[Restore database]
    D --> E[Validate schema and records]
    E --> F[Run smoke tests]
    F --> G{Recovery successful?}
    G -->|No| H[Investigate and document]
    G -->|Yes| I[Record evidence]
~~~

A real financial system needs auditable reconciliation and immutable history. Never repair balances by editing values without a trusted ledger and approved procedure.
