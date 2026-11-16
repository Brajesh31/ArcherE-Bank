# 👩‍💻 Development workflow

## Working principles

Preserve existing behavior unless a change explicitly requires otherwise. Use npm and committed lockfiles. Keep frontend work under app/ and backend work under server/. Use synthetic data only. Treat authentication, card data and balance operations as security-sensitive. Update tests, docs and diagrams when behavior changes.

## Daily workflow

~~~mermaid
flowchart TD
    A([Start task]) --> B[Read issue and docs]
    B --> C[Inspect source]
    C --> D[Define behavior and risks]
    D --> E[Implement focused change]
    E --> F[Add/update tests]
    F --> G[Run checks]
    G --> H{Pass?}
    H -->|No| I[Diagnose and fix]
    I --> G
    H -->|Yes| J[Update docs and diagrams]
    J --> K[Review diff and secrets]
    K --> L([Commit])
~~~

## Frontend development

Reuse components, keep styles in CSS Modules, add loading/error/empty/success states, use semantic HTML and accessible labels, avoid exposing account identifiers in client state, and keep secrets server-side.

## Backend development

Current handlers combine request parsing and SQL. Validate input before querying, use parameterized SQL, avoid raw DB errors, derive identity from verified session, enforce ownership, make state changes atomic, add idempotency and avoid logging sensitive payloads.

A future refactor should separate controllers, services and repositories.

## Database changes

Do not rely on startup DDL for schema evolution. Introduce versioned migrations, document backfills and provide rollback/recovery. Test migrations on disposable data.

## Validation commands

~~~bash
npm ci
npm run build
npx eslint .
~~~

Backend:

~~~bash
cd server
npm ci
node --check server.js
node --check db.js
~~~

Before opening a PR, include test evidence, security implications, migration notes and documentation updates. See [CONTRIBUTING](../CONTRIBUTING.md).
