# 📚 ArcherE-Bank Documentation

This directory contains the technical reference for the ArcherE-Bank learning prototype. The documents are organized around the code that exists in the repository and clearly distinguish current behavior from proposed improvements.

## Reading paths

### New developer
1. [Project overview](project-overview.md)
2. [Installation](installation.md)
3. [Configuration](configuration.md)
4. [Project structure](project-structure.md)
5. [Development guide](development.md)

### Understanding the implementation
1. [Architecture](architecture.md)
2. [System design](system-design.md)
3. [Workflow](workflow.md)
4. [Data flow](data-flow.md)
5. [Feature catalogue](features.md)
6. [API reference](api.md)
7. [Database model](database.md)

### Quality and operations
1. [Testing strategy](testing.md)
2. [Security review](security-review.md)
3. [Deployment](deployment.md)
4. [Performance](performance.md)
5. [Accessibility](accessibility.md)
6. [Troubleshooting](troubleshooting.md)

### Planning and reference
- [Limitations](limitations.md)
- [Future scope](future-scope.md)
- [FAQ](faq.md)
- [Glossary](glossary.md)
- [References](references.md)
- [Architecture decision records](adr/README.md)
- [Diagram source index](diagrams/README.md)

## Documentation conventions

- **Implemented:** directly evidenced in the current source.
- **Observed risk:** a weakness visible in the current code.
- **Recommended:** a proposed change, not a claim that it already exists.
- **Unverified:** requires local execution, test evidence, or an owner decision.

Security-sensitive behavior is described conservatively. A documented endpoint is not necessarily safe to expose. See the repository [Security Policy](../SECURITY.md).
