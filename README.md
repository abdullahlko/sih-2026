<h1>
  Samvedna AI &nbsp
  <img src="frontend/React%2BTailwind/public/favicon.png" alt="Samvedna AI logo" width="52" align="center" />
</h1>

> An empathetic, role-based support and case-triage platform for SC/ST atrocity survivors—designed to help surface distress signals, coordinate counselor response, and support administrative oversight.

Samvedna AI brings together a citizen-facing check-in experience, a counselor workspace, and an administrative command centre. The project is being built for **Smart India Hackathon 2026** as a prototype for more timely, trauma-informed support and grievance follow-up.

> **Prototype notice:** This project is a demonstration and decision-support prototype. It must not be used as the sole basis for emergency, legal, clinical, or welfare decisions. Any real deployment requires expert review, security hardening, privacy impact assessment, and integration with authorised government workflows.

## Why Samvedna AI?

Support needs can change quickly after a grievance is filed. Samvedna AI explores how text and voice check-ins could help a trained team identify cases that may need earlier follow-up, while keeping the human counselor and authorised administrator at the centre of the response.

## Highlights

- **Three tailored experiences** — citizen portal, counselor workspace, and administrative command centre.
- **Multilingual-friendly interface** for approachable citizen interactions.
- **Text and voice check-in flow** designed to capture a survivor’s current situation.
- **Dynamic Distress Score (DDS) concept** to visualise changing case risk over time.
- **Counselor case queue** with case-level risk context and intervention controls.
- **Explainable-AI interface concept** that presents contributing signals rather than a black-box score.
- **Administrative dashboard** with alerts, metrics, geographic hotspot visualisation, and SMS/IVRS fallback simulation.
- **Role-based backend APIs** for victims and counselors, secured with JWT authentication.

## Product walkthrough

```text
Citizen check-in (text / voice)
              |
              v
      Distress assessment concept
              |
              v
Counselor triage and human review
              |
              v
Authorised intervention / administrative oversight
```

The frontend currently provides an interactive demonstration of this journey. It includes safe and critical simulation states to demonstrate how an alert can move from the citizen experience to the counselor and administrative views.

## Screens and roles

| Area | Primary user | Purpose |
| --- | --- | --- |
| Citizen Portal | Survivor / citizen | Submit a text or voice check-in, choose a language, and access supportive guidance. |
| Counselor Workspace | Trained counselor | Review assigned cases, prioritise alerts, inspect DDS context, and initiate follow-up actions. |
| Admin Command Center | Authorised administrator | Monitor aggregate alerts, district patterns, and simulated IVRS/SMS fallback events. |

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, Lucide icons |
| Backend | Python 3.14+, FastAPI, Uvicorn |
| Data layer | PostgreSQL, SQLAlchemy (async), Alembic |
| Authentication | JWT, OAuth2 password flow, Argon2 / bcrypt-compatible password hashing |
| Local tooling | `uv`, npm |

## Repository layout

```text
.
├── backend/
│   ├── app/
│   │   ├── api/           # Authentication, check-in, and counselor endpoints
│   │   ├── core/          # Application configuration and security utilities
│   │   ├── db/            # SQLAlchemy models and async database session
│   │   └── migrations/    # Alembic database migrations
│   └── main.py            # FastAPI application entry point
├── frontend/
│   └── React+Tailwind/    # React/Vite user interface
├── devops/                # Reserved for Docker and deployment configuration
├── docs/                  # Project reference material
├── .env.example           # Environment-variable template
└── pyproject.toml         # Python dependencies and tooling
```

## Getting started

### Prerequisites

- Python **3.14 or later**
- [uv](https://docs.astral.sh/uv/)
- Node.js **20 or later** and npm
- PostgreSQL **15 or later**

### 1. Clone and configure

```bash
git clone https://github.com/abdullahko/sih-2026.git
cd sih-2026
copy .env.example .env
```

On macOS or Linux, replace the last command with `cp .env.example .env`.

Open `.env` and provide a real PostgreSQL connection string and a unique secret key:

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/samvedna_ai
SECRET_KEY=replace-with-a-long-random-secret
```

Generate a suitable secret with:

```bash
openssl rand -hex 32
```

Never commit `.env` or real credentials.

### 2. Start PostgreSQL and apply database migrations

Create a database named `samvedna_ai`, then install the backend dependencies and apply migrations:

```bash
uv sync
cd backend
uv run alembic upgrade head
```

### 3. Run the backend

From the `backend` directory:

```bash
uv run uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

- Health check: `GET /health`
- Interactive API documentation: `http://127.0.0.1:8000/docs`

### 4. Run the frontend

In a second terminal, from the repository root:

```bash
cd frontend/React+Tailwind
npm install
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

To produce a production build:

```bash
npm run build
```

## API overview

All API routes below are prefixed with `/api/v1` except `/health`.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register/victim` | Public | Create a victim account and profile. |
| `POST` | `/auth/register/counselor` | Public | Create a counselor account and profile. |
| `POST` | `/auth/login` | Public | Obtain a JWT with an OAuth2 form login. |
| `POST` | `/victims/check-in` | Victim | Submit a text or audio-URL check-in for processing. |
| `GET` | `/counselors/my-cases` | Counselor | List the current counselor’s assigned cases. |

### Example: register a victim

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register/victim \
  -H "Content-Type: application/json" \
  -d "{\"phone_number\": \"+919876543210\", \"password\": \"change-me\", \"full_name\": \"Example User\", \"nhaa_case_id\": \"NHAA-001\", \"preferred_language\": \"hi\"}"
```

### Example: sign in

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=+919876543210&password=change-me"
```

Use the returned bearer token in the Swagger UI or in the `Authorization: Bearer <token>` header for protected endpoints.

## Current implementation status

| Available now | Planned / in progress |
| --- | --- |
| Interactive three-role frontend demo and alert simulations | Production connection between frontend and backend |
| User, victim-profile, counselor-profile, and interaction-log data models | Validated distress-scoring pipeline |
| Victim and counselor registration, JWT login, protected endpoints | Real audio processing and voice-stress analysis |
| Database migrations and async PostgreSQL access | Approved SMS/IVRS provider integration |
| Counselor case retrieval | Accessibility, consent, retention, audit, and operational safeguards for deployment |

## Privacy, safety, and responsible use

Samvedna AI is intended to be developed with survivor dignity, consent, and data minimisation as core requirements. Before handling real personal or highly sensitive data, the project needs, at minimum:

- explicit and understandable consent flows;
- strict role-based access, audit logs, and least-privilege administration;
- encryption in transit and at rest, plus secure key management;
- retention and deletion policies approved by the responsible authority;
- human review, appeal paths, and clear escalation protocols;
- security testing, accessibility testing, and legal/privacy review.

The UI references relevant legal and policy contexts only as a product concept; it is not legal advice and does not establish compliance.

## Contributing

Contributions are welcome. Please keep pull requests focused and include a clear description of the user need, implementation, and validation performed.

```bash
# Frontend checks
cd frontend/React+Tailwind
npm run lint
npm run build

# Backend migration check
cd ../../backend
uv run alembic upgrade head
```

## License

This project is released under the [MIT License](LICENSE).

---

Built for Smart India Hackathon 2026.
