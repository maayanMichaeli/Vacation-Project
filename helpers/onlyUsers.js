module.exports.onlyUsers = (req, res, next) => {
    if (req.session.user.role == 'user') {
        next();
    } else {
        return res.status(403).send({ err: true, msg: "You must be a user to continue" });
    }
}