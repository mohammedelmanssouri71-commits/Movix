const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
app.use(express.json());

// === json-server ===
const router = jsonServer.router(path.join(__dirname, "db.json"));
app.use("/api", router); // tous les endpoints json-server sont sous /api

// === Swagger ===
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Favorite API",
      version: "1.0.0",
      description: "API REST pour gérer les favoris",
    },
    servers: [
      { url: "http://localhost:3001/api", description: "Local json-server" },
    ],
  },
  apis: [path.join(__dirname, "swagger.yaml")], // fichier YAML
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// === Lancer le serveur ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available on http://localhost:${PORT}/api-docs`);
});
