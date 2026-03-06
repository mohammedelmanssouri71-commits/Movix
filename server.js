const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.db = router.db;

const rules = auth.rewriter({
  "/users*": 660,
  "/favorites*": 660,
  "/comments*": 660,
  "/lists*": 660,
  "/list*": 660,
});

app.use(middlewares);
app.use(express.json());
app.use(rules);
app.use(auth);
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mock API with JWT auth running on http://localhost:${PORT}`);
  console.log("Auth endpoints available: POST /register and POST /login");
});
