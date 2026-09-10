# 🔗 Shortify

> A modern, full-stack URL shortener built with MERN, Redis, Docker, automated testing, and practical system-design principles.

Shortify is a full-stack URL shortening application that allows users to convert long URLs into compact, shareable links.

The project supports both **public URL shortening** and **authenticated, user-specific link management**, with a professional dashboard for managing links and tracking their click activity.

Shortify is also being progressively developed as an engineering-focused project rather than just a basic CRUD application, with emphasis on **clean architecture, caching, testing, containerization, CI automation, and scalable system design**.

---

## ✨ Features

### 🔗 URL Shortening

* Convert long URLs into short, shareable links
* Automatically generate unique short codes
* Supports both `HTTP` and `HTTPS` URLs
* Validates URLs before creating short links
* Prevents short-code collisions
* Public URL shortening

### 🔗 QR-Code Generation

* Generate QR codes directly from shortened links
* Associate QR codes with shortened URLs
* Track QR-related link activity

### 👤 User Accounts

Authenticated users can create and manage their own shortened URLs.

* User registration and login
* Cookie-based authentication
* JWT-based authentication
* User-specific links
* Protected dashboard
* Links remain associated with their creator
* Public shortening remains available separately

### 📊 Dashboard

The dashboard provides an overview of the user's links and their performance.

Currently includes:

* Total links
* Total clicks
* Average clicks per link
* Links that have received clicks
* Unused links
* Best-performing link
* Best link's share of total clicks
* Recently created links

The analytics are calculated from actual link data available in the application — no simulated analytics are used.

### 📈 Link Tracking

Every time a short URL is visited:

1. The short code is resolved
2. The click counter is incremented
3. The visitor is redirected to the original URL

This allows authenticated users to monitor the current performance of their links.

### 🗂️ Link Management

Authenticated users have a dedicated **My Links** section.

The interface provides:

* Recent-first ordering
* Search and filtering
* Easy access to short URLs
* Original URL visibility
* Click counts
* Link creation information
* User-specific link management

---

## 🏗️ Architecture

Shortify follows a modular backend architecture where responsibilities are separated across different layers.

```text
Client
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
Model
   │
   ▼
MongoDB
```

The backend follows a:

```text
Route → Controller → Service → Model
```

separation.

### Routes

Define API endpoints and attach middleware.

### Controllers

Handle HTTP requests and responses.

### Services

Contain application and business logic.

### Models

Define database structures and interact with MongoDB through Mongoose.

This separation keeps individual components focused and makes the application easier to test, maintain, and extend.

---

## ⚡ Redis

Shortify includes **Redis** as a separate in-memory data service.

Redis is being introduced as a performance-oriented layer alongside MongoDB.

The intended architecture is:

```text
                ┌─────────────┐
                │   Client    │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │   Backend   │
                └──────┬──────┘
                       │
                 ┌─────┴─────┐
                 │           │
                 ▼           ▼
             ┌───────┐   ┌─────────┐
             │ Redis │   │ MongoDB │
             └───────┘   └─────────┘
```

Redis is currently integrated with the Node.js backend and is being explored for use cases such as:

* URL caching
* Faster repeated lookups
* Rate limiting
* Atomic counters
* Performance-oriented data access

MongoDB remains the primary persistent data store, while Redis is treated as a fast, derived/cache layer.

### Planned URL Caching Flow

```text
GET /aB72xQ
      │
      ▼
Check Redis
      │
   ┌──┴───┐
   │      │
 HIT     MISS
   │      │
   │      ▼
   │   MongoDB
   │      │
   │      ▼
   │   Store in Redis
   │      │
   └──┬───┘
      ▼
Original URL
      │
      ▼
   Redirect
```

This allows the system to reduce repeated database lookups for frequently accessed URLs.

---

## 🧠 System Design

Shortify is being developed with practical system-design principles rather than treating system design as a separate theoretical topic.

Some of the concepts being applied include:

* Separation of responsibilities
* API layer separation
* Database as the source of truth
* Redis as a caching layer
* Stateless authentication using JWT
* Horizontal scalability considerations
* Performance optimization through caching
* Failure and fallback considerations
* Modular service architecture
* Containerized services

The architecture can evolve as traffic and feature requirements increase.

For example:

```text
Current

Client
  │
  ▼
Backend
  │
  ├── Redis
  │
  └── MongoDB
```

can later evolve toward:

```text
                    ┌─────────────┐
                    │ Load Balancer│
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Backend 1    Backend 2    Backend 3
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                  Redis        MongoDB
```

The goal is to introduce complexity only when the underlying requirements justify it.

---

## 🧪 Testing

Shortify uses **Jest** and **Supertest** for backend testing.

### Jest

Jest is used as the testing framework.

### Supertest

Supertest is used to test the Express application through HTTP-like requests without requiring the application to listen on a real network port.

Conceptually:

```text
Jest
  │
  ▼
Supertest
  │
  ▼
Express App
  │
  ▼
Route
  │
  ▼
Response
  │
  ▼
Assertions
```

The Express application is separated from the server bootstrap so that tests can run without starting the production server or unnecessarily establishing database connections.

---

## 🐳 Docker

Shortify is containerized using Docker.

The project uses separate containers for its application services.

```text
Docker
│
├── Frontend Container
│   └── Nginx
│
└── Backend Container
    └── Node.js
```

Docker provides:

* Consistent development environments
* Isolated application services
* Reproducible builds
* Easier deployment
* Clear service boundaries

### Frontend

The frontend uses a **multi-stage Docker build**:

```text
Node.js
   │
   ├── Install dependencies
   ├── Build React application
   │
   ▼
Nginx
   │
   └── Serve production build
```

The final frontend image contains the production build served by Nginx rather than the complete Node.js development environment.

### Backend

The backend runs inside a Node.js container.

---

## 🧩 Docker Compose

Docker Compose is used to coordinate the application services.

```text
Docker Compose
      │
      ├── Frontend
      │
      └── Backend
```

Compose provides a convenient way to build and run the services together.

```bash
docker compose up --build
```

The application services communicate through Docker's networking infrastructure, while the browser communicates with the published host ports.

MongoDB can remain externally hosted, such as through MongoDB Atlas, while application services are containerized.

---

## 🔄 CI with GitHub Actions

Shortify uses **GitHub Actions** for Continuous Integration.

The current CI pipeline performs:

```text
Git Push / Pull Request
        │
        ▼
GitHub Actions
        │
        ▼
Checkout Repository
        │
        ▼
Setup Node.js
        │
        ▼
Install Backend Dependencies
        │
        ▼
Run Jest Tests
        │
        ▼
Install Frontend Dependencies
        │
        ▼
Build Frontend
        │
        ▼
Build Docker Images
```

The CI pipeline helps ensure that changes can be tested and that the application can successfully produce its Docker images before being considered ready for deployment.

> Deployment automation is intentionally kept separate from the current CI pipeline and can be introduced as the project evolves.

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

Returns the shortened URLs belonging to the currently authenticated user.

---

### Redirect Short URL

```http
GET /:shortCode
```

When a valid short code is requested:

1. The short code is resolved
2. The click count is incremented
3. The user is redirected to the original URL

---

## 🔐 Authentication

Shortify uses cookie-based authentication with JWT.

```text
Login
  │
  ▼
JWT Generated
  │
  ▼
HTTP Cookie
  │
  ▼
Authenticated Request
  │
  ▼
Authentication Middleware
  │
  ▼
Protected Resource
```

Authentication is handled independently from the application's business logic through middleware.

---

## 🔐 URL Validation

Shortify validates URLs before storing them.

Currently accepted protocols:

```text
http://
https://
```

Invalid URLs are rejected before a database record is created.

---

## 📊 Current Analytics Model

Shortify intentionally keeps its current analytics model simple and accurate.

The current URL model stores an aggregate click count:

```text
Link
 └── clicks: 42
```

Therefore, the application can reliably calculate:

```text
Total Links
Total Clicks
Average Clicks / Link
Links With Clicks
Unused Links
Best Performing Link
Best Link's Click Share
```

For example:

```text
10 links
50 total clicks
```

gives:

```text
Average clicks/link = 5.0
```

If 7 links have received at least one click:

```text
Links with clicks = 7
Unused links = 3
```

### Why no fake time-series analytics?

The current model does not store individual click events.

Therefore, Shortify does **not** pretend to know:

* Clicks per day
* Clicks per hour
* 7-day growth
* Monthly trends
* Geographic distribution
* Device statistics
* Browser statistics

These features require additional analytics data to be persisted.

This keeps the current dashboard transparent and based on actual available data.

---

## 📁 Project Structure

```text
Shortify/
│
├── Frontend/
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
│   └── Dockerfile
│
├── Backend/
│   ├── configurations/
│   │   ├── database.js
│   │   └── redis.js
│   │
│   ├── urls/
│   │   ├── urls.route.js
│   │   ├── urls.controller.js
│   │   ├── urls.service.js
│   │   └── urls.model.js
│   │
│   ├── users/
│   │   └── ...
│   │
│   ├── middleware/
│   │   ├── authentication.middleware.js
│   │   └── ...
│   │
│   ├── app.js
│   ├── server.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/devKartikeya/Shortify.git
cd Shortify
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Backend` directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

Use the actual environment variables required by the current backend configuration.

### 4. Start Redis

Make sure Redis is running locally.

The default Redis connection is:

```text
redis://localhost:6379
```

### 5. Start the backend

```bash
npm start
```

### 6. Start the frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend will then be available through the Vite development server.

---

## 🐳 Running with Docker Compose

The application can also be built using Docker Compose.

From the project root:

```bash
docker compose up --build
```

This builds the application containers according to their respective Dockerfiles.

---

## 🧪 Running Tests

From the backend directory:

```bash
npm test
```

The backend test suite uses Jest and Supertest.

---

## 📌 Example

Suppose the original URL is:

```text
https://www.example.com/products/category/something/very/long
```

Shortify can generate:

```text
http://localhost:3000/aB72xQ
```

When someone opens:

```text
/aB72xQ
```

Shortify resolves the short code, increments the click counter, and redirects the visitor to the original URL.

The authenticated owner can then see the link and its current click count from the dashboard.

---

## 🎯 Project Goals

Shortify is being developed with a focus on:

* Clean architecture
* Practical full-stack development
* Real-world authentication
* User-specific data
* Maintainable React components
* REST API design
* Accurate analytics
* Redis and caching
* Automated testing
* Docker containerization
* CI automation
* Practical system design
* Performance and scalability considerations
* Professional UI/UX

The goal is not simply to create another URL shortener.

The project is being progressively evolved into a **production-style engineering project** where new technologies and architectural decisions are introduced when they solve an actual problem.

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
* [x] Cookie-based JWT authentication
* [x] User-specific links
* [x] Protected dashboard
* [x] Overall link statistics
* [x] Recent links
* [x] Dedicated My Links page
* [x] Link search/filtering
* [x] Professional dashboard UI
* [x] QR-Code generation
* [x] Modular backend architecture
* [x] Jest/Supertest backend testing
* [x] Redis integration
* [x] Docker containerization
* [x] Docker Compose
* [x] GitHub Actions CI

### Planned

* [ ] Redis URL caching
* [ ] Redis-based rate limiting
* [ ] Redis-backed click counter optimization
* [ ] Link deletion
* [ ] Link editing
* [ ] Custom short aliases
* [ ] Click history
* [ ] Daily/weekly/monthly analytics
* [ ] Advanced analytics
* [ ] Production deployment
* [ ] Continuous Deployment

> The roadmap is intentionally incremental. Features will be added as the underlying requirements, data model, and architecture support them properly.

---

## 🔮 Future Analytics

Once individual click events are stored, the analytics system can evolve from simple aggregate statistics into actual historical analytics.

### Current

```text
Link
 └── clicks: 42
```

### Future

```text
Link
 └── clickEvents
       ├── timestamp
       ├── referrer
       ├── device
       ├── browser
       └── ...
```

This would make features such as:

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

**Shortify** is a full-stack URL shortening project built to explore and apply real-world engineering concepts:

```text
React
   ↓
REST APIs
   ↓
Authentication
   ↓
MongoDB
   ↓
Redis
   ↓
Caching
   ↓
Testing
   ↓
Docker
   ↓
Docker Compose
   ↓
GitHub Actions
   ↓
System Design
```

The project is intentionally evolving from a simple MERN application into a more complete **full-stack + DevOps + system-design engineering project**.

The focus is not on adding technologies for the sake of a tech stack, but on understanding **why each component exists, what problem it solves, and how the components work together as a system.**

---

### Built with ❤️ and JavaScript