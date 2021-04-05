import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        user: req.session.user,
        title: "Automate your Deploy",
    });
});

router.all("*", (req, res) => {
    res.render("404", {
        user: req.session.user,
        title: "Oops.. Not found",
    });
});

export default router;
