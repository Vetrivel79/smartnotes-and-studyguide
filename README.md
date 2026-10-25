# CAPSTONE 41 – Smart Notes and Study Guide Builder with NotebookLM

> **Website Name:** Smart Study Assistant  
> **Tagline:** Transform Lecture Notes into Smart Study Materials  
> **Academic Domain:** Computer Science & Engineering (CSE)  
> **Target Audience:** College engineering students managing high-volume technical lecture slide decks and exam revisions.

---

## 📖 Executive Summary & Objective

**Smart Study Assistant** is an educational software platform engineered to streamline exam revision for undergraduate engineering students. The project creates an educational bridge between university lecture materials (PDF slides, textbook chapters) and **Google NotebookLM**'s source-grounded intelligence.

Students can track their lecture slide decks, generate high-yield study guides with key definitions and algorithms, create granular summaries, test themselves with an interactive 10-question MCQ examination on Operating Systems, explore searchable viva FAQs, listen to lecture Audio Overviews via an integrated HTML5/Web Audio player, and verify facts using an 8-Point AI Accuracy & Hallucination Checklist.

---

## 🛠️ Technology Stack & System Architecture

- **Structure:** Semantic HTML5 with complete ARIA accessibility standards.
- **Styling:** Custom Vanilla CSS3 utilizing a modern college student aesthetic:
  - *Color Palette:* Dark Navy (`#0F172A`, `#1E293B`), Purple Accent (`#7C3AED`, `#8B5CF6`), Cyan Accent (`#06B6D4`, `#38BDF8`), Light Surface (`#F8FAFC`, `#FFFFFF`).
  - *Typography:* Outfit & Plus Jakarta Sans via Google Fonts, with JetBrains Mono for technical formulas.
  - *Design Patterns:* Responsive grid layouts, glassmorphism, micro-animations, accessible buttons.
- **Client Logic:** Modern Vanilla JavaScript (ES6+ modular event-driven architecture).
- **Audio Engine:** HTML5 Audio API & Web Audio API (with built-in melodic synthesis for instant preview without external MP3 dependencies).
- **Persistence:** Browser `localStorage` for offline document lists, custom study guides, saved summaries, quiz scores, verification audits, and reflection notes.
- **AI Integration Partner:** Google NotebookLM (external source-grounded workflow).

---

## 🌟 Key Features & Website Structure

1. **Home Dashboard:**
   - Real-time project overview, welcome banner, and 5-step Capstone methodology.
   - Dynamic metric counters: Total Lecture Documents, Study Guides Created, Quiz Questions Ready, and Audio Overviews.
   - Interactive Recent Study Materials cards with quick navigation into Operating Systems core modules.

2. **Upload Lecture Notes (`#upload`):**
   - Multi-file PDF selection and drag-and-drop zone.
   - File metadata table (filename, size in KB/MB, date added) with individual delete and "Clear All" controls.
   - Built-in "Load Sample OS PDFs" for instant demonstration.
   - Direct link to **Google NotebookLM** with step-by-step instructions on uploading PDFs into source notebooks.

3. **Operating Systems Study Guides (`#studyguide`):**
   - Pre-loaded, realistic academic revision modules for Operating Systems (CSE301):
     1. *Operating System Structure & Kernel Architectures*
     2. *Process Scheduling Algorithms & CPU Dispatching*
     3. *Deadlocks & Coffman Conditions (with Banker's Algorithm)*
     4. *Main Memory Management & Dynamic Partitioning*
     5. *Paging, Virtual Memory & TLB Architectures*
   - Includes Core Definitions, Working Mechanisms, and Exam Preparation Notes.
   - One-click "Copy Guide" and "Download (.TXT)" file generator.
   - "Add Custom Guide" modal to create and store custom syllabus guides in `localStorage`.

4. **AI Summary Generator & NotebookLM Bridge (`#summary`):**
   - Interactive prompt generator supporting Short, Medium, and Detailed summary granularity.
   - Copyable prompt formatted specifically for Google NotebookLM.
   - Editable summary workspace with preloaded sample summary on *Process Synchronization & Critical Section*.
   - Save summaries to browser `localStorage` and reload past summaries with one click.

5. **Interactive Quiz (10 CSE MCQs) (`#quiz`):**
   - 10 rigorous, realistic multiple-choice questions on Operating Systems (Process Scheduling, Coffman conditions, Thrashing, TLB, Banker's Algorithm, Traps, External Fragmentation, Belady's Anomaly, fork(), Semaphores).
   - Real-time progress bar, HUD score tracker, instant visual feedback (green/red indicators), and comprehensive technical explanations for every question.
   - Final score celebration card with qualitative feedback and quiz retake functionality.

6. **Searchable OS Frequently Asked Questions (`#faq`):**
   - 8 comprehensive Q&As addressing classic college viva exam questions (Process vs Thread, Deadlock Prevention vs Avoidance, Thrashing recovery, TLB miss handling, SJF tradeoffs, Monolithic vs Microkernel, Belady's Anomaly, Semaphore vs Mutex).
   - Live search filter by keyword with instant results count.
   - Expand All / Collapse All toggle.
   - Custom FAQ submission form that persists user questions in `localStorage`.

7. **Audio Overview & Podcast Player (`#audio`):**
   - Native HTML5 Audio Player with custom UI: Play/Pause, Seek scrubber, ±10s skip buttons, Volume slider, and animated waveform bars.
   - File picker to load downloaded NotebookLM Audio Overview MP3s.
   - Built-in Web Audio API synthesizer button that generates a pleasant melodic study chime sequence so the player can be tested immediately.
   - Complete guide on how NotebookLM generates 2-host conversational podcasts.

8. **Chronological Study Timeline (`#timeline`):**
   - Vertical milestone roadmap covering 6 sequential OS topics (Intro to Kernels -> Process Management -> CPU Scheduling -> Deadlocks -> Memory & Paging -> Virtual Memory & File Systems).
   - Interactive "Mark as Mastered" toggle with dynamic progress badge.

9. **AI Accuracy & Hallucination Checklist (`#accuracy`):**
   - 8-point academic verification checklist:
     1. Supported by original lecture PDF?
     2. Technical explanation correct?
     3. Important concepts or edge cases missing?
     4. Information outdated or conflicting with syllabus?
     5. Contains unsupported claims?
     6. Contains unsafe or incorrect code/advice?
     7. Source references and slide numbers available?
     8. Audio overview checked against textbook?
   - Live progress bar, audit status indicator, field notes textarea with auto-save, and audit record logging.

10. **NotebookLM & AI Prompt Library (`#prompts`):**
    - 7 tested prompt templates tailored for university coursework (Study Guides, Lecture Summaries, 10 MCQ Practice, Oral Viva extraction, Timeline generation, Audio Fact-checking, Source Grounding).
    - Category filtering and one-click copy buttons with toast notifications.

11. **Before and After Comparison (`#comparison`):**
    - Side-by-side qualitative analysis comparing raw lecture slide decks (dense, unindexed) against NotebookLM structured study aids (grounded, active retrieval).
    - Student reflection notes section saved in `localStorage`.

12. **About Capstone 41 (`#about`):**
    - Academic overview, problem statement, target audience, technical architecture, benefits, limitations, and the 4 Pillars of Responsible AI in Higher Education (Transparency, Source Grounding, Human-in-the-Loop, Data Privacy).

---

## 🚀 How to Run the Project Locally

Because this project is built using standard client-side technologies (**HTML5**, **CSS3**, and **Vanilla JavaScript**), no complex build tools or database configurations are required.

### Method 1: Direct Browser Launch
1. Locate the folder `c:\Users\Vetrivel s\OneDrive\Desktop\vac` in Windows File Explorer.
2. Double-click `index.html` (or right-click and choose **Open with** -> **Google Chrome**, **Microsoft Edge**, or **Mozilla Firefox**).
3. The complete application will launch instantly with all features active.

### Method 2: Local HTTP Server (Recommended for audio APIs)
You can run a lightweight local server using Python or Node.js:

**Using Python 3:**
```powershell
# Open PowerShell in the project directory
cd "c:\Users\Vetrivel s\OneDrive\Desktop\vac"
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000/
```

**Using Node.js / npx:**
```powershell
npx -y serve .
```

---

## 🤖 How to Use Google NotebookLM with this Website

1. **Step 1: Open Google NotebookLM**
   - Click the **"Open NotebookLM"** button located in the top navigation header or Upload section.
   - This opens [https://notebooklm.google.com/](https://notebooklm.google.com/) in a new tab.

2. **Step 2: Create a Course Notebook**
   - Inside NotebookLM, click **"New Notebook"**.
   - Name your notebook after your course (e.g., `CSE301 - Operating Systems`).

3. **Step 3: Upload Your Lecture PDFs**
   - Add your lecture PDFs as sources. NotebookLM indexes your documents and generates instant source citations.

4. **Step 4: Use Prompt Templates from our Prompt Library**
   - Switch back to **Smart Study Assistant** and open the **Prompt Library** (`#prompts`) or **AI Summary** (`#summary`) section.
   - Click **"Copy Prompt"** on the template of your choice.
   - Paste the prompt into NotebookLM's chat box.

5. **Step 5: Generate Audio Overview**
   - In NotebookLM, navigate to the Notebook Guide on the right side and click **"Generate"** under **Audio Overview**.
   - NotebookLM creates a 10-15 minute discussion between two AI hosts.
   - Click the three dots on the player, select **Download**, and load the downloaded `.mp3` into our **Audio Overview Player** (`#audio`).

6. **Step 6: Verify and Store**
   - Paste generated summaries into the **AI Summary** workspace and click **"Save to Local Storage"**.
   - Run the 8-Point Verification Checklist (`#accuracy`) to ensure citations match your lecture slides before final exams.

---

## 🎓 Capstone Presentation Talking Points (Viva Defense)

When demonstrating this project to professors and examiners, highlight these architectural decisions:

1. **Honest AI Integration:**
   - Rather than pretending to connect to proprietary APIs or generating fake simulated AI responses, the project implements a **grounded educational workflow** that trains students to use source-grounded tools responsibly.
2. **Client-Side Privacy:**
   - All student notes, quiz attempts, and verification audits are kept securely on the client machine using `localStorage`, ensuring zero server data-harvesting.
3. **Multimodal Learning Modalities:**
   - Supports auditory learning (NotebookLM Audio Overviews & custom Web Audio player), active recall (10 interactive MCQs with explanations), and structured reading (modular study guides).
4. **Academic Integrity & Responsible AI:**
   - Adheres strictly to university ethical standards with explicit disclaimers and an active 8-point accuracy verification audit.

---

## 📁 File Structure

```
├── index.html       # Complete semantic, accessible web interface with 12 sections
├── style.css        # Responsive CSS3 styling with Navy, Purple, and Cyan aesthetic
├── script.js        # Core JavaScript application logic, localStorage manager, and Web Audio API
└── README.md        # Complete CSE Capstone 41 documentation and defense guide
```

---
*Developed for CSE Capstone Project 41 – Academic Year 2026.*
