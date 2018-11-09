const mongoose = require('mongoose')
const faker = require('faker')
const moment = require('moment')

const Author = require('./models/Author')
const Post = require('./models/Post')
const Comment = require('./models/Comment')
const User = require('./models/User')
;(async () => {
  const mongo = await mongoose.connect(
    'mongodb://localhost/blog',
    { useNewUrlParser: true }
  )

  console.log('MongoDB connected successfully.')

  await Author.deleteMany({})
  await Post.deleteMany({})
  await Comment.deleteMany({})
  await User.deleteMany({})

  let numberOfAuthors = 100

  for (let i = 1; i <= numberOfAuthors; i++) {
    try {
      let newAuthor = await Author({
        firstName: faker.name.firstName(),
        middleName: faker.name.lastName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: faker.date.between(
          moment('1968-01-01').toDate(),
          moment('2000-12-31').toDate()
        ),
      })
      await newAuthor.save()
      console.log(`${i} author created successfully.`)
    } catch (e) {
      console.log(e)
    }
  }

  for (let i = 1; i <= numberOfAuthors * 5; i++) {
    try {
      let newUser = await User({
        firstName: faker.name.firstName(),
        middleName: faker.name.lastName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: faker.date.between(
          moment('1968-01-01').toDate(),
          moment('2000-12-31').toDate()
        ),
      })
      await newUser.save()
      console.log(`${i} user created successfully.`)
    } catch (e) {
      console.log(e)
    }
  }

  for (let i = 1; i <= numberOfAuthors * 10; i++) {
    try {
      let totalAuthors = await Author.count()
      let authors = await Author.find()
        .skip(Math.floor(Math.random() * totalAuthors))
        .limit(Math.floor(Math.random() * 3) + 1)
      authors = authors.map(author => {
        return author._id
      })
      let created_updated_at = faker.date.between(
        moment('2017-01-01').toDate(),
        moment('2018-06-30').toDate()
      )
      let newPost = await Post({
        titulo: faker.lorem.sentence(),
        subtitulo: faker.lorem.sentences(),
        content: faker.lorem.paragraphs(Math.floor(Math.random() * 30) + 5),
        authors: authors,
        permalink: faker.lorem.slug(),
        updated_at: created_updated_at,
        created_at: created_updated_at,
      })
      await newPost.save()
      console.log(`${i} post created successfully.`)
    } catch (e) {
      console.log(e)
    }
  }

  for (let i = 1; i <= numberOfAuthors * 100; i++) {
    try {
      let totalPosts = await Post.count()
      let post = await Post.findOne().skip(Math.random() * totalPosts)

      let totalUsers = await User.count()
      let user = await User.findOne().skip(
        Math.floor(Math.random() * totalUsers)
      )

      let newComment = await Comment({
        user: user._id,
        text: faker.lorem.paragraphs(),
        created_at: faker.date.between(post.created_at, Date()),
      })
      await newComment.save()
      post.comments.push(newComment._id)
      await post.save()
      console.log(`${i} comment created successfully.`)
    } catch (e) {
      console.log(e)
    }
  }

  mongoose.connection.close()
})()
