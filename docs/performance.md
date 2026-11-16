# ⚡ Performance and scalability

The repository contains a Next.js frontend, Express API, Socket.IO and MySQL connection. Dashboard update logic queries transfer history and balance. No benchmark results are claimed.

## Metrics

| Area | Metric | Purpose |
|---|---|---|
| Frontend | Initial load, route transition, JS bundle | Perceived responsiveness |
| API | p50/p95/p99 latency, throughput, error rate | Tail latency and capacity |
| Database | Query latency, slow queries, lock waits | Persistence bottlenecks |
| Transfers | Transaction duration and retry count | Integrity under concurrency |
| Realtime | Active sockets and event fan-out | Delivery load |
| History | Row count and payload size | Pagination need |

## Database guidance

Inspect query plans before adding indexes. Account lookup and sender/recipient history fields may need indexes after data cleanup. Paginate activity, select only necessary fields, never select password/CVV values for presentation, and consider a connection pool in a future refactor. Do not cache balances casually.

## Frontend guidance

Use responsive image delivery, avoid unnecessary client JavaScript, split large features when measurement justifies it, provide loading states, avoid unbounded activity history and respect reduced-motion preferences.

## Socket guidance

Authenticate sockets, scope events to server-authorized rooms, bound payload size, handle reconnect and duplicate events safely, and publish only after committed state.

## Benchmark protocol

Record commit, runtime, OS, DB version, hardware, dataset size, request mix, concurrency, warm-up, duration, p50/p95/p99, throughput, error rate and resource usage. Do not publish unsupported speed/capacity claims.

Measure first. Never trade authorization or financial consistency for speed.
