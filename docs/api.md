# Samvedna AI API

This document describes the API currently implemented by the FastAPI backend. It is based on the code in `backend/main.py` and `backend/app/` and should be kept in sync with the route handlers and Pydantic schemas.

## Scope and status

The API provides:

- a health check;
- victim, counselor, and admin registration;
- OAuth2 password-flow login with JWT access tokens;
- a protected victim check-in acknowledgement;
- a protected counselor case list.

The React frontend is currently a simulation and does not call these endpoints. Check-in analysis, distress-score calculation, interaction-log persistence, SMS/IVRS ingestion, and administrative APIs are not implemented in the backend yet.

## Running the API

From the `backend` directory:

```bash
uv run uvicorn main:app --reload
```

The default local server is `http://127.0.0.1:8000`.

Interactive OpenAPI documentation is available at:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`

## Base URLs

| Area | Base path |
| --- | --- |
| Health check | `/health` |
| Versioned API | `/api/v1` |

All routes in the sections below, except the health check, include the `/api/v1` prefix.

## Authentication

Protected routes use a bearer JWT:

```http
Authorization: Bearer <access_token>
```

The token is signed with the configured `SECRET_KEY` and `ALGORITHM` (default `HS256`). It contains:

| Claim | Meaning |
| --- | --- |
| `sub` | User UUID as a string |
| `exp` | Expiration timestamp |

Tokens expire after seven days by default. The duration is controlled by `ACCESS_TOKEN_EXPIRE_MINUTES` in the application settings, although that variable is not listed in `.env.example`.

### Login form fields

`POST /auth/login` uses `application/x-www-form-urlencoded`, as required by FastAPI's OAuth2 password flow. Submit either the victim phone number or the counselor/admin email in the `username` field.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | yes | Registered phone number or email address |
| `password` | string | yes | Account password |

Successful response:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

## Endpoint summary

| Method | Path | Authentication | Allowed role | Success |
| --- | --- | --- | --- | --- |
| `GET` | `/health` | None | Any caller | `200` |
| `POST` | `/api/v1/auth/register/victim` | None | Public | `201` |
| `POST` | `/api/v1/auth/register/counselor` | None | Public | `201` |
| `POST` | `/api/v1/auth/register/admin` | None | Public plus invite code | `201` |
| `POST` | `/api/v1/auth/login` | None | Public | `200` |
| `POST` | `/api/v1/victims/check-in` | Bearer JWT | Victim or admin | `200` |
| `GET` | `/api/v1/counselors/my-cases` | Bearer JWT | Counselor or admin | `200` |

## Health check

### `GET /health`

Returns a process-level health response. It does not check database connectivity.

Response `200`:

```json
{
  "status": "ok"
}
```

## Registration

### `POST /api/v1/auth/register/victim`

Creates a victim user and linked victim profile.

Request body (`application/json`):

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | yes | - | Used as the login identifier |
| `password` | string | yes | - | Hashed before storage |
| `full_name` | string | yes | - | Stored on the victim profile |
| `nhaa_case_id` | string | yes | - | Must be unique |
| `preferred_language` | string | no | `hi` | Language code or label supplied by the client |

Example:

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register/victim \
  -H "Content-Type: application/json" \
  -d '{"phone_number":"+919876543210","password":"change-me","full_name":"Example User","nhaa_case_id":"NHAA-001","preferred_language":"hi"}'
```

Response `201`:

```json
{
  "message": "Victim registered successfully"
}
```

Possible errors:

- `400`: phone number or NHAA case ID is already registered;
- `422`: request validation failed.

### `POST /api/v1/auth/register/counselor`

Creates a counselor user and linked counselor profile.

Request body (`application/json`):

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes | - | Used as the login identifier |
| `password` | string | yes | - | Hashed before storage |
| `full_name` | string | yes | - | Stored on the counselor profile |
| `district` | string | yes | - | Stored on the counselor profile |
| `specialization` | string | no | `null` | Optional profile field |

Response `201`:

```json
{
  "message": "Counselor registered successfully"
}
```

Possible errors:

- `400`: email is already registered;
- `422`: request validation failed.

### `POST /api/v1/auth/register/admin`

Creates an admin user after comparing `invite_code` with the server-side `ADMIN_INVITE_CODE` setting.

Request body (`application/json`):

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes | - | Used as the login identifier |
| `password` | string | yes | - | Hashed before storage |
| `full_name` | string | yes | - | Accepted by the schema but not persisted |
| `district` | string | no | `null` | Accepted by the schema but not persisted |
| `invite_code` | string | yes | - | Compared to `ADMIN_INVITE_CODE` |

Response `201`:

```json
{
  "message": "Admin registered successfully",
  "email": "admin@example.org",
  "role": "admin"
}
```

Possible errors:

- `400`: email is already registered;
- `403`: invite code is invalid;
- `422`: request validation failed.

## Check-ins

### `POST /api/v1/victims/check-in`

Accepts a victim's text or audio URL for a future analysis pipeline. The current handler verifies that the authenticated user has a victim profile and returns an acknowledgement; it does not currently persist the payload or calculate a score.

Authentication: victim or admin bearer JWT.

Request body (`application/json`):

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `interaction_type` | string | yes | - | For example, `text` or `voice` |
| `raw_text` | string | no | `null` | Optional check-in text |
| `audio_url` | string | no | `null` | Optional externally hosted audio URL |

Response `200`:

```json
{
  "status": "success",
  "message": "Check-in received and queued for analysis."
}
```

Possible errors:

- `401`: missing, invalid, expired, or unknown bearer token;
- `403`: authenticated user is not a victim or admin;
- `404`: authenticated victim profile does not exist;
- `422`: request validation failed.

## Counselor cases

### `GET /api/v1/counselors/my-cases`

Returns victims assigned to the authenticated counselor. Admins are also accepted by the role guard, but the query still looks up a counselor profile for the authenticated user; an admin without a counselor profile therefore receives `404`.

Authentication: counselor or admin bearer JWT.

Response `200`:

```json
[
  {
    "full_name": "Example User",
    "nhaa_case_id": "NHAA-001",
    "risk_level": "low",
    "current_distress_score": 0.0
  }
]
```

Response fields:

| Field | Type | Description |
| --- | --- | --- |
| `full_name` | string | Victim profile name |
| `nhaa_case_id` | string | Unique case identifier |
| `risk_level` | string | Current risk label, defaulting to `low` in the model |
| `current_distress_score` | number | Current score, defaulting to `0.0` in the model |

Possible errors:

- `401`: missing, invalid, expired, or unknown bearer token;
- `403`: authenticated user is not a counselor or admin;
- `404`: authenticated counselor profile does not exist.

## Common error format

FastAPI returns validation and HTTP errors in this shape:

```json
{
  "detail": "Error description"
}
```

Validation errors use a list in `detail` and include the invalid location, message, and error type.

## Data model relevant to clients

The initial Alembic migration defines four tables:

- `users`: UUID, optional email, required phone number, password hash, role, active flag, and creation timestamp;
- `victim_profiles`: case ID, name, preferred language, distress score, risk level, and optional counselor assignment;
- `counselor_profiles`: name, district, specialization, and user relationship;
- `interaction_logs`: text/audio input and reserved sentiment, voice-stress, distress, and timestamp fields.

Although `interaction_logs` exists in the data model, the check-in endpoint does not insert records yet.

## Configuration and deployment notes

The backend reads settings from the repository `.env` file. Required settings are:

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/DATABASE_NAME
SECRET_KEY=YOUR_SECRET_KEY
ADMIN_INVITE_CODE=your-invite-code-here
```

Useful optional settings include `PROJECT_NAME`, `API_V1_STR`, `ALGORITHM`, and `ACCESS_TOKEN_EXPIRE_MINUTES`.

The database session uses SQLAlchemy's async engine, so `DATABASE_URL` must use an async-compatible driver such as `postgresql+asyncpg`. Apply migrations from `backend` before starting the server:

```bash
uv run alembic upgrade head
```

## Current implementation gaps

- No CORS middleware is configured, so browser clients on another origin cannot currently call the API unless CORS is added.
- The frontend does not yet integrate with the backend.
- Check-in payloads are acknowledged but not stored or analyzed.
- There are no endpoints for admin metrics, intervention dispatch, SMS, IVRS, or explainable-AI results.
- Registration has no password policy or email/phone format validation beyond Pydantic's basic string validation.
- The `User.phone_number` database column is non-nullable, while counselor and admin registration do not populate it; those flows may fail at database commit time until the model/migration is aligned.
- Admin registration accepts `full_name` and `district`, but the current database model has no admin profile table and the values are discarded.
- `/health` reports process availability only; it does not verify the database or dependent services.

This API is a prototype contract and must not be used as the sole basis for emergency, legal, clinical, or welfare decisions.