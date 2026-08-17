# MINT-Ferienwoche Aurora

Dunkles Labor-Tagebuch mit Pastellfarben. Next.js, Netlify Database und Drizzle.

## Lokal starten

```bash
npm install
netlify dev --port 8889
```

Für den Admin-Login müssen diese Umgebungsvariablen gesetzt werden:

```
AUTH_USERNAME=...
AUTH_PASSWORD=...
```

Eine Datenbank-Verbindungszeichenfolge ist nicht erforderlich. Netlify Database wird automatisch bereitgestellt.

## Über Netlify veröffentlichen

Das Repository mit einer Netlify-Site verbinden und die Login-Variablen unter **Site configuration → Environment variables** setzen. Beim Deploy werden die Migrationen aus `netlify/database/migrations` automatisch angewendet.

### 1. Code zu GitHub

Neues Repository anlegen, dann:

```bash
git init
git add .
git commit -m "MINT-Ferienwoche"
git branch -M main
git remote add origin https://github.com/DEIN-NAME/DEIN-REPO.git
git push -u origin main
```

### 2. Eigene Domain (optional)

In Netlify unter **Domain management** eine eigene Domain verbinden.
