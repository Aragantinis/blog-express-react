const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get('/', async (req, res, next) => {
  try {
    const total_count = await Post.count({})
    let page = 0
    let per_page = 5

    if (
      req.body.per_page !== undefined &&
      typeof req.body.per_page === 'number'
    ) {
      if (req.body.per_page > 30 || req.body.per_page < 0) {
        throw {
          statusCode: 400,
          message: 'per_page has to be between 0 and 100',
        }
      }
      per_page =
        req.body.per_page > 100 || req.body.per_page < 0
          ? 20
          : req.body.per_page
    }

    let total_pages = ~~(total_count / per_page)

    if (req.body.page !== undefined && typeof req.body.page === 'number') {
      page = req.body.page > 100 || req.body.page < 0 ? 20 : req.body.page
    }

    const posts = await Post.find()
      .populate('authors')
      .populate({ path: 'comments', populate: { path: 'user' } })
      .skip(page * per_page)
      .limit(per_page)
    res
      .status(200)
      .set({
        'X-Total-Count': total_count,
      })
      .json({
        _metadata: {
          page,
          per_page,
          total_pages,
          total_count,
          items: posts.length,
        },
        records: posts,
      })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate('authors')
      .populate({ path: 'comments', populate: { path: 'user' } })
    res.status(200).json(post)
  } catch (e) {
    if (e.statusCode !== undefined) {
      res.status(e.statusCode).json(e)
    } else {
      res.status(500).json(e)
    }
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPost = await Post({
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      content: req.body.content,
      author: req.body.author,
    })
    await newPost.save()

    res
      .status(200)
      .json(await Post.find({ _id: newPost._id }).populate('author'))
  } catch (e) {
    next(e)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const posts = await Post.deleteMany()
    res.status(200).json({ data: 'all posts deleted successfully' })
  } catch (e) {
    next(e)
  }
})
module.exports = router
