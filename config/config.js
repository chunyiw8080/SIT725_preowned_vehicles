/**
 *  This is the configuration for the project, including database connection config, secret used to encrypt session, etc.
 *  secret: Session encryption key
 */
module.exports = {
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '27017',
    dbName: process.env.DB_NAME || 'SIT725Project',
    timezone: 'Australia/Melbourne',
    secret: 'sit725demo'
}