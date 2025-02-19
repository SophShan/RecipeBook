import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import recipeRoutes from "./routes/recipes.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json()); // allows us to parse json data from request

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/recipes", recipeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at port ${port}`);
});

// DCHcy6aASMZmwhAP
