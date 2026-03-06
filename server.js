const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const crypto = require("crypto");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "movix-local-secret";

app.db = router.db;

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(`${normalized}${padding}`, "base64").toString();
}

function signToken(payload) {
  const data = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${signature}`;
}

function verifyToken(token) {
  const [data, signature] = token.split(".");

  if (!data || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (expectedSignature !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(data));

    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function buildDefaultPreferences(preferences = {}) {
  return {
    tv: Array.isArray(preferences.tv) ? preferences.tv : [],
    movie: Array.isArray(preferences.movie) ? preferences.movie : [],
  };
}

app.use(middlewares);
app.use(express.json());

app.post("/register", (req, res) => {
  const { fullName, username, password, image, preferences } = req.body || {};

  if (!fullName || !username || !password) {
    return res.status(400).json({ message: "fullName, username and password are required." });
  }

  const usersDb = app.db.get("users");
  const normalizedUsername = String(username).trim();
  const existingUser = usersDb.find({ username: normalizedUsername }).value();

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists." });
  }

  const createdUser = {
    id: crypto.randomBytes(2).toString("hex"),
    fullName: String(fullName).trim(),
    username: normalizedUsername,
    password: String(password),
    image:
      image ||
      "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg",
    preferences: buildDefaultPreferences(preferences),
  };

  usersDb.push(createdUser).write();

  const accessToken = signToken({
    sub: createdUser.id,
    username: createdUser.username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(201).json({
    accessToken,
    user: sanitizeUser(createdUser),
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required." });
  }

  const normalizedUsername = String(username).trim();
  const user = app.db.get("users").find({ username: normalizedUsername }).value();

  if (!user || user.password !== String(password)) {
    return res.status(400).json({ message: "Check your username or password!" });
  }

  const accessToken = signToken({
    sub: user.id,
    username: user.username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(200).json({
    accessToken,
    user: sanitizeUser(user),
  });
});

app.use((req, res, next) => {
  const protectedPaths = ["/users", "/favorites", "/comments", "/lists", "/list"];
  const isProtected = protectedPaths.some((basePath) => req.path === basePath || req.path.startsWith(`${basePath}/`));

  if (!isProtected) {
    return next();
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = payload;
  return next();
});

app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mock API with auth running on http://localhost:${PORT}`);
  console.log("Auth endpoints available: POST /register and POST /login");
});
