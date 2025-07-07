const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    title : {
        type :String,
        require : [true,"Please add a task title"],
        trim: true,
        maxlength : [100, "Please task title within 100 characters"]
    },
    discription : String,
    priority : {
        type : String,
        enum : ['low','medium','high', 'none'],
        default: 'none'
    },
    duedate : {
        type : Date,
    },
    completed : {
        type : Boolean,
        default : false,
    }
},{
    Timestamp : true,
})


module.exports = mongoose.model('Tasks', TaskSchema)
