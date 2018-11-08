## blog-express-react

This idea of this project is to make a REST API to a blog and a React app as a front-end.

### Details

- I'm using mongoDb with docker because it's easier to get it running.
- For now both parts are separated by it's folders (client and server) so to make use of anything you need to navigate to it's folder and run `npm start`

### TODO

- [ ] Finish Project :D
- [ ] Start bootstraping React fron-end
- [ ] Make editing possible
- [ ] Add JWT auth so that only post and comment authors and delete
- [ ] Create permalinks (or slugs) so that posts have a unique way to be accessed from the front-end
- [ ] Finish creating all routes
- [x] Added rate-limit to the API (I'm using github parameters - 5000 req/hour)
- [x] Created a seeder file on server to generate random data for testing purpose (only added authors yet)
- [x] Added pagination do comments and authors
- [x] Add simple endpoints (GET, POST, DELETE) to all routes
- [x] Created a logger using winston and morgan
- [x] Create repo :D

More items will be added while I'm making progress.

## License

This project is licensed under the terms of the MIT license.
