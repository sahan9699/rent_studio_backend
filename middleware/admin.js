module.exports = function (req, res, next) {
    //Forbidden(403) = Dont try it againg
        if(!req.user.isAdmin) return res.status(403).send('Access denied');
        next()
}