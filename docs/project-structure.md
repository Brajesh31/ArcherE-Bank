# 📁 Project structure

This guide explains the main checked-in paths in the repository. Files are described according to their current location. It is not a proposal to rearrange the application.

## Root-level files

| Path | Purpose |
|---|---|
| `package.json` | Frontend package metadata and Next.js scripts/dependencies |
| `package-lock.json` | npm dependency lockfile for the root application |
| `tsconfig.json` | TypeScript compiler settings |
| `next.config.ts` | Next.js configuration |
| `next-env.d.ts` | Next.js TypeScript declarations |
| `eslint.config.mjs` | ESLint configuration |
| `.env.example` | Example local environment values |
| `.editorconfig` | Editor formatting defaults |
| `.gitattributes` | Git attribute settings |
| `.gitignore` | Ignored local/generated files |
| `README.md` | Project landing page and setup summary |
| `LICENSE` | Repository license |
| `CHANGELOG.md` | Release/change history |
| `CITATION.cff` | Citation metadata |
| `CODEOWNERS` | Ownership mapping |
| `CONTRIBUTING.md` | Contribution guidance |
| `SECURITY.md` | Vulnerability and security policy |
| `SUPPORT.md` | Support guidance |
| `ROADMAP.md` | Planned engineering work |

## GitHub configuration

- `.github/PULL_REQUEST_TEMPLATE.md`: pull request checklist.
- `.github/workflows/update-readme.yml`: existing README timestamp automation.
- `.github/ISSUE_TEMPLATE/`: structured bug, feature and documentation issue forms.
- `.github/workflows/`: continuous integration and documentation checks.

## Frontend: `app/`

### Public pages and shared UI

- `app/page.tsx`: root page.
- `app/layout.tsx`: root layout.
- `app/components/about.tsx`: About section.
- `app/components/header.tsx`: header/navigation.
- `app/components/footer.tsx`: footer.
- `app/components/visa.tsx`: card-related public component.
- `app/css/`: CSS modules for these shared components.

### Account experience

- `app/account/page.tsx`: account route.
- `app/account/components/loginform.tsx`: login form.
- `app/account/css/loginform.module.css`: login form styles.
- `app/account/register/page.tsx`: registration route.
- `app/account/register/components/formregister.tsx`: registration form.
- `app/account/register/css/`: registration and card styles.

### Dashboard experience

- `app/dashboard/page.tsx`: dashboard route and page-level composition.
- `app/dashboard/components/content.tsx`: dashboard content.
- `app/dashboard/components/request.tsx`: request UI.
- `app/dashboard/components/transfer.tsx`: transfer UI.
- `app/dashboard/components/trades.tsx`: activity/trade UI.
- `app/dashboard/components/visaart.tsx`: card visual component.
- `app/dashboard/css/`: dashboard CSS modules.

## Static assets: `public/`

- `public/banar/`: existing banner artwork (directory spelling is retained).
- `public/logo/`: logo artwork.
- `public/visa_card/`: card illustrations.
- `public/visa_card_temblete/`: card template artwork (directory spelling is retained).

Keep original paths stable unless a separate code migration is explicitly approved. Image references in Next.js should use the actual public path and be tested in the browser.

## Backend: `server/`

- `server/server.js`: Express routes, Socket.IO handlers, table definitions and listener.
- `server/db.js`: MySQL connection.
- `server/package.json`: backend dependency manifest and start script.
- `server/package-lock.json`: backend lockfile.

The server currently does not have a distinct routes, services, repositories, migrations, or tests directory. Those are recommended future engineering boundaries, not existing files.

## Documentation: `docs/`

See [documentation index](README.md). Detailed diagrams are stored under `docs/diagrams/`; architecture decision records are stored under `docs/adr/`.
