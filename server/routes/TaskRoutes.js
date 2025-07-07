const express = require('express')
const TaskSchema = require('../model/TaskSchema')
const routes = express.Router()

// get all task 
routes.get('/tasks', async (req, res) => {
    try {
        console.log('get all task')
        const task = await TaskSchema.find();
        res.status(200).json(task)

    } catch (err) {
        return res.status(500).json({ 'msg': "Oooh! server error" })

    }

})

// add a new task 
routes.post('/task/new', async (req, res) => {
    try {
        console.log('enter try create new schema',req.body.user)

        const newTask = new TaskSchema({
            ...req.body,
            user: req.body.user,

        })
        console.log('run updates')
        const updatedTask = await newTask.save()
        res.status(201).json(updatedTask)
    } catch (err) {
console.log(err, "lyo ji")
        return res.status(500).json({ 'msg': "Oooh! Server Error" })

    }
})


// delete a task
routes.post('/task/delete', async(req, res) => {
    try {
    const id = req.body.id;
    const Task = TaskSchema.findById(id)
    
    if(!id) {
       return res.status(400).json({'msg' : "Task not Found"})
    }


    } catch (err) {
        return res.status(500).json({'msg' : "Ooops! server Error"})
    }
})


module.exports = routes
