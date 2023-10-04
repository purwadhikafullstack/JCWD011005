# Purwadhika Final Project Repository

This is monorepo contain frontend project using ReactJS and backend project using ExpressJS.

## What I Did:
• git clone https://github.com/purwadhikafullstack/JCWD011005.git \
• git checkout development\
• git checkout -b 'FP-template'\
• npm install\
• [Installed Dependencies]\
• [Tutorial: Chakra UI (client)]
• [Tutorial: Routes (client)]
• [On Client, added "pages" folder]
• [On Client, added "universal" folder inside "pages" folder]
• [On Client, created LandingPage.js file inside "universal" folder]
• [On Client, typed "rafce" and enter on LandingPage workspace]
• [On Server, inside index.js] const db = require("./models");
• [On Server, inside index.js] // db.sequelize.sync({ alter: true });
• [On Server, inside index.js, on API ROUTES section] app.use("/api", express.static(join(__dirname + "/public")));
• [On Server, created "controllers", "middlewares", "public", & "routes" folder]
• [On Server, inside "controllers", "middlewares", & "routes" folder, created index.js + export modules template]
• [On Server, moved "config", "migrations", & "models" folder into "src" folder]
• [On Server, inside "config" folder, renamed config.json to config.js]
• [On Server, on config.js, added adaptor logic to read json config on js file]
• [On Server, created .env]
• [On Server, inside "models" folder, on index.js, updated conifg.js path reference]
• [On Server, created .sequelizerc + added logic to adapt sequelizer execution reference folder]

## Installed Dependencies:
### Client / Front End
1. Chakra UI:\
&emsp;• npm run install:client @chakra-ui/react\
&emsp;• npm run install:client @emotion/react\
&emsp;• npm run install:client @emotion/styled\
&emsp;• npm run install:client framer-motion
2. Formik Yup:\
&emsp;• npm run install:client formik\
&emsp;• npm run install:client yup
3. Axios:\
&emsp;• npm run install:client axios
4. React Router DOM:\
&emsp;• npm run install:client react-router-dom
5. React Icons:\
&emsp;• npm run install:client react-icons
### Server / Back End
For often uses:
1. npm run install:server --save-dev sequelize-cli
2. npm run install:server sequelize
3. npm run install:server mysql2
4. npm run server sequelize-cli init
For auth uses only:
5. npm run install:server bcrypt
6. npm run install:server handlebars
7. npm run install:server jsonwebtoken
8. npm run install:server otp-generator
9. npm run install:server nodemailer
10. npm run install:server firebase
### Global
1. npm install -g yarn

## Version Code:
### Projects folder
&emsp;DPNC = Dependencies\
&emsp;PREP = Other preparations\
&emsp;READ = readme.md

### Client / Front End
• Preparation:\
&emsp;FE-INDX = index.js of client side (front end)\
&emsp;FE-ROUT = Client routes (App.js)

• Custom & Preset Components:\

• Pages:\
&emsp;FE-LAPA = Landing page

### Server / Back End
• Preparation:\
&emsp;BE-INDX = index.js of server side (back end)\
&emsp;BE-CONF = config.js\
&emsp;BE-SQZR = .sequelizerc

• Migrations:\

• Routes:\
&emsp;BE-ROUT = index.js of Routes

• Middlewares:\
&emsp;BE-MIDL = index.js of Middlewares

• Controllers:\
&emsp;BE-CONT = index.js of Controllers\
&emsp;BE-PRCO = Property controller

• Email Content:\

• Models:\
&emsp;BE-MODL = index.js of Model

• Firebase:

## ORM: Sequelize
1. Create migration file
npm run server "sequelize-cli migration:generate --name create-user-table"\
npm run server "sequelize-cli migration:generate --name create-login_method-table"\
npm run server "sequelize-cli migration:generate --name create-role-table"\
npm run server "sequelize-cli migration:generate --name create-property-categories-table"

2. Execute create table from migration file:\
npm run server sequelize-cli db:migrate\
npm run server sequelize db:migrate

## HTTP Status Code
Kode status HTTP digunakan untuk mengkomunikasikan hasil dari permintaan HTTP antara klien dan server, dan mereka membantu dalam memahami apa yang terjadi dalam proses pertukaran informasi antara keduanya.\
Berikut adalah beberapa kode status HTTP yang umum beserta contoh kasus singkat yang dapat menjelaskan penggunaannya:
1. **200 OK**: Permintaan berhasil. Contoh: Klien mengambil data dari server dengan sukses.
2. **201 Created**: Sumber daya telah berhasil dibuat. Contoh: Klien mengirimkan permintaan POST untuk membuat entitas baru di server.
3. **204 No Content**: Permintaan berhasil diproses, tetapi tidak ada konten yang harus dikirimkan kembali sebagai respons. Contoh: Klien mengirimkan permintaan DELETE yang berhasil menghapus entitas.
4. **400 Bad Request**: Permintaan klien tidak dapat dipahami atau memiliki data yang tidak valid. Contoh: Klien mengirimkan data yang hilang atau tidak sesuai format.
5. **401 Unauthorized**: Klien tidak memiliki izin atau tidak diotentikasi untuk mengakses sumber daya. Contoh: Klien mencoba mengakses sumber daya yang memerlukan otentikasi tanpa mengirimkan token otentikasi.
6. **403 Forbidden**: Klien tidak diizinkan mengakses sumber daya, bahkan setelah otentikasi. Contoh: Klien mencoba mengakses sumber daya yang hanya boleh diakses oleh pengguna tertentu.
7. **404 Not Found**: Sumber daya yang diminta tidak ditemukan di server. Contoh: Klien mencoba mengakses URL yang tidak valid.
8. **500 Internal Server Error**: Terjadi kesalahan internal di sisi server yang menghentikan pemrosesan permintaan. Contoh: Terjadi kesalahan server yang tidak terduga.
9. **502 Bad Gateway**: Server gateway atau perantara menerima respons yang tidak valid dari server upstream atau server yang digunakan untuk memproses permintaan. Contoh: Server proxy tidak dapat menghubungkan ke server aplikasi.
10. **504 Gateway Timeout**: Server gateway atau perantara tidak menerima respons dalam waktu yang wajar dari server upstream. Contoh: Server proxy mengalami timeout ketika mencoba menghubungi server aplikasi.
11. **503 Service Unavailable**: Server tidak dapat sementara melayani permintaan karena alasan tertentu, seperti pemeliharaan atau overload. Contoh: Server web dimatikan untuk pemeliharaan rutin.
12. **429 Too Many Requests**: Klien telah mengirim terlalu banyak permintaan dalam waktu yang singkat. Contoh: Klien mencoba mengakses API dengan kecepatan yang melebihi batas rate limit.
13. **301 Moved Permanently**: Sumber daya yang diminta telah berpindah secara permanen ke lokasi baru. Contoh: URL lama yang telah dihapus dan mengarahkan ke URL baru.
14. **302 Found (atau 307 Temporary Redirect)**: Sumber daya yang diminta telah berpindah sementara ke lokasi baru. Contoh: Halaman web yang mengarahkan pengguna ke halaman login.
15. **418 I'm a teapot**: Kode status yang lucu digunakan dalam beberapa kasus sebagai lelucon atau referensi budaya internet. Contoh: Penggunaan ini umumnya tidak digunakan dalam produksi dan digunakan dalam konteks non-serius.

## Tutorial
### Chakra UI (client)
After installed Chakra UI dependencies, here some things need to do before using Chakra UI:
1. import { ChakraProvider } from '@chakra-ui/react';
2. Wrap all components with <ChakraProvider> component
### Routes (client)
After installed React Router DOM dependencies, here some things need to do before using routes:
1. Delete all imported components and dependencies
2. Leave only App() function and empty return
3. import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
4. Add <Router> component
5. Add <Routes> component inside <Router>
6. Add <Route> component inside <Routers>
7. On <Route> component, add "path" property and fill it with desired route without base url. For example: path="/"
8. On <Route> component, add "element" property and fill it with desired element/property. For example: element={<LandingPage/>}

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
