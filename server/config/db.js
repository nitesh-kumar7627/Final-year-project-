
// mongoose 
const mongoose = require('mongoose')

const MongoUrl = process.env.MONGODB_STR;

const connectDb = async () => {
try {
    await mongoose.connect(MongoUrl)
    .then(() => {
        console.log('mongodb Connect successfully.')
    })
    .catch((err) => {
        console.log(err)
    })
} catch (err) {
    console.log(err)
    
}
}


module.exports = connectDb;