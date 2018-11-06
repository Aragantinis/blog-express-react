const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).set({
      'X-Total-Count': posts.length,
    }).json({data: posts});
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPost = await Post({
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      content: req.body.content,
      author: [req.body.author],
    })
    await newPost.save();
    res.status(200).json({data: 'saved successfully', received: newPost });
  } catch (e) {
    next(e);
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const posts = await Post.deleteMany();
    res.status(200).json({data: 'all posts deleted successfully'});
  } catch (e) {
    next(e);
  }
})
module.exports = router;
