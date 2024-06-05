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
