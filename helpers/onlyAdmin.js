module.exports.onlyAdmin = (req, res, next) => {
    if (req.session.user.role == 'admin') {
        next();
    } else {
        return res.status(403).send({ err: true, msg: "You must be an admin to continue" });
    }
}