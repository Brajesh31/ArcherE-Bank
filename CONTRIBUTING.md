# 🤝 Contributing to ArcherE-Bank

Thank you for considering a contribution. This is a learning prototype. Contributions should improve security, correctness, accessibility, maintainability and clarity.

## Before starting

1. Read README.md and docs/README.md.
2. Review SECURITY.md before reporting a vulnerability.
3. Check for an existing issue.
4. Use synthetic data only. Never submit real identity, card, CVV, password or financial information.

## Development setup

~~~bash
npm ci
cd server
npm ci
~~~

Create a disposable MySQL database and private server/.env as explained in [Installation](docs/installation.md).

## Workflow

~~~mermaid
flowchart TD
    A([Identify issue]) --> B[Discuss scope]
    B --> C[Inspect source and docs]
    C --> D[Implement focused change]
    D --> E[Add tests]
    E --> F[Run checks]
    F --> G[Update docs and diagrams]
    G --> H[Review security and diff]
    H --> I([Submit PR])
~~~

## Quality expectations

Preserve behavior unless intentional change is explained. Validate untrusted input, use parameterized SQL, never expose secrets, derive identity from a verified session, enforce ownership, make financial operations atomic/idempotent, document failure behavior and keep diagrams synchronized. Do not add fake screenshots or fabricated test results.

## Sensitive changes

Authentication, sessions, account lookup, balances, card data, transfers, requests and socket authorization require heightened review. Test ownership, malformed input, replay, concurrency, DB failure and rollback.

## Checks

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

The original backend package does not define a test script. Do not claim a test suite passed unless it actually ran.

## Pull request checklist

- [ ] Scope is clear and focused.
- [ ] Existing behavior preserved or intentional changes explained.
- [ ] Actual test/check results included.
- [ ] Docs and diagrams updated.
- [ ] No credentials or sensitive data included.
- [ ] Authorization, failure and concurrency considered.
- [ ] Accessibility impact considered.
- [ ] No unrelated generated/binary files added.

Follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
