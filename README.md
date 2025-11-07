# n8n-nodes-neo

![Neo Banner](https://api.docunite.ai/static/banner.png)

Dies ist ein n8n Community Node für die Integration der **Neo API** von [docunite.ai](https://docunite.ai).

**Neo** ist eine intelligente Dokumentenmanagement-Plattform mit KI-gestützter Klassifizierung, Extraktion und Verarbeitung. Dieser Node ermöglicht es Ihnen, alle Funktionen der Neo API direkt in Ihren n8n-Workflows zu nutzen.

[n8n](https://n8n.io/) ist ein [fair-code lizenziertes](https://docs.n8n.io/reference/license/) Workflow-Automatisierungstool.

## 🚀 Installation

### Community Nodes (Empfohlen)

Für Benutzer auf n8n v0.187+, können Sie die Community Nodes Funktion verwenden, um diesen Node zu installieren:

1. Gehen Sie zu **Settings > Community Nodes**
2. Wählen Sie **Install**
3. Geben Sie `n8n-nodes-neo` in das Feld "Enter npm package name" ein
4. Stimmen Sie den [Risiken](https://docs.n8n.io/integrations/community-nodes/risks/) der Verwendung von Community Nodes zu
5. Installieren Sie den Node

Nach der Installation ist der Neo Node in Ihrer n8n-Instanz verfügbar und Sie können ihn in Ihren Workflows verwenden.

### Manuelle Installation (Selbst-gehostete Instanzen)

Für selbst-gehostete n8n-Instanzen können Sie den Node manuell installieren:

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-neo
```

Starten Sie n8n neu, damit die Änderungen wirksam werden.

## 🔑 Credentials

Um den Neo Node zu verwenden, benötigen Sie:

1. **API Key**: Ihr Neo API-Schlüssel von docunite.ai
2. **Tenant ID**: Ihre Tenant-ID
3. **Base URL** (optional): Standard ist `https://api.docunite.ai`

### Credentials einrichten

1. Gehen Sie zu **Credentials > New**
2. Suchen Sie nach "Neo API"
3. Geben Sie Ihren API Key und Tenant ID ein
4. Speichern Sie die Credentials

## 📚 Operationen

Der Neo Node unterstützt folgende Ressourcen und Operationen:

### 📊 Account Management

- **Get Balance**: Abrufen des Credit-Guthabens
- **Get Usage**: Abrufen der Nutzungsstatistiken (täglich, monatlich, jährlich)
- **Get Usage With Process Steps**: Detaillierte Nutzungsinformationen mit Prozessschritt-Aufschlüsselung

### 📄 Document Management

- **Upload**: Dokumente hochladen und verarbeiten
  - Unterstützt automatische Klassifizierung
  - Intelligentes Dokumenten-Splitting
  - Benutzerdefinierte Prompts
- **Get**: Dokument nach ID abrufen
- **Get Batch**: Dokumente nach Correlation ID abrufen
- **Get Metadata**: Dokument-Metadaten abrufen
- **Delete**: Einzelnes Dokument löschen
- **Delete Multiple**: Mehrere Dokumente löschen
- **Update**: Dokument-Metadaten aktualisieren
- **Download**: Dokument herunterladen
- **Chat**: Mit einem Dokument chatten (AI-gestützt)
- **Chat Multiple**: Mit mehreren Dokumenten chatten
- **Classify**: Dokumente klassifizieren
- **Export**: Dokumentdaten exportieren
- **Export Multiple**: Mehrere Dokumente exportieren
- **Index**: Dokument für Suche indexieren
- **Index Multiple**: Mehrere Dokumente indexieren
- **Retrieve**: Dokumentinhalt mit optionaler Anreicherung abrufen
- **Retrieve Multiple**: Mehrere Dokumente abrufen

### 🏢 Entity Management

- **Get All**: Alle Entities abrufen
- **Get**: Entity nach ID abrufen
- **Get Default**: Standard-Entity abrufen
- **Create**: Neue Entity erstellen
- **Update**: Entity aktualisieren
- **Delete**: Entity löschen

### 💡 Prompt Management

- **Get All**: Alle Prompts abrufen
- **Get**: Prompt nach ID abrufen
- **Create**: Neuen Prompt erstellen (Classification, Enrichment, Chat)
- **Update**: Prompt aktualisieren
- **Delete**: Prompt löschen

### 📋 Schema Management

- **Get All**: Alle Schemas abrufen
- **Get**: Schema nach ID abrufen
- **Create**: Neues JSON Schema erstellen
- **Update**: Schema aktualisieren
- **Delete**: Schema löschen

### 👤 User Management

- **Get Info**: Benutzerinformationen abrufen (User, Tenants, Permissions)

### 🔔 Webhook Management

- **Get All**: Alle Webhooks abrufen
- **Get**: Webhook nach ID abrufen
- **Create**: Neuen Webhook erstellen
- **Update**: Webhook aktualisieren
- **Delete**: Webhook löschen

## 💻 Verwendungsbeispiele

### Beispiel 1: Dokument hochladen und klassifizieren

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
      "name": "Neo - Upload Document",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "Neo API Credentials"
      }
    }
  ]
}
```

### Beispiel 2: Mit Dokumenten chatten

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "document",
        "operation": "chat",
        "documentId": "document-id-here",
        "prompt": "Was sind die wichtigsten Punkte in diesem Dokument?"
      },
      "name": "Neo - Chat with Document",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "Neo API Credentials"
      }
    }
  ]
}
```

### Beispiel 3: Entities verwalten

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "entity",
        "operation": "create",
        "entityName": "Mein Projekt",
        "entityFields": "{\"description\": \"Projektbeschreibung\"}"
      },
      "name": "Neo - Create Entity",
      "type": "n8n-nodes-neo.neo",
      "credentials": {
        "neoApi": "Neo API Credentials"
      }
    }
  ]
}
```

## 🔗 Webhooks

Neo unterstützt Webhooks für asynchrone Benachrichtigungen über den Verarbeitungsstatus:

1. Erstellen Sie einen Webhook mit der `Webhook Create` Operation
2. Registrieren Sie Ihre Callback-URL
3. Erhalten Sie Benachrichtigungen, wenn die Dokumentenverarbeitung abgeschlossen ist

## 📖 API-Dokumentation

Die vollständige API-Dokumentation finden Sie unter:
- Swagger UI: [https://api.docunite.ai/](https://api.docunite.ai/)
- Swagger JSON: [https://api.docunite.ai/swagger.json](https://api.docunite.ai/swagger.json)

## 🛠️ Kompatibilität

- Getestet mit n8n v0.187.0+
- Node.js 18.17.0+
- n8n-workflow 1.0.0+

## 📝 Lizenz

[MIT](LICENSE.md)

## 🤝 Unterstützung

Bei Fragen oder Problemen:
- GitHub Issues: [https://github.com/docunite/n8n-nodes-neo/issues](https://github.com/docunite/n8n-nodes-neo/issues)
- docunite Support: [support@docunite.ai](mailto:support@docunite.ai)

## 🔗 Ressourcen

- [n8n Community Nodes Dokumentation](https://docs.n8n.io/integrations/community-nodes/)
- [docunite.ai Website](https://docunite.ai)
- [Neo API Dokumentation](https://api.docunite.ai/)

## 🌟 Features

- ✅ Vollständige Neo API-Integration
- ✅ Alle Ressourcen unterstützt (außer Search)
- ✅ API-Key Authentifizierung
- ✅ Umfassende Fehlerbehandlung
- ✅ Binary Data Support (Upload/Download)
- ✅ JSON Schema Validierung
- ✅ Webhook-Integration
- ✅ AI-gestützte Dokumentenverarbeitung

## 📦 Version History

### 0.1.0 (Initial Release)
- Vollständige Integration aller Neo API Endpunkte
- Account Management
- Document Management (Upload, Download, Chat, etc.)
- Entity Management
- Prompt Management
- Schema Management
- User Management
- Webhook Management

## 👨‍💻 Entwicklung

Wenn Sie zur Entwicklung beitragen möchten:

```bash
# Repository klonen
git clone https://github.com/docunite/n8n-nodes-neo.git
cd n8n-nodes-neo

# Dependencies installieren
npm install

# Build
npm run build

# In lokaler n8n-Instanz verlinken
npm link
```

Starten Sie n8n im Development-Modus:

```bash
n8n start
```

## ⚠️ Wichtige Hinweise

- Search-Endpunkte sind absichtlich nicht implementiert (wie vom Kunden gewünscht)
- File-Upload verwendet Binary Data aus n8n
- Chat-Operationen unterstützen Streaming-Responses
- Alle JSON-Parameter können dynamisch über Expressions gesetzt werden

---

Entwickelt mit ❤️ für die n8n Community von [docunite GmbH](https://docunite.ai)

