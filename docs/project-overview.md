# 🌟 Project overview

## Executive summary

ArcherE-Bank is a banking-themed full-stack prototype combining a Next.js App Router frontend, React, TypeScript, CSS Modules, a separate Express API, MySQL and Socket.IO. The source includes registration/login screens, card-style visuals, dashboard, transfer/request interactions, activity history and realtime notifications.

It is a learning codebase, not a bank, card issuer, payment processor or financial service.

## Problem statement

A stateful application coordinates user input, identity, persistent records, business rules, asynchronous operations and updates across connected clients. A banking-style example makes these engineering concerns visible because defects can affect privacy, authorization and data consistency.

## Proposed solution

- **Frontend:** Next.js renders pages and interactive React components.
- **Backend:** Express handles HTTP requests and route logic.
- **Database:** MySQL stores prototype user, card-style, transfer and request records.
- **Realtime:** Socket.IO delivers activity and request notifications.

The separation is useful for learning, but current backend handlers combine SQL and business logic. Authentication and transaction guarantees need redesign.

## Objectives

1. Demonstrate component-based web development.
2. Connect frontend forms to an independent API.
3. Persist prototype account and activity records.
4. Model request lifecycle states.
5. Deliver dashboard updates through realtime events.
6. Explain source structure and local setup.
7. Identify security and reliability requirements for future work.

## Scope

| Included | Not provided |
|---|---|
| Account form UI | Verified customer identity |
| Card-style presentation | Issued payment cards |
| Demo balances/activity | Real money movement |
| Request status examples | Regulated payment processing |
| Local MySQL integration | Production financial ledger |
| Socket.IO examples | Guaranteed message delivery |
| Frontend/backend integration | Bank/provider integration |

## Intended audience

Students learning full-stack development, developers exploring Next.js/Express, contributors studying relational persistence and realtime events, and reviewers learning to identify security boundaries.

## Success criteria

A responsible learning release installs from lockfiles, runs with a disposable local database, uses synthetic values, documents actual routes and tables, distinguishes current behavior from proposals, and includes tests before claiming correctness.

## Actors

These are conceptual actors, not implemented roles.

| Actor | Interaction | Future security requirement |
|---|---|---|
| Visitor | View public pages | No private data on public routes |
| Account holder | Explore dashboard | Verified identity and ownership |
| Recipient | Receive demo request | Authenticated request authorization |
| Developer | Run prototype | Synthetic fixtures and secret hygiene |
| Maintainer | Review changes | Security review and traceable decisions |

## Constraints and risks

Frontend/backend have separate npm manifests and lockfiles. MySQL is expected. Backend port is hard-coded to 5555; CORS permits localhost:3000; schema creation occurs at startup. No automated test suite was found in the original tree. Static inspection is not a browser or penetration test.

Credential exposure, insecure account identity, card-data mishandling and inconsistent balance updates are the highest risks. See [Security](security.md), [Architecture](architecture.md), [Limitations](limitations.md) and [Roadmap](../ROADMAP.md).
