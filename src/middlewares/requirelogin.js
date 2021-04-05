export default async function (req, res, next) {
    if (req.session && req.session.user && req.session.user._id) {
        return next();
    }

    res.redirect("/login");
}
