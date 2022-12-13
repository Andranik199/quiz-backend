export default () => {
  const port = parseInt(process.env.PORT, 10) || 3000;

  return {
    api: {
      name: "Quiz",
      host: process.env.HOST,
      frontEndUrl: process.env.FRONTEND_URL,
      prefix: "api",
      port
    },
    documentation: {
      prefix: "api/docs",
      title: "LinksApp",
      description: "The LinksApp API documentation",
      version: "1.0"
    },
    database: {
      host: process.env.DB_HOST,
      database: process.env.DB_DEFAULT_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    auth: {
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1w"
      },
      zoom: {
        client_id: process.env.ZOOM_CLIENT_IO,
        api_secret: process.env.ZOOM_API_SECRET
      }
    }
    };
  };
