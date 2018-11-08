const mongoose = require('mongoose')
const faker = require('faker')

const Author = require('./models/Author')
;(async () => {
  const mongo = await mongoose.connect(
    'mongodb://localhost/blog',
    { useNewUrlParser: true }
  )

  console.log('MongoDB connected successfully.')
  for (let i = 1; i <= 5000; i++) {
    try {
      let newAuthor = await Author({
        firstName: faker.name.firstName(),
        middleName: faker.name.lastName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: faker.date.past(),
      })
      await newAuthor.save()
      console.log(`${i} author created successfully.`)
    } catch (e) {
      console.log(e)
    }
  }
  mongo.close()
})()
