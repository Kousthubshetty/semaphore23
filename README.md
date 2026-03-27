# Semaphore 2023

![demo](https://github.com/Kousthubshetty/semaphore23/blob/main/assets/demo1.gif)

MCA Fest Registration Portal built with **React (Vite)** frontend and **Express.js + SQLite** backend.

---

## Project Structure

```
semaphore23/
├── app.js                  # Express backend server
├── mailHelper.js           # Sendinblue email service
├── package.json            # Root (backend) dependencies & scripts
│
├── client/                 # React frontend (Vite)
│   ├── index.html          # HTML shell with CDN scripts
│   ├── vite.config.js      # Vite config + dev proxy
│   ├── package.json        # Frontend dependencies
│   ├── public/             # Static assets served as-is
│   │   ├── assets/         # CSS, JS libs, fonts
│   │   ├── images/         # Event images
│   │   ├── snow-particles/ # Snow animation (iframe)
│   │   ├── rain/           # Rain animation (iframe)
│   │   ├── registration/   # Sky/daynight animation (iframe)
│   │   └── payment/        # QR code images
│   └── src/
│       ├── main.jsx        # React entry + Router
│       ├── App.jsx         # Root app, initializes FullPage.js
│       └── components/
│           ├── NavMenu.jsx
│           ├── HomeSection.jsx       # Snow bg + countdown timer
│           ├── RulesSection.jsx      # Day/night bg + rules
│           ├── EventsSection.jsx     # Rain bg + 3 slides of events
│           ├── EventCard.jsx         # Reusable event card
│           ├── RegistrationSection.jsx  # Sky bg + registration form
│           ├── ContactSection.jsx    # Rain bg + contact form
│           └── PaymentPage.jsx       # Payment upload form
│
├── views/                  # Admin EJS templates (Express)
│   ├── teams.ejs
│   ├── payments.ejs
│   └── message.ejs
│
├── uploads/                # Payment screenshots (auto-created)
├── public/                 # React build output (git-ignored)
└── semaphore.db            # SQLite database (git-ignored)
```

---

## Prerequisites

- Node.js >= 16
- npm >= 8

---

## Setup

### 1. Install backend dependencies

```bash
npm install
```

### 2. Install frontend dependencies

```bash
cd client && npm install && cd ..
```

### 3. Environment variables (optional)

Create a `.env` file in the project root:

```env
PORT=8080
```

---

## Running the App

### Development

Run the backend and frontend in two separate terminals:

**Terminal 1 — Express backend (port 8080):**
```bash
npm run dev:server
```

**Terminal 2 — Vite dev server (port 5173):**
```bash
npm run dev:client
```

Open **http://localhost:5173** in your browser.

> The Vite dev server proxies all API calls (`/register`, `/payment`, `/contactus`) to Express on port 8080 automatically.

---

### Production

**Step 1 — Build the React app:**
```bash
npm run build
```

This compiles the React app into the `public/` directory (including all static assets).

**Step 2 — Start the server:**
```bash
npm start
```

Open **http://localhost:8080** (or the configured `PORT`).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Express server (production) |
| `npm run dev:server` | Start Express with nodemon (auto-reload) |
| `npm run dev:client` | Start Vite dev server |
| `npm run build` | Build React app into `public/` |

---

## API Reference

All API endpoints accept and return JSON.

---

### `POST /register`

Registers a team for the event.

**Request body** (`application/x-www-form-urlencoded` or `application/json`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cname` | string | Yes | College name |
| `stream` | string | Yes | Stream / program |
| `tname` | string | Yes | College address |
| `email` | string | Yes | Team email |
| `phno` | string | Yes | Phone number (10 digits) |
| `mode` | string | No | Payment mode (`online` \| `offline`). Defaults to `online` |

**Response — Success:**
```json
{ "success": true }
```

**Response — Error:**
```json
{ "success": false, "message": "Something went wrong" }
```

**React behavior:** On success, navigates to `/payment`.

---

### `POST /payment`

Uploads payment screenshot and records the payment.

**Request body** (`multipart/form-data`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tname` | string | Yes | College name |
| `email` | string | Yes | Email address |
| `phno` | string | Yes | Phone number |
| `image` | file | Yes | Payment screenshot (`.jpg`, `.jpeg`, `.png`) |

**Response — Success:**
```json
{ "success": true }
```

**Response — Error:**
```json
{ "success": false, "message": "Something went wrong" }
```

**Side effect:** Sends a registration confirmation email via Sendinblue to the provided email address.
**Uploaded files:** Stored in `uploads/` with a timestamp filename.

---

### `POST /contactus`

Submits a contact / enquiry message.

**Request body** (`application/x-www-form-urlencoded` or `application/json`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Sender name (min 2 chars) |
| `email` | string | Yes | Sender email |
| `phone` | string | Yes | Phone number (min 13 chars with country code) |
| `msg` | string | Yes | Message (min 10 chars) |

**Response — Success:**
```json
{ "success": true }
```

**Response — Error:**
```json
{ "success": false, "message": "Something went wrong" }
```

---

### `GET /uploads/:filename`

Serves an uploaded payment screenshot.

**Example:** `GET /uploads/1672901234567.jpg`

---

## Admin Routes

These routes render EJS admin dashboards (no authentication — keep URLs private).

| Route | Description |
|-------|-------------|
| `GET /showRegistrationSEMA4` | View all team registrations |
| `GET /showPaymentsSEMA4` | View all payment submissions |
| `GET /showMessagesSEMA4` | View all contact messages |

---

## Database Schema

**SQLite** database stored at `semaphore.db`.

```sql
-- Team registrations
CREATE TABLE Teams (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  collegename TEXT,
  stream      TEXT,
  teamname    TEXT,   -- College address (field reused)
  email       TEXT,
  ph          TEXT,
  mode        TEXT
);

-- Payment records
CREATE TABLE Payments (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  teamname  TEXT,
  email     TEXT,
  phno      TEXT,
  photoname TEXT    -- Filename of uploaded screenshot
);

-- Contact messages
CREATE TABLE contactus (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT,
  email TEXT,
  phone TEXT,
  msg   TEXT
);
```

Tables are created automatically on first server start if they don't exist.

---

## Email Configuration

Registration confirmation emails are sent via **Sendinblue (Brevo)** through `mailHelper.js`.

To update the API key, edit `mailHelper.js`:
```js
apiKey.apiKey = "your-sendinblue-api-key-here";
```

> For production, move this to a `.env` variable and load it with `dotenv`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Animations | FullPage.js, VanillaTilt, Anime.js, FlipClock.js |
| Styling | Custom CSS, Font Awesome, Google Fonts |
| Background effects | Particles.js (snow), Canvas rain, CSS sky animations |
| Backend | Node.js, Express.js |
| Database | SQLite3 |
| Email | Sendinblue (Brevo) API |
| File uploads | Multer |
