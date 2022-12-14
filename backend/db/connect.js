const mongoose = require('mongoose')

const connectDB = url => {
  console.log(process.env)
  return mongoose.connect(url)
}

module.exports = connectDB
