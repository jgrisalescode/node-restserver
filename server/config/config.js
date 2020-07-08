// Port
process.env.PORT = process.env.PORT || 3000
// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || "dev"
// Database
let urlDB
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe"
} else {
  urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB

// Token > Seed and Expire date
process.env.TOKEN_EXPIRE_DATE = 60 * 60 * 24 * 30
process.env.TOKEN_SEED = process.env.TOKEN_SEED || "we-are-in-develop-enviroment"

// Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || "472448917734-0i6jrv809k23a1q813cmcg1jglso60a5.apps.googleusercontent.com"
