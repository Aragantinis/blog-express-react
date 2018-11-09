var express = require('express')
var router = express.Router()

const Comment = require('../models/Comment')
const User = require('../models/User')

router.get('/', async (req, res, next) => {
  try {
    const total_count = await Comment.count({})
    let page = 0
    let per_page = 20

    if (
      req.body.per_page !== undefined &&
      typeof req.body.per_page === 'number'
    ) {
      if (req.body.per_page > 100 || req.body.per_page < 0) {
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

    const comments = await Comment.find()
      .populate('user')
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
          items: comments.length,
        },
        records: comments,
      })
  } catch (e) {
    if (e.statusCode !== undefined) {
      res.status(e.statusCode).json(e)
    } else {
      res.status(500).json(e)
    }
  }
})

module.exports = router
