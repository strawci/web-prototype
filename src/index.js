import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import helmet from "helmet";
import multer from "multer";
import session from "express-session";

import authentication from "./middlewares/authentication";
import requireLogin from "./middlewares/requirelogin";

import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import mainRoutes from "./routes/main.routes";
import orgRoutes from "./routes/organization.routes";

/* Initialize app */
const app = express();
const upload = multer({
    dest: path.join(__dirname, "..", "public", "user-content"),
});

/* Set configuration */
dotenv.config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* Middlewares */
// app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

/* Sessions */
app.use(
    session({
        secret: "puffy cat uwu super unicorn hd cupcake muffin rainbow",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true },
    })
);
app.use(authentication);

/* Routes */
app.get("/user-content/:id", function (req, res) {
    res.render("image", { imgUrl: req.params.id });
});

app.use(authRoutes);
app.use("/dashboard", requireLogin, dashboardRoutes);
app.use("/org", requireLogin, orgRoutes);
app.use(mainRoutes);

/* Connect to database */
console.log("[Database] Connecting to MongoDB...");
mongoose
    .connect(process.env.DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("[Database] Database connected.");
    })
    .catch((e) => {
        console.error("[Database] Error connecting to Database: " + e);
    });

/* Listen application */
app.listen(process.env.PORT || 3000, () => {
    console.log("[HTTP] Listening on port " + process.env.PORT || 3000);
});
