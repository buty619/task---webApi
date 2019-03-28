const app = require('express')();
const Task = require("../model/Task");

exports.findAll = async (req,res) =>{
  try{
    const listofTask = await Task.find();
    res.json(listofTask);
  }catch(e){
    console.error(e);
  }
}

exports.create = async (req,res) =>{
  console.log(req.body);
  await Task.create(req.body);
  res.status(204).send({});
}

exports.update = async (req,res) =>{
  const id = req.params.id;
  const task = await  Task.findById(id);
  task.title = req.body.title;
  task.done = req.body.done;
  task.updated_at = Date.now();
  try{
    await task.save({});
    res.status(204).send({});
  }catch(e){
    return next(e);
  }
}

exports.delete = async (req,res) =>{
  const id = req.params.id;
  const task = await  Task.findById(id);
  try{
      task.remove(function(err) {
      if (err) return console.error(err);
    });  
    res.status(204).send({});
  }catch(e){
    return next(e);
  }
}