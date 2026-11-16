# ADR-0001: Preserve existing application boundaries

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

The repository contains a Next.js frontend under app/ and a separate Express/Socket.IO backend under server/. Both have package manifests and lockfiles. Existing public assets and CSS paths are referenced by application code.

## Decision

Documentation and governance improvements preserve application source, package manifests, lockfiles and asset paths. Architectural refactoring requires a separately scoped implementation change.

## Alternatives

Moving the application into a new monorepo or renaming assets during documentation work would add unrelated risk. Preserving paths and documenting a target structure minimizes risk and avoids breaking imports.

## Consequences

Documentation describes actual paths. Target architecture is labeled proposed. Existing application files are not rewritten in this docs change. Future refactors require tests and migration notes.
