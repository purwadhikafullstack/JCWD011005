const admin = require("firebase-admin")
const serviceAccount = require("../firebase/pro-rent-12df6-firebase-adminsdk-ju6md-710a95311a.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  
module.exports = admin