import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ConnectDB from './configs/mongodb.js'
import { ClerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()

// Connect to database
await ConnectDB()

// Middlewares
app.use(cors())

// Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.raw({ type: 'application/json' }), (req, res, next) => {
    req.rawBody = req.body.toString();
    req.body = JSON.parse(req.rawBody);
    next();
}, ClerkWebhooks);



// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})