export default () => ({
    port: parseInt(process.env.PORT),
    snEnv: process.env.PC_ENV,
    dbUrl: process.env.DB_URL,
    dbPort: parseInt(process.env.DB_PORT),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    mongoUrl: process.env.PC_MONGO_URL,
  });
  