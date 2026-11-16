# 🗺️ Diagram library

Editable Mermaid source files are stored here and can be reviewed like code.

| Diagram | File | Purpose |
|---|---|---|
| System context | system-context.mmd | Browser, frontend, API, realtime and DB |
| Execution flow | execution-flow.mmd | Local startup |
| User journey | user-journey.mmd | Visitor to dashboard |
| DFD Level 0 | dfd-level-0.mmd | System context data movement |
| DFD Level 1 | dfd-level-1.mmd | Frontend/API/database stores |
| Registration sequence | registration-sequence.mmd | Registration lifecycle |
| Transfer sequence | transfer-sequence.mmd | Current transfer writes |
| Request state | request-state.mmd | Request lifecycle |
| Data model | data-model.mmd | Current conceptual relationships |
| Component map | component-map.mmd | Frontend component relationships |
| Deployment target | deployment-target.mmd | Proposed hosting topology |
| CI pipeline | ci-pipeline.mmd | Repository validation |

## Maintenance

Label current versus proposed behavior. Keep route/event names aligned with source. Do not imply auth, migrations, ledger or tests exist unless implemented. Update diagrams when routes, schema or component boundaries change.
