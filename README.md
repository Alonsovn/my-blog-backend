init express server
npm init -y

install express
npm install express

Add module in package.json
"type": "module",

Run server
node src/server.js

Install nodemon for dev
npm install nodemon --save-dev

Run server with nodemon
npx nodemon src/server.js

Another way:
Add a script in package.json
"dev": "nodemon src/server.js",
npm run dev

Install mongodb
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0

Mongo documentation:
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition

To run MongoDB (i.e. the mongod process) as a macOS service, run:

brew services start mongodb-community@7.0

To stop a mongod running as a macOS service, use the following command as needed:

brew services stop mongodb-community@7.0

f you started MongoDB as a macOS service:

brew services list

You should see the service mongodb-community listed as started.

Connect and Use MongoDB

To begin using MongoDB, connect mongosh to the running instance. From a new terminal, issue the following:

mongosh

Create new mongo db
use react-blog-db

Insert articles into db
db.articles.insertMany( [ { name: "learn-react", upvotes: 0, comments: [], }, { name: "learn-node", upvotes: 0, comments: [], }, { name: "learn-mongodb", upvotes: 0, comments: [], },])

Find articles data
db.articles.find({})
db.articles.find({}).pretty()
db.articles.find({name: 'learn-react'}).pretty()
db.articles.find({upvotes: 0}).pretty()

Exit mongo db shell
press control C

Add mongodb to express
npm install mongodb

install firebase
npm install firebase-admin
