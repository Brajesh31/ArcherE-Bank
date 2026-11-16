# 📚 ArcherE-Bank Documentation Hub

This is the engineering handbook for the repository. It helps contributors discover, install, understand, verify and safely evolve the prototype.

> [!IMPORTANT]
> These guides distinguish current source behavior from recommended future architecture. They do not certify the application as secure or production-ready.

## 🧭 Reading paths

**New contributor:** [Overview](project-overview.md) → [Structure](project-structure.md) → [Installation](installation.md) → [Configuration](configuration.md) → [Usage](usage.md) → [Development](development.md)

**Understand the system:** [Architecture](architecture.md) → [System design](system-design.md) → [Modules](modules.md) → [Components](components.md) → [Workflow](workflow.md) → [Data flow](data-flow.md) → [Database](database.md) → [API](api-reference.md)

**Quality and risk:** [Security](security.md) · [Testing](testing.md) · [Accessibility](accessibility.md) · [Performance](performance.md) · [Limitations](limitations.md)

**Operations:** [Deployment](deployment.md) · [Troubleshooting](troubleshooting.md) · [Local runbook](runbooks/local-development.md) · [Incident response](runbooks/incident-response.md) · [Backup/recovery](runbooks/backup-recovery.md)

## 📖 Catalogue

| Document | Contents |
|---|---|
| [Project overview](project-overview.md) | Background, goals, scope and success criteria |
| [Architecture](architecture.md) | Runtime components, trust boundaries and diagrams |
| [System design](system-design.md) | Domain responsibilities and target design |
| [Project structure](project-structure.md) | Actual repository paths and file purpose |
| [Workflow](workflow.md) | Registration, login, transfer and request flows |
| [Data flow](data-flow.md) | Data inventory and trust boundaries |
| [Features](features.md) | Feature-by-feature implementation status |
| [Installation](installation.md) | Reproducible local setup |
| [Configuration](configuration.md) | Environment, ports and CORS |
| [Usage](usage.md) | Safe synthetic walkthrough |
| [API reference](api-reference.md) | HTTP routes, payloads and events |
| [Database](database.md) | Tables, fields and integrity concerns |
| [Modules](modules.md) | Frontend/backend module responsibilities |
| [Components](components.md) | UI component inventory |
| [Development](development.md) | Daily engineering workflow |
| [Testing](testing.md) | Verification layers and critical cases |
| [Deployment](deployment.md) | Release gates and topology proposal |
| [Security](security.md) | Static findings and remediation |
| [Performance](performance.md) | Metrics and profiling strategy |
| [Accessibility](accessibility.md) | Manual and automated review |
| [Troubleshooting](troubleshooting.md) | Symptoms and safe diagnostics |
| [FAQ](faq.md) | Common questions |
| [Limitations](limitations.md) | Known and unverified gaps |
| [Future scope](future-scope.md) | Prioritized evolution |
| [Glossary](glossary.md) | Domain terminology |
| [References](references.md) | Official technical resources |

## 🗺️ Diagrams, decisions and runbooks

- [Diagram index](diagrams/README.md): editable Mermaid sources.
- [ADR index](adr/README.md): architecture decisions.
- [Local development](runbooks/local-development.md): startup and shutdown.
- [Incident response](runbooks/incident-response.md): secret, data and integrity incidents.
- [Backup and recovery](runbooks/backup-recovery.md): recovery planning and restore checks.

## ✍️ Documentation conventions

**Implemented** means evidenced in source. **Observed risk** means a weakness visible in inspected code. **Recommended** means proposed, not implemented. **Unverified** means runtime, test or deployment evidence is still required.

Examples use synthetic values. Diagrams must match code. Never include credentials, tokens, identity information, card details or real financial records. File count alone is not a quality metric.
