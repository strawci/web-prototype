import { Router } from "express";
import {
    fetchByID,
    deleteOrganization,
    editOrganization,
} from "../controllers/organization.controller";
import {
    fetchProjects,
    createProject,
    fetchProjectByID,
    updateProject,
    deleteProject,
} from "../controllers/project.controller";
import { validateCreateProject, validateCreateOrg } from "../utils/validation";

const router = Router();

router.get("/:id", async (req, res) => {
    const org = await fetchByID(req.params.id, req.session.user._id).catch(
        (e) => {
            res.render("error", {
                title: "Organization Error",
                user: req.session.user,
                error: e,
            });

            return false;
        }
    );

    if (!org) return;

    const projects = await fetchProjects(org._id);

    if (org) {
        res.render("organization", {
            org,
            user: req.session.user,
            title: org.name,
            projects,
        });
    }
});

router.get("/:id/delete", async (req, res) => {
    const org = await fetchByID(req.params.id, req.session.user._id).catch(
        (e) => {
            res.render("error", {
                title: "Organization Error",
                user: req.session.user,
                error: e,
            });

            return false;
        }
    );

    if (org) {
        res.render("delete-org", {
            org,
            user: req.session.user,
            title: org.name,
        });
    }
});

router.post("/:id/delete", async (req, res) => {
    const org = await fetchByID(req.params.id, req.session.user._id).catch(
        (e) => {
            res.render("error", {
                title: "Organization Error",
                user: req.session.user,
                error: e,
            });

            return false;
        }
    );

    if (org) {
        await deleteOrganization(org._id);
        res.redirect("/dashboard");
    }
});

router.get("/:id/edit", async (req, res) => {
    const org = await fetchByID(req.params.id, req.session.user._id).catch(
        (e) => {
            res.render("error", {
                title: "Organization Error",
                user: req.session.user,
                error: e,
            });

            return false;
        }
    );

    if (org) {
        res.render("edit-org", {
            org,
            user: req.session.user,
            title: org.name,
        });
    }
});

router.post("/:id/edit", async (req, res) => {
    const validationError = validateCreateOrg(req.body);

    if (validationError) {
        return res.render("new-org", {
            error: validationError,
            user: req.session.user,
            title: "Create organization",
        });
    }

    const org = await fetchByID(req.params.id, req.session.user._id).catch(
        (e) => {
            res.render("error", {
                title: "Organization Error",
                user: req.session.user,
                error: e,
            });

            return false;
        }
    );

    if (org) {
        await editOrganization(org._id, req.body.name);
        res.redirect("/org/" + org._id);
    }
});

router.get("/:id/project/:project/delete", async (req, res) => {
    const org = await fetchByID(req.params.id).catch((e) => {
        res.render("error", {
            title: "Project Error",
            user: req.session.user,
            error: e,
        });

        return false;
    });

    if (!org) return;

    const project = await fetchProjectByID(org._id, req.params.project).catch(
        (e) => {
            res.render("error", {
                title: "Project Error",
                user: req.session.user,
                error: e,
            });

            return null;
        }
    );

    if (org && project) {
        res.render("delete-project", {
            org,
            project,
            user: req.session.user,
            title: "Delete " + project.name + " by " + org.name,
        });
    }
});

router.post("/:id/project/:project/delete", async (req, res) => {
    const org = await fetchByID(req.params.id).catch((e) => {
        res.render("error", {
            title: "Project Error",
            user: req.session.user,
            error: e,
        });

        return false;
    });

    if (!org) return;

    const project = await fetchProjectByID(org._id, req.params.project).catch(
        (e) => {
            res.render("error", {
                title: "Project Error",
                user: req.session.user,
                error: e,
            });

            return null;
        }
    );

    if (org && project) {
        await deleteProject(req.params.project);
        res.redirect("/org/" + org._id);
    }
});

router.post("/:id/project/:project/edit", async (req, res) => {
    const validationError = validateCreateProject(req.body);

    if (validationError) {
        return res.render("edit-project", {
            org,
            project,
            user: req.session.user,
            title: "Edit " + project.name + " by " + org.name,
        });
    }

    const org = await fetchByID(req.params.id).catch((e) => {
        res.render("error", {
            title: "Project Error",
            user: req.session.user,
            error: e,
        });

        return false;
    });

    if (!org) return;

    const project = await fetchProjectByID(org._id, req.params.project).catch(
        (e) => {
            res.render("error", {
                title: "Project Error",
                user: req.session.user,
                error: e,
            });

            return null;
        }
    );

    if (org && project) {
        await updateProject(project._id, req.body);
        res.redirect("/org/" + org._id + "/project/" + project._id);
    }
});

router.get("/:id/project/:project/edit", async (req, res) => {
    const org = await fetchByID(req.params.id).catch((e) => {
        res.render("error", {
            title: "Project Error",
            user: req.session.user,
            error: e,
        });

        return false;
    });

    if (!org) return;

    const project = await fetchProjectByID(org._id, req.params.project).catch(
        (e) => {
            res.render("error", {
                title: "Project Error",
                user: req.session.user,
                error: e,
            });

            return null;
        }
    );

    if (org && project) {
        res.render("edit-project", {
            org,
            project,
            user: req.session.user,
            title: "Edit " + project.name + " by " + org.name,
        });
    }
});

router.get("/:id/project/:project", async (req, res) => {
    const org = await fetchByID(req.params.id, req.session.user._id).catch(
        (e) => {
            res.render("error", {
                title: "Project Error",
                user: req.session.user,
                error: e,
            });

            return false;
        }
    );

    if (!org) return;

    const project = await fetchProjectByID(org._id, req.params.project).catch(
        (e) => {
            res.render("error", {
                title: "Project Error",
                user: req.session.user,
                error: e,
            });

            return null;
        }
    );

    if (project) {
        res.render("project", {
            title: project.name + " by " + org.name,
            user: req.session.user,
            project,
            org,
        });
    }
});

router.get("/:id/new", async (req, res) => {
    const org = await fetchByID(req.params.id).catch((e) => {
        res.render("error", {
            title: "Create Project",
            user: req.session.user,
            error: e,
        });

        return false;
    });

    if (org) {
        res.render("new-project", {
            org,
            user: req.session.user,
            title: org.name,
        });
    }
});

router.post("/:id/new", async (req, res) => {
    const validationError = validateCreateProject(req.body);

    if (validationError) {
        return res.render("new-project", {
            title: "Create Project",
            user: req.session.user,
            error: e,
        });
    }

    const org = await fetchByID(req.params.id).catch((e) => {
        res.render("error", {
            title: "Organization Error",
            user: req.session.user,
            error: e,
        });

        return false;
    });

    if (org) {
        const project = await createProject(
            req.session.user._id,
            org._id,
            req.body.name,
            req.body.description
        ).catch((e) => {
            res.render("new-project", {
                title: "Create Project",
                user: req.session.user,
                error: e,
                org,
            });

            return null;
        });

        if (project) {
            res.redirect("/org/" + org._id);
        }
    }
});

export default router;
