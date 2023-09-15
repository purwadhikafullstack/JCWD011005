# Purwadhika Final Project Repository

This is monorepo contain frontend project using ReactJS and backend project using ExpressJS.

## What I Did:
• git clone https://github.com/purwadhikafullstack/JCWD011005.git \
• git checkout -b 'FP-4'\
• npm install\
• [Installed Dependencies]
• [client/src/index.js] import { ChakraProvider } from '@chakra-ui/react';
• [client/src/index.js] <ChakraProvider>...</ChakraProvider>

## Installed Dependencies:
### Client / Front End
1. Chakra UI:\
&emsp;• npm run install:client @chakra-ui/react\
&emsp;• npm run install:client @emotion/react\
&emsp;• npm run install:client @emotion/styled\
&emsp;• npm run install:client framer-motion\
2. Formik Yup:\
&emsp;• npm run install:client formik\
&emsp;• npm run install:client yup\
3. React Router DOM:\
&emsp;• npm run install:client react-router-dom

### Server / Back End
1. npm run install:server --save-dev sequelize-cli\
2. npm run install:server sequelize\
3. npm run install:server mysql2
4. npm install -g yarn
5. npm run server sequelize-cli init
6. npm run install:server bcrypt
7. npm run install:server jsonwebtoken
8. npm run install:server nodemailer
9. npm run install:server firebase

## Version Code:
### Client / Front End
• Preparation:\
&emsp;DPNC = Dependencies\
&emsp;READ = readme.md

• Custom & Preset Components:\
&emsp;FE-INPA = Input Password\
&emsp;FE-INWE = Input With Error

• Pages:\
&emsp;FE-URPA = User Register Page

### Server / Back End
• Preparation:\
&emsp;BE-CONF = config.js

• Migrations:\
&emsp;BE-LMMI = Login Method table migration\
&emsp;BE-ROMI = Role table migration\
&emsp;BE-USMI = User table migration

• Routes:\
&emsp;BE-ROUT = index.js of Routes\
&emsp;BE-AURO = Auth Routes

• Middlewares:\

• Controllers:\
&emsp;BE-CONT = index.js of Controllers\
&emsp;BE-AUCO = Auth Controllers

• Models:\
&emsp;BE-MODL = index.js of Model

• Firebase:\
&emsp;BE-FIRE = firebase.js

## ORM: Sequelize
1. Create migration file
npm run server "sequelize-cli migration:generate --name create-user-table"
npm run server "sequelize-cli migration:generate --name create-login_method-table"
npm run server "sequelize-cli migration:generate --name create-role-table"

2. Execute create table from migration file:
npm run server sequelize-cli db:migrate
npm run server sequelize db:migrate


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

For API, you can access it in [http://localhost:8000/api](http://localhost:8000/api).

The page will reload if you make edits.

### `npm run clean`

Remove `node_modules` folder from all project.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run serve`

Runs the app in the production mode.

### `npm run client`

Run command on client project.

### `npm run install:client`

Install dependency in client project. Use `npm install:client:dev` for dev dependencies.

### `npm run server`

Run command on server project.

### `npm run install:server`

Install dependency in server project. Use `npm install:server:dev` for dev dependencies.
