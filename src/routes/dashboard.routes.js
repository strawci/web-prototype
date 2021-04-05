import { Router } from "express";
import {
    fetchMemberOrganizations,
    fetchOwnOrganizations,
    createOrganization,
} from "../controllers/organization.controller";
import { validateCreateOrg } from "../utils/validation";

const router = Router();

router.get("/", async (req, res) => {
    const ownOrgs = await fetchOwnOrganizations(req.session.user._id);
    const memberOrgs = await fetchMemberOrganizations(req.session.user._id);

    res.render("dashboard", {
        ownOrgs,
        memberOrgs,
        user: req.session.user,
        title: "Dashboard",
    });
});

router.get("/new", async (req, res) => {
    res.render("new-org", {
        user: req.session.user,
        title: "Create organization",
    });
});

router.post("/new", async (req, res) => {
    const validationError = validateCreateOrg(req.body);

    if (validationError) {
        return res.render("new-org", {
            error: validationError,
            user: req.session.user,
            title: "Create organization",
        });
    }

    const created = await createOrganization(
        req.session.user._id,
        req.body.name
    ).catch((e) => {
        res.render("new-org", {
            error: e,
            user: req.session.user,
            title: "Create organization",
        });

        return false;
    });

    if (created) {
        res.redirect("/dashboard");
    }
});

export default router;
