# Troubleshooting

## Frontend cannot reach the backend

Confirm the server is listening on port `5555`, the frontend uses the correct base URL, and CORS allows only the intended origin.

## MySQL connection fails

Check the disposable database, environment values, MySQL availability, and user permissions. Never print passwords in diagnostics.

## Login or dashboard data is unsafe

Treat this as a blocking security issue. Do not use real data; remediate session identity, password hashing, authorization, and sensitive-field exposure before continuing.
