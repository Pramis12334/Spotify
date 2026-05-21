const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ messages: "You need to login first"});
    }

    try{
        const user = jwt.verify('token', process.env.JWT_SECRET);

        if(user.role !== "artist") {
            return res.status(401).json({messages: "Forbidden"});
        }

        req.user = user;

        next()

    } catch (error) {
        return res.status(400).json({ messages: "Internal Server Error", error: error.message });
    }

}

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ messages: "You dont have access:"});
    }
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET);
    if(!user) {
        return res.status(403).json({ messages: "Forbidden"});
    }
    req.user = user;
    next()
    }

    
    catch (error) {
        return res.status(400).json({ error: error.message});
    }
}
module.exports = {authArtist, authUser} ;