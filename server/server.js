const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 5000

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

// Error handling middleware
app.use(errorHandler)

const startServer = async () => {
  try {
    // Test the database connection
    await db.query('SELECT 1')
    console.log('Database connection successful.')

    /**
     * Create HTTP server.
     */
    const server = http.createServer(app)

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

startServer()
