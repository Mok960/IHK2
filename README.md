# MINT-Ferienwoche Aurora

Dunkles Labor-Tagebuch mit Pastellfarben. Next.js, PostgreSQL und Drizzle.

## Lokal starten

```bash
npm install
npx drizzle-kit push
npm run dev
```

`.env` Beispiel:

```
DATABASE_URL=postgresql://USER:PASS@HOST:5432/DB
AUTH_USERNAME=Mok960
AUTH_PASSWORD=12345678
```

Login: **Mok960** / **12345678**

## Als Website über GitHub hosten

GitHub Pages kann keine Datenbank und keine Server-Actions ausführen. Deshalb so veröffentlichen:

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

### 2. Kostenlos bei Vercel verbinden

1. Auf [vercel.com](https://vercel.com) mit GitHub einloggen
2. **Add New Project** und das Repository wählen
3. Eine kostenlose Postgres-Datenbank anlegen (Vercel Postgres, Neon oder Supabase)
4. Environment Variable setzen: `DATABASE_URL`
5. Deploy

Die Seite bekommt dann eine Adresse wie `https://dein-projekt.vercel.app`.

Nach dem ersten Deploy im Projektordner einmal das Schema anlegen:

```bash
npx drizzle-kit push
```

oder in der Vercel-Datenbank dieselben Tabellen erzeugen.

### 3. Eigene Domain (optional)

In Vercel unter **Domains** eine eigene Domain verbinden.
