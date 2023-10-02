# Purwadhika Final Project Repository

This is monorepo contain frontend project using ReactJS and backend project using ExpressJS.

## What I Did:
• git clone https://github.com/purwadhikafullstack/JCWD011005.git \
• git checkout -b 'FP-4'\
• npm install\
• [Installed Dependencies]\
• [client/src/index.js] import { ChakraProvider } from '@chakra-ui/react';\
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
&emsp;• npm run install:client react-router-dom\
4. React Icons:\
&emsp;• npm run install:client react-icons

### Server / Back End
1. npm run install:server --save-dev sequelize-cli\
2. npm run install:server sequelize\
3. npm run install:server mysql2\
4. npm install -g yarn\
5. npm run server sequelize-cli init\
6. npm run install:server bcrypt\
7. npm run install:server handlebars\
8. npm run install:server jsonwebtoken\
9. npm run install:server otp-generator\
10. npm run install:server nodemailer\
11. npm run install:server firebase

## Version Code:
### Client / Front End
• Preparation:\
&emsp;DPNC = Dependencies\
&emsp;READ = readme.md\
&emsp;IGNR = .gitignore (JCWD011005)

• Custom & Preset Components:\
&emsp;FE-FOCA = Form Card\
&emsp;FE-INPA = Input Password\
&emsp;FE-INWE = Input With Error\
&emsp;FE-POTE = Popover Text

• Pages:\
&emsp;FE-BLPA = Blank Page\
&emsp;FE-SEPA = Submit Email Page\
&emsp;FE-SUPA = Success Page\
&emsp;FE-URPA = User Register Page\
&emsp;FE-VAPA = Verify Account Page

### Server / Back End
• Preparation:\
&emsp;BE-INDX = index.js of server side (back-end)\
&emsp;BE-CONF = config.js\
&emsp;BE-SQZR = .sequelizerc\
&emsp;BE-TRNS = Transporter

• Migrations:\
&emsp;BE-LMMI = Login Method table migration\
&emsp;BE-ROMI = Role table migration\
&emsp;BE-PCMI = Property Category table migration\
&emsp;BE-USMI = User table migration

• Routes:\
&emsp;BE-ROUT = index.js of Routes\
&emsp;BE-AURO = Auth Routes

• Middlewares:\
&emsp;BE-MIDL = index.js of Middlewares\
&emsp;BE-DVMI = Database Verificator\
&emsp;BE-IVMI = Input Validator

• Controllers:\
&emsp;BE-CONT = index.js of Controllers\
&emsp;BE-AUCO = Auth Controllers\
&emsp;BE-PRCO = Property Controllers

• Email Content:\
&emsp;BE-VACE = Verification Account Email Content

• Models:\
&emsp;BE-MODL = index.js of Model\
&emsp;BE-PCMO = Property Category Model\
&emsp;BE-USMO = User Model

• Firebase:\
&emsp;BE-FIRE = firebase.js

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
