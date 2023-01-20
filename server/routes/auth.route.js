const express = require('express');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const passport = require('../middleware/passport');

// localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert), login);
router.post('/login', passport.authenticate("local", {session:false}),login)
router.get('/findme', passport.authenticate("jwt", {session:false}),login);

async function insert(req, res, next) {
    const user = req.body;
    console.log(`registering user` , user);
    req.user = await userController.insert(user);
    next();
}


function login (req, res){
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    })
}



module.exports = router;
