## 📝 Taskify Backend

A simple, secure REST API for **Taskify**, a task management web app. Built with **Node.js**, **Express**, **PostgreSQL**, and **JWT authentication**.

---

### ⚙️ Tech Stack

- **Node.js** + **Express** — REST API framework  
- **PostgreSQL** — relational database  
- **bcrypt** — password hashing  
- **JWT** — token-based authentication  
- **dotenv** — environment variables  
- **nodemon** — dev server

---

### 📁 Project Structure

```
taskify-backend/
├── controllers/         # Logic for auth and tasks
├── db/                  # PostgreSQL connection setup
├── middleware/          # JWT auth middleware
├── models/              # SQL data queries
├── routes/              # API route definitions
├── utils/               # Helpers (hashing, JWT)
├── .env                 # Environment config (not committed)
├── index.js             # Entry point
├── package.json
```

---

### 🔐 Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
DB_USER=your_pg_user
DB_PASSWORD=your_pg_pass
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=taskify
JWT_SECRET=your_secret_key
```

---

### 🗃️ PostgreSQL Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  priority VARCHAR(10),
  completed BOOLEAN DEFAULT false
);
```

---

### 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/taskify-backend.git
   cd taskify-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file.

4. Start the server:
   ```bash
   npm run dev
   ```

---

### 🔗 API Endpoints

#### 🔑 Auth (`/api/auth`)
- `POST /register` → Create new user
- `POST /login` → Authenticate user, returns JWT

#### ✅ Tasks (`/api/tasks`) *(requires JWT)*
- `GET /` → Get user’s tasks
- `POST /` → Create task
- `PUT /:id` → Update task
- `DELETE /:id` → Delete task

---

### 📫 Contact

Built by [MarcMan710](https://github.com/MarcMan710)  
Feel free to fork it!

---