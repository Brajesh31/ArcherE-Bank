# 🚀 Installation and local setup

## Requirements

| Tool | Purpose | Check |
|---|---|---|
| Node.js | Runs Next.js and Express | node --version |
| npm | Installs locked dependencies | npm --version |
| MySQL | Backend persistence | mysql --version |
| Git | Clone/version control | git --version |
| Browser | UI inspection | Current browser |

Use a Node.js version compatible with the installed Next.js 15 dependency.

## 1. Clone and install frontend

~~~bash
git clone https://github.com/Brajesh31/ArcherE-Bank.git
cd ArcherE-Bank
npm ci
~~~

## 2. Create a disposable database

~~~sql
CREATE DATABASE archerbank CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
~~~

Use a dedicated local DB user, not a production or privileged account.

## 3. Configure backend

Create server/.env locally:

~~~dotenv
DB_HOST=127.0.0.1
DB_USER=archer_dev
DB_PASSWORD=local_only_password
DB_NAME=archerbank
~~~

Never commit this file. Rotate any credential that has been exposed.

## 4. Install and start backend

~~~bash
cd server
npm ci
npm start
~~~

The current source listens on port 5555. The start script invokes Nodemon.

## 5. Start frontend

In a second terminal from repository root:

~~~bash
npm run dev
~~~

Open http://localhost:3000. The current backend CORS origin is localhost:3000.

## 6. Build and lint

~~~bash
npm run build
npx eslint .
~~~

Backend syntax checks:

~~~bash
cd server
node --check server.js
node --check db.js
~~~

The root lint script calls next lint. Verify compatibility with the installed Next.js/ESLint versions. No automated test runner was found in the original tree.

## 7. Safe-development checklist

- [ ] Use a disposable database.
- [ ] Use synthetic names, identifiers and phone values.
- [ ] Never enter real passwords or card details.
- [ ] Keep server/.env out of Git.
- [ ] Do not expose port 5555 publicly.
- [ ] Reset test records between experiments.
- [ ] Treat security findings as blockers for real data.

See [Configuration](configuration.md) and [Troubleshooting](troubleshooting.md).
