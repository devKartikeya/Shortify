# 🔗 Shortify

> A modern, full-stack URL shortener built with MERN, Redis, Docker, automated testing, load balancing, and practical system-design principles.

Shortify is a full-stack URL shortening application that allows users to convert long URLs into compact, shareable links.

The project supports both **public URL shortening** and **authenticated, user-specific link management**, with a professional dashboard for managing links and tracking link performance.

Shortify is being progressively developed as an engineering-focused project rather than just a basic CRUD application, with emphasis on **clean architecture, caching, rate limiting, performance optimization, testing, containerization, CI automation, load balancing, horizontal scaling, and practical system design**.

---

## ✨ Features

### 🔗 URL Shortening

* Convert long URLs into short, shareable links
* Automatically generate unique short codes
* Supports both `HTTP` and `HTTPS` URLs
* Validates URLs before creating short links
* Prevents short-code collisions
* Public URL shortening
* Detects duplicate original URLs
* Reuses the existing short code when the same URL is shortened again

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
* Change password
* Delete account

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
2. The URL is retrieved from Redis when cached
3. The click counter is incremented atomically in Redis
4. The visitor is redirected to the original URL
5. Redis click counts are periodically synchronized with MongoDB

This allows frequent redirects to avoid a MongoDB read and avoids performing a MongoDB write for every individual click.

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

### 🔐 Account & Security Management

Users can manage their account through the profile section.

* Change password using the current password
* Confirm new password before updating
* Delete account through a confirmation flow
* Cookie-based JWT authentication
* Protected user resources

---

# 🏗️ Architecture

Shortify follows a modular backend architecture where responsibilities are separated across different layers.

```text
Client
  │
  ▼
Load Balancer
  │
  ├───────────────┐
  ▼               ▼
Backend 1       Backend 2
  │               │
  └───────┬───────┘
          │
          ▼
   Application Layers
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

The backend follows:

```text
Route → Controller → Service → Model
```

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

# ⚡ Redis

Shortify uses **Redis** as a high-speed in-memory data layer alongside MongoDB.

Redis is used for multiple performance-oriented responsibilities:

* URL caching
* Faster repeated URL lookups
* Click counters
* Periodic click synchronization
* Atomic operations

Shortify currently uses **application-level rate limiting** through Express middleware. Redis is not currently used as the rate-limiting store.

MongoDB remains the **primary persistent source of truth**, while Redis stores fast, derived, or temporary state.

```text
                 ┌─────────────┐
                 │   Client    │
                 └──────┬──────┘
                        │
                        ▼
                 ┌─────────────┐
                 │Load Balancer│
                 └──────┬──────┘
                        │
                        ▼
                 ┌─────────────┐
                 │   Backend   │
                 └──────┬──────┘
                        │
                 ┌──────┴──────┐
                 │             │
                 ▼             ▼
            ┌────────┐    ┌─────────┐
            │ Redis  │    │ MongoDB │
            └────────┘    └─────────┘
```

---

# 🚀 Redis URL Caching

Shortify caches resolved original URLs in Redis.

### Cache Key

```text
shortify:url:<shortCode>
```

For example:

```text
shortify:url:aB72xQ

→ https://example.com/some/long/url
```

### Request Flow

```text
GET /aB72xQ
      │
      ▼
  Check Redis
      │
   ┌──┴────┐
   │       │
  HIT     MISS
   │       │
   │       ▼
   │    MongoDB
   │       │
   │       ▼
   │    Redis SET
   │       │
   └───┬───┘
       ▼
 Original URL
       │
       ▼
   Redirect
```

On a cache hit, the application can resolve the URL without performing a MongoDB read.

MongoDB remains the persistent source of truth.

---

# 📊 Redis Click Counter

Click counting has been optimized using Redis atomic counters.

Instead of updating MongoDB on every redirect:

```text
Every request
     ↓
MongoDB $inc
```

Shortify now uses:

```text
Every request
     ↓
Redis INCR
```

The click counter uses keys such as:

```text
shortify:clicks:<shortCode>
```

For example:

```text
shortify:clicks:aB72xQ
→ 137
```

Redis's atomic `INCR` operation allows multiple requests to safely increment the same counter.

---

# 🔄 Click Counter Synchronization

Redis provides the high-speed counter while MongoDB provides durable persistence.

```text
                User Clicks
                     │
                     ▼
                Redis INCR
                     │
                     ▼
             Redis Click Counter
                     │
                     │
              Periodic Sync
                     │
                     ▼
                MongoDB $inc
```

Example:

```text
MongoDB
clicks = 500

Redis
pending clicks = 37
```

During synchronization:

```text
Redis
37
 │
 ├── atomically claimed
 ▼
0
```

Then:

```text
MongoDB
500 + 37
   ↓
537
```

If new clicks arrive during or after synchronization, they accumulate separately in Redis and are persisted during the next synchronization cycle.

This design significantly reduces MongoDB write pressure for frequently accessed URLs.

### Why not write directly to MongoDB?

The simpler design would be:

```text
Request
  ↓
MongoDB $inc
  ↓
Redirect
```

But a highly accessed short URL could generate a MongoDB write for every click.

The Redis-based design changes this to:

```text
Request
  ↓
Redis INCR
  ↓
Redirect

Periodic batch
  ↓
MongoDB
```

This introduces a deliberate trade-off:

> **Higher write performance in exchange for temporarily delayed persistence of click counts.**

This is one of the practical system-design trade-offs currently explored in Shortify.

---

# 🛡️ Rate Limiting

Shortify uses **application-level rate limiting** to control excessive requests.

The current implementation uses Express rate-limiting middleware.

Conceptually:

```text
Client
  │
  ▼
Request
  │
  ▼
Express Rate Limiter
  │
  ├── Within limit → Allow
  │
  └── Limit exceeded → Reject
```

The current implementation is suitable for the existing single-backend-instance architecture.

However, when multiple backend instances are introduced, process-local rate-limit state can become inconsistent because each instance maintains its own counters.

This creates a practical scalability consideration:

```text
Single Instance

Client
  ↓
Backend
  ↓
Rate Limiter
```

versus:

```text
Multiple Instances

             ┌── Backend 1
             │
Client → LB ─┼── Backend 2
             │
             └── Backend 3
```

A distributed rate-limiting implementation using a shared store such as Redis can be introduced when the architecture requires a globally shared request limit.

---

# ⚖️ System Design

Shortify is being developed with practical system-design principles rather than treating system design as a separate theoretical topic.

The architecture has evolved by identifying actual problems and introducing components to solve them.

### Example: URL Resolution

Initially:

```text
Request
   ↓
MongoDB
   ↓
Original URL
   ↓
Redirect
```

Problem:

> Frequently accessed URLs repeatedly hit MongoDB.

Solution:

```text
Redis Cache
```

---

### Example: Click Counting

After caching, another problem appeared.

A cache hit avoided the MongoDB read, but click tracking still required a MongoDB write.

```text
Redis HIT
   ↓
MongoDB $inc
   ↓
Redirect
```

Problem:

> High traffic could still generate a MongoDB write for every click.

Solution:

```text
Redis INCR
   ↓
Periodic synchronization
   ↓
MongoDB $inc
```

But this introduced another trade-off:

```text
More performance
      ↕
Delayed persistence
```

---

### Example: Horizontal Scaling

As the system grows, a single backend instance becomes a potential capacity and availability limitation.

Instead of running only:

```text
Client
  ↓
Backend
```

Shortify can distribute requests across multiple instances:

```text
Client
  ↓
Load Balancer
  ↓
┌───────────┬───────────┐
▼           ▼           ▼
Backend 1   Backend 2   Backend 3
```

This allows the application to scale horizontally by adding more backend instances.

---

# ⚖️ Load Balancing

Shortify now includes a **load-balancing layer** between the frontend and backend instances.

A local load balancer was implemented using Node.js and `http-proxy` to understand the fundamental mechanics of request distribution before introducing production infrastructure.

The load balancer maintains a list of backend instances and distributes incoming requests between them using a **Round Robin** strategy.

```text
Client
  │
  ▼
Load Balancer
  │
  ├──► Backend 1
  │
  └──► Backend 2
```

For example:

```text
Request 1 → Backend 1
Request 2 → Backend 2
Request 3 → Backend 1
Request 4 → Backend 2
```

The basic Round Robin mechanism cycles through the available backend targets.

### Request Flow

```text
Browser
   │
   │ HTTP Request
   ▼
Load Balancer
   │
   ├──────────────┐
   ▼              ▼
Backend 1      Backend 2
   │              │
   └───────┬──────┘
           │
           ▼
      Response
           │
           ▼
     Load Balancer
           │
           ▼
        Browser
```

The load balancer acts as an intermediary between the client and backend instances.

---

# 🌐 Frontend → Load Balancer

A major architectural milestone in Shortify is that the frontend no longer communicates directly with an individual backend instance.

Instead:

```text
Frontend
   │
   ▼
Load Balancer
   │
   ├──► Backend 1
   │
   └──► Backend 2
```

The frontend API configuration was changed so that its API base URL points to the load balancer rather than directly to a backend server.

Conceptually:

```text
Before

Frontend
   │
   ▼
Backend :3000
```

Now:

```text
Frontend
   │
   ▼
Load Balancer :4000
   │
   ├──► Backend :3000
   │
   └──► Backend :3001
```

This means the frontend does not need to know which backend instance will process a request.

The load balancer handles that decision.

This is an important step toward a horizontally scalable architecture because backend instances can be added or removed behind the load balancer without requiring the frontend to change its request logic.

---

# 📈 Horizontal Scaling

Shortify now demonstrates the basic architecture required for horizontal scaling.

Horizontal scaling means running **multiple instances of the same application** and distributing requests between them.

```text
                 ┌───────────────┐
                 │ Load Balancer │
                 └───────┬───────┘
                         │
            ┌────────────┼────────────┐
            │            │            │
            ▼            ▼            ▼
       Backend 1     Backend 2     Backend 3
            │            │            │
            └────────────┼────────────┘
                         │
                  Shared Services
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
           Redis                 MongoDB
```

The important principle is:

> **Horizontal scaling increases the number of application instances rather than simply increasing the resources of one instance.**

Because multiple backend instances need access to shared state, Redis and MongoDB remain outside the individual backend instances.

This allows the backend instances to remain largely interchangeable.

---

# 🧠 Stateless Backend Consideration

Horizontal scaling works best when backend instances do not depend on important local process state.

Shortify's authentication uses JWT stored in cookies, allowing authentication information to be carried with requests rather than relying on a session stored inside a particular Node.js process.

Shared infrastructure such as MongoDB and Redis can therefore be accessed by multiple backend instances.

Conceptually:

```text
                 Load Balancer
                 /     |     \
                /      |      \
               ▼       ▼       ▼
          Backend 1 Backend 2 Backend 3
               \       |       /
                \      |      /
                 ▼     ▼     ▼
                 Redis / MongoDB
```

This is one of the foundations required for a horizontally scalable backend.

---

# 📐 Current Architecture

The current Shortify architecture combines the application layer, Redis optimization, persistent storage, and the load-balancing layer.

```text
                         ┌──────────────┐
                         │    Client    │
                         └──────┬───────┘
                                │
                                ▼
                       ┌────────────────┐
                       │ Load Balancer  │
                       └───────┬────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
              ┌───────────┐         ┌───────────┐
              │ Backend 1 │         │ Backend 2 │
              └─────┬─────┘         └─────┬─────┘
                    │                     │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
              Redis         MongoDB     Application
                 │                         Rate Limiter
                 │
        ┌────────┼─────────┐
        │        │         │
        ▼        ▼         ▼
     URL Cache Clicks  Derived State
        │        │
        │        ▼
        │   Periodic Sync
        │        │
        ▼        ▼
      Fast Reads → MongoDB Persistence
```

---

# 📈 Future Scalability

The current architecture provides a foundation for further scaling as traffic increases.

```text
                         ┌───────────────┐
                         │ Load Balancer │
                         └───────┬───────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
         Backend 1          Backend 2          Backend 3
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
                  Redis                    MongoDB
```

Because Redis provides shared application state such as cached URLs and accumulated click counters, multiple backend instances can work with the same Redis layer.

MongoDB provides durable persistence shared across the backend instances.

The load balancer provides the routing layer that distributes requests among the instances.

Further production-scale improvements can include:

* Health checks
* Automatic removal of unhealthy instances
* Failure handling
* Connection draining
* More advanced load-balancing algorithms
* Distributed rate limiting
* Container orchestration
* Automated deployment
* Monitoring and observability

These are intentionally introduced only when they solve an actual architectural requirement.

---

# 🧪 Testing

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

The Express application is separated from the server bootstrap so tests can run without starting the production server or unnecessarily establishing database connections.

---

# 🐳 Docker

Shortify is containerized using Docker.

The application uses separate containers for its application services.

```text
Docker
 │
 ├── Frontend Container
 │      └── Nginx
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
   │
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

# 🧩 Docker Compose

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

# 🔄 CI with GitHub Actions

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

# 🔌 API

## Public URL Shortening

```http
POST /urls/shorten
```

Request:

```json
{
  "originalUrl": "https://example.com/some/long/url"
}
```

The service validates the URL and checks whether the same normalized URL already exists.

If it exists:

```text
Existing URL
     ↓
Existing shortCode
     ↓
Return existing link
```

Otherwise:

```text
New URL
  ↓
Generate shortCode
  ↓
Check short-code collision
  ↓
Save
```

---

## Authenticated URL Shortening

```http
POST /urls/shorten/authenticated
```

Requires authentication.

The generated URL is associated with the authenticated user and subsequently appears in their dashboard.

If the original URL already exists according to the application's deduplication rules, the existing short link can be reused rather than creating another duplicate record.

---

## Get My Links

```http
GET /urls/my-links
```

Requires authentication.

Returns the shortened URLs belonging to the currently authenticated user.

---

## Change Password

```http
PATCH /users/change-password
```

Requires authentication.

Request:

```json
{
  "oldPassword": "current-password",
  "newPassword": "new-password",
  "confirmPassword": "new-password"
}
```

The endpoint validates the current password and ensures that the new password is confirmed before updating the user's password.

---

## Delete Account

Authenticated users can permanently delete their account through the profile security settings.

Account deletion removes the user's account and associated application data according to the application's deletion logic.

---

## Redirect Short URL

```http
GET /:shortCode
```

When a valid short code is requested:

```text
Request
  ↓
Check Redis URL cache
  ↓
HIT ───────────────┐
  │                │
  │              MISS
  │                │
  │                ▼
  │             MongoDB
  │                │
  │                ▼
  │             Redis SET
  │                │
  └────────┬───────┘
           ▼
      Original URL
           │
           ├── Redis INCR
           │
           ▼
        Redirect
```

The click count is maintained in Redis and periodically synchronized with MongoDB.

---

# 🔐 Authentication

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

# 🔐 Account Security

Authenticated users can manage important account-level operations through their profile.

### Change Password

Users can change their password by providing:

```text
Current Password
       ↓
New Password
       ↓
Confirm New Password
       ↓
Password Updated
```

### Delete Account

Account deletion is protected behind a confirmation flow to prevent accidental deletion.

These operations are handled through authenticated backend endpoints.

---

# 🔐 URL Validation

Shortify validates URLs before storing them.

Currently accepted protocols:

```text
http://
https://
```

Invalid URLs are rejected before a database record is created.

The URL is normalized before duplicate detection so that equivalent normalized values can be handled consistently.

---

# 📊 Current Analytics Model

Shortify currently maintains an aggregate click count for each link.

```text
Link
└── clicks: 42
```

The important distinction is that the counter is now updated through Redis during normal redirect traffic and periodically persisted to MongoDB.

MongoDB ultimately stores the durable aggregate count.

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

---

## Why no fake time-series analytics?

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

# 📁 Project Structure

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

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/devKartikeya/Shortify.git

cd Shortify
```

## 2. Install backend dependencies

```bash
cd Backend

npm install
```

## 3. Configure environment variables

Create a `.env` file inside the `Backend` directory.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret
```

Use the actual environment variables required by the current backend configuration.

## 4. Start Redis

Make sure Redis is running locally.

The default Redis connection is:

```text
redis://localhost:6379
```

## 5. Start the backend

```bash
npm start
```

## 6. Start the frontend

Open another terminal:

```bash
cd Frontend

npm install

npm run dev
```

The frontend will then be available through the Vite development server.

---

# 🐳 Running with Docker Compose

From the project root:

```bash
docker compose up --build
```

This builds the application containers according to their respective Dockerfiles.

---

# 🧪 Running Tests

From the backend directory:

```bash
npm test
```

The backend test suite uses Jest and Supertest.

---

# 📌 Example

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

Shortify:

```text
1. Checks Redis for the original URL
2. Falls back to MongoDB on a cache miss
3. Caches the URL in Redis
4. Increments the Redis click counter
5. Redirects the visitor
6. Periodically persists accumulated clicks to MongoDB
```

When the application is running behind the load balancer:

```text
Browser
   ↓
Load Balancer
   ↓
Backend Instance
   ↓
Redis / MongoDB
```

The authenticated owner can then see the link and its persisted click count from the dashboard.

---

# 🎯 Project Goals

Shortify is being developed with a focus on:

* Clean architecture
* Practical full-stack development
* Real-world authentication
* User-specific data
* Account security
* Maintainable React components
* REST API design
* Accurate analytics
* Redis caching
* Redis atomic counters
* Application-level rate limiting
* Automated testing
* Docker containerization
* Docker Compose
* CI automation
* Load balancing
* Horizontal scaling
* Stateless backend design
* Practical system design
* Performance optimization
* Scalability considerations
* Professional UI/UX

The goal is not simply to create another URL shortener.

The project is being progressively evolved into a **production-style engineering project** where architectural decisions are introduced when they solve actual problems.

The focus is on understanding:

> **Why a component exists, what problem it solves, what trade-offs it introduces, and how it interacts with the rest of the system.**

---

# 🛣️ Roadmap

The project is actively evolving.

## Completed

* [x] URL shortening
* [x] Unique short-code generation
* [x] URL validation
* [x] URL redirection
* [x] Duplicate URL detection
* [x] Existing short-code reuse
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
* [x] Redis URL caching
* [x] Redis atomic click counters
* [x] Periodic Redis → MongoDB click synchronization
* [x] Application-level rate limiting
* [x] Change password
* [x] Delete account
* [x] Docker containerization
* [x] Docker Compose
* [x] GitHub Actions CI
* [x] Horizontal scaling architecture
* [x] Local load balancer
* [x] Round Robin request distribution
* [x] Frontend connected through load balancer
* [x] Multiple backend instances behind load balancer

## Planned

* [ ] Link deletion
* [ ] Link editing
* [ ] Custom short aliases
* [ ] Click history
* [ ] Daily/weekly/monthly analytics
* [ ] Advanced analytics
* [ ] Improved cache invalidation strategies
* [ ] Redis failure/fallback handling
* [ ] Distributed Redis-backed rate limiting
* [ ] Load balancer health checks
* [ ] Automatic unhealthy-instance handling
* [ ] Production deployment
* [ ] Continuous Deployment
* [ ] Further scalability improvements
* [ ] Monitoring and observability

> The roadmap is intentionally incremental. Features are added as the underlying requirements, data model, and architecture support them properly.

---

# 🔮 Future Analytics

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

# 🤝 Contributing

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

# 📄 License

This project is currently intended for educational and portfolio purposes.

A formal license can be added as the project moves toward public production use.

---

# ⭐ About

**Shortify** is a full-stack URL shortening project built to explore and apply real-world engineering concepts:

```text
React
   ↓
REST APIs
   ↓
Authentication
   ↓
Load Balancer
   ↓
Multiple Backend Instances
   ↓
MongoDB
   ↕
Redis
   ↓
Caching
   ↓
Atomic Counters
   ↓
Periodic Synchronization
   ↓
Rate Limiting
   ↓
Testing
   ↓
Docker
   ↓
Docker Compose
   ↓
GitHub Actions
   ↓
Horizontal Scaling
   ↓
System Design
```

The project is intentionally evolving from a simple MERN application into a more complete **full-stack + DevOps + system-design engineering project**.

The focus is not on adding technologies for the sake of a tech stack.

The focus is on understanding:

> **the problem, the solution, the trade-off, and the reason behind every architectural decision.**

---

### Built with ❤️ and JavaScript