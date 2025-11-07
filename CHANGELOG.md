# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/lang/de/).

## [0.1.0] - 2024-11-06

### Hinzugefügt
- Initiale Version des n8n-nodes-neo Pakets
- Vollständige Integration der Neo API (docunite.ai)
- Account Management Operationen
  - Get Balance
  - Get Usage
  - Get Usage With Process Steps
- Document Management Operationen
  - Upload (mit Classification und Splitting)
  - Get, Get Batch, Get Metadata
  - Delete, Delete Multiple
  - Update
  - Download
  - Chat, Chat Multiple
  - Classify
  - Export, Export Multiple
  - Index, Index Multiple
  - Retrieve, Retrieve Multiple
- Entity Management CRUD-Operationen
- Prompt Management CRUD-Operationen
- Schema Management CRUD-Operationen
- User Management (Get Info)
- Webhook Management CRUD-Operationen
- API-Key basierte Authentifizierung
- Umfassende Fehlerbehandlung
- Binary Data Support für File Uploads/Downloads
- Unterstützung für benutzerdefinierte Prompts
- JSON Schema Validierung

### Dokumentation
- Umfassende README mit Beispielen
- API-Dokumentation Verlinkungen
- Installationsanleitung für Community Nodes
- Verwendungsbeispiele für alle Ressourcen

### Technisch
- TypeScript Implementierung
- n8n-workflow 1.0.0 Kompatibilität
- ESLint und Prettier Konfiguration
- Build-System mit Gulp für Icons
- MIT Lizenz

[0.1.0]: https://github.com/docunite/n8n-nodes-neo/releases/tag/v0.1.0

