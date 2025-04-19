const { Pool } = require('pg')
require('dotenv').config()

let pool;
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
  dbConfig.ssl = {
    require: true,
    ssl: {
      rejectUnauthorized: false
    }
  }
}

try {
  pool = new Pool(dbConfig);
} catch (error) {
  console.error('Error creating PostgreSQL pool:', error);
  process.exit(1);
}

pool.on('connect', () => console.log('Connected to PostgreSQL'));
pool.on('error', (err) => console.error('PostgreSQL error:', err));

module.exports = pool
