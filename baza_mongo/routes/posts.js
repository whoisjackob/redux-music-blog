const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    return res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const post = new Post({ ...req.body });
    await post.save();
    return res.send(post);
  } catch (error) {
    return res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.send(post);
  } catch (error) {
    return res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findOneAndReplace({ _id: id }, { ...req.body });
    return res.send({
      putPostId: id,
    });
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });
    return res.send({
      deletedPostId: id,
    });
  } catch (error) {
    return res.send(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Post.updateOne({ _id: id }, { ...req.body });
    return res.send({
      patchPostId: id,
    });
  } catch (error) {
    return res.send(error);
  }
});

//komentarze

router.get('/:id/comments/:idx', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments[req.params.idx];
    return res.send(comment);
  } catch (error) {
    return res.send(error);
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.send(post.comments);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/:id/comments/:idx', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.splice(req.params.idx, 1);
    await post.save();
    return res.send({
      deletedCommentId: req.params.idx,
    });
  } catch (error) {
    return res.send(error);
  }
});

router.put('/:id/comments/:idx', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const nowy = req.body;
    post.comments = post.comments.map((el, idx) => {
      if (String(idx) === String(req.params.idx)) {
        return nowy.comment;
      } else {
        return el;
      }
    });
    await post.save();
    return res.send({
      addedCommentId: post.comments.indexOf(nowy.comment),
    });
  } catch (error) {
    return res.send(error);
  }
});

router.post('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const nowy = req.body;
    post.comments.push(nowy.comment);
    await post.save();
    return res.send({
      addedCommentId: post.comments.indexOf(nowy.comment),
    });
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
