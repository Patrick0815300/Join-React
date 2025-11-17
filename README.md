# JOIN – Task Manager

JOIN ist ein moderner Task Manager, inspiriert vom Kanban-System. Er ermöglicht das Erstellen, Organisieren und Bearbeiten von Aufgaben mit intuitiven Drag-and-Drop-Funktionen. Nutzer können Aufgaben Personen und Kategorien zuweisen und den Überblick über den Fortschritt behalten.

## Inhaltsverzeichnis

- Über das Projekt
- Features
- Demo
- Installation
- Verwendung
- Technologien
- Projektstruktur
- Environment Variables
- Kontakt

## Über das Projekt

JOIN ist ein webbasiertes Task-Management-Tool, das die Prinzipien des Kanban-Boards nutzt, um Aufgaben effizient zu verwalten. Ziel ist es, Teams und Einzelpersonen eine einfache, flexible und übersichtliche Möglichkeit zu bieten, Workflows zu organisieren.

## Features

- Kanban Board: Aufgaben werden als Karten in den Spalten To Do, In Progress, Await Feedback und Done dargestellt. Aufgaben lassen sich per Drag & Drop verschieben.
- Task Management: Aufgaben können mit Titel, Beschreibung, Verantwortlichen, Fälligkeitsdatum, Priorität, Kategorie und Subtasks angelegt und bearbeitet werden.
- Benutzerverwaltung: Anmeldung als Gast oder Registrierung mit eigenem Account möglich.
- Summary-Seite: Übersicht über alle wesentlichen Ereignisse wie Anzahl der offenen, in Bearbeitung befindlichen und abgeschlossenen Aufgaben.
- Kontakte: Verwaltung und Bearbeitung von Kontakten mit Name, E-Mail und Telefonnummer. Kontakte können Aufgaben zugewiesen werden.
- Supabase Integration: Sichere Speicherung aller Daten in der Cloud mit PostgreSQL-Datenbank.
- Intuitive Bedienung: Moderne Benutzeroberfläche mit React und responsive Design.

## Demo

https://join.patrick-nigrin.dev/

## Installation

Voraussetzungen:

- Node.js (Version 18 oder höher)
- npm oder yarn
- Supabase Account

Schritte:

1. Repository klonen

   git clone https://github.com/dein-benutzername/join-react.git
   cd join

2. Abhängigkeiten installieren

   npm install

3. Supabase konfigurieren

   - Erstelle ein neues Projekt auf supabase.com
   - Navigiere zu „Settings > API“ in deinem Supabase Dashboard
   - Kopiere die Project URL und den anon/public API Key
   - Erstelle eine .env Datei im Root-Verzeichnis und füge folgendes ein:

     VITE_SUPABASE_URL=deine-project-url
     VITE_SUPABASE_ANON_KEY=dein-anon-key

4. Datenbank-Schema einrichten

   - Führe deine CREATE TABLE Statements (Tasks, Kontakte, etc.) im Supabase SQL Editor aus.

5. Development Server starten

   npm run dev

   Die App läuft anschließend unter:
   http://localhost:5173

6. Production Build erstellen

   npm run build

   Die optimierten Dateien werden im dist/ Ordner erstellt.

## Verwendung

- Login: Melde dich als Gast an oder registriere einen neuen Account.
- Summary: Verschaffe dir einen Überblick über alle Aufgaben und deren Status.
- Tasks hinzufügen: Erstelle neue Aufgaben mit allen relevanten Details.
- Board: Organisiere Aufgaben per Drag & Drop auf dem Kanban-Board.
- Kontakte: Lege neue Kontakte an oder bearbeite bestehende, um sie Aufgaben zuzuweisen.

## Technologien

- React 19 – Frontend-Framework
- TypeScript – Typsicheres JavaScript
- Vite – Build Tool & Development Server
- Supabase – Backend-as-a-Service (Auth & Database)
- PostgreSQL – Relationale Datenbank
- SCSS Modules – Styling
- React DnD – Drag & Drop Funktionalität

## Projektstruktur

join/
├── src/
│   ├── components/       # React Komponenten
│   ├── containers/       # Container-Komponenten
│   ├── utils/            # Hilfsfunktionen
│   ├── assets/           # Bilder, Icons, SVGs
│   ├── styles/           # Globale Styles
│   └── lib/
│       └── supabase.ts   # Supabase Client
├── public/               # Statische Assets
├── dist/                 # Production Build
└── package.json

## Environment Variables

- VITE_SUPABASE_URL – Supabase Project URL
- VITE_SUPABASE_ANON_KEY – Supabase Anonymous/Public API Key

## Kontakt

Bei Fragen oder Anregungen:

- Patrick Nigrin
- E-Mail: mail@patrick-nigrin.dev
- Website: https://patrick-nigrin.dev
