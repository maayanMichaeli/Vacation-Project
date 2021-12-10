module.exports.onlyLoggedUsers = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.status(403).send({ err: true, msg: "You must login to continue" });
    }
}