import { Router } from "express";
import { validateRegister, validateLogin } from "../utils/validation";
import {
    registerAccount,
    authenticateAccount,
} from "../controllers/account.controller";

const router = Router();

router.get("/register", (req, res) => {
    res.render("register", {
        user: req.session.user,
        title: "Sign ip",
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        user: req.session.user,
        title: "Sign in",
    });
});

router.post("/register", async (req, res) => {
    const validationError = validateRegister(req.body);

    if (validationError) {
        return res.render("register", {
            error: validationError,
            user: req.session.user,
            title: "Sign up",
        });
    }

    const registered = await registerAccount(
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.firstname,
        req.body.lastname
    ).catch((e) => {
        res.render("register", {
            error: e,
            user: req.session.user,
            title: "Sign up",
        });
        return false;
    });

    if (registered) {
        res.redirect("/login");
    }
});

router.post("/login", async (req, res) => {
    const validationError = validateLogin(req.body);

    if (validationError) {
        return res.render("login", {
            error: validationError,
            user: req.session.user,
            title: "Sign in",
        });
    }

    const user = await authenticateAccount(
        req.body.email,
        req.body.password
    ).catch((e) => {
        res.render("login", {
            error: e,
            user: req.session.user,
            title: "Sign in",
        });
        return null;
    });

    if (user) {
        req.session.user = user;
        res.redirect("/dashboard");
    }
});

export default router;
