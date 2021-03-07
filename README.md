

## Stack Used
 Angular Ivy(9.1.7),
 Angular Material,
 Express,
 MongoDB,
 Node
 
## Resources 
1. https://zachgoll.github.io/blog/2019/choosing-authentication-strategy/#Authentication-Choices
2. https://codeburst.io/node-js-rest-api-facebook-login-121114ee04d8
3. https://material.angular.io, https://angular.io

## Setup

The Express application requires a `.env` file and a public/private keypair.  In the root of the project, create a `.env` file and put the following into it:

```
NODE_ENV=development
DB_STRING=<your db string>
DB_STRING_PROD=<your db string>
```

You will also need to start the Mongo DB database using the `mongod` process.  I run this process persistently in the background, but you could also just type `mongod` in your terminal (assuming you have Mongo DB installed).

Next, you will need to generate a public/private keypair.  The `.gitignore` automatically ignores the private key.

```
node generateKeypair.js
```

## Starting the App

Getting started with running and development:
```
npm install

Open two terminals, in one run:
nodemon server

in other run:
npm start

If you want to build production app run:
ng build --prod


If the setup was done correctly you should see your angular app running at [http://localhost:4200] and API's at [http://localhost:3000]
```

