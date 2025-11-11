# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2025-11-11

### Fixed
- Corrected GitHub repository URLs in package.json, README.md, and CHANGELOG.md
- Changed from `n8n-nodes-neo` to `neo-n8n-node` to match actual repository name

## [0.1.2] - 2025-11-11

### Fixed
- Corrected release date in CHANGELOG (2024 → 2025)
- Updated copyright year in LICENSE (2024 → 2025)

## [0.1.1] - 2025-11-11

### Changed
- Updated installation instructions in README
- Clarified that unverified community nodes are only available on self-hosted n8n instances
- Added note for n8n Cloud users about verification status
- Improved documentation structure for different installation methods

## [0.1.0] - 2025-11-06

### Added
- Initial release of n8n-nodes-neo package
- Full integration of docunite® NEO API (docunite.com)
- **Account Management operations**
  - Get Balance
  - Get Usage
  - Get Usage With Process Steps
- **Document Management operations**
  - Upload (with classification, splitting, and custom prompts)
  - Get, Get Batch
  - Get Document PDF Blob
  - Get Document Original Blob
  - Get Document OCR
  - Get Document Markdown
  - Delete
  - Chat (with AI support and chat history)
  - Classify (with batch processing)
  - Enrichment (with batch processing)
  - Extraction (with batch processing)
  - Split (with batch processing)
- **Entity Management CRUD operations**
  - Get All, Get
  - Create
  - Update
  - Delete
- **Webhook Management CRUD operations**
  - Get All, Get
  - Create
  - Update
  - Delete
- API Key-based authentication
- Comprehensive error handling
- Binary Data support for file uploads/downloads
- Support for custom prompts and classification
- Batch processing with file IDs for document operations

### Documentation
- Comprehensive README with examples (English)
- API documentation links
- Installation guide for Community Nodes
- Usage examples for all resources and operations
- Contributing guidelines

### Technical
- TypeScript implementation
- n8n-workflow 1.0.0 compatibility
- ESLint and Prettier configuration
- Build system with Gulp for icons
- MIT License
- Node.js 18.17.0+ requirement

[0.1.3]: https://github.com/docunite/neo-n8n-node/releases/tag/v0.1.3
[0.1.2]: https://github.com/docunite/neo-n8n-node/releases/tag/v0.1.2
[0.1.1]: https://github.com/docunite/neo-n8n-node/releases/tag/v0.1.1
[0.1.0]: https://github.com/docunite/neo-n8n-node/releases/tag/v0.1.0
