# Beitrag zu n8n-nodes-neo

Vielen Dank für Ihr Interesse, zu n8n-nodes-neo beizutragen! 🎉

## Entwicklungsumgebung einrichten

1. **Repository forken und klonen**
```bash
git clone https://github.com/IHR-USERNAME/n8n-nodes-neo.git
cd n8n-nodes-neo
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Node bauen**
```bash
npm run build
```

4. **In lokaler n8n-Instanz testen**
```bash
# Node verlinken
npm link

# In Ihrem n8n-Verzeichnis
cd ~/.n8n
npm link n8n-nodes-neo

# n8n starten
n8n start
```

## Code-Stil

Wir verwenden ESLint und Prettier für konsistenten Code-Stil:

```bash
# Linting
npm run lint

# Automatische Fixes
npm run lintfix

# Formatierung
npm run format
```

## Pull Requests

1. Erstellen Sie einen Branch für Ihre Änderung:
   ```bash
   git checkout -b feature/meine-neue-funktion
   ```

2. Committen Sie Ihre Änderungen:
   ```bash
   git commit -m "feat: Beschreibung der Änderung"
   ```

3. Pushen Sie zu Ihrem Fork:
   ```bash
   git push origin feature/meine-neue-funktion
   ```

4. Erstellen Sie einen Pull Request auf GitHub

## Commit-Nachrichten

Wir folgen der [Conventional Commits](https://www.conventionalcommits.org/) Spezifikation:

- `feat:` - Neue Features
- `fix:` - Bug-Fixes
- `docs:` - Dokumentationsänderungen
- `style:` - Code-Stil Änderungen
- `refactor:` - Code-Refactoring
- `test:` - Tests hinzufügen/ändern
- `chore:` - Wartungsaufgaben

## Testen

Bevor Sie einen Pull Request erstellen:

1. Testen Sie alle geänderten Operationen in n8n
2. Stellen Sie sicher, dass der Build erfolgreich ist
3. Führen Sie Linting durch

## Fragen?

Bei Fragen können Sie:
- Ein Issue auf GitHub öffnen
- Eine E-Mail an support@docunite.ai senden

Vielen Dank für Ihren Beitrag! 🙏

