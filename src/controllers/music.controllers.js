const express = require('express');
const musicModel = require('../models/musicModel');
const userModel = require('../models/userModel');
const storageServices = require('../services/storage.services');
const jwt = require('jsonwebtoken');
const albumModel = require('../models/albumModel');

async function createMusic(req, res) {
   
    const { title } = req.body;
    const file = req.file;
    const user = req.user;

        const result = await storageServices.musicUpload(file.buffer.toString('base64'));
        const music = new musicModel({
            uri: result.url,
            title,
            artist: user.id
        });
        await music.save();
        return res.status(201).json({ message: 'Music created successfully', music});

}

async function createAlbum(req, res) {
    const user = req.user;
        const { title, musics } = req.body;

        const album = new albumModel({
            title,
            musics,
            artist: user.id
        });
        await album.save();
        return res.status(201).json({ message: 'Album created successfully', album });
    
}

async function getAllMusics(req, res) {
    const user = req.user;
    const musics = await musicModel.find().populate('artist', "username email");

    res.status(200).json({ message: 'musics is found.', musics: musics});
}

async function getAllalbums(req, res) {
    
    try{
        const user = req.user;

    const album = await albumModel.find().populate("musics", "uri title artist")
    res.status(200).json({ messages: "Album found", album: album});

    } catch (error) {
        return res.status(500).json({message: "Error occured", error: error.message});
    }
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllalbums };