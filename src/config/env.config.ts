export const envConfig = () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  apiVersion: process.env.API_VERSION,
  jwt: {
    secret: process.env.JWT_SECRET || '9f8d2e207e45a8deadb4cff8e',
    expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'spotify-clone',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    url:
      process.env.DB_URL ||
      'postgresql://postgres:postgres@localhost:5432/spotify-clone',
  },
  openapiPath: process.env.OPENAPI_PATH || './openapi',
  tsPostProcessFile:
    process.env.TS_POST_PROCESS_FILE ||
    '"/usr/local/share/npm-global/bin/prettier --write"',
});
