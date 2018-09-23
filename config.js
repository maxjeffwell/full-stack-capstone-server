// Hold app secrets and config

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.NODE_ENV === 'production' 
    ? 'https://jmaxwell-fullstack-client.herokuapp.com' 
    : 'http://localhost:3000',
    
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/local',
    TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/local',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
