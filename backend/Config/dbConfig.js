const mongoose = require('mongoose')

const connectDb = async() => {
    const connected =  process.env.CONNECTION_STRING
  try {
    const connecter = await mongoose.connect(connected)
    if (connected){
        console.log('database created')
    }else {
        console.log("coudnt create database");
    }
  } catch (error) {
    console.log("network error" , error);
  }


}

module.exports = connectDb