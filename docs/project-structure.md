# 📂 Project structure and file guide

This guide documents actual paths and distinguishes them from a recommended future structure.

## Root files

| Path | Purpose |
|---|---|
| package.json / package-lock.json | Frontend dependencies and locked graph |
| tsconfig.json | TypeScript compiler settings |
| next.config.ts | Next.js configuration |
| next-env.d.ts | Next.js type declarations |
| eslint.config.mjs | ESLint configuration |
| .env.example | Example environment values |
| .editorconfig | Editor defaults |
| .gitattributes | Git text/binary attributes |
| .gitignore | Ignored local/build files |
| README.md | Project entry point |
| LICENSE | MIT license |
| CITATION.cff | Citation metadata |
| CODEOWNERS | Review ownership |
| CHANGELOG.md | Notable changes |
| ROADMAP.md | Planned work |
| SECURITY.md | Vulnerability reporting |
| CONTRIBUTING.md | Contribution workflow |
| SUPPORT.md | Help guidance |

## GitHub: .github/

ISSUE_TEMPLATE/ contains structured bug, feature and documentation reports. workflows/ contains CI, docs validation and dependency checks. PULL_REQUEST_TEMPLATE.md contains review checklist. Existing update-readme.yml is retained because it may update README content automatically.

## Frontend: app/

Account routes are under app/account/, including loginform.tsx and registration formregister.tsx. Shared components are header.tsx, footer.tsx, about.tsx and visa.tsx under app/components/. Shared styles live under app/css/.

Dashboard composition is app/dashboard/page.tsx. Feature components include content.tsx, transfer.tsx, request.tsx, trades.tsx and visaart.tsx under app/dashboard/components/. Dashboard styles live under app/dashboard/css/.

## Public assets

| Directory | Purpose |
|---|---|
| public/banar/ | Existing banner artwork |
| public/logo/ | Existing logo artwork |
| public/visa_card/ | Existing card visuals |
| public/visa_card_temblete/ | Existing card templates |

Existing spellings are preserved to avoid breaking asset references.

## Backend: server/

| File | Purpose |
|---|---|
| server/server.js | Express routes, Socket.IO, startup DDL and listener |
| server/db.js | MySQL connection |
| server/package.json | Backend dependencies/start script |
| server/package-lock.json | Locked backend dependencies |

The original backend does not contain dedicated route, controller, service, repository, migration or test directories.

## Documentation additions

~~~text
docs/
├── adr/          # Architecture decision records
├── diagrams/     # Mermaid sources
├── runbooks/     # Operational procedures
└── *.md          # Engineering guides
~~~

## Naming conventions

React components use TSX. CSS Modules use .module.css. Backend JavaScript currently uses CommonJS require. Docs use lowercase kebab-case Markdown. Mermaid files use .mmd. Workflows use descriptive kebab-case YAML names.

## Recommended future backend structure

~~~text
server/src/
├── config/
├── middleware/
├── routes/
├── controllers/
├── validators/
├── services/
├── repositories/
├── sockets/
└── utils/
server/migrations/
server/tests/
~~~

This is a proposal, not current source. Introduce it incrementally with tests and migration planning.
