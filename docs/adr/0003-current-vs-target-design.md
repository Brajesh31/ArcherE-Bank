# ADR-0003: Distinguish current implementation from target design

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

Documentation becomes misleading when proposed controls are described as if they already exist. This repository has known gaps and needs a future architecture without overstating implementation.

## Decision

Every guide and diagram must distinguish implemented behavior, observed risk, recommendation and unverified behavior.

## Consequences

Current flowcharts show actual route sequences, including weaknesses. Target diagrams are explicitly proposals. CI checks file/link integrity but does not claim security correctness. Documentation changes accompany source changes.
