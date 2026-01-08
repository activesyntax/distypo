# DisTypo — typography and text correction
<img src="distypo-logo.png" height="200" alt="distypo - typography and text correctness"></img>

## OverView
Deterministic desktop tool for typographic and text-level error correction in plain text and XML documents.

## 1. MVP Feature List

### 1.1 Core Text Processing
- Paste or load plain text into an editor
- Import structured text (XML-based formats, e.g. Scribus-compatible XML)
- UTF-8 full Unicode support (accented characters, special glyphs)
- Preserve original formatting and structure where applicable

### 1.2 Typographical Error Detection
- Detection of common spelling errors (dictionary-based)
- Detection of duplicated words
- Detection of missing or extra spaces
- Detection of incorrect punctuation spacing
- Detection of mixed quotation marks (e.g. “ ” vs " ")
- Detection of repeated punctuation (e.g. `..`, `,,`, `!!`)
- Detection of common typographic anti-patterns (double spaces, trailing spaces)

### 1.3 Typographic Normalization
- Smart quote normalization (language-aware if possible)
- Dash normalization (hyphen / en dash / em dash rules)
- Ellipsis normalization (`...` → `…`)
- Non-breaking space insertion in critical contexts (basic rules only)
- Consistent apostrophe handling

### 1.4 Review & Correction Workflow
- Highlight detected issues directly in the text
- Side panel listing all detected issues
- Click-to-jump from issue list to text location
- One-click fix for each issue
- “Fix all of this type” option per rule

### 1.5 Export & Output
- Export corrected plain text
- Export corrected XML while preserving structure
- Diff-style preview (before / after)

### 1.6 User Interface (MVP Scope)
- Single-window desktop application
- Clean, distraction-free layout (text editor + issue panel)
- Light theme only (dark theme postponed)
- Keyboard shortcuts for core actions

---

## 2. Non-Goals (Explicitly Out of MVP)
- Cloud sync or user accounts
- AI-based semantic rewriting
- Grammar or style suggestions
- Real-time collaboration
- Plugin system
- Web version

---

## 3. Technical Architecture (High-Level)

- **Frontend**
  - Angular
  - Angular Material
  - Rich text editor (contenteditable or editor library)

- **Backend**
  - Rust (Tauri command layer)
  - Text analysis engine in Rust
  - Rule-based detection system

- **Desktop Runtime**
  - Tauri (secure IPC between Angular and Rust)

---

## 4. Step-by-Step Developer Task List

## Phase 1 — Project Foundation

### 1.1 Repository & Tooling
- Initialize Git repository
- Set up Tauri + Angular project
- Configure Angular Material
- Define build and packaging scripts

### 1.2 Project Structure
- Define frontend folder structure (components, services, models)
- Define Rust backend module structure
- Establish IPC contract between frontend and backend

---

## Phase 2 — Core Editor

### 2.1 Text Input
- Implement plain text editor component
- Support paste, select all, undo/redo
- Track cursor and selection positions

### 2.2 XML Handling
- Implement XML import
- Parse XML while preserving nodes and attributes
- Convert XML content to editable text representation
- Maintain mapping between XML nodes and text offsets

---

## Phase 3 — Rule Engine (Rust)

### 3.1 Core Analysis Engine
- Create text analysis pipeline
- Tokenize text safely (Unicode-aware)
- Maintain character offset mapping

### 3.2 Detection Rules (Initial Set)
- Double spaces
- Trailing spaces
- Repeated punctuation
- Duplicate words
- Incorrect quotation mark usage
- Ellipsis normalization candidates

### 3.3 Rule Result Model
- Define issue type enum
- Define severity levels
- Define position (start, end)
- Define suggested fix text

---

## Phase 4 — Frontend Integration

### 4.1 IPC Communication
- Send text to Rust backend
- Receive list of detected issues
- Handle incremental re-analysis on text change (basic debounce)

### 4.2 Highlighting
- Render inline highlights in editor
- Map Rust offsets to editor positions
- Handle overlapping or nested issues safely

---

## Phase 5 — Review Workflow

### 5.1 Issue Panel
- Display list of issues grouped by type
- Show short human-readable description
- Enable click-to-navigate

### 5.2 Fix Actions
- Apply single fix
- Apply all fixes of the same rule
- Undo applied fixes

---

## Phase 6 — Export & Diff

### 6.1 Export
- Export corrected plain text
- Reconstruct corrected XML
- Validate XML integrity

### 6.2 Diff Preview
- Generate before/after diff view
- Highlight changed segments

---

## Phase 7 — Polish & Stability

### 7.1 UX Improvements
- Keyboard shortcuts
- Basic settings dialog (language, quotes style)
- Error handling and fallback states

### 7.2 Performance & Safety
- Handle large texts gracefully
- Prevent editor freezes
- Add basic automated tests (Rust rules + Angular services)

---

## 8. MVP Exit Criteria

- User can paste text or import XML
- DisTypo reliably detects and fixes core typographic errors
- Corrections are transparent and reversible
- Export preserves structure and formatting
- Application is stable on major desktop platforms

---

**DisTypo MVP goal:**  
*A fast, deterministic, professional typographic correction tool — not a writer, not an AI editor, but a typographic guardian.*
