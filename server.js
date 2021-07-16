require('dotenv').config()
const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const CookieParser= require('cookie-parser')
const fileUpload= require('express-fileupload')
const path= require('path')

// Create express app
const app= express()
app.use(express.json())
app.use(CookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes

app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/productRouter'))

// Connect to MongoDB
const URI= process.env.MONGODB_URL
mongoose.connect(URI, {
    userCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>{
    if(err)  throw err;
    console.log('Connected to MongoDB!')
})

// Turn on server
const port= process.env.PORT || 6969
app.listen(port, ()=>{
    console.log('Server is running on PORT', port)
})
