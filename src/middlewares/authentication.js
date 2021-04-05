import { getUserByID } from "../controllers/account.controller";

export default async function (req, res, next) {
    if (req.session && req.session.user && req.session.user._id) {
        const user = await getUserByID(req.session.user._id);
        if (user) {
            req.session.user = user;
        } else {
            req.session.destroy();
        }
    }

    next();
}
