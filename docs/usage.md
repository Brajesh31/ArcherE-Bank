# 🖥️ Local usage guide

## 1. Before you start

Run MySQL, Express and Next.js as described in [Installation](installation.md). Use synthetic data only. Prototype balances and card-style records have no monetary value.

## 2. Explore the landing page

Open the local Next.js URL and inspect the header, landing content, About section, card visual and footer. Components are under app/components/ and app/css/.

## 3. Explore registration

The registration component is app/account/register/components/formregister.tsx. Inspect fields, client validation and request path. The current backend accepts name, password, national ID, phone number and card type.

Do not submit real identity details. The current backend stores plaintext passwords and card-like security values.

## 4. Explore login

The login form is app/account/components/loginform.tsx. The backend currently checks a SHA-256 digest and sets a user_key cookie. This is not a safe production authentication model.

## 5. Explore dashboard

| Component | What to inspect |
|---|---|
| content.tsx | Dashboard content |
| visaart.tsx | Card artwork |
| transfer.tsx | Transfer interaction |
| request.tsx | Request interaction |
| trades.tsx | Activity/history |

All are under app/dashboard/components/.

## 6. Observe realtime events

Use browser developer tools and backend logs with synthetic data. The client emits get_trades; the server responds with trades_update. Request and rejection notifications are also declared.

## 7. Synthetic API examples

Registration:

~~~json
{
  "name": "Demo Account",
  "password": "disposable-local-value",
  "nationalID": "SYNTHETIC-ID-001",
  "phone_number": "0000000000",
  "visa_type": "sample"
}
~~~

Transfer:

~~~json
{
  "random_key": "synthetic-account-code",
  "transfer_to": "0000000001",
  "amount": 25
}
~~~

These examples document current request shapes, not secure public API recommendations.

## 8. What not to do

- Never enter real national IDs, phone numbers, passwords or card data.
- Do not expose the backend publicly.
- Do not assume a successful response proves atomicity.
- Do not use prototype balances for real accounting.
- Do not treat random codes as authentication.

## 9. Learning exercises

Trace a form submission from TSX to Express, identify the SQL statement, follow the response into UI state, trace a Socket.IO event, write tests for malformed input and unauthorized access, and design a transaction rollback test.

See [API](api-reference.md), [Workflow](workflow.md) and [Testing](testing.md).
