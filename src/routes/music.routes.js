const express = require('express');
const router = express.Router();
const musicControllers = require('../controllers/music.controllers');
const multer = require('multer');
const authMiddlewares = require("../middlewares/authMiddlewares");

const upload = multer({storage: multer.memoryStorage()});

router.post('/create',authMiddlewares.authArtist, upload.single("music"),musicControllers.createMusic);

router.post('/create-album',authMiddlewares.authArtist, musicControllers.createAlbum);

router.get('/',authMiddlewares.authUser, musicControllers.getAllMusics);

router.get('/album', authMiddlewares.authUser, musicControllers.getAllalbums);

module.exports = router;