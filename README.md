<div align="center">

  <img src="frontend/React%2BTailwind/public/favicon.png" alt="Samvedna AI Logo" width="96" height="96" />

  # Samvedna AI (संवेदना AI)
  ### Trauma-Informed, Multimodal Case Triage & Distress Response Ecosystem

  [![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026_Prototype-7c3aed?style=for-the-badge&logo=target&logoColor=white)](https://www.sih.gov.in/)
  [![Ministry Alignment](https://img.shields.io/badge/MoSJE-NHAA_14566-4f46e5?style=for-the-badge&logo=shield&logoColor=white)](https://socialjustice.gov.in/)
  [![Python](https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.141+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-19.2+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![DPDP Act 2023](https://img.shields.io/badge/DPDP_Act-2023_Compliant-059669?style=for-the-badge&logo=checkmarx&logoColor=white)](#-dpdp-act-2023--data-sovereignty)
  [![Status](https://img.shields.io/badge/Status-Under_Development_(Demo)-orange?style=for-the-badge&logo=blueprint&logoColor=white)](#-project-status-under-development-demo)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>Empowering Scheduled Caste & Scheduled Tribe (SC/ST) atrocity survivors through empathetic AI-assisted check-ins, transparent counselor triage, and proactive administrative governance.</strong>
  </p>

  <p align="center">
    <a href="#-project-status-under-development-demo">Project Status (Demo)</a> •
    <a href="#-executive-summary">Overview</a> •
    <a href="#-core-architecture--three-pillar-experience">Three-Pillar Roles</a> •
    <a href="#-system-architecture--dataflow">Architecture</a> •
    <a href="#-dynamic-distress-score--explainable-ai">Nyaya XAI Engine</a> •
    <a href="#-quickstart--installation">Quickstart</a> •
    <a href="#-restful-api-reference">API Reference</a> •
    <a href="#-dpdp-act-2023--data-sovereignty">Privacy & Ethics</a>
  </p>

  <br />

  <img src="frontend/React%2BTailwind/public/readme-photos/landing/hero.png" alt="Samvedna AI Platform Preview" width="92%" style="border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);" />

</div>

---

## ⚠️ Project Status: Under Development (Demo)

> [!IMPORTANT]
> **Active Development & Demonstration Prototype:** Samvedna AI is an early-stage research, demonstration and decision-support prototype created for **Smart India Hackathon 2026**.
> - **Current State**: The project is **actively under development**. The user interfaces, conversational check-in interactions, risk calculations and administrative dashboards are functional **demonstrations** illustrating the product concept.

---

## 📖 Table of Contents

- [Project Status: Under Development (Demo)](#-project-status-under-development-demo)
- [Executive Summary](#-executive-summary)
- [The Problem & National Significance](#-the-problem--national-significance)
- [Core Architecture & Three-Pillar Experience](#-core-architecture--three-pillar-experience)
  - [1. Citizen Healing & Voice Check-in Portal](#1-citizen-healing--voice-check-in-portal)
  - [2. Counselor Clinical Triage Workspace](#2-counselor-clinical-triage-workspace)
  - [3. Administrative Command & Governance Centre](#3-administrative-command--governance-centre)
- [System Architecture & Dataflow](#-system-architecture--dataflow)
- [Dynamic Distress Score & Explainable AI (Nyaya XAI)](#-dynamic-distress-score--explainable-ai)
- [Technology Stack](#-technology-stack)
- [Database Schema & High-Performance Design](#-database-schema--high-performance-design)
- [Quickstart & Installation](#-quickstart--installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (FastAPI & PostgreSQL)](#backend-setup-fastapi--postgresql)
  - [Frontend Setup (React 19 & Tailwind CSS v4)](#frontend-setup-react-19--tailwind-css-v4)
- [RESTful API Reference](#-restful-api-reference)
- [DPDP Act 2023 & Data Sovereignty](#-dpdp-act-2023--data-sovereignty)
- [Project Directory Structure](#-project-directory-structure)
- [Roadmap](#-roadmap)
- [Team & Acknowledgments](#-team--acknowledgments)
- [License](#-license)

---

## 🌟 Executive Summary

Following the filing of an FIR under the **Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act 1989** and the **Protection of Civil Rights (PCR) Act 1955**, survivors often face acute secondary victimization, social boycotts, intimidation and severe psychological trauma. Existing helplines and grievance redressal systems operate predominantly as reactive mechanisms-waiting for victims to muster courage and dial in during moments of peak duress.

**Samvedna AI (संवेदना AI)** flips the paradigm from **reactive complaint logging** to **proactive, empathetic, trauma-informed wellness triage**. By combining:
- **Multimodal conversational check-ins** (voice tremor analysis + multilingual natural language understanding),
- A proprietary **Dynamic Distress Score (DDS)**,
- Transparent **Explainable AI (Nyaya XAI)** for licensed counselors, and
- A district-wide **Administrative GIS Hotspot Command Center** with automated IVRS/SMS fallback,

Samvedna AI equips social welfare departments and nodal officers with real-time intelligence to prevent trauma escalation, prevent witness intimidation and ensure dignity and justice for every survivor.

---

## The Problem & National Significance

```text
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│     The Existing Gap      │      │      Our Intervention     │      │     The Ultimate Vision   │
│ • Long delays post-FIR    │      │ • Proactive voice/text    │      │ • Zero dropped distress   │
│ • Fear of retaliation     │ ───> │   wellness check-ins      │ ───> │   signals                 │
│ • Black-box scoring       │      │ • Transparent Nyaya XAI   │      │ • Timely trauma & legal   │
│ • Rural digital divide    │      │ • IVRS/SMS low-tech bridge│      │   support for all         │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

1. **Secondary Trauma & Isolation**: Atrocity survivors frequently endure retaliatory threats and psychological isolation during prolonged legal trials.
2. **Language & Literacy Barriers**: Rural citizens often struggle with complex written portals. They require low-barrier voice interaction in their native tongue or dialect (Hindi, Hinglish, Tamil, Marathi and regional variations).
3. **Black-Box AI Skepticism**: Counselors cannot rely on opaque risk scores without clinical reasoning. They need explicit feature attribution (linguistic despair markers, acoustic vocal jitter, longitudinal escalation).
4. **Connectivity Realities**: High-tech apps fail in media-dark rural belts. A national system must gracefully degrade to **IVRS voice calls** and **SMS telemetry** without data loss.

---

## 🏛️ Core Architecture & Three-Pillar Experience

Samvedna AI provides three bespoke, role-tailored viewports accessible seamlessly within a unified application:

| Persona | Portal | URL Route | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **Survivor / Citizen** | [Citizen Healing Portal](#1-citizen-healing--voice-check-in-portal) | `/#citizen` | Empathetic voice/text check-in, Swaraj vernacular AI, acoustic distress detection, trauma-informed coping |
| **Licensed Counselor** | [Counselor Triage Workspace](#2-counselor-clinical-triage-workspace) | `/#counselor` | Real-time case queue, Dynamic Distress Gauge, Nyaya Explainable AI diagnostics, one-click escalation interventions |
| **District Administrator** | [Admin Command Center](#3-administrative-command--governance-centre) | `/#admin` | District GIS heatmaps, aggregate Bento metrics, resource allocation, SMS/IVRS automated broadcast fallback console |

---

### 1. Citizen Healing & Voice Check-in Portal

<p align="center">
  <img src="frontend/React%2BTailwind/public/readme-photos/landing/citizen.png" alt="Citizen Healing Portal Preview" width="80%" style="border-radius: 10px; border: 1px solid #e0d9ff;" />
</p>

Designed with deep empathy, calming aesthetics and zero intimidation:
- **Swaraj Vernacular Conversationalist**: Culturally grounded text and voice assistant that listens without clinical judgment.
- **Acoustic Panic Hook (`AcousticPanicHook.jsx`)**: Non-invasive client-side acoustic biomarker extractor measuring vocal tremor, shimmer, pitch deviation ($\Delta \text{Hz}$) and sobbing frequencies.
- **Bilingual & Multilingual Dialects**: Instant toggle between English, Hinglish, हिन्दी (Hindi), தமிழ் (Tamil) and मराठी (Marathi).
- **Grounding Exercises & Rights Guidance**: Instant access to 4-7-8 breathing exercises, emergency legal entitlements under the SC/ST PoA Act and the **NHAA National Helpline 14566**.

---

### 2. Counselor Clinical Triage Workspace

<p align="center">
  <img src="frontend/React%2BTailwind/public/readme-photos/landing/counsellor.png" alt="Counselor Clinical Triage Workspace Preview" width="80%" style="border-radius: 10px; border: 1px solid #e0d9ff;" />
</p>

A precision workstation built for registered clinical psychologists and legal officers:
- **Dynamic Distress Gauge (`DistressGauge.jsx`)**: Real-time 0–100% composite risk barometer showing trajectory (stable, escalating, critical).
- **Nyaya Explainable AI (`NyayaExplainableAI.jsx`)**: Transparent attribution breakdown displaying exact linguistic despair phrases, acoustic tremor percentiles and temporal risk velocity.
- **Active Case Queue (`CaseQueueSidebar.jsx`)**: FIR-indexed case cards with NHAA IDs, district tags and severity badges (Safe, Tier-1 Linguistic, Tier-1 Acoustic).
- **Instant Intervention Control Bar (`InterventionBar.jsx`)**: One-touch deployment of:
  - 📞 **SOS Auto-Dialer & Tele-Counselor Patch**
  - ⚖️ **District Legal Aid Liaison Escalation**
  - 🚓 **Police PCR & Witness Protection Alert**
  - 🛡️ **District Nodal Officer (DNO) Escort Notification**

---

### 3. Administrative Command & Governance Centre

<p align="center">
  <img src="frontend/React%2BTailwind/public/readme-photos/landing/administrator.png" alt="Administrative Command Center Preview" width="80%" style="border-radius: 10px; border: 1px solid #e0d9ff;" />
</p>

Executive command module for State Nodal Officers, District Magistrates, and Welfare Commissioners:
- **Geographic Hotspot Heatmap (`GeographicHeatmap.jsx`)**: Visual GIS cluster analysis mapping high-distress FIR clusters across districts (e.g., Alwar, Udaipur, Bharatpur).
- **Bento Operational Metrics (`BentoMetrics.jsx`)**: High-density KPI cards tracking SLA resolution rates, critical distress spikes, active cases and counselor workloads.
- **IVRS & SMS Broadcast Console (`IvrsSmsConsole.jsx`)**: Simulated multi-channel fallback engine enabling outbound check-in dispatches to 2G/feature phones in rural pockets.

---

## 🔄 System Architecture & Dataflow

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as 🌸 Citizen / Survivor
    participant UI as 💻 Frontend (React 19 + Vite)
    participant API as ⚡ FastAPI Backend
    participant ML as 🧠 Dynamic Distress & XAI Engine
    participant DB as 🐘 PostgreSQL 15 (UUIDv7 + Index)
    actor Counselor as 🩺 Counselor / Case Worker
    actor Admin as 🏛️ District Admin / Nodal Officer

    Citizen->>UI: Submit Check-in (Text or Voice Audio)
    UI->>UI: Extract Client-side Acoustic Biomarkers (Pitch, Jitter)
    UI->>API: POST /api/v1/victims/check-in
    API->>ML: Evaluate NLP Sentiment & Acoustic Tremor
    ML-->>API: Return Dynamic Distress Score (DDS) + XAI Tokens
    API->>DB: Store InteractionLog (UUIDv7, partial index check)
    
    alt Distress Score >= 70% (Critical Alert)
        API-->>Counselor: Real-time Global Distress Broadcast Flagged
        Counselor->>UI: Inspect Nyaya XAI Breakdown & Audio Anomalies
        Counselor->>API: Trigger Intervention (Tele-Patch / Legal Aid / Police PCR)
        API-->>Admin: Escalate District Anomaly to GIS Heatmap
        API-->>Citizen: Outbound SOS Follow-up / Counselor Tele-Patch
    else Stable Baseline (< 40%)
        API-->>Citizen: Trauma-Informed Grounding & Affirmations
        API-->>Counselor: Logged into Routine Weekly Monitoring Queue
    end
```

---

## 🧠 Dynamic Distress Score & Explainable AI

### The Composite Scoring Formula

Unlike arbitrary black-box classifiers, Samvedna AI synthesizes distress using a transparent, multi-dimensional formulation:

$$\text{DDS} = w_{\text{text}} \cdot \mathcal{S}_{\text{NLP}} + w_{\text{voice}} \cdot \mathcal{A}_{\text{jitter}} + w_{\text{trend}} \cdot \mathcal{T}_{\Delta} + w_{\text{legal}} \cdot \mathcal{L}_{\text{vuln}}$$

Where:
- $\mathcal{S}_{\text{NLP}} \in [0, 1]$: Semantic despair and perceived helplessness detected in check-in syntax.
- $\mathcal{A}_{\text{jitter}} \in [0, 1]$: Acoustic perturbation (jitter, shimmer amplitude, pitch instability).
- $\mathcal{T}_{\Delta} \in [0, 1]$: Longitudinal trajectory delta across consecutive check-ins.
- $\mathcal{L}_{\text{vuln}} \in [0, 1]$: Legal vulnerability factor (pending trial phase, threat history).

### The Nyaya XAI Guarantee
Counselors never see a naked percentage. Every alert is paired with an inspectable **feature contribution sheet**:
- **Flagged Lexical Triggers**: Highlighted quotes such as *"I cannot endure this trial anymore"*, *"Our family is surrounded"*.
- **Acoustic Signatures**: Exact pitch deviations ($+214\text{ Hz}$), jitter ($8.7\%$ tremor), and breath gasp frequency.
- **Actionable Decision Support**: Contextual intervention recommendations matching state legal protocols.

---

## 🛠️ Technology Stack

```
Frontend                       Backend                        Data & Storage
┌────────────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐
│ • React 19.2 (Vite 8)  │     │ • Python 3.14+         │     │ • PostgreSQL 15+       │
│ • Tailwind CSS v4.3    │ <─> │ • FastAPI (Async)      │ <─> │ • SQLAlchemy 2.0 Async │
│ • Lucide Icons         │     │ • Uvicorn ASGI         │     │ • Alembic Migrations   │
│ • Web Audio Synthesis  │     │ • Pydantic v2 / Argon2 │     │ • UUIDv7 (uuid6)       │
└────────────────────────┘     └────────────────────────┘     └────────────────────────┘
```

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19.2** + **Vite 8** | Modern, high-performance concurrent client application |
| **Styling & Design System**| **Tailwind CSS v4** + Modern Glassmorphism | Custom HSL tailored violet/indigo palette, responsive fluid layout |
| **Icons & Visuals** | **Lucide React** | Consistent, accessible iconography |
| **Audio Synthesizer** | Native **Web Audio API** | Zero-latency presentation audio cues and haptic feedback |
| **Backend Framework** | **FastAPI 0.141+** | High-concurrency async Python REST API with auto OpenAPI docs |
| **Python Tooling** | **uv** (Astral) | Ultra-fast Python package and virtualenv management |
| **Database & ORM** | **PostgreSQL 15+** + **SQLAlchemy 2.0 (Async)** | Scalable relational schema with asyncpg connection pooling |
| **Migrations** | **Alembic** | Automated database migration versioning |
| **ID Standard** | **UUIDv7 (`uuid6`)** | High-performance time-sortable log identifiers |
| **Authentication** | **OAuth2 Bearer JWT** + **Argon2 / Passlib** | Role-Based Access Control (`victim`, `counselor`, `admin`) |

---

## 🗄️ Database Schema & High-Performance Design

The backend uses a modern, normalized relational schema optimized for high-volume time-series telemetry:

```
┌─────────────────────────────────┐
│              users              │
├─────────────────────────────────┤
│ id: UUID (PK)                   │
│ phone_number: VARCHAR (Unique)  │ ──┐
│ email: VARCHAR (Unique)         │   │
│ hashed_password: VARCHAR        │   │
│ role: ENUM (victim/counselor/..)│   │
│ is_active: BOOLEAN              │   │
└─────────────────────────────────┘   │
                │                     │
                ├─────────────────────┼─────────────────────┐
                ▼                     ▼                     ▼
┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│      victim_profiles      │ │    counselor_profiles     │ │     interaction_logs      │
├───────────────────────────┤ ├───────────────────────────┤ ├───────────────────────────┤
│ id: UUID (PK)             │ │ id: UUID (PK)             │ │ id: UUIDv7 (Time-sortable)│
│ user_id: FK(users.id)     │ │ user_id: FK(users.id)     │ │ victim_id: FK(victims.id) │
│ nhaa_case_id: VARCHAR(Idx)│ │ full_name: VARCHAR        │ │ interaction_type: VARCHAR │
│ full_name: VARCHAR        │ │ district: VARCHAR         │ │ raw_text: TEXT            │
│ preferred_language: 'hi'  │ │ specialization: VARCHAR   │ │ audio_url: VARCHAR        │
│ current_distress_score    │ └───────────────────────────┘ │ sentiment_score: FLOAT    │
│ risk_level: VARCHAR       │                               │ voice_stress_level: FLOAT │
│ counselor_id: FK          │                               │ calculated_distress: FLOAT│
└───────────────────────────┘                               │ timestamp: TIMESTAMPTZ    │
                                                            └───────────────────────────┘
```

### High-Performance Indexing Strategy
To ensure instant alert routing under national load:
1. **Time-Sortable UUIDv7**: Primary keys on `interaction_logs` utilize UUIDv7, avoiding B-Tree fragmentation while preserving exact millisecond chronological ordering.
2. **Partial Index for Critical Emergencies**:
   ```sql
   CREATE INDEX idx_critical_alerts 
   ON interaction_logs (calculated_distress, timestamp DESC) 
   WHERE calculated_distress >= 0.7;
   ```
   Ensures queries fetching active crises execute in **sub-millisecond** time even with millions of historical rows.

---

## 🚀 Quickstart & Installation

### Prerequisites

Ensure you have the following installed on your machine:
- **Python 3.14+** (or 3.12+)
- **[uv](https://docs.astral.sh/uv/)** (recommended) or standard `pip`
- **Node.js 20+** and `npm`
- **PostgreSQL 15+** running locally or on a remote cloud instance

---

### Backend Setup (FastAPI & PostgreSQL)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdullahko/sih-2026.git
   cd sih-2026
   ```

2. **Configure environment variables:**
   ```bash
   # Windows PowerShell:
   Copy-Item .env.example .env

   # Linux / macOS:
   cp .env.example .env
   ```

3. **Configure your `.env` file:**
   Open `.env` and fill in your PostgreSQL credentials and a secure random secret key:
   ```env
   DATABASE_URL=postgresql+asyncpg://postgres:your_password@localhost:5432/samvedna_ai
   SECRET_KEY=generate_a_secure_hex_with_openssl
   ADMIN_INVITE_CODE=sih2026-admin-secure
   ```
   *(Generate a secret key via `openssl rand -hex 32`)*

4. **Install Python dependencies & run database migrations:**
   ```bash
   # Install dependencies using uv
   uv sync

   # Navigate to backend and apply migrations
   cd backend
   uv run alembic upgrade head
   ```

5. **Start the FastAPI backend server:**
   ```bash
   uv run uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```
   - API Root: `http://127.0.0.1:8000`
   - Interactive Swagger UI: `http://127.0.0.1:8000/docs`
   - ReDoc Documentation: `http://127.0.0.1:8000/redoc`

---

### Frontend Setup (React 19 & Tailwind CSS v4)

In a separate terminal, from the repository root:

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend/React+Tailwind
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Launch the Vite development server:**
   ```bash
   npm run dev
   ```
   *(On Windows PowerShell, if scripts are restricted, use `npm.cmd run dev` or run in CMD).*

4. **Access the application:**
   - Landing Page: `http://localhost:5173`
   - Citizen Portal directly: `http://localhost:5173/#citizen`
   - Counselor Workspace: `http://localhost:5173/#counselor`
   - Admin Command Center: `http://localhost:5173/#admin`

5. **Production Build Validation:**
   ```bash
   npm run build
   ```

---

## 📡 RESTful API Reference

All versioned routes are prefixed with `/api/v1`.

| HTTP Method | Route | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | System and health status verification |
| `POST` | `/api/v1/auth/register/victim` | Public | Register a survivor account linked with NHAA Case ID |
| `POST` | `/api/v1/auth/register/counselor` | Public | Register an authorized clinical psychologist / counselor |
| `POST` | `/api/v1/auth/register/admin` | Invite Code | Provision a district/state administrative account |
| `POST` | `/api/v1/auth/login` | Public | OAuth2 password flow login (returns Bearer JWT) |
| `POST` | `/api/v1/victims/check-in` | Bearer (Victim) | Submit raw voice URL or text check-in for triage |
| `GET` | `/api/v1/counselors/my-cases` | Bearer (Counselor) | Retrieve all active cases assigned to the authenticated counselor |

### Sample API Requests

#### 1. Register a Survivor Profile
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register/victim \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+919876543210",
    "password": "SecurePassword123!",
    "full_name": "Rameshwar Meghwal",
    "nhaa_case_id": "NHAA-RJ-2026-0429",
    "preferred_language": "hi"
  }'
```

#### 2. Obtain Authentication Bearer Token
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=+919876543210&password=SecurePassword123!"
```
*Response:*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
  "token_type": "bearer"
}
```

#### 3. Submit a Check-In
```bash
curl -X POST http://127.0.0.1:8000/api/v1/victims/check-in \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "interaction_type": "chatbot",
    "raw_text": "I feel very anxious about the upcoming trial date.",
    "audio_url": null
  }'
```

---

## 🛡️ DPDP Act 2023 & Data Sovereignty

Samvedna AI is built around the strict mandates of the **Digital Personal Data Protection (DPDP) Act 2023**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        DPDP Act 2023 Compliance                        │
├──────────────────┬──────────────────┬──────────────────┬───────────────┤
│ 1. Explicit      │ 2. Purpose       │ 3. Data          │ 4. Right to   │
│    Consent Modal │    Limitation    │    Minimization  │    Erasure    │
│ Clear vernacular │ Telemetry logged │ Raw voice files  │ Survivor can  │
│ opt-in notice    │ strictly for     │ purged post-bio- │ purge records │
│ prior to voice   │ trauma welfare   │ marker extraction│ upon case     │
│ recording.       │ response.        │ from cache.      │ closure.      │
└──────────────────┴──────────────────┴──────────────────┴───────────────┘
```

- **Human-in-the-Loop Safeguards**: AI algorithms **never** trigger punitive or coercive actions autonomously. Every emergency response requires validation by a human counselor or designated public servant.
- **Role-Based Least Privilege**: Counselors access only their assigned district caseload. Unaffiliated records remain cryptographically shielded.
- **Anonymized Analytics**: Administrative heatmaps and Bento metrics aggregate scores at the district block level, preventing deanonymization of vulnerable individuals.

---

## 📂 Project Directory Structure

```text
sih-2026/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py             # Auth dependencies & RBAC enforcement
│   │   │   └── routes.py           # FastAPI endpoints (auth, victims, counselors)
│   │   ├── core/
│   │   │   ├── config.py           # Pydantic BaseSettings & env loader
│   │   │   └── security.py         # Passlib/Argon2 hashing & JWT utilities
│   │   ├── db/
│   │   │   ├── base.py             # SQLAlchemy DeclarativeBase
│   │   │   ├── models.py           # User, Profile, InteractionLog with UUIDv7
│   │   │   └── session.py          # Async engine & get_async_session generator
│   │   ├── migrations/             # Alembic migration versions and environment
│   │   ├── schemas.py              # Pydantic v2 schemas for request/response validation
│   │   └── services/               # Background task & triage scoring services
│   ├── alembic.ini                 # Alembic configuration
│   └── main.py                     # FastAPI application entry point & lifespan
│
├── frontend/
│   └── React+Tailwind/
│       ├── public/
│       │   ├── favicon.png         # Samvedna AI brand emblem
│       │   └── images/landing/     # Visual illustrations (hero, citizen, etc.)
│       ├── src/
│       │   ├── components/
│       │   │   ├── admin/          # Heatmap, Bento metrics, IVRS/SMS console
│       │   │   ├── auth/           # Multi-role authentication & register modal
│       │   │   ├── citizen/        # Swaraj Chatbot, Acoustic Panic Hook, Healing Hero
│       │   │   ├── counselor/      # Case queue, Distress Gauge, Nyaya XAI, Interventions
│       │   │   └── layout/         # Navbar, Footer, Particle Canvas, DPDP Modal
│       │   ├── context/
│       │   │   └── SimulationContext.jsx  # Multi-role state machine & simulation context
│       │   ├── pages/
│       │   │   └── LandingPage.jsx  # Hero presentation & institutional showcase
│       │   ├── App.jsx             # Main routing shell (landing vs. 3-role views)
│       │   └── index.css           # Tailwind CSS v4 design tokens & keyframes
│       ├── package.json            # React 19, Tailwind v4, Vite 8 dependencies
│       └── vite.config.js          # Vite bundler configuration
│
├── devops/                         # Docker & container orchestration specifications
├── docs/
│   └── api.md                      # Detailed API specification & endpoint contracts
├── .env.example                    # Environment variable template
├── pyproject.toml                  # Python package dependencies & uv lockfile
└── README.md                       # Master project documentation
```

---

## 🗺️ Roadmap

- [x] **Phase 1: Foundation & Tri-Tier Prototype**
  - [x] Multi-persona frontend architecture (Citizen, Counselor, Administrator).
  - [x] Interactive simulation switchboard with real-time Web Audio feedback.
  - [x] Asynchronous FastAPI backend with OAuth2 JWT authentication and RBAC.
  - [x] PostgreSQL database models with UUIDv7 and partial index optimization.
  - [x] Dynamic Distress Score concept & Nyaya Explainable AI diagnostics.
- [ ] **Phase 2: Live Multimodal AI Pipeline**
  - [ ] Integration with open-source Indic speech-to-text models (AI4Bharat / Bhashini).
  - [ ] Real-time Praat/openSMILE-based acoustic feature extraction (F0 jitter, shimmer).
  - [ ] Celery / Redis background task worker for asynchronous voice processing.
- [ ] **Phase 3: Telephony & Institutional Deployment**
  - [ ] Two-way IVRS telephony bridge via Twilio / C-DoT national telecom gateways.
  - [ ] Official NHAA 14566 API gateway handshake.
  - [ ] State Police Crime and Criminal Tracking Network & Systems (CCTNS) secure webhook relay.

---

## 👥 Team & Acknowledgments

Built with dedication for the **Smart India Hackathon 2026**.

- **Initiative**: Smart India Hackathon 2026 (Ministry of Social Justice & Empowerment Problem Statement)
- **Special Thanks**: Dedicated to social workers, public interest legal advocates and clinical psychologists working tirelessly across India to safeguard the constitutional rights and dignity of vulnerable communities.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

<div align="center">
  <sub>Built for <strong>Smart India Hackathon 2026</strong> • Dedicated to Dignity, Empathy, and Justice for Every Citizen.</sub>
</div>
