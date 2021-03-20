const express = require('express');
const router = express.Router();

const Song = require('../models/Song');

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find()
      return res.send(songs)
  } catch(error) {
      return res.send(error)
  }
});

router.post('/', async (req, res) => {
  try {
    const song = new Song({...req.body})
    await song.save()
      return res.send(song)
  } catch(error) {
      return res.send(error)
  }
});

router.get('/:id', async (req, res) => {
    try {
      const song = await Song.findById(req.params.id)
        return res.send(song)
    } catch(error) {
        return res.send(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await Song.findOneAndReplace({_id:id},{...req.body})
      return res.send({
        putSongId: id
      });
    } catch(error) {
        return res.send(error)
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Song.deleteOne({ _id:id})
    return res.send({
      deletedSongId: id
    });
  } catch(error) {
      return res.send(error)
  } 
});

router.patch('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await Song.updateOne({_id:id},{...req.body});
      return res.send({
        //patchSongId: id
      });
    } catch(error) {
        return res.send(error)
    }
});

module.exports = router;
