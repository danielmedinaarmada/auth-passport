require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  googleclientID: process.env.GOOGLE_CLIENT_ID,
  googleclientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = { config: config };