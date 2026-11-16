# ADR-0002: Critical security remediation is a release gate

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

Static inspection identified plaintext password persistence, unsalted SHA-256 verification, persisted CVV-like data, client-controlled account identifiers and non-atomic balance updates.

## Decision

The project remains an educational prototype. Real-user, real-identity, card-data or real-money use is blocked until critical findings are remediated and independently tested.

## Consequences

README and deployment docs state limitations. Roadmap prioritizes credentials, identity and transaction integrity. Product copy must not imply compliance or real bank affiliation. A successful build is not enough to close this gate.
