const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });  

require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3000;



var winston = require('./config/winston');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
var authorsRouter = require('./routes/authors');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan('combined', { stream: winston.stream }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/authors', authorsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
})
