const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hanghae99 second homework Docs",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = options;
