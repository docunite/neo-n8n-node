# n8n-nodes-neo

This is an n8n Community Node for integrating the **docunite® NEO API** by [docunite.com](https://docunite.com/neo).

**docunite® NEO** is an intelligent document management platform with AI-powered classification, extraction, and processing. This node allows you to use all docunite® NEO API features directly in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation tool.

## 🚀 Installation

### For n8n Cloud Users

**Note**: This community node will be available in n8n Cloud after it has been verified by n8n. We have submitted it for verification and will update this section once approved.

Once verified, you will be able to install it directly from the n8n node panel.

### For Self-hosted n8n Instances

You can install this node manually on your self-hosted n8n instance (requires n8n v0.187+):

#### Option 1: Using Community Nodes Feature

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-neo` in the "Enter npm package name" field
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using Community Nodes
5. Install the node

After installation, the docunite® NEO node will be available in your n8n instance.

#### Option 2: Manual Installation

For self-hosted n8n instances, you can also install the node manually:

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-neo
```

Restart n8n for the changes to take effect.

## 🔑 Credentials

To use the docunite® NEO node, you need:

1. **API Key**: Your docunite® NEO API Key
2. **Base URL**: Defaults to `https://api.docunite.ai`

### Setting up Credentials

1. Go to **Credentials > New**
2. Search for "docunite® NEO API"
3. Enter your API Key
4. Save the credentials

## 📚 Operations

The docunite® NEO node supports the following resources and operations:

### 📊 Account Management

- **Get Balance**: Retrieve credit balance
- **Get Usage**: Retrieve usage statistics (daily, monthly, yearly)
- **Get Usage With Process Steps**: Detailed usage information with process step breakdown

### 📄 Document Management

- **Upload**: Upload and process documents
  - Supports automatic classification
  - Intelligent document splitting
  - Custom prompts
  - Optional original path storage
- **Get**: Retrieve document by ID
- **Get Batch**: Retrieve documents by correlation ID (e.g., extracted attachments)
- **Get Document PDF Blob**: Get a PDF version of the document
- **Get Document Original Blob**: Get the original version of the document
- **Get Document OCR**: Get document OCR content
- **Get Document Markdown**: Get document markdown content
- **Delete**: Delete single document
- **Chat**: Chat with a document using AI
  - Supports custom prompts
  - Optional chat history
- **Classify**: Classify documents
  - Custom prompt support
  - Batch processing with file IDs
- **Enrichment**: Initiate document enrichment
  - Batch processing with file IDs
- **Extraction**: Extract OCR from documents
  - Batch processing with file IDs
- **Split**: Split documents into multiple parts
  - Batch processing with file IDs

### 🏢 Entity Management

- **Get All**: Retrieve all entities
- **Get**: Retrieve entity by ID
- **Create**: Create new entity
- **Update**: Update entity
- **Delete**: Delete entity

### 🔔 Webhook Management

- **Get All**: Retrieve all webhooks
- **Get**: Retrieve webhook by ID
- **Create**: Create new webhook
- **Update**: Update webhook
- **Delete**: Delete webhook

## 💻 Usage Examples

### Example 1: Upload and Classify a Document

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "document",
        "operation": "upload",
        "entityId": "your-entity-id",
        "binaryPropertyName": "data",
        "classify": true,
        "splitDocuments": false
      },
      "name": "docunite® NEO - Upload Document",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "docunite® NEO API Credentials"
      }
    }
  ]
}
```

### Example 2: Chat with a Document

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "document",
        "operation": "chat",
        "documentId": "document-id-here",
        "prompt": "What are the key points in this document?"
      },
      "name": "docunite® NEO - Chat with Document",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "docunite® NEO API Credentials"
      }
    }
  ]
}
```

### Example 3: Classify Multiple Documents

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "document",
        "operation": "classify",
        "fileIds": "[\"file-id-1\", \"file-id-2\"]",
        "promptId": "your-classification-prompt-id"
      },
      "name": "docunite® NEO - Classify Documents",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "docunite® NEO API Credentials"
      }
    }
  ]
}
```

### Example 4: Manage Entities

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "entity",
        "operation": "create",
        "entityName": "My Project"
      },
      "name": "docunite® NEO - Create Entity",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "docunite® NEO API Credentials"
      }
    }
  ]
}
```

### Example 5: Extract OCR from Documents

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "document",
        "operation": "extraction",
        "fileIds": "[\"file-id-1\", \"file-id-2\"]"
      },
      "name": "docunite® NEO - Extract OCR",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "docunite® NEO API Credentials"
      }
    }
  ]
}
```

## 🔗 Webhooks

docunite® NEO supports webhooks for asynchronous notifications about processing status:

1. Create a webhook using the `Webhook Create` operation
2. Register your callback URL
3. Receive notifications when document processing is complete

## 📖 API Documentation

The complete API documentation can be found at:
- Swagger UI: [https://api.docunite.ai/](https://api.docunite.ai/)
- Swagger JSON: [https://api.docunite.ai/swagger.json](https://api.docunite.ai/swagger.json)

## 🛠️ Compatibility

- Tested with n8n v0.187.0+
- Node.js 18.17.0+
- n8n-workflow 1.0.0+

## 📝 License

[MIT](LICENSE.md)

## 🤝 Support

For questions or issues:
- GitHub Issues: [https://github.com/docunite/neo-n8n-node/issues](https://github.com/docunite/neo-n8n-node/issues)
- docunite Support: [support@docunite.com](mailto:support@docunite.com)

## 🔗 Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [docunite.com Website](https://docunite.com)
- [docunite® NEO API Documentation](https://api.docunite.ai/)

## 🌟 Features

- ✅ Full docunite® NEO API integration for core resources
- ✅ Account Management (Balance & Usage tracking)
- ✅ Document Management (Upload, Processing, Chat, OCR, etc.)
- ✅ Entity Management (Full CRUD operations)
- ✅ Webhook Management (Full CRUD operations)
- ✅ API Key authentication
- ✅ Comprehensive error handling
- ✅ Binary Data support (Upload/Download)
- ✅ AI-powered document processing and chat
- ✅ Batch operations support

## 📦 Version History

### 0.1.0 (Initial Release)
- Full integration of core docunite® NEO API endpoints
- Account Management (Balance, Usage, Usage with Process Steps)
- Document Management (Upload, Get, Chat, Classify, Enrichment, Extraction, Split, etc.)
- Entity Management (CRUD operations)
- Webhook Management (CRUD operations)

## 👨‍💻 Development

If you want to contribute to development:

```bash
# Clone repository
git clone https://github.com/docunite/neo-n8n-node.git
cd neo-n8n-node

# Install dependencies
npm install

# Build
npm run build

# Link to local n8n instance
npm link
```

Start n8n in development mode:

```bash
n8n start
```

## ⚠️ Important Notes

- File uploads use Binary Data from n8n workflows
- Chat operations support streaming responses
- All JSON parameters can be set dynamically via n8n expressions
- Document processing operations support batch processing with file IDs

---

Developed with ❤️ for the n8n community by [docunite GmbH](https://docunite.com)
