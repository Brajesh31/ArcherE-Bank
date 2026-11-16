# 🧩 Frontend component guide

## Organization

The frontend uses Next.js App Router and React TSX files under app/. CSS Modules provide component-level styling.

## Shared components

| Component | File | Responsibility |
|---|---|---|
| Header | app/components/header.tsx | Site navigation |
| Footer | app/components/footer.tsx | Footer content |
| About | app/components/about.tsx | Project/about section |
| Card visual | app/components/visa.tsx | Card-themed presentation |

Shared styles live under app/css/.

## Account components

| Component | File | Responsibility |
|---|---|---|
| Login form | app/account/components/loginform.tsx | Login inputs and request |
| Registration form | app/account/register/components/formregister.tsx | Registration UI |

Review requirements: visible labels, associated errors, no password browser storage, no submitted-value logging, loading/duplicate-submit states and generic server errors.

## Dashboard components

| Component | File | Responsibility |
|---|---|---|
| Content | app/dashboard/components/content.tsx | Dashboard content |
| Transfer | app/dashboard/components/transfer.tsx | Transfer form |
| Request | app/dashboard/components/request.tsx | Request actions |
| Trades | app/dashboard/components/trades.tsx | Activity/history |
| Card art | app/dashboard/components/visaart.tsx | Card presentation |

## Component interaction

~~~mermaid
flowchart TD
    Page[Dashboard page] --> Content[Content]
    Page --> Card[Card art]
    Page --> Transfer[Transfer]
    Page --> Request[Request]
    Page --> Trades[Trades]
    Transfer --> API[Express API]
    Request --> API
    Trades --> API
    Page <-->|Socket events| Socket[Socket.IO]
~~~

## UI states

Interactive components should handle loading, success, empty, validation, server/network error, disabled/in-progress and realtime reconnect states.

## Accessibility and data safety

Use semantic headings and buttons, preserve focus, support keyboard use, provide text alternatives, avoid color-only status and ensure responsive layouts. Card-style UI is decorative prototype content. Never display real CVVs, full payment credentials or unmasked account secrets.
