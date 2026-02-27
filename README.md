
# SVG Template Editor

GitHub Repository:
[https://github.com/Takdirhossain/svg_editor](https://github.com/Takdirhossain/svg_editor)

Live Demo:
[https://svg-editor-delta.vercel.app/](https://svg-editor-delta.vercel.app/)

---

## 🚀 Setup & Run Instructions

Follow the steps below to run the project on your computer.

### 1️⃣ Install Node.js (Required Version: 22 - If you don't have it installed)

* Download Node.js from: [https://nodejs.org](https://nodejs.org)
* Install **Node.js version 22**
* After installation, open terminal / command prompt and run:

```
node -v
```

It should show:

```
v22.x.x
```

If you see version 22, you are ready.

---

### 2️⃣ Download the Project

**Go To This URL:** 

You can either: [https://github.com/Takdirhossain/svg_editor](https://github.com/Takdirhossain/svg_editor)

**Option A – Download ZIP**

* Click the green **Code** button on GitHub
* Click **Download ZIP**
* Extract the folder

OR

**Option B – Using Git (if installed)**

```
git clone https://github.com/Takdirhossain/svg_editor.git
cd svg_editor
```

---

### 3️⃣ Install Dependencies

Inside the project folder, run:

```
npm install
```

Wait until installation finishes.

---

### 4️⃣ Start the Application

Run:

```
npm run dev
```

You will see something like:

```
http://localhost:5173
```

Open that link in your browser.

The application should now be running.

---

# 💡 Approach (Brief)

The application is structured with clear separation of concerns.

### Architecture

The project is divided into three layers:

1. **UI Components**

   * Purely presentational.
   * They receive only the required data and callbacks via props and do not contain business logic.
   * No business logic inside components(jsx files).

2. **Custom Hooks**

   * `useSVGEditor` → Handles:

     * Uploaded SVG content
     * Field values (name, title, description)
     * Placeholder replacement
     * Download format
     * Validation & state management

   * `useFileUpload` → Handles:

     * File input selection
     * Reusable upload logic

     Since file selection is used in two places (upload screen and editor screen), this hook avoids duplication and keeps JSX clean.

3. **Utility Functions**

   * SVG validation
   * Placeholder detection
   * String replacement
     Kept separate for clarity and maintainability.

---

## 🔄 Placeholder Replacement

* Replacement is done directly on the raw SVG string using `split().join()`.
* Inputs are rendered based on detected placeholders.
* Live preview updates instantly.
* The preview renders using a `data:image/svg+xml` URL inside an `<img>` tag.

---

## ⬇ Download Implementation

Two export options are supported:

* **SVG Export** → Creates a Blob and triggers download.
* **PNG Export** → Renders SVG to an offscreen `<canvas>` at 2× scale for better quality and downloads using `canvas.toBlob()`.

---

# 📝 Assumptions

* Placeholders must exactly match:

  * `{{name}}`
  * `{{title}}`
  * `{{description}}`
* Placeholders are case-sensitive.
* One file is edited per session.
* Clicking “New File” resets the editor.
* All processing happens in the browser (no backend).
* The editor is optimized for desktop view.


