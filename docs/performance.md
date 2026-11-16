# ⚡ Performance considerations

## Current architecture factors

The current frontend is a Next.js application and the backend uses Express with a MySQL connection exported as a single connection object. Some dashboard operations query transfer rows and balance data before emitting updates.

## Areas to measure

- Frontend route load and client-side interaction latency.
- API response time by endpoint and database query.
- Database connection saturation and slow queries.
- Transfer and request contention under concurrent activity.
- Socket connection count and event fan-out.
- Bundle size and static asset weight.
- Dashboard history volume and payload size.

No performance benchmark results are included because the project has not been benchmarked as part of this documentation update.

## Query and data recommendations

- Add indexes based on observed query plans, especially account lookup columns and transfer relationship columns.
- Paginate activity history instead of loading an unbounded account history.
- Select only fields needed by the page.
- Avoid returning sensitive values in any response.
- Use a connection pool appropriate to the deployment and workload.
- Measure before introducing caching; account balances and transfer state require strong consistency.

## Frontend recommendations

- Keep client components limited to interactive regions.
- Optimize large artwork and use responsive image delivery.
- Avoid unnecessary repeated network requests.
- Show loading, empty, error and stale states explicitly.
- Test mobile rendering and performance with representative devices.

## Benchmark protocol

A future benchmark should document the machine, runtime, database size, dataset shape, request mix, concurrency, warm-up period, measurement window, p50/p95/p99 latency, throughput, error rate and resource use. Do not publish numbers without reproducible evidence.
