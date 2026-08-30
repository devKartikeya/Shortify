# 🔗 Shortify

> A modern, full-stack URL shortener built to make links shorter, easier to share, and easier to manage.

Shortify is a full-stack URL shortening application that allows users to convert long URLs into compact, shareable links.

The application currently supports both **public URL shortening** and **authenticated, user-specific link management**, with a clean dashboard for tracking links and their click activity.

---

## ✨ Features

### 🔗 URL Shortening

* Convert long URLs into short, shareable links
* Automatically generate unique short codes
* Supports both `HTTP` and `HTTPS` URLs
* Validates URLs before creating short links
* Prevents short-code collisions

### 👤 User Accounts

Authenticated users can create and manage their own shortened URLs.

* User authentication
* User-specific links
* Protected dashboard
* Links remain associated with their creator
* Public shortening remains available separately

### 📊 Dashboard

The dashboard provides a quick overview of the user's links.

Currently includes:

* Total links
* Total clicks
* Average clicks per link
* Links that have received clicks
* Unused links
* Best-performing link
* Best link's share of total clicks
* Recently created links

The analytics are calculated from the actual link data available in the application — no simulated analytics are used.

### 📈 Link Tracking

Every time a short URL is visited:

* The original URL is resolved
* The click counter is incremented
* The visitor is redirected to the original URL

This allows users to see how their links are performing over time.

### 🗂️ Link Management

Authenticated users have a dedicated **My Links** section where their shortened URLs can be viewed and managed.

The interface is designed around:

* Recent-first ordering
* Search and filtering
* Easy access to short URLs
* Original URL visibility
* Click counts
* Link creation information

---

## 🖥️ Application

Shortify is designed around a simple workflow:

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌────────────────────┐
                  │  Create Short URL  │
                  └─────────┬──────────┘
                            │
                            ▼
                  ┌────────────────────┐
                  │  Generate Code     │
                  │     /aB72xQ        │
                  └─────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      MongoDB        │
                 │  Store URL + User   │
                 │      + Clicks       │
                 └─────────┬───────────┘
                           │
                           ▼
                  ┌────────────────────┐
                  │    Short URL       │
                  │ localhost:3000/... │
                  └─────────┬──────────┘
                            │
                         Visit
                            │
                            ▼
                  ┌────────────────────┐
                  │ Increment Clicks   │
                  └─────────┬──────────┘
                            │
                            ▼
                  ┌────────────────────┐
                  │ Original Website  │
                  └────────────────────┘
```

---

## 🏗️ Tech Stack

### Frontend

* **React**
* **React Router**
* **Tailwind CSS**
* JavaScript
* Fetch API

### Backend

* **Node.js**
* **Express.js**
* REST API architecture
* Cookie-based authentication

### Database

* **MongoDB**
* **Mongoose**

### Other

* Git & GitHub
* Docker
* RESTful API design

---

## 📁 Project Structure

The project follows a modular frontend/backend architecture.

```text
Shortify/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateLinkModal.jsx
│   │   │   ├── EmptyLinks.jsx
│   │   │   ├── LinkCard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Overview.jsx
│   │   │   ├── MyLinks.jsx
│   │   │   └── ...
│   │   │
│   │   └── ...
│   │
│   └── ...
│
├── backend/
│   │
│   ├── urls/
│   │   ├── urls.routes.js
│   │   ├── urls.controller.js
│   │   ├── urls.service.js
│   │   └── urls.model.js
│   │
│   ├── middleware/
│   │   ├── authentication.middleware.js
│   │   └── ...
│   │
│   └── ...
│
└── README.md
```

The backend uses a **route → controller → service → model** separation, keeping business logic outside the route handlers.

---

## 🔌 API

### Public URL Shortening

```http
POST /urls/shorten
```

Request:

```json
{
  "originalUrl": "https://example.com/some/long/url"
}
```

Response:

```json
{
  "success": true,
  "message": "URL shortened successfully",
  "data": {
    "originalUrl": "https://example.com/some/long/url",
    "shortCode": "aB72xQ",
    "shortUrl": "http://localhost:3000/aB72xQ",
    "clicks": 0,
    "createdAt": "..."
  }
}
```

---

### Authenticated URL Shortening

```http
POST /urls/shorten/authenticated
```

Requires authentication.

The generated URL is associated with the authenticated user and subsequently appears in their dashboard.

---

### Get My Links

```http
GET /urls/my-links
```

Requires authentication.

Returns the links belonging to the currently authenticated user.

---

### Redirect Short URL

```http
GET /:shortCode
```

When a valid short code is requested:

1. Short code is looked up
2. Click count is incremented
3. User is redirected to the original URL

---

## 🔐 URL Validation

Shortify validates URLs before storing them.

Only:

```text
http://
https://
```

URLs are accepted.

Invalid URLs are rejected before a database record is created.

---

## 📊 Current Analytics Model

Shortify currently keeps analytics intentionally simple.

The available data includes:

```text
Total Links
Total Clicks
Average Clicks / Link
Links With Clicks
Unused Links
Best Performing Link
Best Link's Click Share
```

For example, if a user has:

```text
10 links
50 total clicks
```

the dashboard can derive:

```text
Average clicks/link = 5.0
```

If 7 of those links have at least one click:

```text
Links with clicks = 7
Unused links = 3
```

### Why no fake time-series chart?

The current URL model stores an aggregate click count rather than individual click events.

Therefore Shortify does **not** currently pretend to know:

* clicks per day
* clicks per hour
* 7-day growth
* monthly trends
* geographic distribution
* device/browser statistics

Those features require additional analytics data to be stored.

This keeps the current dashboard accurate and transparent.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/devKartikeya/Shortify.git
cd Shortify
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

Use the actual environment variables required by the current backend configuration.

### 4. Start the backend

```bash
npm start
```

or, if using a development script:

```bash
npm run dev
```

### 5. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will then be available through the Vite development server.

---

## 🧪 Example

Suppose you have:

```text
https://www.example.com/products/category/something/very/long
```

Shortify can generate:

```text
http://localhost:3000/aB72xQ
```

When someone opens the short URL:

```text
/aB72xQ
```

Shortify resolves it to the original URL and increments its click count.

The authenticated owner can then see the link and its current click count from the dashboard.

---

## 🧠 Architecture

Shortify follows a modular backend structure:

```text
Request
   │
   ▼
Route
   │
   ▼
Authentication Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

This separation keeps responsibilities clear:

**Routes**

Define endpoints and middleware.

**Controllers**

Handle HTTP requests and responses.

**Services**

Contain application/business logic.

**Models**

Define database structure and interact with MongoDB.

---

## 🎯 Project Goals

Shortify is being built with a focus on:

* Clean architecture
* Practical full-stack development
* Real-world authentication
* User-specific data
* Maintainable React components
* REST API design
* Accurate analytics
* Professional UI/UX
* Scalable project structure

The goal is not simply to create another URL shortener, but to build the project progressively into a polished, production-style application.

---

## 🛣️ Roadmap

The project is actively evolving.

### Completed

* [x] URL shortening
* [x] Unique short-code generation
* [x] URL validation
* [x] URL redirection
* [x] Click counting
* [x] User authentication
* [x] User-specific links
* [x] Dashboard
* [x] Overall link statistics
* [x] Recent links
* [x] Dedicated My Links page
* [x] Link search/filtering
* [x] Professional dashboard UI

### Planned

* [ ] Link deletion
* [ ] Link editing
* [ ] Custom short aliases
* [ ] Click history
* [ ] Daily/weekly/monthly analytics
* [ ] Click trends
* [ ] QR code generation
* [ ] Production deployment
* [ ] More advanced analytics

> The roadmap is intentionally incremental. Features will be added as the underlying data model and architecture support them properly.

---

## 🔮 Future Analytics

Once individual click events are stored, the analytics system can evolve from simple aggregate statistics into actual historical analytics.

For example:

```text
Current

Link
 └── clicks: 42


Future

Link
 └── clickEvents
       ├── timestamp
       ├── referrer
       ├── device
       ├── browser
       └── ...
```

That would make features such as:

```text
Today
Last 7 Days
Last 30 Days
Click Trends
Peak Activity
Traffic Sources
Device Breakdown
```

possible without fabricating data.

---

## 🤝 Contributing

This project is primarily being developed as a learning and portfolio project.

Suggestions, improvements, and constructive feedback are welcome.

If you'd like to contribute:

```bash
git fork
git clone
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push
```

Then open a pull request.

---

## 📄 License

This project is currently intended for educational and portfolio purposes.

A formal license can be added as the project moves toward public production use.

---

## ⭐ About

**Shortify** is a full-stack URL shortening project built to explore real-world concepts such as:

`Authentication → REST APIs → MongoDB → React → User-specific Data → Analytics → Production-style UI`

The application will continue to evolve as new features and improvements are introduced.

---

### Built with ❤️ and JavaScript