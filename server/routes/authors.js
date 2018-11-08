var express = require('express')
var moment = require('moment')
var router = express.Router()

const Author = require('../models/Author')

router.get('/', async (req, res, next) => {
  try {
    const total_count = await Author.count({})
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

    const authors = await Author.find()
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
          items: authors.length,
        },
        records: authors,
      })
  } catch (e) {
    if (e.statusCode !== undefined) {
      res.status(e.statusCode).json(e)
    } else {
      res.status(500).json(e)
    }
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const author = await Author.findOne({ _id: req.params.id })
    res.status(200).json(author)
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
    const newAuthor = await Author({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: moment(req.body.birthdate)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .toDate(),
    })
    await newAuthor.save()
    res.status(200).json(newAuthor)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const authors = await Author.deleteMany()
    res.status(200).json({ data: 'all authors deleted successfully' })
  } catch (e) {
    res.status(500).json(e)
  }
})

module.exports = router
