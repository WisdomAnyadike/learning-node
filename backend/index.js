const express = require("express")
const connectDb = require("./Config/dbConfig")
const app = express()
const port = 3490 || process.env.PORT
const env = require('dotenv').config()
const UserRouter = require('./Routes/Userroutes')
const ProductRouter = require("./Routes/Productroutes")
const cors = require('cors')
const ErrorHandler = require("./Middlewares/ErrorHandler")


app.use(express.json())
app.use(cors({origin: "*"}))
app.use('/Api/User' , UserRouter)
app.use("/Api/Products" , ProductRouter)
app.use(ErrorHandler)








connectDb()




app.listen(port , ()=> {
    console.log(`we are running on http://localhost:${port}`);
} )