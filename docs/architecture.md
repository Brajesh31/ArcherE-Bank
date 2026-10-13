# Architecture

The Next.js app in `app/` renders the landing page, account registration/login, dashboard, transfers, requests, trades, and card views. The Express server in `server/server.js` exposes HTTP endpoints and Socket.IO events, using MySQL through `server/db.js`.

The frontend and backend are separate processes during development. The backend currently creates tables at startup rather than using migrations.
