# Security Policy

This prototype must not process real money or production identity/card data. Report vulnerabilities privately to Brajesh Kumar (`@brajesh31`) with redacted reproduction details.

Priority remediation includes removing plaintext password storage, replacing unsalted SHA-256, not storing or exposing CVVs, authenticating every data endpoint, signing/rotating sessions, enforcing HTTPS, restricting CORS, validating amounts, and using transactions for transfers.
