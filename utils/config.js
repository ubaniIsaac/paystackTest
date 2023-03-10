const dotenv = require ('dotenv')
dotenv.config()

const config = {
    PORT : process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASS: process.env.AUTH_PASS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    BASE_URL: process.env.BASE_URL
}

module.exports = config